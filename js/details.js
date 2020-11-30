import Component from "./Component.js";
import Utils from "./Utils.js";
export default class Details extends Component {
    data;
    iconCon;
    img;
    num;
    reducebtn;
    static styleBool = false;
    constructor(_data) {
        super();
        this.data = _data;
        this.elem.className = 'details';
        this.render();

        // console.log(this.data)//存入数据是缺少中括号
        this.elem.addEventListener("click", e => this.clickHandler(e));
        this.img = this.elem.querySelector("#J_imgBooth img");
        this.add = this.elem.querySelector('#J_btnAddCart');
        this.getNum();
        // this.add.addEventListener('click', (e) => this.clickHandler(e))
        // console.log(this.add)

        Details.setStyle();
    }
    createElem() {

        if (this.elem) return this.elem;
        let a = document.createElement("a");
        return a;
    }
    appendTo(parent) {
        super.appendTo(parent);
        this.iconCon = this.elem.querySelector(".preview-thumb");
        this.iconCon.addEventListener("mouseover", e => this.mouseHandler(e));


        // this.img = this.elem.querySelector(".img");
        // this.price = this.elem.querySelector(".price");
        // this.changePrev(this.iconCon.firstElementChild);
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
    clickHandler(e) {
        // this.callback(this.data.id, this.index);
        this.num = document.querySelector('#J_quantity')
        this.reducebtn = document.querySelector('.vm-minus')
        // var user = Utils.getCookie("name")
        if (e.target.className === 'vm-plus') {
            this.num.value++

        } else if (e.target.className === 'vm-minus') {
            this.num.value--
        }
        this.bnt()
        if (e.target.id === 'J_btnAddCart') {

            var name = Utils.getCookie("name")
            console.log(name)
            if (name === null) {
                alert('请登录')
            } else {
                Utils.ajax('GET', 'add', { Id: this.data[0].Id, user: name, num: this.num.value, icon: this.data[0].lunbo[0], name: this.data[0].name, price: this.data[0].price, set: Object.keys(this.data[0].set[0])[0], capacity: this.data[0].capacity[0], color: Object.keys(this.data[0].color[0])[0] }).then((res) => {
                    var Number = document.querySelector('.nav-wrap em')
                    Number.textContent = res
                })
            }


        }
    }
    bnt() {
        if (this.num.value > 1) {
            this.reducebtn.className = 'vm-minus'
        } else {
            this.reducebtn.className = 'vm-minus disabled'
        }
    }
    getNum() {
        Utils.ajax('GET', 'getnum', 'Utils.getCookie("name")').then((res) => {
            var Number = document.querySelector('.nav-wrap em')
            Number.textContent = res
        })
    }
    changePrev(elem) {
        console.log(elem);
        if (this.prev) {
            this.prev.className = ''
        }
        this.prev = elem;
        this.prev.className = 'current'
    }
    render() {
        this.elem.innerHTML = `
        <div class="top" style='display:${this.data[0].edition ? 'block' : 'none'}' >
        <ul >
        <li class="rvx3"><a href="#" class="rvx8">概述</a>
        </li>
        <li class="rvx3"><a href="#" class="rvx8">${this.data[0].edition}</a>
        </li>
        <li class="rvx3"><a href="#" class="rvx8">参数</a>
        </li>
        <li class="rvx9"><a href="#" class="rvx8">换机指引</a>
        </li>
        </ul>
        <span class="goodsName">${this.data[0].name}</span>
        </div>
        <section class="row container">
        <div class="preview" id="preview">
            <div class="preview-booth">
                <a href="javascript:;" id="J_imgBooth">
                                <img src=${this.data[0].lunbo[0]} height="560" width="560" alt="">
                </a>
            </div>
            <ul class="preview-thumb clearfix" id="J_previewThumb">
            ${(function (data) {
                var str = ''
                data[0].lunbo.forEach((item) => {
                    return str += `<li >
                    <a data-mtype="click_store_de_tp_1" data-bh="click_store_de_tp_1" href="#">
                        <img src="${item}" width="80" height="80">
                    </a>
                </li>`

                })

                return str
            })(this.data)}
                
                
                </ul>
            <div class="preview-action">
                <a class="vm-favorite" data-mtype="store_de_favorite" data-bh="click_store_de_favorite" id="J_favorite" href="javascript:;"><i class="iconfont icon-favorite"></i>收藏 </a>
                <a class="compare-btn-list" id="J_compare" data-mtype="store_de_compare" data-bh="click_store_de_compare"><i class="iconfont icon-duibi compare-duibi"></i><span>对比</span></a>
            </div>
        </div>
        <div class="property" id="property">
            <div class="property-hd">
                <h1>${this.data[0].name}</h1>
    
                <p class="mod-info active">${this.data[0].describe}</p>
            </div>
    
    
    
            <div class="property-sell">
                <div class="property-sell-price clearfix">
                    <div class="mod-price">
                        <small>¥</small>
                        <span id="J_price" class="vm-money">${this.data[0].price}</span>
                    </div>
                    <div class="mod-original" id="J_originalPrice" style="display:none;"></div>
                </div>
                <dl class="property-sell-app clearfix" id="J_propertySellAppPrice" style="display: none">
                    <dt class="vm-entry" id="J_appTag">
                        <span>APP专享</span>
                    </dt>
                    <dd class="mod-app-tip" id="J_appTip">
                        APP下单省<span id="J_appPrice" class="vm-money">0</span>元
                    </dd>
                </dl>
                <dl class="property-sell-coupon clearfix" id="J_prodPromo" style="">
                    <dt class="vm-entry">
                        <span>优惠券</span>
                    </dt>
                    <dd>
                        <p id="J_promoInner">
                        <span class="vm-tag">${this.data[0].Discount}</span></p>
                        <a class="vm-more" data-mtype="store_de_coupon_more" data-bh="click_store_de_coupon_more" id="J_promoMore" href="#">更多 &gt;</a>
                    </dd>
                </dl>
                <dl class="property-sell-morebuy clearfix" id="J_prodMorebuy" style="">
                    <dt class="vm-entry">
                        <span>加价购</span>
                    </dt>
                    <dd>
                                            <span>
                                                另加<em id="J_moreBuyStart">${this.data[0].reduction}</em>元起，即可换购超值商品
                                            </span>
                        <a class="vm-more" data-mtype="store_de_coupon_more" data-bh="click_store_de_coupon_more" id="J_moreBuyEnter" href="#">立即加购 &gt;</a>
                    </dd>
                </dl>
                <dl class="property-sell-gift clearfix" id="J_prodGift" style="display:none;">
                    <dt class="vm-entry">
                        <span>赠品</span>
                    </dt>
                    <dd>
                    </dd>
                </dl>
            </div>
    
    
            <div class="property-service">
                <dl class="property-service-item clearfix">
                    <dt class="vm-metatit">支<span class="s-space"></span><span class="s-space"></span>持
                    </dt>
                    <dd class="mod-bd" id="J_prodService">
                        <span><i class="iconfont-detail icon-success"></i>花呗分期</span>
                        
                            <span><i class="iconfont-detail icon-success"></i>顺丰发货</span>
                            <span><i class="iconfont-detail icon-success"></i>7天无理由退货（具体查看详情）</span>
                    </dd>
                </dl>
                <!--去掉百城速达判断-->
                <dl class="property-service-suda clearfix" id="J_delivery">
                    <dt class="vm-metatit">配送服务</dt>
                    <dd class="mod-site clearfix">
                        <div id="site-selector" class="site-selector">
                            <div class="text">北京 北京市 <i class="iconfont-detail icon-yijianfankuixialajiantou"></i></div>
                           
                        </div>
                        <div class="site-status" id="J_siteStatus"></div>
                    </dd>
                </dl>
                <!---->
                <div class="property-service-provider clearfix">
                    <span id="J_installmentInfo"></span>
                        本商品由 魅族 负责发货并提供售后服务
                    <a class="vm-kefu" style="" data-mtype="store_de_kefu" data-bh="click_store_de_kefu" id="J_kefu" href="javascript:;"><i class="iconfont-detail icon-kefu"></i><span>商城客服</span></a>
                </div>
            </div>
    
            <div class="property-sibling">
                <dl data-property="型号" class="property-sibling-item" style='display:${this.data[0].model ? 'block' : 'none'}'>
                    <dt class="vm-metatit">
                        型<span class="s-space"></span><span class="s-space"></span>号
                    </dt>
                    <dd class="clearfix">
                    ${(function (data) {
                return data[0].model.reduce((value, item) => {
                    value += `<a href="javascript:;" data-itemid="12717" class="prop selected" data-mtype="store_de_sib_1" data-bh="click_store_de_sib_1">${item}</a>`
                    return value

                }, '')
            })(this.data)}
                               
                    </dd>
                </dl>
            </div>
            <div class="property-set">
                <dl class="property-set-sale" data-property="网络类型" style='display:${this.data[0].network ? 'block' : 'none'}' >
                    <dt class="vm-metatit">网络类型</dt>
                    <dd class="clearfix">
                            <a data-value="14:18238" data-mtype="store_de_sp_1_1" data-bh="click_store_de_sp_1_1" href="#" title="全网通公开版" class="selected">
                                    <span>${this.data[0].network}</span>
                            </a>
                    </dd>
                </dl>
                <dl class="property-set-sale" data-property="颜色分类" style='display:${this.data[0].color ? 'block' : 'none'}' >
                    <dt class="vm-metatit">颜色分类</dt>
                    <dd class="clearfix">
                    ${(function (data) {
                return data[0].color.reduce((value, item) => {


                    value += `<a data-value="3:33957" class="vm-sale-img" data-mtype="store_de_sp_2_1" data-bh="click_store_de_sp_2_1" href="#" title="松深入墨">
                    <img src="${Object.values(item)[0]}" width="32" height="32">
                <span>${Object.keys(item)[0]}</span>
        </a>`
                    return value

                }, '')
            })(this.data)}

                            
                           
                    </dd>
                </dl>
                <dl class="property-set-sale" data-property="内存容量" style='display:${this.data[0].capacity ? 'block' : 'none'}' >
                    <dt class="vm-metatit">内存容量</dt>
                    <dd class="clearfix">
                    ${(function (data) {

                if (!data[0].capacity) { return }

                return data[0].capacity.reduce((value, item) => {


                    value += ` <a data-value="13:31974" data-mtype="store_de_sp_3_1" data-bh="click_store_de_sp_3_1" href="#" title="8+128GB" class="selected">
                            <span>${item}</span>
                    </a>`
                    return value

                }, '')
            })(this.data)}
                           
                    </dd>
                </dl>
                <dl class="property-set-package" id="propertyPackage" data-property="套餐" style='display:${this.data[0].set ? 'block' : 'none'}'>
                    <dt class="vm-metatit">选择套餐</dt>
                    <dd class="package">
                        <div class="package-tab clearfix" id="J_packageTab" data-property="套餐">
                        ${(function (data) {
                if (!data[0].set) return
                return data[0].set.reduce((value, item) => {


                    value += `<a data-value="313" data-mtype="click_store_de_tc_2" data-bh="click_store_de_tc_2" href="#" title="EP3C套餐">
                    <p class="vm-text ">
                    ${Object.keys(item)[0]}
                        
                            
                                
                                    <span class="vm-text-profits" style='visibility:${Object.values(item)[0] ? "visible" : "hidden"}'>省<em>${Object.values(item)[0]}</em>元</span>
                                
                            
                        
                    </p>
                </a>`
                    return value

                }, '')
            })(this.data)}
        
    </div>
                        <div class="package-content hide" id="J_packageContent" style="display: none;">
                            <span class="s-triangle" id="J_triangle" style="display: block; left: 88px;"></span>
                            <div class="mod-bd" id="J_packageBody"></div>
                        </div>
                    </dd>
                </dl>
            </div>
            <div class="property-huabei clearfix">
                <div class="vm-metatit">
                    花呗分期
                    <a href="//hd.meizu.com/rules/huabei.html" target="_blank" class="vm-desc">
                        <i class="iconfont-detail icon-wenhao"></i>
                    </a>
                </div>
                <div class="clearfix property-huabei-bd" id="J_huabeiBody">
                ${(function (data) {

                return data[0].Huabei.reduce((value, item) => {
                    value += `<a data-value="3" class="prop" data-mtype="store_de_hb_3" data-bh="click_store_de_hb_3">
                    <span class="vm-periods"> ${Object.keys(item)[0]}</span>
                        <span class="vm-rate"> ${Object.values(item)[0]}</span>
                </a>`
                    return value

                }, '')
            })(this.data)}
                        
                </div>
            </div>
            <div class="property-buy">
                <p class="vm-message" id="J_message"></p>
                <dl class="property-buy-quantity">
                    <dt class="vm-metatit">数<span class="s-space"></span><span class="s-space"></span>量
                    </dt>
                    <dd class="clearfix">
                        <div class="mod-control">
                            <a title="减少" href="javascript:;" class="vm-minus disabled">-</a>
                            <input type="text" value="1" id="J_quantity" data-max="3">
                            <a title="增加" href="javascript:;" class="vm-plus">+</a>
                        </div>
                    </dd>
                </dl>
                <div class="property-buy-action">
    
                    <a data-mtype="store_de_buy" data-bh="click_store_de_buy" href="javascript:void(0);" id="J_btnBuy" class="btn btn-primary btn-lg mr20" style="display: inline-block;">立即购买</a>
                    <a data-mtype="store_de_cart" data-bh="click_store_de_cart" href="javascript:void(0);" id="J_btnAddCart" class="btn btn-empty btn-lg hide" style="display: inline-block;"><i></i>加入购物车</a>
                    <a href="javascript:void(0);" data-mtype="store_de_remind" data-bh="click_store_de_remind" id="J_btnRemind" class="btn btn-empty btn-lg hide" style="display: none;"><i></i>开售提醒</a>
                    <span class="vm-service" id="J_panicBuyingWrap"></span>
                </div>
            </div>
            <div class="prod-addition">
                <input type="hidden" id="servertime" value="1606291396819">
            </div>
        </div>
    </section>
        `;
    }

    static setStyle() {
        if (Details.styleBool) return;
        Details.styleBool = true;
        Utils.addCSS(".details", {
            // width: '1240px',
            backgroundColor: '#f6f8fb',

            margin: 'auto',
            display: 'block',
            lineHeight: '1.5',

        });
        Utils.addCSS(".details .top", {
            width: '1240px',
            height: '70px',

            margin: 'auto'


        });

        Utils.addCSS(".details .goodsName", {
            fontSize: '26px',
            lineHeight: '70px',
            height: '70px',
            display: 'block',
            float: 'left'
        });

        Utils.addCSS(".details .top ul", {
            margin: '26px - 15px 0px 0px',
            listStyle: 'none',
            fontWeight: '400',
            float: 'right',
            marginTop: '26px',
        });
        Utils.addCSS(".preview .preview-thumb .current::after", {
            content: ' ',
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '20px',
            background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAMAAADY1yDdAAAAkFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDIYgjAAAAMHRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi+snwlaAAADZklEQVRYw91Z7XKjQAyTzPs/Mtb9sL0fsCGZ6WTvrh2aUIZaWJK9YIiPfvjiuH7033tBPrkK/SAGn0/Vx0h/FYQfM6b3QHw8xvcouoTXPwNyReAabYqtS3i9ARmjDXh8IbwukbVEeQfCKZspE82xPwXh8M0OwDtfQzD1+K9wuFQjdi0Pc0Ggho+I5xj/mmC4zGPYuJRpvmZlGhpoXINwZipBmInxym2jqPRXg7vZbQZhZ8uSqoa0cFeLn7G9+00rkMlAGZisjJhwM4g6UyqwmTMtarpTFNdNK7qCLQ3Cs1SPdFxNnTsKL1zVNRMkM7w1h3FMI6N6QilI0yTMCqSuO4giQRhG7Ud3dX4chZFgLRddjNm4CjkIWkpuvBpssFYSJXgD6mbLUy8glUFEhuVvE55z31ISlsm40IEeQHIjCSu60mX3TJQ0BV0OqbS5g3CGAGmEwUQzNATrJyfb3nDgLjoc8qobDbLcQQjiAA6CsMgHsKm79H4S5eeQQ9AJnMXYGiRUt+CKBtJiF83Ll7aiumRJkkvw2IWn9g1ksJaVHAcMNOKIemQ2Gc71DpQawgm54DiVyvhgME6qh+CIHIw04AiJgKyYnokDCBFOwCWXirnI5wbSukioHhDpAM4Gw2wtpd61waXWZwaQqsOUgyYLrg5GJsjynHuwBCAy0RmMOV0pTK/IAaTqg0bLT5jRUqoLW9lNgnyXO5ThvdRvhImjf0ON2I7aSYNxsWhptJZL50ja4OK+INHAJkXkwnBX0GU3EE+65ELElzdxBG8uHkGilxgNAWI8gkJrq9e1ThAUQWfQFB9hsAUIW8MymtFoZqAZR3eNvWtwl9wFd5fLI5nu4jWI8QiO7KhaIdtSP1djeCgFyVS8MnkFYjAajkqlSiW646LVV4eXSxHd3eHybDB3kGi9jFzCXWYw9nVybpC1FkoO93TXGZRVQ34LYiwQw61DVn8MdyFc9QSSZfIE0k6bb7iz8T6BQBtBttC1U/gtFt5VjN9uK1sa5IZW/+VFa8vyu+1GYsst0a6buy/fpm654d766PDlh6Atj3O7H0y/+Ii9ZViwcezx9QHOllFU/77M1Yah2mI96UO1eaJ2mRBuHg9uGXTuGdluGT5vGqPveiGw5dXGL3oTtOvF2e96z7jttez/9Rb7D04sqq5gGpE+AAAAAElFTkSuQmCC) 50% bottom no-repeat',
        });

        Utils.addCSS(".details .top ul li", {
            float: 'left',

            zIndex: '1',
            borderRight: '1px solid rgb(222, 222, 222)',
        });

        Utils.addCSS(".details .top ul li a", {
            textDecoration: 'none',

            color: 'rgb(51, 51, 51)',
            display: 'block',
            padding: '0px 20px',
            lineHeight: '20px',
            fontSize: '16px',
            transition: 'color 0.3s ease 0s',
        });



        Utils.addCSS(".container ", {
            width: '1240px',
            marginLeft: 'auto',
            marginRight: 'auto',
        });

        Utils.addCSS(".preview", {
            float: 'left',
            width: '560px',
            marginRight: '40px',
        });

        Utils.addCSS(".preview .preview-booth", {
            margin: '8px 0',
            width: '560px',
            height: '560px',
        });

        Utils.addCSS(".preview .preview-booth img", {
            borderStyle: 'none',
            verticalAlign: 'top',
        });

        Utils.addCSS(".preview .preview-thumb", {
            overflow: 'hidden',
            marginTop: '10px',
            marginLeft: '24px',

        });
        Utils.addCSS(".preview .preview-thumb:before", {
            content: "",
            display: 'table',

        });
        Utils.addCSS(".preview .preview-thumb:after", {
            content: "",
            display: 'table',

        });

        Utils.addCSS(".preview .preview-thumb li", {
            position: 'relative',
            display: 'inline-block',
            // *zoom: 1,
            margin: '0 24px',
            overflow: 'hidden',
            height: '102px',
        });

        Utils.addCSS(".preview .preview-thumb a", {
            display: 'block',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
        });

        Utils.addCSS(".preview .preview-thumb img", {
            position: 'relative',
            maxWidth: '80px',
            maxHeight: '80px',
        });

        Utils.addCSS(".preview .preview-thumb .current::after", {
            content: ' ',
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '20px',
            background: 'url(data: image / png; base64, iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAMAAADY1yDdAAAAkFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDIYgjAAAAMHRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi+ snwlaAAADZklEQVRYw91Z7XKjQAyTzPs / Mtb9sL0fsCGZ6WTvrh2aUIZaWJK9YIiPfvjiuH7033tBPrkK / SAGn0 / Vx0h / FYQfM6b3QHw8xvcouoTXPwNyReAabYqtS3i9ARmjDXh8IbwukbVEeQfCKZspE82xPwXh8M0OwDtfQzD1 + K9wuFQjdi0Pc0Ggho + I5xj / mmC4zGPYuJRpvmZlGhpoXINwZipBmInxym2jqPRXg7vZbQZhZ8uSqoa0cFeLn7G9 + 00rkMlAGZisjJhwM4g6UyqwmTMtarpTFNdNK7qCLQ3Cs1SPdFxNnTsKL1zVNRMkM7w1h3FMI6N6QilI0yTMCqSuO4giQRhG7Ud3dX4chZFgLRddjNm4CjkIWkpuvBpssFYSJXgD6mbLUy8glUFEhuVvE55z31ISlsm40IEeQHIjCSu60mX3TJQ0BV0OqbS5g3CGAGmEwUQzNATrJyfb3nDgLjoc8qobDbLcQQjiAA6CsMgHsKm79H4S5eeQQ9AJnMXYGiRUt + CKBtJiF83Ll7aiumRJkkvw2IWn9g1ksJaVHAcMNOKIemQ2Gc71DpQawgm54DiVyvhgME6qh + CIHIw04AiJgKyYnokDCBFOwCWXirnI5wbSukioHhDpAM4Gw2wtpd61waXWZwaQqsOUgyYLrg5GJsjynHuwBCAy0RmMOV0pTK / IAaTqg0bLT5jRUqoLW9lNgnyXO5ThvdRvhImjf0ON2I7aSYNxsWhptJZL50ja4OK + INHAJkXkwnBX0GU3EE + 65ELElzdxBG8uHkGilxgNAWI8gkJrq9e1ThAUQWfQFB9hsAUIW8MymtFoZqAZR3eNvWtwl9wFd5fLI5nu4jWI8QiO7KhaIdtSP1djeCgFyVS8MnkFYjAajkqlSiW646LVV4eXSxHd3eHybDB3kGi9jFzCXWYw9nVybpC1FkoO93TXGZRVQ34LYiwQw61DVn8MdyFc9QSSZfIE0k6bb7iz8T6BQBtBttC1U / gtFt5VjN9uK1sa5IZW / +VFa8vyu + 1GYsst0a6buy / fpm654d766PDlh6Atj3O7H0y / +Ii9ZViwcezx9QHOllFU / 77M1Yah2mI96UO1eaJ2mRBuHg9uGXTuGdluGT5vGqPveiGw5dXGL3oTtOvF2e96z7jttez / 9Rb7D04sqq5gGpE + AAAAAElFTkSuQmCC) 50 % bottom no - repeat',
        });

        Utils.addCSS(".preview .preview-action", {
            padding: '10px 56px 0',
        });

        Utils.addCSS(".preview .preview-action a ", {

            fontSize: '12px',
            display: 'inline-block',
            textAlign: 'center',
            color: '#bfbfbf',
            lineHeight: '1',
        });

        Utils.addCSS(".preview .preview-action a .iconfont", {
            color: '#BFBFBF',
            display: 'block',
            fontSize: '18px',
            marginBottom: '5px',
        });

        Utils.addCSS(".icon-favorite:before ", {
            content: "\E6A0",
        });
        Utils.addCSS(".compare-btn-list", {
            cursor: 'pointer',

            marginLeft: '40px',

        });
        Utils.addCSS(".clearfix", {
            zoom: '1',

        });
        Utils.addCSS(".clearfix:before", {
            content: "",
            display: 'table',

        });
        Utils.addCSS(".clearfix:after", {
            content: "",
            display: 'table',

        });
        Utils.addCSS(".preview .preview-action a .iconfont", {
            color: '#BFBFBF',
            display: 'block',
            fontSize: '18px',
            marginBottom: '5px',
            marginRight: '4px',
        });
        Utils.addCSS(".icon-duibi:before", {
            content: "\E655",
        });
        Utils.addCSS(".property", {
            position: 'relative',
            float: 'left',
            width: '640px',
            fontSize: '12px',
            paddingTop: '25px',
        });
        Utils.addCSS(".property-hd, .property-out .mod-hd", {
            position: 'relative',
            paddingTop: '30px',
            marginBottom: '12px',
        });
        Utils.addCSS(".property-hd h1, .property-out .mod-hd h1", {
            marginBottom: '4px',
            fontSize: '28px',
            lineHeight: '1.2',
            fontWeight: '700',
            color: '#262626',
        });
        Utils.addCSS(".property-hd .mod-info.active, .property-out .mod-hd .mod-info.active", {
            color: '#e22841',
        });
        Utils.addCSS(".property-hd .mod-info, .property-out .mod-hd .mod-info", {
            fontSize: '14px',
        });
        Utils.addCSS(".property-sell", {
            cposition: 'relative',
            background: '#f4f6fa',
            padding: '16px 0 12px',
        });
        Utils.addCSS(".property-sell-price", {
            height: '36px',
            overflow: 'hidden',
            paddingLeft: '10px',
        });

        Utils.addCSS(".property-sell dl", {
            marginLeft: '10px',
            marginTop: '12px',
            lineHeight: '22px',
            fontSize: '14px',
        });
        Utils.addCSS(".property-sell .vm-entry", {
            float: 'left',
            paddingleft: '0',
            lineheight: '22px',
            width: '85px',
            fontsize: '12px',
            color: '#8c8c8c',
        });
        Utils.addCSS(".property-sell .vm-entry span", {
            borderradius: '2px',
            color: '#e02b41',
            display: 'inline-block',
            width: '72px',
            textAlign: 'center',
            fontSize: '14px',
            lineHeight: '1',
            padding: '4px 0',
            background: '#F2EAEF',
        });
        Utils.addCSS(".property-sell-app .mod-app-tip", {
            color: '#595959',
            lineHeight: '22px',
        });
        Utils.addCSS(".property-sell dd", {
            display: 'flex',
            color: '#595959',

        });

        Utils.addCSS(".property-sell dl", {
            marginLeft: '10px',
            marginTop: '12px',
            lineHeight: '22px',
            fontSize: '14px',
        });
        Utils.addCSS(".property-sell-coupon p", {
            overflow: 'hidden',
            cursor: 'pointer',
            verticalAlign: 'middle',
            display: '-ms-flexbox',
            display: 'flex',
        });
        Utils.addCSS(".property-sell-coupon .vm-tag", {
            display: 'inline-block',
            marginRight: '10px',
            color: '#e02b41',
            paddingRight: '15px',
            borderRight: '1px #e02b41 solid',
        });
        Utils.addCSS(".property-sell-coupon .vm-tag:last-child", {
            border: 'none',
            marginRight: '0',
            paddingRight: '5px',
        });

        Utils.addCSS(".property-sell .vm-more", {
            color: '#008cff',
            marginLeft: '10px',
        });
        Utils.addCSS(".property-sell-price .mod-price .vm-money", {
            color: '#e02b41',
            fontSize: '36px',
            fontWeight: '500',
        });
        Utils.addCSS(".property-sell-price .mod-price", {
            marginRight: '8px',
            lineHeight: '36px',
        });
        Utils.addCSS(".property-sell-price .mod-price small", {
            fontSize: '24px',
        });
        Utils.addCSS(".property-service", {
            borderBottom: '1px dashed #dedede',
            padding: '18px 0',
        });
        Utils.addCSS(".property-service .vm-metatit", {
            lineHeight: '18px',
        });
        Utils.addCSS(".property .s-space", {
            padding: '0 6px',
        });
        Utils.addCSS(".property-service .property-service-item .mod-bd", {
            display: 'flex',
        });
        Utils.addCSS(".property-service .property-service-item .mod-bd span", {
            display: 'flex',
            marginRight: '20px',
            color: '#8c8c8c',
            lineHeight: '20px',
        });
        Utils.addCSS(".property-service .property-service-item .mod-bd span i", {
            marginRight: '8px',
            lineHeight: '18px',
            color: '#595959',
        });
        Utils.addCSS(".property .vm-metatit", {
            width: '65px',
            float: 'left',
            marginRight: '8px',
            lineHeight: '42px',
            color: '#595959',
        });

        // Utils.addCSS(".iconfont-detail", {
        //     fontfamily: 'iconfont-detail!important',
        //     fontSize: '16px',
        //     fontStyle: 'normal',

        // });
        // Utils.addCSS(".icon-success:before", {
        //     content: "\E631",

        // });
        Utils.addCSS(".property-service .property-service-suda", {
            paddingTop: '15px',

        });
        Utils.addCSS(".property-service .property-service-suda .vm-metatit", {
            lineHeight: '20px',

        });
        Utils.addCSS(".site-selector", {
            position: 'relative',
            float: 'left',

        });
        Utils.addCSS(".site-selector .text", {
            display: ' inline-block',
            paddingRight: '10px',
            height: '18px',
            minWidth: '96px',
            lineHeight: '18px',
            fontSize: '14px',
            color: '#262626',
            cursor: 'pointer',

        });
        Utils.addCSS(".site-selector .text i", {
            fontSize: '12px',
            paddingLeft: '8px',

        });
        Utils.addCSS(".property-service .property-service-provider", {
            marginTop: '20px',
            marginLeft: '74px',
            color: '#8c8c8c',
            display: '-ms-flexbox',
            display: 'flex',
            lineHeight: '20px',

        });
        Utils.addCSS(".property-service .property-service-provider .vm-kefu", {
            marginLeft: '10px',
            color: '#008cff',
            display: '-ms-flexbox',
            display: 'flex',

        });
        Utils.addCSS(".property-sibling-item::before", {
            display: 'table',
            content: "",

        });
        Utils.addCSS(".package-tab a, .property-huabei-bd a, .property-set-sale a, .property-sibling-item a", {
            position: 'relative',
            float: 'left',
            width: '176px',
            margin: '0 10px 10px 0',
            backgroundColor: '#fff',
            whiteSpace: 'nowrap',
            lineHeight: '40px',
            border: '1px solid #BFBFBF',
            borderRadius: '2px',
            color: '#595959',
            textAlign: 'center',
            textDecoration: 'none',
            fontSize: '14px',
            minHeight: '41px',

        });
        Utils.addCSS("dd, dl, dt, h1, h2, h3, h4, h5, h6, ol, p, ul", {
            margin: '0',
            padding: '0',
            display: 'inline-block',
            listStyle: 'none',
            fontWeight: '400',

        });


        Utils.addCSS(".package-tab a.selected, .property-huabei-bd a.selected, .property-set-sale a.selected, .property-sibling-item a.selected", {
            borderColor: '#000',
            color: '#000',

        });
        Utils.addCSS(".property-set-package dd, .property-set-sale dd, .property-sibling-item dd", {

            width: '565px',
            overflow: 'hidden',

        });
        Utils.addCSS(".property-set-package::after, .property-set-package::before, .property-set-sale::after, .property-set-sale::before, .property-sibling-item::after, .property-sibling-item::before     ", {
            display: 'table',
            content: "",

        });

        Utils.addCSS(".property-set-sale, .property-sibling-item", {
            marginTop: '20px',
            marginBottom: '-10px',

        });
        Utils.addCSS(".property-sibling-item::after, .property-sibling-item::before", {
            display: 'table',
            content: "",

        });
        Utils.addCSS(".property-set-sale .vm-sale-img", {
            position: 'relative',
            height: '40px',
            minWidth: 'inherit',
            lineHeight: '40px',
            width: '176px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        });
        Utils.addCSS(".property-set-sale .vm-sale-img img", {
            marginRight: '5px',

        });
        Utils.addCSS(".property-huabei", {
            position: 'relative',
            marginTop: '20px',

        });
        Utils.addCSS(".property-huabei .property-huabei-bd", {
            float: 'left',
            width: '565px',
            overflow: 'hidden',
            marginBottom: '-10px',
            marginRight: '-20px',

        });
        Utils.addCSS(".property-huabei .property-huabei-bd a", {
            padding: '7px 0',
            cursor: 'pointer',
            width: '176px',


        });
        Utils.addCSS(".property-huabei .property-huabei-bd a>span", {
            display: 'block',
            lineHeight: '18px',
            fontSize: '14px',
            color: '#595959',


        });
        Utils.addCSS(".property-huabei .property-huabei-bd a>span.vm-rate", {
            color: '#8c8c8c',
            fontSize: '12px',
            paddingTop: '3px',


        });
        Utils.addCSS(".property-buy", {
            marginTop: '100px',
        });
        Utils.addCSS(".property-buy-quantity", {
            marginBottom: '45px',
        });
        Utils.addCSS(".property-buy .mod-control, .property-related li", {
            marginRight: '30px',
            float: 'left',
        });
        Utils.addCSS(".property-buy .mod-control", {
            position: 'relative',
            zIndex: '1',
            height: '40px',
            width: '122px',
            overflow: 'hidden',
        });
        Utils.addCSS(".property-buy .mod-control .vm-minus", {
            right: '90px',
        });
        Utils.addCSS(".property-buy .mod-control a", {
            position: 'absolute',
            top: '0',
            right: '0',
            width: '30px',
            height: '38px',
            lineHeight: '38px',
            fontSize: '14px',
            textDecoration: 'none',
            textAlign: 'center',
            border: '1px solid #e7e7e7',
            color: '#000',
            background: '#f7f7f7',
        });
        Utils.addCSS(".property-buy .mod-control input", {
            position: 'absolute',
            top: '0',
            right: '30px',
            width: '60px',
            height: '38px',
            padding: '0',
            lineHeight: '40px',
            fontSize: '12px',
            textAlign: 'center',
            color: '#595959',
            border: '1px solid #dedede',
        });
        Utils.addCSS(".property-buy .mod-control a.disabled", {
            cursor: 'default',
            color: '#e0e0e0',
        });
        Utils.addCSS(".property-buy .mod-control .vm-minus", {
            right: '90px',
        });
        Utils.addCSS(".property-buy .property-buy-action", {
            marginTop: '17px',
            marginLeft: '10px',
        });
        Utils.addCSS(".property-buy .btn", {
            padding: '15px 0',
            width: '208px',
            fontSize: '20px',
            lineHeight: '24px',
        });
        Utils.addCSS(".mr20", {
            marginRight: '20px!important',
        });
        Utils.addCSS(".btn-primary", {
            color: '#fff',
            backgroundColor: ' #008cff',
        });
        Utils.addCSS(".btn ", {
            marginBottom: '0',
            fontWeight: '400',
            verticalAlign: 'middle',
            touchAction: 'manipulation',
            cursor: 'pointer',
            backgroundImage: 'none',
            border: '1px solid transparent',
            whiteSpace: 'nowrap',
            borderRadius: '3px',
            userSelect: 'none',
        });
        Utils.addCSS(".btn, .diff-operate, .match-alert-bd, .tcenter", {
            textAlign: 'center',
        });
        Utils.addCSS(".btn-empty", {
            border: '1px solid #008cff',
        });
        Utils.addCSS("property-sibling-item:before", {
            display: 'table',
            content: "",

        });
    }

}