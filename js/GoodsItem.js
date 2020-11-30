import Component from "./Component.js";
import Utils from "./Utils.js";
export default class GoodsItem extends Component{
    data;
    iconCon;
    img;
    price;
    blackprice;
    prev;
    tagClassList=new Map();
    static styleBool=false;
    constructor(_data){
        super();
        this.data=_data;
        // console.log(this.data);
        this.tagClassList={
            "tag_1":["自营"],
            "tag_2":["包税","券每满400减50","特价","满200减20","豆抵1元"],
        }
        this.elem.className="goodsIcon";
        this.elem.href="./good.html?Id="+this.data.Id;
        this.render();
        GoodsItem.setStyle();
    }
    createElem(){
        if(this.elem) return this.elem;
        let a=document.createElement("a");
        return a;
    }
    appendTo(parent){
        super.appendTo(parent);
        this.iconCon=this.elem.querySelector(".iconList");
        this.iconCon.addEventListener("mouseover",e=>this.mouseHandler(e));
        this.img=this.elem.querySelector(".img");
        this.price=this.elem.querySelector(".price");
        this.blackprice=this.elem.querySelector(".blackprice");
        this.changePrev(this.iconCon.firstElementChild);
    }
 
    mouseHandler(e){
        if(e.target.constructor!==HTMLImageElement)return;
        var url=e.target.src.split("/").pop();
        
        var index=this.data.imgList.reduce((value,item,index)=>{
            if(item.includes(url)) value=index;
            return value;
        },-1);
        this.img.src=this.data.imgList[index];
        this.price.textContent=Number(this.data.priceList[index]).toFixed(2);
        this.blackprice.textContent=Number(this.data.blackpriceList[index]).toFixed(2);
        this.changePrev(e.target);
    }
    changePrev(elem){
        if(this.prev){
            this.prev.style.border="1px solid #ddd";
            this.prev.style.outline="1px solid transparent";
        }
        this.prev=elem;
        this.prev.style.border="1px solid #e4393c";
        this.prev.style.outline="1px solid #e4393c";
    }
    render(){
        this.elem.innerHTML=`
            
            <div class="showImg">
                <img class="img" src='${this.data.imgList[0]} '>
                <div class="hot" style='display:${this.data.hot ? "block" : "none"}'>热销</div>
            </div>
            <div class="iconList">
                ${(function(data){
                  return data.imgList.map(function(item){
                        return `<img src='${item}'>`
                    }).join("");
                })(this.data)}
            </div>
            <div class="priceCon">
                <span class="priceTag">￥</span>
                <span class="price">${Number(this.data.priceList[0]).toFixed(0)}</span>
            </div>
            <div class="blackprice">
                <img src="./img/黑卡价.png">
                <span class="blackpriceTag">￥</span>
                <span class="blackprice">${Number(this.data.blackpriceList[0]).toFixed(0)}</span>
            </div>
            <div class='titleCon'>
                <div class='title'>${this.data.title}</div>
            </div>
            
            <div class="estimate"><img src="./img/评论图标.png">${this.data.estimate>1000000 ? Math.floor(this.data.estimate/10000) : this.data.estimate}<span class="estimateFont"></span><a href="#" style="display:${this.data.secondHand ? "inline-block" :"none"}">韩国</a></div>
            <div class="store"><span>${this.data.store}</span></div>
            <div class="tagCon">
            ${(function(data,tagClassList){
                return data.tag.map(item=>{
                      return `<span class='${(function(){
                         for(var prop in tagClassList){
                             if(tagClassList[prop].indexOf(item.name)>-1) return prop;
                         }
                         return "";
                      })()}'>${item.name}</span>`
                  }).join("");
              })(this.data,this.tagClassList)}
            </div>
            
        `;
    }

    static setStyle(){
        if(GoodsItem.styleBool) return;
        GoodsItem.styleBool=true;
        Utils.addCSS(".goodsIcon",{
            width:'240px',
            height:'456px',
            position:'relative',
            marginTop:'10px',
            float:'left',
            paddingTop:'10px',
            display:'block',
            textDecoration:"none"
        });
        
        //覆盖商品列表时，该商品的边框变红
        Utils.addCSS(".goodsIcon:hover", {
            boxShadow:'0px 0px 3px #FF0000',
        });
        
        Utils.addCSS(".goodsIcon>.showImg", {
        
            marginBottom:'5px',
            height:'220px',
            padding:'0',
            position:'relative',
            overflow:'hidden',
            font:'12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "宋体", sansSerif',
            color:'#666',
          
            left:'10px',
        });
        
        Utils.addCSS(".goodsIcon>.showImg>.img", {
            width:'220px',
            height:'220px',
            margin:'0',
            padding:'0',
        });
        
        Utils.addCSS(".goodsIcon>.showImg>.hot", {
            position:'absolute',
            height:'25px',
            width:'25px',
            padding:'0 10px',
            color:'#fff',
            background:'rgba(255, 0, 0, 0.6)',
            transition:'all .5s ease',
            top:'10px',
            right:'25px',
            lineHeight:'25px',
        });
        
        Utils.addCSS(".goodsIcon>.iconList", {
            position:'relative',
            marginBottom:'10px',
            marginLeft:'5px',
            width:'100%',
            marginTop:'5px',
        });
        
        Utils.addCSS(".goodsIcon>.iconList>img", {
            width:'25px',
            height:'25px',
            verticalAlign:'middle',
            border:'1px solid #ddd',
            outline:'1px solid transparent',
            marginLeft:'5px',
        });
        
        // 价格
        Utils.addCSS(".goodsIcon>.priceCon", {
            position:'relative',
            width:'100%',
            color:'#e4393c',
            fontSize:'0',
            paddingLeft:'10px',
        });
        
        Utils.addCSS(".goodsIcon>.priceCon>.priceTag", {
            fontSize:'16px',
            fontWeight:'400',
            fontFamily:'Verdana',
            lineHeight:'22px',
        });
        
        Utils.addCSS(".goodsIcon>.priceCon>.price", {
            fontSize:'20px',
            fontWeight:'400',
            fontFamily:'Verdana',
            lineHeight:'22px',
        });

        // 黑卡价
        Utils.addCSS(".goodsIcon>.blackprice", {
            position:'relative',
            width:'100%',
            color:'#e4393c',
            fontSize:'0',
            paddingLeft:'10px',
        });

        Utils.addCSS(".goodsIcon>.blackprice>img", {
            float: 'left',
            height: '21px',
            width: '71.5px',
        })
        
        Utils.addCSS(".goodsIcon>.blackprice>.blackpriceTag", {
            fontSize:'17px',
            color:'#151515',
            fontWeight:'400',
            fontFamily:'PingFangSC-Medium',
            lineHeight:'22px',
            background:'linear-gradient(90deg,#ffe7c5,#ffdeb0);',
            borderRadius: '0 4px 4px 0',
            paddingLeft:' 3px',
            paddingRight:' 14px',
            marginLeft: '-18px',
        });
        
        Utils.addCSS(".goodsIcon>.blackprice>.blackprice", {
            fontSize:'17px',
            color:'#151515',
            lineHeight:'22px',
            height:'22px',
            fontFamily:'PingFangSC-Medium',
            background:'linear-gradient(90deg,#ffe7c5,#ffdeb0);',
            borderRadius: '0 4px 4px 0',
            paddingLeft:' 3px',
            paddingRight:' 10px',
            marginLeft: '-18px',
        });
        
        Utils.addCSS(".goodsIcon>.titleCon", {
            position:'relative',
            width:'95%',
            font:'12px tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "宋体", sansSerif',
            color:'black',
            height:'20px',
            overflow:'hidden',
            paddingLeft:'5px',
            marginTop:'5px',
            marginLeft:'7px'
        });
        
        // Utils.addCSS(".goodsIcon>.titleCon .jpstyle", {
        //     width:'50px',
        //     height:'16px',
        //     padding:'0 3px',
        //     marginTop:'2px',
        //     marginRight:'3px',
        //     overflow:'hidden',
        //     color:'#fff',
        //     font:'12px/16px "Helvetica Neue", "Hiragino Sans GB", SimSun, serif',
        //     background:'#838dc7',
        //     borderRadius:'2px',
        //     backgroundColor:'#c81623',
        //     display:'inlineBlock',
        //     position:'relative',
        //     top: '4px',
        // });
        
        Utils.addCSS(".goodsIcon>.titleCon>.title", {
            height:'30px',
            lineHeight:'20px',
            overflow:'hidden',
            whiteSpace:'nowrap',
            textOverflow:'ellipsis',
        });
        
        Utils.addCSS(".goodsIcon>.titleCon>.title:hover", {
            color: '#c81623',
            whiteSpace:'pre-wrap',
        });
        
        Utils.addCSS(".goodsIcon>.infoTagCon", {
            paddingLeft:'5px',
            height:'20px',
        });
        
        Utils.addCSS(".goodsIcon>.infoTagCon>span", {
            float:'left',
            height:'19px',
            lineHeight:'19px',
            padding:'0 4px',
            marginRight:'7px',
            background:'#f4f4f4',
            font:'12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "宋体", sansSerif',
            color:'#666',
        });
        
        Utils.addCSS(".goodsIcon>.infoTagCon>span:hover", {
            color:'#c81623',
        });
        
        Utils.addCSS(".goodsIcon>.estimate>.estimateFont", {
        
            font:'12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "宋体", sansSerif',
            color:'#666',
        });
        
        Utils.addCSS(".goodsIcon>.estimate", {
            marginTop:'10px',
            paddingLeft:'8px',
            height:'20px',
            color:'#333',
            fontFamily:'verdana',
            font:'12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "宋体", sansSerif',
            fontWeight:'700',
        });
        
        Utils.addCSS(".goodsIcon>.estimate>a", {
            float:'right',
            font:'12px/18px "Helvetica Neue", "Hiragino Sans GB", SimSun, serif',
            color:'#999',
            textDecoration:'none',
            marginRight:'10px',
        });
        Utils.addCSS(".goodsIcon>.store",{
            width:'160px',
            marginTop:'10px',
            marginLeft:'10px',
        });
        Utils.addCSS(".goodsIcon>.store>span",{
            color:'#999',
            display:'inlineBlock',
            maxWidth:'122px',
            overflow:'hidden',
            textOverflow:'ellipsis',
            whiteSpace:'nowrap',
            lineHeight:'18px',
            marginRight:'10px',
            font:'12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"宋体",sansSerif',
        });
        Utils.addCSS(".goodsIcon>.tagCon",{
            marginLeft:'10px',
            marginTop:'10px',
        });
        Utils.addCSS(".tag_1",{
            float:'left',
            height:'16px',
            lineHeight:'14px',
            padding:'0 3px',
            marginRight:'3px',
            overflow:'hidden',
            textAlign:'center',
            fontStyle:'normal',
            fontSize:'12px',
            fontFamily:'"Helvetica Neue","Hiragino Sans GB",SimSun,serif',
            background:'#fff',
            color:'#e31436',
            border:'1px solid #e31436',
            cursor:'default',
            borderRadius:'2px',
        });
        Utils.addCSS(".tag_2",{
            display:'inline-block',
            color:'#ffffff',
            background:'#e31436',
            float:'left',
            height:'16px',
            lineHeight:'14px',
            padding:'0 3px',
            marginRight:'4px',
            overflow:'hidden',
            textAlign:'center',
            verticalAlign:'middle',
            fontStyle:'normal',
            fontSize:'12px',
            fontFamily:'"Helvetica Neue","Hiragino Sans GB",SimSun,serif',
            borderRadius:'2px',
        });
    }
}