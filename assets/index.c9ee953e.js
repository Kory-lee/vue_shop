import{bc as i}from"./vendor.4f112e74.js";import{J as r}from"./index.a8042b0d.js";const a="https://github.com/korylee/admin",u="https://korylee.now.sh",d="https://korylee.github.io/admin";function _(e){for(const n of e){const t=n.target.__resizeListeners__||[];!t.length||t.forEach(s=>s())}}const o=typeof window=="undefined";function z(e,n){if(!r(n))throw new Error("handle is not function");o||(e.__resizeListeners__||(e.__resizeListeners__=[],e.__ro__=new i(_),e.__ro__.observe(e)),e.__resizeListeners__.push(n))}function L(e,n){if(!(e!=null&&e.__resizeListeners__))return;const t=e.__resizeListeners__.indexOf(n);t!==-1&&(e.__resizeListeners__.splice(t,1),e.__resizeListeners__.length||e.__ro__.disconnect())}function h(){let e;typeof Event=="function"?e=new Event("resize",{bubbles:!0,cancelable:!0}):(e=document.createEvent("HTMLEvents"),e.initEvent("resize",!0,!0),e.eventType="message"),window.dispatchEvent(e)}export{u as D,a as G,d as S,z as a,L as r,h as t};
