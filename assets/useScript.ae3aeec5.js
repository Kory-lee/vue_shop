import{w as a,aa as i,y as f}from"./index.a7e7c866.js";function p(r){const s=a(!1),o=a(!1),t=a(!1);let e;const n=new Promise((u,c)=>{i(()=>{e=document.createElement("script"),e.type="text/javascript",e.onload=function(){s.value=!1,t.value=!0,o.value=!1,u("")},e.onerror=function(l){s.value=!1,t.value=!1,o.value=!0,c(l)},e.src=r.src,document.head.appendChild(e)})});return f(()=>{e&&e.remove()}),{isLoading:s,error:o,success:t,toPromise:()=>n}}export{p as u};
