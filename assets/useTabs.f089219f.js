var l=(n,c,t)=>new Promise((i,s)=>{var u=e=>{try{a(t.next(e))}catch(r){s(r)}},b=e=>{try{a(t.throw(e))}catch(r){s(r)}},a=e=>e.done?i(e.value):Promise.resolve(e.value).then(u,b);a((t=t.apply(n,c)).next())});import{_ as f,u as h}from"./vendor.4f112e74.js";import{b as T,d as g}from"./index.a8042b0d.js";function S(n){const c=T(),t=g();function i(){const{show:e}=c.getMultiTabsSetting;if(!e)throw new Error("the multi-tab page is not open,please open it in the setting");return e}const s=n||f(),{currentRoute:u}=s;function b(){const e=h(u);return t.getTabList.find(r=>r.path===e.path)}function a(e,r){return l(this,null,function*(){if(!i())return;const o=b();switch(e){case 0:yield t.refreshPage(s);break;case 1:yield t.closeAllTabs(s);break;case 2:yield t.closeLeftTabs(o,s);break;case 3:yield t.closeRightTabs(o,s);break;case 4:yield t.closeOtherTabs(o,s);break;case 5:case 6:yield t.closeTab(r||o,s);break}})}return{refreshPage:()=>a(0),closeAll:()=>a(1),closeLeft:()=>a(2),closeRight:()=>a(3),closeOther:()=>a(4),closeCurrent:e=>a(5,e),close:e=>a(6,e)}}export{S as u};
