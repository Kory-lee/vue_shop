import{d,bG as p,bH as i,f as t,o,a as u,g as l,h as g}from"./vendor.cbfc6132.js";import{_ as f,c as m,aC as c,a9 as C}from"./index.aadfe6bf.js";const k=d({name:"HeaderTrigger",components:{MenuUnfoldOutlined:p,MenuFoldOutlined:i},props:{theme:{type:String,default:"light"}},emits:["click"],setup(){const{getPrefixCls:e}=m();return{prefixCls:e("layout-header-trigger"),toggleCollapsed:c,getCollapsed:C}}});function M(e,n,O,_,h,y){const s=t("MenuUnfoldOutlined"),a=t("MenuFoldOutlined");return o(),u("span",{class:g([e.prefixCls,e.theme]),onClick:n[0]||(n[0]=(...r)=>e.toggleCollapsed&&e.toggleCollapsed(...r))},[e.getCollapsed?(o(),l(s,{key:0})):(o(),l(a,{key:1}))],2)}var B=f(k,[["render",M]]);export{B as default};
