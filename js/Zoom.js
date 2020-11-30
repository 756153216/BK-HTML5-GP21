import Component from "./Component.js";
import Utils from "./Utils.js";
export default class Zoom extends Component{
    static styleBool=false;
    data;
    mask;
    showImg;
    bigImg;
    imgCon;
    left;
    right;
    pre;
    maskWidth=0;
    maskHeight=0;
    imgConWidth=0;
    static SHOW_IMG_WIDTH=400;
    static SHOW_IMG_HEIGHT=400;
    static SHOW_IMG_BORDER=1;
    static BIG_IMG_WIDTH=400;
    static BIG_IMG_HEIGHT=400;
    static ICON_HEIGHT=66;
    static ICON_BORDER=2;
    static LIST_BN_WIDTH=22;
    static ICON_MARGIN=2;
    
    constructor(_data){
        super();
        this.data=_data;
        this.render();
        if(!Zoom.styleBool){
            Zoom.styleBool=true;
            Zoom.setStyle();
        }
      
    }
    appendTo(parent){
        super.appendTo(parent);
        this.setDataStyle();
    }

    setData(){
        this.render();
        this.setDataStyle();
    }

    createElem() {

        if (this.elem) return this.elem;
        let a = document.createElement("a");
        return a;
    }

    setDataStyle(){
        if(!this.elem.parentElement) return;
        this.mask=document.querySelector("#mask");
        this.showImg=document.querySelector("#showImg");
        this.bigImg=document.querySelector("#bigImg");
        this.imgCon=document.querySelector("#imgCon");
        this.left=document.querySelector("#left");
        this.right=document.querySelector("#right");
        this.showImg.style.backgroundImage=`url(${this.data[0].src})`;
        this.bigImg.style.backgroundImage=`url(${this.data[0].src})`;
        this.imgConWidth=(Zoom.ICON_HEIGHT+Zoom.ICON_BORDER*2+Zoom.ICON_MARGIN*2)*this.data.length
        this.imgCon.style.width=this.imgConWidth+"px";
        this.loadImg(this.data[0].src);
        this.showImg.addEventListener("mouseenter",e=>this.mouseHandler(e));
        this.showImg.addEventListener("mouseleave",e=>this.mouseHandler(e));
        this.imgCon.addEventListener("mouseover",e=>this.imgConMouseHandler(e));
        this.left.addEventListener("click",e=>this.clickHandler(e));
        this.right.addEventListener("click",e=>this.clickHandler(e));
    }
    loadImg(src){
        var img=new Image();
        img.src=this.data[0].src;
        img.addEventListener("load",e=>this.loadHandler(e));
    }

    loadHandler(e){
        var img=e.currentTarget;
        this.maskWidth=Zoom.BIG_IMG_WIDTH/img.width*Zoom.SHOW_IMG_WIDTH;
        this.maskHeight=Zoom.BIG_IMG_HEIGHT/img.height*Zoom.SHOW_IMG_HEIGHT;
        Object.assign(this.mask.style,{
            width:this.maskWidth+"px",
            height:this.maskHeight+"px",
        });
    }

    mouseHandler(e){
        if(e.type==="mouseenter"){
            this.mask.style.display="block";
            this.bigImg.style.display="block";
            this.showImg.addEventListener("mousemove",e=>this.mouseHandler(e));
        }else if(e.type==="mousemove"){
            this.maskMove(e);
        }else{
            this.mask.style.display="none";
            this.bigImg.style.display="none";
        }
    }

    maskMove(e){
        var rect=this.showImg.getBoundingClientRect();
        var x=e.clientX-rect.x-this.maskWidth/2;
        var y=e.clientY-rect.y-this.maskHeight/2;
        if(x<0) x=0;
        if(x>rect.width-Zoom.SHOW_IMG_BORDER*2-this.maskWidth) x=rect.width-Zoom.SHOW_IMG_BORDER*2-this.maskWidth;
        if(y<0) y=0;
        if(y>rect.height-Zoom.SHOW_IMG_BORDER*2-this.maskHeight) y=rect.height-Zoom.SHOW_IMG_BORDER*2-this.maskHeight;
        this.mask.style.left=x+"px";
        this.mask.style.top=y+"px";
        this.bigImgMove(x,y)
    }
    bigImgMove(x,y){
        this.bigImg.style.backgroundPositionX=-x*(Zoom.BIG_IMG_WIDTH/this.maskWidth)+"px";
        this.bigImg.style.backgroundPositionY=-y*(Zoom.BIG_IMG_HEIGHT/this.maskHeight)+"px";
   }

