import{cO as M,cV as m,cx as P,cw as g,cW as O,cQ as R,cM as _}from"./entry-index-204be9fe.js";import{g as l}from"./chunk-get-dbb7887a.js";import{h as y}from"./chunk-hasIn-591a3091.js";import{i as C}from"./chunk-_setToString-44848017.js";import{b as I}from"./chunk-_flatRest-8e2e73e0.js";function L(n){return function(r){return r==null?void 0:r[n]}}var d=1,w=2;function D(n,r,i,t){var e=i.length,o=e,A=!t;if(n==null)return!o;for(n=Object(n);e--;){var f=i[e];if(A&&f[2]?f[1]!==n[f[0]]:!(f[0]in n))return!1}for(;++e<o;){f=i[e];var u=f[0],s=n[u],a=f[1];if(A&&f[2]){if(s===void 0&&!(u in n))return!1}else{var p=new M;if(t)var c=t(s,a,u,n,r,p);if(!(c===void 0?m(a,s,d|w,t,p):c))return!1}}return!0}function h(n){return n===n&&!P(n)}function G(n){for(var r=g(n),i=r.length;i--;){var t=r[i],e=n[t];r[i]=[t,e,h(e)]}return r}function E(n,r){return function(i){return i==null?!1:i[n]===r&&(r!==void 0||n in Object(i))}}function F(n){var r=G(n);return r.length==1&&r[0][2]?E(r[0][0],r[0][1]):function(i){return i===n||D(i,n,r)}}var x=1,S=2;function b(n,r){return O(n)&&h(r)?E(R(n),r):function(i){var t=l(i,n);return t===void 0&&t===r?y(i,n):m(r,t,x|S)}}function K(n){return function(r){return I(r,n)}}function N(n){return O(n)?L(R(n)):K(n)}function W(n){return typeof n=="function"?n:n==null?C:typeof n=="object"?_(n)?b(n[0],n[1]):F(n):N(n)}export{W as b};
