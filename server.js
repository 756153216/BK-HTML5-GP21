var http=require("http");
var querystring=require("querystring");
var mysql=require("mysql");
const { type } = require("os");
var server,req,res;
var data="";
var sql=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"kaola"
})
sql.connect(function(error){
    if(error){
        console.log("数据库连接失败");
    }else{
        console.log("数据库连接成功");
        createServer();
    }
})
function createServer(){
    server=http.createServer(createChannel);
    server.listen(4023,"10.9.72.237",listenHandler);
}

function listenHandler(){
    console.log("服务开启")
 
}

function createChannel(_req,_res){
    req=_req;
    res=_res;
    data="";
     res.writeHead(200,{
        "content-type":"text/html;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
    });
    req.on("data",function(_data){
        data+=_data;
    });
    req.on("end",channelEndHandler);
}

function channelEndHandler(){
    var type = req.url.trim().split("?")[0].replace(/\//g, "");// 定义接口
       console.log(type);
    // 如果是get请求，就从url中重新获取数据存入data变量
    if(req.method.toLowerCase()==="get"){
        if(req.url.includes("favicon.ico")) return res.end();//如果get请求的是图标直接返回空跳出
        data=req.url.includes("?") ? req.url.split("?")[1] : "";
    }
    // 首先判断是否可以通过JSON解析，如果通过JSON直接转换，如果不能就是querystring解析
    try{
        data=JSON.parse(data);
    }catch(e){
        data=data ? querystring.parse(data) : {};
    }
    // console.log(data);
    var o={};
    switch (type) {
        case "kaola":
            // console.log("aaa");
             var  ress=res;
            // console.log(ress);
          
                var str="SELECT * FROM `goodlist` WHERE Id="+data.Id
                sql.query(str,function(error,result){
                    // console.log(result);
                    if (error) {
                       
                        res.end('数据库查询失败！')
        
                        return;
                    }
                    var result=JSON.parse(JSON.stringify(result));
                  
                    console.log("-------------------------")
                    // console.log(result);
                    ress.end(JSON.stringify(result));
                    
                    console.log(result);
                    console.log("-------------------------")
                    console.log(str);
                    console.log("-------------------------")
                });
                console.log(str);
                // o.name=sqlData.filter(item=>{
                //     if(item.type=="user"){
                //         return {Id:item.Id,user:item.user,password:password}
                //     }
                // })
                break;
            case "goodlist":
                o.goodlist=sqlData.filter(item=>{
                    if(item.type=="goodlist"){
                        return{Id:item.Id,img:item.img,price:item.price,blackprice:item.price}
                    }
                })
                break;
            case "shoppingcart":
                o.shoppingcart=sqlData.filter(item=>{
                    if(item.type=="shoppingcart"){
                        return{Id:item.Id}
                    }
                })
                break;
        }
        if(type!=="kaola")return;

    };

    // console.log(data);
    // var str="INSERT INTO `user`(`user`, `password`, `name`, `age`, `sex`, `tel`, `email`) VALUES (?,?,?,?,?,?,?)";
    // var str='SELECT * FROM goodlist' ;
    // sql.query(str,[data.user,data.password,data.name,Number(data.age),data.sex,data.tel,data.email],sqlCallBack);


function inquireData() {
    var str = "SELECT * FROM `user` WHERE  Id=1"
    sql.query(str, sqlCallBack)
}


function getgoods() {
        var str = "SELECT * FROM `goods` WHERE 1"
        sql.query(str, goodsCallBack)
    
}

function database(_type, _data) {
    var f = _data
    var table = _type
    // var str = 'SELECT * FROM `goods` WHERE `type`="+$f+"'
    var str = "SELECT * FROM " + table + " WHERE type = '" + f + "'"
    // console.log(str)
    return new Promise((resolve, reject) => {
        sql.query(str, function (error, result) {
            var D = JSON.parse(JSON.stringify(result))

            if (error) {
                reject(error)
                res.end('数据库查询失败！')

                return;
            }

            resolve(D)
        })
    })
}