import{bw as r,r as i,w as u,f as s,o as n,g as d,l,b as m,j as c}from"./vendor.4f112e74.js";/* empty css               *//* empty css              *//* empty css               */import{u as f}from"./useEcharts.ad276e7d.js";import{_ as p}from"./index.a8042b0d.js";import"./useTimeout.8a613425.js";const h={name:"VisitRadar",components:{Card:r},props:{loading:Boolean,width:{type:String,default:"100%"},height:{type:String,default:"300px"}},setup(a){const e=i(null);return u(()=>a.loading,()=>{const{setOptions:t}=f(e);a.loading||t({legend:{bottom:0,data:["\u8BBF\u95EE","\u8D2D\u4E70"]},tooltip:{},radar:{radius:"60%",splitNumber:8,indicator:[{text:"\u7535\u8111",max:100},{text:"\u5145\u7535\u5668",max:100},{text:"\u8033\u673A",max:100},{text:"\u624B\u673A",max:100},{text:"Ipad",max:100},{text:"\u8033\u673A",max:100}]},series:[{type:"radar",symbolSize:0,areaStyle:{shadowBlur:0,shadowColor:"rgba(0,0,0,.2)",shadowOffsetX:0,shadowOffsetY:10,opacity:1},data:[{value:[90,50,86,40,50,20],name:"\u8BBF\u95EE",itemStyle:{color:"#b6a2de"}},{value:[70,75,70,76,20,85],name:"\u8D2D\u4E70",itemStyle:{color:"#5ab1ef"}}]}]})},{immediate:!0}),{chartRef:e}}};function x(a,e,t,g,_,w){const o=s("Card");return n(),d(o,{title:"\u8F6C\u5316\u7387",loading:t.loading},{default:l(()=>[m("div",{ref:"chartRef",style:c({width:t.width,height:t.height})},null,4)]),_:1},8,["loading"])}var D=p(h,[["render",x]]);export{D as default};
