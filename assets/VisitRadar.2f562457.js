import{m as r,w as i,x as u,al as s,am as n,ax as d,ao as l,ap as m,ar as c}from"./index.a7e7c866.js";import{C as p}from"./index.a29215e5.js";import"./index.23b7107e.js";import"./index.45665d3c.js";import{u as f}from"./useEcharts.3c20c75b.js";import"./index.a60345e3.js";import"./DownOutlined.5adce40a.js";import"./responsiveObserve.e9679a6a.js";import"./useTimeout.c8cd5466.js";const h={name:"VisitRadar",components:{Card:p},props:{loading:Boolean,width:{type:String,default:"100%"},height:{type:String,default:"300px"}},setup(a){const e=i(null);return u(()=>a.loading,()=>{const{setOptions:t}=f(e);a.loading||t({legend:{bottom:0,data:["\u8BBF\u95EE","\u8D2D\u4E70"]},tooltip:{},radar:{radius:"60%",splitNumber:8,indicator:[{text:"\u7535\u8111",max:100},{text:"\u5145\u7535\u5668",max:100},{text:"\u8033\u673A",max:100},{text:"\u624B\u673A",max:100},{text:"Ipad",max:100},{text:"\u8033\u673A",max:100}]},series:[{type:"radar",symbolSize:0,areaStyle:{shadowBlur:0,shadowColor:"rgba(0,0,0,.2)",shadowOffsetX:0,shadowOffsetY:10,opacity:1},data:[{value:[90,50,86,40,50,20],name:"\u8BBF\u95EE",itemStyle:{color:"#b6a2de"}},{value:[70,75,70,76,20,85],name:"\u8D2D\u4E70",itemStyle:{color:"#5ab1ef"}}]}]})},{immediate:!0}),{chartRef:e}}};function x(a,e,t,g,_,w){const o=s("Card");return n(),d(o,{title:"\u8F6C\u5316\u7387",loading:t.loading},{default:l(()=>[m("div",{ref:"chartRef",style:c({width:t.width,height:t.height})},null,4)]),_:1},8,["loading"])}var A=r(h,[["render",x]]);export{A as default};
