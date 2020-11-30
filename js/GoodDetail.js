import Component from "./Component.js";
import Utils from "./Utils.js";
export default class GoodDetail extends Component{
    data;

    iconCon;
    img;
    num;
    reducebtn;

    // Id;
    // img;//图片列表
    // price;
    // blackprice;//黑卡价格
    // prev;//
    // hot;//是否热销标签
    // new;//是否新品标签
    // selfTag;//是否自营标签
    // referencePrice;//参考价
    // title;//商品标题
    // description;//商品描述
    // specification;//商品规格、型号
    // coupon;//优惠券
    // promotion;//促销活动
    // taxrate;//税费、是否包税
    // freight;//运费
    // service;//服务
    // source;//货源的图标
    
    // countryTag;//国家标签
    // countrypic;//国旗图片
    // buybox;//购买数量
    // comments;//商品评价及评论列表
    // store;//店铺名字
    // productTag;//商品标签

    // // 左侧
    // showImg;
    // mask;
    // bigImg;
    // iconCon;//放大镜图标
    // imgPre;
 
    static styleBool=false;

    constructor(_data){
        super();
        this.data=_data;
        this.elem.className="PinfoWrap";
        this.render();

        this.elem.addEventListener("click", e => this.clickHandler(e));
        // this.img = this.elem.querySelector(".imgList");
        // this.add = this.elem.querySelector('#J_btnAddCart');
        // this.getNum();
        
        // console.log(this.data);
        // this.Id=this.data.Id;
        // this.name=this.data.name;
        // this.price=this.data.price;
        // this.blackprice=this.data.blackprice;
        // this.title=this.data.title;
 
        GoodDetail.setStyle();
    }

    clickHandler(){
        
    }

    createElem() {

        if (this.elem) return this.elem;
        let a = document.createElement("a");
        return a;
    }

    appendTo(parent) {
        super.appendTo(parent);
        this.iconCon = this.elem.querySelector(".preview-thumb");
        // this.iconCon.addEventListener("mouseover", e => this.mouseHandler(e));

    }

    mouseHandler(e) {
        // console.log(e.target.constructor)
        if (e.target.constructor !== HTMLImageElement) return;
        var url = e.target.src.split("/").pop();
        // console.log(index)
        var index = this.data[0].lunbo.reduce((value, item, index) => {
            if (item.includes(url)) value = index;
            return value;
        }, -1);
        this.img.src = this.data[0].lunbo[index];
        // this.price.textContent = Number(this.data.priceList[index]).toFixed(2);
        this.changePrev(e.target.parentElement.parentElement);
    }

    changePrev(elem) {
        // console.log(elem);
        if (this.prev) {
            this.prev.className = '';
        }
        this.prev = elem;
        this.prev.className = 'current';
    }

