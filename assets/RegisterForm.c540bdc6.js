var S=(t,e,o)=>new Promise((a,r)=>{var i=n=>{try{s(o.next(n))}catch(m){r(m)}},u=n=>{try{s(o.throw(n))}catch(m){r(m)}},s=n=>n.done?a(n.value):Promise.resolve(n.value).then(i,u);s((o=o.apply(t,e)).next())});import{w as d,ah as f,af as z,b as C,B as $,n as F,aX as D,m as v,be as L,al as p,am as I,ax as b,ao as c,b0 as g,a$ as _,bi as w,ak as T,c as l,f as E,an as N,av as A,ay as R}from"./index.a7e7c866.js";import{L as P,u as V,a as G}from"./LoginFormTitle.6fdddb38.js";import{I as B,F as h}from"./index.d570a7d1.js";import"./index.45665d3c.js";import"./antInputDirective.dcf4b893.js";import"./omit.cbb318d7.js";import"./_defineProperty.209d9d21.js";import"./_toKey.3706adb2.js";import"./_setToString.730a8d21.js";import"./_baseIteratee.d245e1b1.js";import"./get.aa8cf04d.js";import"./useSize.eaf7ad29.js";import"./intersection.1fdc2b7a.js";import"./responsiveObserve.e9679a6a.js";function O(t){const e=d(t),o=d(!1);let a;function r(){a&&window.clearInterval(a)}function i(){o.value=!1,r(),a=null}function u(){f(o)||!!a||(o.value=!0,a=setInterval(()=>{f(e)===1?(i(),e.value=t):e.value-=1},1e3))}function s(){e.value=t,i()}function n(){s(),u()}return z(()=>s()),{start:u,reset:s,restart:n,clear:r,stop:i,currentCount:e,isStart:o}}const U=C({name:"CountButton",components:{Button:$},inheritAttrs:!1,props:{value:null,count:{type:Number,default:60},beforeStartFunc:{type:Function,default:null}},setup(t){const e=d(!1),{t:o}=F(),{currentCount:a,isStart:r,start:i,reset:u}=O(t.count);D(()=>t.value===void 0&&u());function s(){return S(this,null,function*(){const{beforeStartFunc:n}=t;if(n&&L(n)){e.value=!0;try{(yield n())&&i()}finally{e.value=!1}}else i()})}return{t:o,loading:e,handleStart:s,currentCount:a,isStart:r}}});function X(t,e,o,a,r,i){const u=p("Button");return I(),b(u,w(t.$attrs,{disable:t.isStart,loading:t.loading,onClick:t.handleStart}),{default:c(()=>[g(_(t.isStart?t.t("component.countDown.sendText",[t.currentCount]):t.t("component.countDown.normalText")),1)]),_:1},16,["disable","loading","onClick"])}var j=v(U,[["render",X]]);const q=C({name:"CountDownInput",components:{CountButton:j,Input:B},props:{value:String,size:{type:String,default:"default"},count:{type:Number,default:60},sendCodeApi:{type:Function,default:null}},setup(t){const{getPrefixCls:e}=T();return{prefixCls:e("countdown-input")}}});function x(t,e,o,a,r,i){const u=p("CountButton"),s=p("Input");return I(),b(s,w(t.$attrs,{class:t.prefixCls,size:t.size}),{addonAfter:c(()=>[l(u,{size:t.size,count:t.count,"before-start-func":t.sendCodeApi},null,8,["size","count","before-start-func"])]),_:1},16,["class","size"])}var H=v(q,[["render",x]]);const J=C({name:"RegisterForm",components:{CountDownInput:H,LoginFormTitle:P,Form:h,FormItem:h.Item,Button:$,Input:B},setup(){const t=d(!1),{t:e}=F(),{handleBackLogin:o,getLoginState:a}=V(),r=E(()=>f(a)===G.REGISTER);return{loading:t,getShow:r,handleBackLogin:o,t:e}}});function K(t,e,o,a,r,i){const u=p("LoginFormTitle"),s=p("Input"),n=p("FormItem"),m=p("CountDownInput"),y=p("Button"),k=p("Form");return t.getShow?(I(),N(A,{key:0},[l(u,{class:"enter-x"}),l(k,{class:"p-4 enter-x"},{default:c(()=>[l(n,{name:"account",class:"enter-x"},{default:c(()=>[l(s,{placeholder:t.t("sys.login.username"),size:"large"},null,8,["placeholder"])]),_:1}),l(n,{name:"mobile",class:"enter-x"},{default:c(()=>[l(s,{placeholder:t.t("sys.login.mobile"),size:"large"},null,8,["placeholder"])]),_:1}),l(n,{name:"sms",class:"enter-x"},{default:c(()=>[l(m,{size:"large",placeholder:t.t("sys.login.smsCode")},null,8,["placeholder"])]),_:1}),l(n,{class:"enter-x"},{default:c(()=>[l(y,{block:"",loading:t.loading,type:"primary",size:"large"},{default:c(()=>[g(_(t.t("common.resetText")),1)]),_:1},8,["loading"]),l(y,{block:"",size:"large",class:"mt-4",onClick:t.handleBackLogin},{default:c(()=>[g(_(t.t("sys.login.backSignIn")),1)]),_:1},8,["onClick"])]),_:1})]),_:1})],64)):R("v-if",!0)}var ct=v(J,[["render",K]]);export{ct as default};
