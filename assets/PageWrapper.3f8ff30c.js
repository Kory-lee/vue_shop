var he=Object.defineProperty,me=Object.defineProperties;var ye=Object.getOwnPropertyDescriptors;var te=Object.getOwnPropertySymbols;var Ce=Object.prototype.hasOwnProperty,_e=Object.prototype.propertyIsEnumerable;var ae=(e,t,r)=>t in e?he(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,M=(e,t)=>{for(var r in t||(t={}))Ce.call(t,r)&&ae(e,r,t[r]);if(te)for(var r of te(t))_e.call(t,r)&&ae(e,r,t[r]);return e},q=(e,t)=>me(e,ye(t));import{c as s,A as ce,b as E,P as f,w as L,aa as ue,_ as K,G as U,V as re,Z as Oe,u as Pe,f as T,I as ke,j as we,k as G,d5 as $e,cQ as Be,z as Se,d6 as He,R as de,d7 as Ae,ak as fe,bS as je,m as ve,am as I,an as Q,ap as Z,bh as w,aq as z,ar as ge,ah as j,x as Te,al as ne,ax as oe,bo as xe,aw as Fe,ao as V,bi as Re,ay as le,bp as Ne,bq as Ie,av as Le,b0 as ze,a$ as Ve}from"./index.a7e7c866.js";import{B as Ee,u as De}from"./index.e92bcde5.js";import{A as We}from"./index.59e4def7.js";import{o as Me}from"./omit.cbb318d7.js";var qe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"arrow-left",theme:"outlined"},Ke=qe;function ie(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?Object(arguments[t]):{},o=Object.keys(r);typeof Object.getOwnPropertySymbols=="function"&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable}))),o.forEach(function(a){Ue(e,a,r[a])})}return e}function Ue(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var J=function(t,r){var o=ie({},t,r.attrs);return s(ce,ie({},o,{icon:Ke}),null)};J.displayName="ArrowLeftOutlined";J.inheritAttrs=!1;var Ge=J,Qe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"},Ze=Qe;function se(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?Object(arguments[t]):{},o=Object.keys(r);typeof Object.getOwnPropertySymbols=="function"&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable}))),o.forEach(function(a){Je(e,a,r[a])})}return e}function Je(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var X=function(t,r){var o=se({},t,r.attrs);return s(ce,se({},o,{icon:Ze}),null)};X.displayName="ArrowRightOutlined";X.inheritAttrs=!1;var Xe=X,Ye=globalThis&&globalThis.__rest||function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(r[o[a]]=e[o[a]]);return r},et={border:0,background:"transparent",padding:0,lineHeight:"inherit",display:"inline-block"},tt=E({name:"TransButton",inheritAttrs:!1,props:{noStyle:f.looseBool,onClick:f.func,disabled:f.looseBool,autofocus:f.looseBool},setup:function(t,r){var o=r.slots,a=r.emit,m=r.attrs,c=r.expose,d=L(),_=function(g){var P=g.keyCode;P===re.ENTER&&g.preventDefault()},O=function(g){var P=g.keyCode;P===re.ENTER&&a("click",g)},$=function(g){a("click",g)},B=function(){d.value&&d.value.focus()},x=function(){d.value&&d.value.blur()};return ue(function(){t.autofocus&&B()}),c({focus:B,blur:x}),function(){var b,g=t.noStyle,P=t.disabled,y=Ye(t,["noStyle","disabled"]),v={};return g||(v=K({},et)),P&&(v.pointerEvents="none"),s("div",U(U(U({role:"button",tabindex:0,ref:d},y),m),{},{onClick:$,onKeydown:_,onKeyup:O,style:K(K({},v),m.style||{})}),[(b=o.default)===null||b===void 0?void 0:b.call(o)])}}}),at=tt,rt={backIcon:f.VNodeChild,prefixCls:f.string,title:f.VNodeChild,subTitle:f.VNodeChild,breadcrumb:f.object,tags:f.any,footer:f.VNodeChild,extra:f.VNodeChild,avatar:f.object,ghost:f.looseBool,onBack:f.func},nt=E({name:"APageHeader",props:rt,emits:["back"],slots:["backIcon","avatar","breadcrumb","title","subTitle","tags","extra","footer"],setup:function(t,r){var o=r.emit,a=r.slots,m=Pe("page-header",t),c=m.prefixCls,d=m.direction,_=m.pageHeader,O=L(!1),$=function(n){var l=n.width;O.value=l<768},B=T(function(){var i,n,l;return(l=(i=t.ghost)!==null&&i!==void 0?i:(n=_.value)===null||n===void 0?void 0:n.ghost)!==null&&l!==void 0?l:!0}),x=function(){var n,l,u;return(u=(n=t.backIcon)!==null&&n!==void 0?n:(l=a.backIcon)===null||l===void 0?void 0:l.call(a))!==null&&u!==void 0?u:d.value==="rtl"?s(Xe,null,null):s(Ge,null,null)},b=function(n){return!n||!t.onBack?null:s(He,{componentName:"PageHeader",children:function(u){var C=u.back;return s("div",{class:"".concat(c.value,"-back")},[s(at,{onClick:function(h){o("back",h)},class:"".concat(c.value,"-back-button"),"aria-label":C},{default:function(){return[n]}})])}},null)},g=function(){var n;return t.breadcrumb?s(Ee,t.breadcrumb,null):(n=a.breadcrumb)===null||n===void 0?void 0:n.call(a)},P=function(){var n,l,u,C,p,h,S,H,F,k=t.avatar,R=(n=t.title)!==null&&n!==void 0?n:(l=a.title)===null||l===void 0?void 0:l.call(a),N=(u=t.subTitle)!==null&&u!==void 0?u:(C=a.subTitle)===null||C===void 0?void 0:C.call(a),D=(p=t.tags)!==null&&p!==void 0?p:(h=a.tags)===null||h===void 0?void 0:h.call(a),W=(S=t.extra)!==null&&S!==void 0?S:(H=a.extra)===null||H===void 0?void 0:H.call(a),A="".concat(c.value,"-heading"),Y=R||N||D||W;if(!Y)return null;var be=x(),ee=b(be),pe=ee||k||Y;return s("div",{class:A},[pe&&s("div",{class:"".concat(A,"-left")},[ee,k?s(We,k,null):(F=a.avatar)===null||F===void 0?void 0:F.call(a),R&&s("span",{class:"".concat(A,"-title"),title:typeof R=="string"?R:void 0},[R]),N&&s("span",{class:"".concat(A,"-sub-title"),title:typeof N=="string"?N:void 0},[N]),D&&s("span",{class:"".concat(A,"-tags")},[D])]),W&&s("span",{class:"".concat(A,"-extra")},[W])])},y=function(){var n,l,u=(n=t.footer)!==null&&n!==void 0?n:Se((l=a.footer)===null||l===void 0?void 0:l.call(a));return $e(u)?null:s("div",{class:"".concat(c.value,"-footer")},[u])},v=function(n){return s("div",{class:"".concat(c.value,"-content")},[n])};return function(){var i,n,l,u=((n=t.breadcrumb)===null||n===void 0?void 0:n.routes)||a.breadcrumb,C=t.footer||a.footer,p=ke((l=a.default)===null||l===void 0?void 0:l.call(a)),h=we(c.value,(i={"has-breadcrumb":u,"has-footer":C},G(i,"".concat(c.value,"-ghost"),B.value),G(i,"".concat(c.value,"-rtl"),d.value==="rtl"),G(i,"".concat(c.value,"-compact"),O.value),i));return s(Be,{onResize:$},{default:function(){return[s("div",{class:h},[g(),P(),p.length?v(p):null,y()])]}})}}}),ot=Oe(nt);function lt(e){let t;ue(()=>{e(),de(()=>{t=!0})}),Ae(()=>{t&&e()})}const it=E({name:"PageFooter",inheritAttrs:!1,setup(){const{getPrefixCls:e}=fe();return{prefixCls:e("page-footer"),getCalcContentWidth:je}}});function st(e,t,r,o,a,m){return I(),Q("div",{class:z(e.prefixCls),style:ge({width:e.getCalcContentWidth})},[Z("div",{class:z(`${e.prefixCls}__left`)},[w(e.$slots,"left",{},void 0,!0)],2),w(e.$slots,"default",{},void 0,!0),Z("div",{class:z(`${e.prefixCls}__right`)},[w(e.$slots,"right",{},void 0,!0)],2)],6)}var ct=ve(it,[["render",st],["__scopeId","data-v-3661f935"]]);const ut=E({name:"PageWrapper",components:{PageHeader:ot,PageFooter:ct},inheritAttrs:!1,props:{title:{type:String,default:""},dense:Boolean,ghost:Boolean,content:{type:String,default:""},contentStyle:{type:Object,default:()=>({})},contentBackground:Boolean,contentFullHeight:Boolean,contentClass:{type:String,default:""},fixedHeight:Boolean},setup(e,{slots:t}){const r=L(null),o=L(null),a=L(0),{getPrefixCls:m}=fe(),c=m("page-wrapper"),{contentHeight:d,setPageHeight:_,pageHeight:O}=De(),$=T(()=>[c,{[`${c}-dense`]:e.dense}]),B=T(()=>(t==null?void 0:t.leftFooter)||(t==null?void 0:t.rightFooter)),x=T(()=>Object.keys(Me(t,"default","leftFooter","rightFooter","headerContent"))),b=T(()=>{const{contentBackground:y,contentClass:v}=e;return[`${c}-content`,v,{[`${c}-content-bg`]:y}]}),g=T(()=>{const{contentFullHeight:y,contentStyle:v,fixedHeight:i}=e;if(!y)return v;const n=`${j(O)}px`;return q(M(q(M({},v),{minHeight:n}),i?{height:n}:{}),{paddingBottom:`${j(a)}px`})});Te(()=>[d==null?void 0:d.value,B.value],()=>{P()},{flush:"post",immediate:!0}),lt(()=>{de(()=>P())});function P(){var S,H;if(!e.contentFullHeight)return;const y=j(o),v=j(r);a.value=0;const i=y==null?void 0:y.$el;i&&(a.value+=(S=i==null?void 0:i.offsetHeight)!=null?S:0);let n=0;const l=v==null?void 0:v.$el;l&&(n+=(H=l==null?void 0:l.offsetHeight)!=null?H:0);let u=0,C="0px",p="0px";const h=document.querySelectorAll(m("page-wrapper-content"));if(h!=null&&h.length){const F=h[0],k=getComputedStyle(F);C=k==null?void 0:k.marginBottom,p=k==null?void 0:k.marginTop}C&&(u+=Number(C.replace(/[^\d]/g,""))),p&&(u+=Number(p.replace(/[^\d]/g,""))),_==null||_(j(d)-j(a)-n-u)}return{getClass:$,getShowFooter:B,getHeaderSlots:x,getContentClass:b,getContentStyle:g,pageHeight:O}}});function dt(e,t,r,o,a,m){var _;const c=ne("PageHeader"),d=ne("PageFooter");return I(),Q("div",{class:z(e.getClass)},[e.content||e.$slots.headerContent||e.title||((_=e.getHeaderSlots)==null?void 0:_.length)?(I(),oe(c,Re({key:0,ref:"headerRef"},e.$attrs,{ghost:e.ghost,title:e.title}),xe({default:V(()=>[e.content?(I(),Q(Le,{key:0},[ze(Ve(e.content),1)],2112)):w(e.$slots,"headerContent",{key:1},void 0,!0)]),_:2},[Fe(e.getHeaderSlots,O=>({name:O,fn:V($=>[w(e.$slots,O,Ne(Ie($)),void 0,!0)])}))]),1040,["ghost","title"])):le("v-if",!0),Z("div",{class:z([e.getContentClass,"overflow-hidden"]),style:ge(e.getContentStyle)},[w(e.$slots,"default",{},void 0,!0)],6),e.getShowFooter?(I(),oe(d,{key:1,ref:"footerRef"},{left:V(()=>[w(e.$slots,"leftFooter",{},void 0,!0)]),right:V(()=>[w(e.$slots,"rightFooter",{},void 0,!0)]),_:3},512)):le("v-if",!0)],2)}var ht=ve(ut,[["render",dt],["__scopeId","data-v-640ca12e"]]);export{ht as P};