    render(){
        // console.log(this.data);
        this.elem.innerHTML =`
        
            <div class="PImgBox">
                <img src="${this.data.imgList}">
            </div>
            <dl class="Pinfo">
                <dt class="PTags">
                    <i class="selfTag tag">自营</i>
                    <i class="crosstagTag tag">跨境</i>
                </dt>
                <dt class="orig-country">
                    <img src="${this.data.countrypic}">
                    <span>${this.data.countryTag}</span>
                    <span class="split">|</span>
                    <a href="#" target="_blank" class="brand" one-link-mark="yes" data-spm-anchor-id="a2v0d.b11091998.0.0">${this.data.brand}</a>
                </dt>
                <dt class="product-title">
                    <span>${this.data.title}</span>
                </dt>
                <dt class="subTit">${this.data.description}</dt>
                <dd class="priceWrap">
                    <div class="price">
                        <span class="m-line-title">售价</span>
                        <div class="price-cnt">
                            <span class="newusertxt">新人价</span>
                            <span class="Pinfo_r newuserprice">
                                <span class="rmb">￥</span>${this.data.price}
                            </span>
                            <span class="kaolaprice">
                                考拉价
                                &ensp;￥
                                ${this.data.referencePrice}
                            </span>
                        </div>
                    </div>
                    <div class="m-multipack f-cb">
                        <span class="m-line-title">更多组合</span>
                    </div>
                </dd>

                <dd class="promotiontitle">
                    <span class="m-line-title">活动</span>
                    <span class="m-dp-prt-title">加价购</span>
                    <span class="link-desc ellipsis">加入购物车，即可低价换购热销商品 </span>
                </dd>
                <dd class="promotiontitle">
                    <span class="m-line-title">税费</span>
                    <span class="m-dp-prt-title">包税</span>
                    <span class="link-desc ellipsis">售价已包含税费，无需另付税费</span>
                </dd>

                <dd class="postage">
                    <span class="m-line-title">运费</span>
                    <div class="msg">
                        <span class="from2">至
                           
                        </span>
                        <span class="feeInfo">满88元包邮</span>

                    </div>
                </dd>
                <dd class="m-service f-cb f-hkdn">
                    <span class="m-line-title">服务</span>
                    <span class="send">本商品由 自营保税仓 发货</span>
                    
                </dd>

                <dd id="js_skuBox" class="buyBox j-skubox nosku"></dd>
                  
                <div class="">
                <span class="m-line-title">数量</span>
                    <em id="j_buyboxnum" class="buybox" name="js_buyBox">
                        <span class="ctrnum-wrap">
                        <a hidefocus="true" class="ctrnum-b ctrnum-b-rd icon-minus ctrnum-b-dis" href="javascript:void(0);" one-link-mark="yes"></a>
                        <input type="text" autocomplete="off" class="ctrnum-qty" name="goods[0].tempBuyAmount">
                        <a hidefocus="true" class="ctrnum-b ctrnum-b-ad icon-plus ctrnum-b-dis" href="javascript:void(0);" one-link-mark="yes"></a>
                        </span>
                        <span id="js_dometxt" class="domeTips z-isRed">限购1件</span>
                        <span id="js_dome" class="dome hide"></span>
                    </em>
                </div>
                
                <dd>
                    <form id="j-formEl" method="post" action="#">
                        <div class="buynowonly-wrap clearfix">
                            <span class="m-line-title">说明</span>
                            <ul class="buynowonly-tip-lis point clearfix">
                                <li class="f-fl"><i class=""></i>正品保障</li>
                                <li class="f-fl"><i class=""></i>7天无理由退货</li>
                            </ul>
                        </div>
                        <div class="buyBtns">
                            <a href="javascript:void(0)" hidefocus="true" class="j-buynow-btn" id="buyBtn" one-link-mark="yes">立即购买</a>
                            <a hidefocus="true" class="j-add2cart-btn" id="addCart" href="javascript:void(0);" one-link-mark="yes"><span class="sign icon-cart20 icon-cart"></span>加入购物车</a>
                            <a href="javascript:void(0)" class="m-favbtn m-favbtn-s" id="auto-id-1606525398079" style="visibility: visible;" one-link-mark="yes">
                                <i class="iconfont ic icon-heart" style="display: none;"></i>
                                <i class="iconfont ic icon-heart-hollow"></i>
                                <span class="txt">收藏</span>
                            </a>
                        </div>
                    </form>
                </dd>

            </dl>
        `;
    }

   

