var c=(e,r,t)=>new Promise((n,o)=>{var i=a=>{try{s(t.next(a))}catch(p){o(p)}},f=a=>{try{s(t.throw(a))}catch(p){o(p)}},s=a=>a.done?n(a.value):Promise.resolve(a.value).then(i,f);s((t=t.apply(e,r)).next())});import{i as d,a as u,p as l,q as m,a2 as w,a3 as h,a7 as M,s as _,Y as y}from"./entry-index-a3b6a048.js";import{u as g}from"./chunk-useScript-6c93a8e1.js";const v="https://webapi.amap.com/maps?v=2.0&key=07514e3056309411f3b248824dd0b9ff",A=u({name:"AMap",props:{width:{type:String,default:"100%"},height:{type:String,default:"calc(100vh - 78px)"}},setup(){const e=l(null),{toPromise:r}=g({src:v});function t(){return c(this,null,function*(){yield r(),yield _();const n=y(e);if(!n)return;const o=window.AMap;new o.Map(n,{zoom:11,center:[116.397428,39.90923],viewMode:"3D"})})}return m(()=>{t()}),{wrapRef:e}}});function k(e,r,t,n,o,i){return w(),h("div",{ref:"wrapRef",style:M({height:e.height,width:e.width})},null,4)}var x=d(A,[["render",k]]);export{x as default};