   imgConMouseHandler(e){
    if(e.target.constructor!==HTMLImageElement)return;
    if(this.pre){
        this.pre.style.border="2px solid #e53e4100";
    }
    this.pre=e.target;
    this.pre.style.border="2px solid #e53e41";
    let url=e.target.src.split("/").pop();
    var src=this.data.reduce((value,item)=>{
        if(item.icon.indexOf(url)>-1) value=item.src;
        return value;
    },"");
    this.loadImg(src);
    this.showImg.style.backgroundImage=this.bigImg.style.backgroundImage="url("+src+")";
   }

   clickHandler(e){
    if(e.currentTarget===this.left){
        this.imgCon.style.left="0px";
    }else{
        this.imgCon.style.left=-(this.imgConWidth-(Zoom.SHOW_IMG_WIDTH+2-Zoom.LIST_BN_WIDTH*2))+"px";
    }
   }

    render(){
        this.elem.innerHTML=`
        
        <div id="zoomImg">
        <div id="showImg">
            <div id="mask"></div>
        </div>
        <div id="bigImg"></div>
        <div id="imgList">
            <img src="./img/img/disabled-prev.png" id="left">
            <div id="crousel">
                <div id="imgCon">
                  ${(function(data){
                    return data.reduce((value,item)=>{
                        value+=`<img src='${item.icon}'>`;
                        return value;
                    },"");
                    })(this.data)}
                </div>
            </div>
            <img src="./img/img/disabled-prev.png" id="right">
        </div>
    </div>
        `;
    }
    
    static setStyle(){
        Utils.addCSS("#zoomImg",{
            position:'relative',
             
        });
        Utils.addCSS("#showImg",{
            position:'absolute',
            width:Zoom.SHOW_IMG_WIDTH+'px',
            height:Zoom.SHOW_IMG_HEIGHT+'px',
            border:Zoom.SHOW_IMG_BORDER+'px solid #CCCCCC',
            // backgroundImage:'url(./img/a.jpg)',
            backgroundSize:'100% 100%',  
        });
        Utils.addCSS("#mask",{
            position:'absolute',
            backgroundColor:'rgba(196, 147, 3, 0.4)',
            display:'none',
        });
        Utils.addCSS("#bigImg",{
            width:Zoom.BIG_IMG_WIDTH+'px',
            height:Zoom.BIG_IMG_HEIGHT+'px',
            // backgroundImage:'url(./img/a.jpg)',
            position:'absolute',
            left:Zoom.SHOW_IMG_WIDTH+30+'px',
            display:'none',
        });
        Utils.addCSS("#imgList",{
            position:'absolute',
            top:Zoom.SHOW_IMG_HEIGHT+10+'px',
            left:'0px',
            width:Zoom.SHOW_IMG_WIDTH+2+'px',
            height:Zoom.ICON_BORDER*2+Zoom.ICON_HEIGHT+'px',
        });
        Utils.addCSS("#imgList>*",{
            float:"left"
        });
        Utils.addCSS("#left,#right",{
            position:'absolute',
             top:'0',
             bottom:'0',
             margin:'auto',
        });
        Utils.addCSS("#right",{
            right:0,
            transform: "scale(-1,1)",
        });
        Utils.addCSS("#crousel",{
            position:'absolute',
            width:Zoom.SHOW_IMG_WIDTH+2-Zoom.LIST_BN_WIDTH*2+'px',
            height:Zoom.ICON_BORDER*2+Zoom.ICON_HEIGHT+'px',
            left:Zoom.LIST_BN_WIDTH+'px',
            overflow:'hidden',
        });
        Utils.addCSS("#imgCon",{
            position:'absolute',
            // width:(Zoom.ICON_HEIGHT+Zoom.ICON_BORDER*2+Zoom.ICON_MARGIN*2)*+'px',
            height:Zoom.ICON_BORDER*2+Zoom.ICON_HEIGHT+'px',
            left:'0px',
            fontSize:'0',
        });
        Utils.addCSS("#imgCon>img",{
            margin:`0 ${Zoom.ICON_MARGIN}px`,
            border:'2px solid #e53e4100',
            width:Zoom.ICON_HEIGHT+'px',
        });
    }
}