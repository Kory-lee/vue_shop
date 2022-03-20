var X=Object.defineProperty,Y=Object.defineProperties;var Z=Object.getOwnPropertyDescriptors;var W=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable;var z=(e,t,o)=>t in e?X(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,b=(e,t)=>{for(var o in t||(t={}))E.call(t,o)&&z(e,o,t[o]);if(W)for(var o of W(t))ee.call(t,o)&&z(e,o,t[o]);return e},k=(e,t)=>Y(e,Z(t));import{e as te,n as O,bx as oe,d as V,o as h,a as w,b as j,y as a,h as m,j as I,by as ne,r as R,c as v,aR as ae,u as f,w as re,f as M,g as q,aS as se,s as ie,l as _,m as le,v as D,t as de,aT as ge,F as ue,aF as fe,x as ce}from"./vendor.19bf757c.js";import{u as pe}from"./index.e5565781.js";/* empty css               */import{c as L,a3 as he,_ as G}from"./index.9b7e9a93.js";function me(e){let t;te(()=>{e(),O(()=>{t=!0})}),oe(()=>{t&&e()})}const ve=V({name:"PageFooter",inheritAttrs:!1,setup(){const{getPrefixCls:e}=L();return{prefixCls:e("page-footer"),getCalcContentWidth:he}}});function Ce(e,t,o,F,s,C){return h(),w("div",{class:m(e.prefixCls),style:I({width:e.getCalcContentWidth})},[j("div",{class:m(`${e.prefixCls}__left`)},[a(e.$slots,"left",{},void 0,!0)],2),a(e.$slots,"default",{},void 0,!0),j("div",{class:m(`${e.prefixCls}__right`)},[a(e.$slots,"right",{},void 0,!0)],2)],6)}var $e=G(ve,[["render",Ce],["__scopeId","data-v-404193f3"]]);const ye=V({name:"PageWrapper",components:{PageHeader:ne,PageFooter:$e},inheritAttrs:!1,props:{title:{type:String,default:""},dense:Boolean,ghost:Boolean,content:{type:String,default:""},contentStyle:{type:Object,default:()=>({})},contentBackground:Boolean,contentFullHeight:Boolean,contentClass:{type:String,default:""},fixedHeight:Boolean},setup(e,{slots:t}){const o=R(null),F=R(null),s=R(0),{getPrefixCls:C}=L(),i=C("page-wrapper"),{contentHeight:l,setPageHeight:d,pageHeight:c}=pe(),P=v(()=>[i,{[`${i}-dense`]:e.dense}]),T=v(()=>(t==null?void 0:t.leftFooter)||(t==null?void 0:t.rightFooter)),J=v(()=>Object.keys(ae(t,"default","leftFooter","rightFooter","headerContent"))),K=v(()=>{const{contentBackground:r,contentClass:n}=e;return[`${i}-content`,n,{[`${i}-content-bg`]:r}]}),Q=v(()=>{const{contentFullHeight:r,contentStyle:n,fixedHeight:g}=e;if(!r)return n;const p=`${f(c)}px`;return k(b(k(b({},n),{minHeight:p}),g?{height:p}:{}),{paddingBottom:`${f(s)}px`})});re(()=>[l==null?void 0:l.value,T.value],()=>{x()},{flush:"post",immediate:!0}),me(()=>{O(()=>x())});function x(){var A,N;if(!e.contentFullHeight)return;const r=f(F),n=f(o);s.value=0;const g=r==null?void 0:r.$el;g&&(s.value+=(A=g==null?void 0:g.offsetHeight)!=null?A:0);let p=0;const $=n==null?void 0:n.$el;$&&(p+=(N=$==null?void 0:$.offsetHeight)!=null?N:0);let H=0,S="0px",B="0px";const y=document.querySelectorAll(C("page-wrapper-content"));if(y==null?void 0:y.length){const U=y[0],u=getComputedStyle(U);S=u==null?void 0:u.marginBottom,B=u==null?void 0:u.marginTop}S&&(H+=Number(S.replace(/[^\d]/g,""))),B&&(H+=Number(B.replace(/[^\d]/g,""))),d==null||d(f(l)-f(s)-p-H)}return{getClass:P,getShowFooter:T,getHeaderSlots:J,getContentClass:K,getContentStyle:Q,pageHeight:c}}});function _e(e,t,o,F,s,C){var d;const i=M("PageHeader"),l=M("PageFooter");return h(),w("div",{class:m(e.getClass)},[e.content||e.$slots.headerContent||e.title||((d=e.getHeaderSlots)==null?void 0:d.length)?(h(),q(i,le({key:0,ref:"headerRef"},e.$attrs,{ghost:e.ghost,title:e.title}),se({default:_(()=>[e.content?(h(),w(ue,{key:0},[fe(ce(e.content),1)],64)):a(e.$slots,"headerContent",{key:1},void 0,!0)]),_:2},[ie(e.getHeaderSlots,c=>({name:c,fn:_(P=>[a(e.$slots,c,de(ge(P)),void 0,!0)])}))]),1040,["ghost","title"])):D("",!0),j("div",{class:m([e.getContentClass,"overflow-hidden"]),style:I(e.getContentStyle)},[a(e.$slots,"default",{},void 0,!0)],6),e.getShowFooter?(h(),q(l,{key:1,ref:"footerRef"},{left:_(()=>[a(e.$slots,"leftFooter",{},void 0,!0)]),right:_(()=>[a(e.$slots,"rightFooter",{},void 0,!0)]),_:3},512)):D("",!0)],2)}var be=G(ye,[["render",_e],["__scopeId","data-v-69e4a157"]]);export{be as P};
