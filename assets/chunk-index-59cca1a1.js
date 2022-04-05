import{ch as w,Z as x,c as g,A as V,S as H,P as h,a as S,u as I,p as L,r as F,w as M,K as A,J as j,dA as R,e1 as N,a0 as U,_ as D,f as C,G as z,H as W,I as X,y as E,T as q,e2 as G,i as J,e3 as Y,aa as Z,ab as Q,am as K,an as ee}from"./entry-index-204be9fe.js";function te(e){var t,n=function(l){return function(){t=null,e.apply(void 0,x(l))}},r=function(){if(t==null){for(var l=arguments.length,i=new Array(l),o=0;o<l;o++)i[o]=arguments[o];t=w(n(i))}};return r.cancel=function(){return w.cancel(t)},r}function k(e){return e!=null&&e===e.window}function $(e,t){var n;if(typeof window=="undefined")return 0;var r=t?"scrollTop":"scrollLeft",a=0;return k(e)?a=e[t?"pageYOffset":"pageXOffset"]:e instanceof Document?a=e.documentElement[r]:e&&(a=e[r]),e&&!k(e)&&typeof a!="number"&&(a=(n=(e.ownerDocument||e).documentElement)===null||n===void 0?void 0:n[r]),a}function ne(e,t,n,r){var a=n-t;return e/=r/2,e<1?a/2*e*e*e+t:a/2*((e-=2)*e*e+2)+t}function ae(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.getContainer,r=n===void 0?function(){return window}:n,a=t.callback,l=t.duration,i=l===void 0?450:l,o=r(),O=$(o,!0),p=Date.now(),f=function b(){var y=Date.now(),v=y-p,d=ne(v>i?i:v,O,e,i);k(o)?o.scrollTo(window.pageXOffset,d):o instanceof HTMLDocument||o.constructor.name==="HTMLDocument"?o.documentElement.scrollTop=d:o.scrollTop=d,v<i?w(b):typeof a=="function"&&a()};w(f)}var re={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"}}]},name:"vertical-align-top",theme:"outlined"},oe=re;function P(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?Object(arguments[t]):{},r=Object.keys(n);typeof Object.getOwnPropertySymbols=="function"&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(a){return Object.getOwnPropertyDescriptor(n,a).enumerable}))),r.forEach(function(a){ie(e,a,n[a])})}return e}function ie(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var B=function(t,n){var r=P({},t,n.attrs);return g(V,P({},r,{icon:oe}),null)};B.displayName="VerticalAlignTopOutlined";B.inheritAttrs=!1;var ce=B,le={visibilityHeight:h.number.def(400),duration:h.number.def(450),target:Function,prefixCls:h.string,onClick:h.func},ue=S({name:"ABackTop",inheritAttrs:!1,props:le,emits:["click"],setup:function(t,n){var r=n.slots,a=n.attrs,l=n.emit,i=I("back-top",t),o=i.prefixCls,O=i.direction,p=L(),f=F({visible:!1,scrollEvent:null}),b=function(){return p.value&&p.value.ownerDocument?p.value.ownerDocument:window},y=function(u){var s=t.target,m=s===void 0?b:s,T=t.duration;ae(0,{getContainer:m,duration:T}),l("click",u)},v=te(function(c){var u=t.visibilityHeight,s=$(c.target,!0);f.visible=s>u}),d=function(){var u=t.target,s=u||b,m=s();f.scrollEvent=G(m,"scroll",function(T){v(T)}),v({target:m})},_=function(){f.scrollEvent&&f.scrollEvent.remove(),v.cancel()};return M(function(){return t.target},function(){_(),A(function(){d()})}),j(function(){A(function(){d()})}),R(function(){A(function(){d()})}),N(function(){_()}),U(function(){_()}),function(){var c,u,s=g("div",{class:"".concat(o.value,"-content")},[g("div",{class:"".concat(o.value,"-icon")},[g(ce,null,null)])]),m=D(D({},a),{onClick:y,class:(c={},C(c,"".concat(o.value),!0),C(c,"".concat(a.class),a.class),C(c,"".concat(o.value,"-rtl"),O.value==="rtl"),c)}),T=z("fade");return g(q,T,{default:function(){return[W(g("div",E(E({},m),{},{ref:p}),[((u=r.default)===null||u===void 0?void 0:u.call(r))||s]),[[X,f.visible]])]}})}}}),se=H(ue);const fe=S({name:"LayoutFeatures",components:{BackTop:se},setup(){return{getUseOpenBackTop:Y,getTarget:()=>document.body}}});function ve(e,t,n,r,a,l){const i=Z("BackTop");return e.getUseOpenBackTop?(Q(),K(i,{key:0,target:e.getTarget},null,8,["target"])):ee("v-if",!0)}var me=J(fe,[["render",ve]]);export{me as default};
