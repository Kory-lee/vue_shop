import{L as k,u as L,a as _}from"./LoginFormTitle.09c93419.js";import{d as I,bh as u,at as h,bg as B,ac as C,r as v,af as y,c as S,u as D,f as n,o as E,a as T,q as e,l as t,aE as g,x as d,F as $,v as w}from"./vendor.4f112e74.js";/* empty css              *//* empty css               */import{_ as z}from"./index.a8042b0d.js";const M=I({name:"MobileForm",components:{LoginFormTitle:k,Form:u,FormItem:u.Item,Button:h,Input:B},setup(){const{t:o}=C(),{handleBackLogin:a,getLoginState:r}=L(),m=v(!1),i=y({mobile:"",sms:""}),c=S(()=>D(r)===_.MOBILE);function s(){console.log("login")}return{t:o,getShow:c,handleBackLogin:a,formData:i,loading:m,handleLogin:s}}});function N(o,a,r,m,i,c){const s=n("LoginFormTitle"),f=n("Input"),l=n("FormItem"),p=n("Button"),F=n("Form");return o.getShow?(E(),T($,{key:0},[e(s,{class:"enter-x"}),e(F,{ref:"formRef",model:o.formData,class:"p-4 enter-x"},{default:t(()=>[e(l,{name:"mobile",class:"enter-x"},{default:t(()=>[e(f,{value:o.formData.mobile,"onUpdate:value":a[0]||(a[0]=b=>o.formData.mobile=b),placeholder:o.t("sys.login.mobile"),size:"large"},null,8,["value","placeholder"])]),_:1}),e(l,{name:"sms",class:"enter-x"}),e(l,{class:"enter-x"},{default:t(()=>[e(p,{block:"",type:"primary",size:"large",loading:o.loading,onClick:o.handleLogin},{default:t(()=>[g(d(o.t("sys.login.loginButton")),1)]),_:1},8,["loading","onClick"]),e(p,{size:"large",block:"",class:"mt-4",onClick:o.handleBackLogin},{default:t(()=>[g(d(o.t("sys.login.backSignIn")),1)]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])],64)):w("",!0)}var U=z(M,[["render",N]]);export{U as default};
