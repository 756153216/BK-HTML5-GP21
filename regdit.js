var http = require("http");
var querystring = require("querystring");
var mysql = require("mysql");
var fs = require("fs");
var server, req, res;
var data = "";
var sqlData;
var goodsData;
// var D
var sql = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "kaola"
})
sql.connect(function (error) {
    if (error) {
        console.log("数据库连接失败");
    } else {
        console.log("数据库连接成功");
        createServer();

    }
})

function createServer() {
    server = http.createServer(createChannel);
    server.listen(4011, "10.9.72.237", listenHandler);
}

function listenHandler() {
    console.log("服务开启")
}

function createChannel(_req, _res) {
    var data = "";
    req = _req
    res = _res
    res.writeHead(200, {
        "content-type": "text/html;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        //请求头跨域 如果请求头发生修改并且非同源，就需要申请请求头跨域
    });
    req.on("data", function (_data) {
        data += _data;
        // console.log(_data)
    });
    req.on("end", function () {
        // type是接口名称

        var type = req.url.trim().split("?")[0].replace(/\//g, "");

        if (req.method.toLowerCase() === "get") {
            if (req.url.includes("favicon.ico")) return res.end(); //如果get请求的是图标直接返回空跳出
            // 如果是get请求，就从url中重新获取数据存入data变量
            data = req.url.includes("?") ? req.url.split("?")[1] : "";
        }
        // 首先判断是否可以通过JSON解析，如果通过JSON直接转换，如果不能就是querystring解析
        try {
            data = JSON.parse(data);
        } catch (e) {
            data = data ? querystring.parse(data) : {};
        }
        var o = '';

        var re = res;
        //储存res用于再回调函数中用
        inquiredata('user', data).then((res) => {
            if (!res.length) {
                database('user', data).then((res) => {
                    console.log(res)
                    re.end(herf(res))//解决cookie存储传递的问题因为在同以ip地址下故可以读到cookie
                }
                )
            } else {
                o = '用户名已注册';
                console.log(o);
                console.log(res);
                re.end(herf(res));
                // 
            }
        })
    })
};

function database(_type, _data) {
    // console.log(data)
    var f = _data;
    var table = _type;
    // console.log(f.user)
    console.log(_data);
    console.log(_type);
    var user = f.user;
    var pwd = f.password;
    var str = "INSERT INTO `" + table + "` (`user`, `password`) VALUES (" + user + ",'" + pwd + "')"

    // console.log(str)
    return new Promise((resolve, reject) => {
        sql.query(str, function (error, result) {
            // var D = JSON.parse(JSON.stringify(result))
            // console.log()

            if (error) {
                reject(error)
                res.end('数据库查询失败！')

                return;
            }

            resolve(f)
        })
    })
}
function inquiredata(_type, _data) {
    var f = _data
    var table = _type
    // console.log(f.user)
    var user = f.user;
    var pwd = f.password;
    var str = "SELECT * FROM " + table + " WHERE user = '" + user + "'";
    // console.log(data)
    // console.log(str)
    return new Promise((resolve, reject) => {
        sql.query(str, function (error, result) {
            var D = JSON.parse(JSON.stringify(result))

            if (error) {
                reject(error)
                res.end('数据库查询失败！')

                return
            }
            resolve(D)
        })
    })
}
function setCookie(name, value) {
    // for(oob)

    var Days = 7;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();

}
function herf(_res) {
    console.log(data);
    var name = _res.user;
    // console.log(_res);
    // console.log(_res.user);
    var value = _res.password;
    return `<script language="javascript" type="text/javascript">
    var Days = 7;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie ='name' + "=" + escape('${name}') + ";expires=" + exp.toGMTString();
    document.cookie ='password' + "=" + escape('${value}') + ";expires=" + exp.toGMTString();
   
    alert("注册成功");
    window.location.href="http://10.9.72.237:5500/login.html";
    window.event.returnValue = false ;
    
</script>`
}