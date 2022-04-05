var d=Object.defineProperty,m=Object.defineProperties;var c=Object.getOwnPropertyDescriptors;var e=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var s=(r,t,o)=>t in r?d(r,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[t]=o,i=(r,t)=>{for(var o in t||(t={}))E.call(t,o)&&s(r,o,t[o]);if(e)for(var o of e(t))h.call(t,o)&&s(r,o,t[o]);return r},n=(r,t)=>m(r,c(t));import{cd as I,ce as l,cf as p}from"./entry-index-204be9fe.js";import{a as C}from"./chunk-exceptionEnum-a4d2a0e3.js";const x=I({id:"error-log",state:()=>({errorLogInfoList:null,errorLogListCount:0}),getters:{getErrorLogInfoList(){return this.errorLogInfoList||[]},getErrorLogListCount(){return this.errorLogListCount}},actions:{addErrorLogInfo(r){const t=n(i({},r),{time:l(new Date)});this.errorLogInfoList=[t,...this.errorLogInfoList||[]],this.errorLogListCount++},setErrorLogListCount(r){this.errorLogListCount=r},addAjaxErrorInfo(r){const{useErrorHandle:t}=p;if(!t)return;const o={message:r.message,type:C.AJAX};if(r.response){const{config:{url:a="",data:g="",method:L="get",headers:f={}}={},data:u={}}=r.response;o.url=a,o.name="Ajax Error",o.file="-",o.stack=JSON.stringify(u),o.detail=JSON.stringify({params:g,method:L,headers:f})}this.addErrorLogInfo(o)}}});export{x as u};
