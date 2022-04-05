import{U as G,g as $,a as x,i as C,S as E,b as X,k as Y,c as Z,d as W}from"./omit.cbb318d7.js";import{cG as b,cH as c,S as U,e as z,cI as h,cx as B,i as o}from"./index.a7e7c866.js";import{d as y,c as V,t as I,i as j,e as K}from"./_toKey.3706adb2.js";import{g as k}from"./get.aa8cf04d.js";import{i as nn,c as rn}from"./_setToString.730a8d21.js";function en(n,r){for(var e=-1,f=n==null?0:n.length;++e<f;)if(r(n[e],e,n))return!0;return!1}var fn=1,an=2;function q(n,r,e,f,a,i){var u=e&fn,s=n.length,l=r.length;if(s!=l&&!(u&&l>s))return!1;var g=i.get(n),v=i.get(r);if(g&&v)return g==r&&v==n;var A=-1,t=!0,d=e&an?new b:void 0;for(i.set(n,r),i.set(r,n);++A<s;){var O=n[A],P=r[A];if(f)var p=u?f(P,O,A,r,n,i):f(O,P,A,n,r,i);if(p!==void 0){if(p)continue;t=!1;break}if(d){if(!en(r,function(T,_){if(!c(d,_)&&(O===T||a(O,T,e,f,i)))return d.push(_)})){t=!1;break}}else if(!(O===P||a(O,P,e,f,i))){t=!1;break}}return i.delete(n),i.delete(r),t}function un(n){var r=-1,e=Array(n.size);return n.forEach(function(f,a){e[++r]=[a,f]}),e}var sn=1,tn=2,ln="[object Boolean]",gn="[object Date]",An="[object Error]",vn="[object Map]",On="[object Number]",Pn="[object RegExp]",dn="[object Set]",pn="[object String]",Tn="[object Symbol]",_n="[object ArrayBuffer]",Ln="[object DataView]",F=U?U.prototype:void 0,S=F?F.valueOf:void 0;function Rn(n,r,e,f,a,i,u){switch(e){case Ln:if(n.byteLength!=r.byteLength||n.byteOffset!=r.byteOffset)return!1;n=n.buffer,r=r.buffer;case _n:return!(n.byteLength!=r.byteLength||!i(new G(n),new G(r)));case ln:case gn:case On:return z(+n,+r);case An:return n.name==r.name&&n.message==r.message;case Pn:case pn:return n==r+"";case vn:var s=un;case dn:var l=f&sn;if(s||(s=h),n.size!=r.size&&!l)return!1;var g=u.get(n);if(g)return g==r;f|=tn,u.set(n,r);var v=q(s(n),s(r),f,a,i,u);return u.delete(n),v;case Tn:if(S)return S.call(n)==S.call(r)}return!1}var wn=1,En=Object.prototype,yn=En.hasOwnProperty;function Sn(n,r,e,f,a,i){var u=e&wn,s=$(n),l=s.length,g=$(r),v=g.length;if(l!=v&&!u)return!1;for(var A=l;A--;){var t=s[A];if(!(u?t in r:yn.call(r,t)))return!1}var d=i.get(n),O=i.get(r);if(d&&O)return d==r&&O==n;var P=!0;i.set(n,r),i.set(r,n);for(var p=u;++A<l;){t=s[A];var T=n[t],_=r[t];if(f)var D=u?f(_,T,t,r,n,i):f(T,_,t,n,r,i);if(!(D===void 0?T===_||a(T,_,e,f,i):D)){P=!1;break}p||(p=t=="constructor")}if(P&&!p){var L=n.constructor,R=r.constructor;L!=R&&"constructor"in n&&"constructor"in r&&!(typeof L=="function"&&L instanceof L&&typeof R=="function"&&R instanceof R)&&(P=!1)}return i.delete(n),i.delete(r),P}var In=1,N="[object Arguments]",m="[object Array]",w="[object Object]",Mn=Object.prototype,H=Mn.hasOwnProperty;function Dn(n,r,e,f,a,i){var u=y(n),s=y(r),l=u?m:x(n),g=s?m:x(r);l=l==N?w:l,g=g==N?w:g;var v=l==w,A=g==w,t=l==g;if(t&&C(n)){if(!C(r))return!1;u=!0,v=!1}if(t&&!v)return i||(i=new E),u||X(n)?q(n,r,e,f,a,i):Rn(n,r,l,e,f,a,i);if(!(e&In)){var d=v&&H.call(n,"__wrapped__"),O=A&&H.call(r,"__wrapped__");if(d||O){var P=d?n.value():n,p=O?r.value():r;return i||(i=new E),a(P,p,e,f,i)}}return t?(i||(i=new E),Sn(n,r,e,f,a,i)):!1}function M(n,r,e,f,a){return n===r?!0:n==null||r==null||!B(n)&&!B(r)?n!==n&&r!==r:Dn(n,r,e,f,M,a)}var Gn=1,$n=2;function xn(n,r,e,f){var a=e.length,i=a,u=!f;if(n==null)return!i;for(n=Object(n);a--;){var s=e[a];if(u&&s[2]?s[1]!==n[s[0]]:!(s[0]in n))return!1}for(;++a<i;){s=e[a];var l=s[0],g=n[l],v=s[1];if(u&&s[2]){if(g===void 0&&!(l in n))return!1}else{var A=new E;if(f)var t=f(g,v,l,n,r,A);if(!(t===void 0?M(v,g,Gn|$n,f,A):t))return!1}}return!0}function J(n){return n===n&&!o(n)}function Cn(n){for(var r=Y(n),e=r.length;e--;){var f=r[e],a=n[f];r[e]=[f,a,J(a)]}return r}function Q(n,r){return function(e){return e==null?!1:e[n]===r&&(r!==void 0||n in Object(e))}}function Un(n){var r=Cn(n);return r.length==1&&r[0][2]?Q(r[0][0],r[0][1]):function(e){return e===n||xn(e,n,r)}}function Bn(n,r){return n!=null&&r in Object(n)}function Fn(n,r,e){r=V(r,n);for(var f=-1,a=r.length,i=!1;++f<a;){var u=I(r[f]);if(!(i=n!=null&&e(n,u)))break;n=n[u]}return i||++f!=a?i:(a=n==null?0:n.length,!!a&&nn(a)&&j(u,a)&&(y(n)||Z(n)))}function Nn(n,r){return n!=null&&Fn(n,r,Bn)}var mn=1,Hn=2;function Kn(n,r){return K(n)&&J(r)?Q(I(n),r):function(e){var f=k(e,n);return f===void 0&&f===r?Nn(e,n):M(r,f,mn|Hn)}}function qn(n){return function(r){return r==null?void 0:r[n]}}function Jn(n){return function(r){return W(r,n)}}function Qn(n){return K(n)?qn(I(n)):Jn(n)}function cn(n){return typeof n=="function"?n:n==null?rn:typeof n=="object"?y(n)?Kn(n[0],n[1]):Un(n):Qn(n)}export{M as a,cn as b};
