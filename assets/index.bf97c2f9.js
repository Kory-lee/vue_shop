import{d as s,_ as u,u as o,ag as p}from"./vendor.4f112e74.js";var d=s({name:"Redirect",setup(){const{currentRoute:r,replace:a}=u(),{params:{path:e},query:t}=o(r),n=Array.isArray(e)?e.join("/"):e;return a({path:"/"+n,query:t}),()=>p("div")}});export{d as default};
