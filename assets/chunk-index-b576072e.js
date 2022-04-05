import{i as x,a as A,r as D,b as T,w as $,q,Y as y,dV as _,b5 as h,a2 as w,a3 as k,aJ as v,a7 as B}from"./entry-index-a3b6a048.js";var C={startVal:{type:Number,default:0},endVal:{type:Number,default:2020},duration:{type:Number,default:1300},autoplay:{type:Boolean,default:!0},decimals:{type:Number,required:!1,default:0,validator:t=>t>=0},color:{type:String,required:!1},decimal:{type:String,default:"."},separator:{type:String,default:","},prefix:{type:String,default:""},suffix:{type:String,default:""},useEasing:{type:Boolean,default:!0},easingFn:{type:Function,default:(t,i,a,o)=>a*(-Math.pow(2,-10*t/o)+1)*1024/1023+i}};const E=A({name:"CountTo",props:C,emits:["mounted","callback"],setup(t,{emit:i}){const a=D({localStartVal:t.startVal,displayName:f(t.startVal),printVal:null,paused:!1,localDuration:t.duration,startTime:null,timestamp:null,remaining:null,rAF:null,color:null}),o=T(()=>t.startVal>t.endVal);$([()=>t.startVal,()=>t.endVal],()=>{t.autoplay&&u()}),q(()=>{t.autoplay&&u(),i("mounted")});function u(){const{startVal:l,duration:s,color:r}=t;a.localStartVal=l,a.startTime=null,a.localDuration=s,a.color=r,a.paused=!1,a.rAF=requestAnimationFrame(c)}function p(){a.paused?(g(),a.paused=!1):(S(),a.paused=!0)}function c(l){const{useEasing:s,easingFn:r,endVal:e}=t;a.startTime||(a.startTime=l),a.timestamp=l;const n=l-a.startTime;a.remaining=a.localDuration-n,s?y(o)?a.printVal=a.localStartVal-r(n,0,a.localStartVal-e,a.localDuration):a.printVal=r(n,a.localStartVal,e-a.localStartVal,a.localDuration):a.printVal=a.localStartVal+(e-a.localStartVal)*(n/a.localDuration),y(o)?a.printVal=a.printVal<e?e:a.printVal:a.printVal=a.printVal>e?e:a.printVal,a.displayName=f(a.printVal),n<a.localDuration?a.rAf=requestAnimationFrame(c):i("callback")}function g(){a.startTime=null,a.localDuration=+a.remaining,a.localStartVal=+a.printVal,requestAnimationFrame(c)}function S(){cancelAnimationFrame(a.rAF)}function F(){a.startTime=null,cancelAnimationFrame(a.rAF),a.displayName=f(t.startVal)}function f(l){const{decimals:s,decimal:r,separator:e,suffix:n,prefix:N}=t;l=`${Number(l).toFixed(s)}`;const m=l.split(".");let d=m[0];const b=m.length>1?r+m[1]:"",V=/(\d+)(\d{3})/;if(e&&!_(e))for(;V.test(d);)d=d.replace(V,"$1"+e+"$2");return N+d+b+n}return{count:c,reset:F,pauseResume:p,start:u,displayName:h(a,"displayName")}}});function M(t,i,a,o,u,p){return w(),k("span",{style:B({color:t.color})},v(t.displayName),5)}var z=x(E,[["render",M]]);export{z as default};