    static setStyle(){
        if(GoodDetail.styleBool) return;
        GoodDetail.styleBool = true;

        Utils.addCSS(".PinfoWrap",{
            display:"block",
            position: "relative",
            width: "1090px",
            height: "892px",
            // border: "1px solid #ff0000",
            // margin: "20px 0 0",
            // backgroundColor: "red",
        });

        Utils.addCSS("dd",{
            paddingTop:"13px",
        })

        Utils.addCSS(".PinfoWrap .PImgBox",{
            float: "left",
            width: "402px",
            height: "488px",
            position: "relative",
            display: "inline",
            zIndex:" 1000",
            border: "1px solid #ffff00",
        });

        Utils.addCSS(".PinfoWrap .PImgBox img",{
            width: "400px",
            height: "400px",
        });



        Utils.addCSS(".PinfoWrap .Pinfo",{
            
            position: "relative",
            float: "left",
            width: "658px",
            marginLeft:"20px",
            fontSize: "12px",
            overflow:"hidden",
        });

        Utils.addCSS(".Pinfo .PTags",{
            position: "absolute",
            top: "0",
            right: "0",
            overflow: "hidden",
            marginLeft: "-6px",
            fontSize: "0",
        });

        Utils.addCSS(".Pinfo .PTags .tag",{
            display: "inline-block",
            width: "54px",
            height: "22px",
            marginLeft: "6px",
            paddingRight: "6px",
            lineHeight:" 22px",
            textAlign: "right",
            fontSize: "13px",
            fontWeight:" bold",
            background: "url(//kaola-haitao.oss.kaolacdn.com/5f85c550-4014-4569-ba81-0ed04008b509_220_22.png) 0 0 no-repeat",
        });



        Utils.addCSS(".Pinfo .PTags .selfTag",{
            backgroundPsition:" -94px 0",
            color: "#cf2c48",
            background: "url(//kaola-haitao.oss.kaolacdn.com/4525fe3b-8a07-4e54-b7e8-a39b541d3849_120_22.png) 0 0 no-repeat",
        });
        Utils.addCSS(".Pinfo .PTags .crosstagTag",{
            backgroundPosition:"-160px 0",
	        color:"#8b71c5",
        });

        Utils.addCSS(".orig-country img",{
            width: "24px",
            height: "24px",
            verticalAlign: "middle",
        });
        Utils.addCSS(".orig-country span",{
            fontSize: "13px",
            marginLeft:"6px",
            color:"#999",
            fontWeight:"400",
            verticalAlign:"middle",
        });
        Utils.addCSS(".orig-country .split",{
            fontSize:"13px",
        });
        Utils.addCSS(".orig-country a",{
            fontSize: "13px",
            marginLeft:"6px",
            color:"#999",
            fontWeight:"400",
            verticalAlign:"middle",
        });

        Utils.addCSS(".product-title",{
            marginTtop: "10px",
            marginBottom: "5px",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "26px",
        });

        Utils.addCSS(".Pinfo .subTit",{
            marginBottom: "11px",
            color: "#333",
            lineHeight: "20px",
            fontSize: "13px",
        });

        Utils.addCSS(".Pinfo .m-line-title",{
            marginLeft:"10px",
            fontSize: "12px",
            // color:"red",
        });

        Utils.addCSS(".m-dp-prt-title",{
            display: "inline-block",
            minWidth: "48px",
            padding: "0 4px",
            color: "#fff",
            backgroundColor: "#e31436",
            fontSize: "12px",
            height: "18px",
            lineHeight: "18px",
            textAlign: "center",
            verticalAlign: "middle",
        });

        Utils.addCSS(".Pinfo .priceWrap",{
            backgroundColor:"#f9f9f9",
            zindex:"22",
            marginBottom:"12px",
        });
        Utils.addCSS(".price",{
            overflow: "hidden",
            position: "relative",
            paddingTop: "5px",
            borderTop: "1px dotted #ddd",
            zIndex: "100",   
            fontSize: "0",
        });

        Utils.addCSS(".price .price-cnt",{
            marginLeft:"71px",
            position:"relative",
            top:"-20px",
           
        });
        Utils.addCSS(".price .newusertxt",{
            fontSize: "12px",
            color:" #e31436",
            fontWeight: "bold",
            verticalAlign: "4px",
            lineHeight: "1",
            marginRight: "4px",
        });
        Utils.addCSS(".newuserprice",{
            position: "relative",
            top: "-3px",
            fontSize: "24px",
            color: "#e31436",
            fontWeight:" bold",
            verticalAlign: "baseline",
            lineHeight: "1",
            margin: "8px 0",
        });
        Utils.addCSS(".newuserprice .rmb",{
            fontSize:"20px",
        });
        Utils.addCSS(".price .newusertxt",{
            fontSize: "12px",
            color: "#e31436",
            fontWeight: "bold",
            verticalAlign: "4px",
            lineHeight: "1",
            marginRight: "4px",
        });

        Utils.addCSS(".kaolaprice",{
            verticalAlign:"4px",
            padding:"0 5px 0 10px",
            fontSize:"12px",
        })
        Utils.addCSS(".ellipsis",{
            color:"red",
        });
        Utils.addCSS(".postage .m-line-title",{
            float: "left",
            lineHeight: "24px",
        });
        Utils.addCSS(".postage .msg",{
            marginLeft:"85px",
        });
        Utils.addCSS(".postage .feeInfo",{
            display: "inline",
            lineHeight: "24px",
            height: "24px",
            verticalAlign: "middle",
        });
        Utils.addCSS(".ctrnum-wrap",{
            display: "inline-block",
            border: "1px solid #ccc",
            textAlign: "center",
            verticalAlign: "middle",
        });
        Utils.addCSS(".PInfo .domeTips .z-isRed",{
            color:"#e31436",
        });
        
        Utils.addCSS(".PInfo .domeTips",{
            fontWeight: "300",
            marginLeft: "5px",
            verticalAlign: "middle",
        });
        Utils.addCSS(".buynowonly-tip-lis",{
            marginTop: "5px",
        });
        Utils.addCSS(".buynowonly-tip-lis.point li",{
            position: "relative",
            paddingLeft: "19px",
            lineHeight: "18px",
        });
        Utils.addCSS("#buyBtn",{
            position: "relative",
            width: "156px",
            height: "46px",
            border: "2px solid #d41c44",
            backgroundColor: "#ffeced",
            color: "#d31b44",
            lineHeight: "46px",
        });
        Utils.addCSS(".buyBtns a,.btn-nogoods,.btn-arrivalNotice,.newerBtn",{
            display: "inline-block",
            marginRight: "20px",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
            textDecoration: "none",
            verticalAlign: "middle",
        })
        Utils.addCSS(".j-add2cart-btn",{
            width: "180px",
            height: "50px",
            lineHeight: "50px",
            color: "#fff",
            backgroundColor: "#e31436",
        });
        Utils.addCSS(".buyBtns a.m-favbtn-s",{
            height:"28px",
            lineHeight: "28px",
            padding:"0 10px",
            fontSize:"0",
            textAlign:"center",
            border:"1px solid #fff",
        });
        // Utils.addCSS("",{

        // });
        // Utils.addCSS("",{

        // });
        // Utils.addCSS("",{

        // });
        // Utils.addCSS("",{

        // });
        // Utils.addCSS("",{

        // });

    }
     
   
}



