import{c as f,A as V,P as i,V as xe,X as W,k as u,bg as Pe,b as N,O as I,v as Be,aX as Ce,a1 as Oe,D as k,_ as b,cr as te,$ as ne,a2 as R,cs as re,G as _,ct as $e,cq as Se,t as K,J as ae,ac as _e,cu as we,a0 as ke,a4 as Re,z as Ne,a3 as Ae}from"./index.a7e7c866.js";import{D as Ee}from"./DownOutlined.5adce40a.js";var Ke={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},We=Ke;function F(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?Object(arguments[e]):{},n=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&(n=n.concat(Object.getOwnPropertySymbols(t).filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),n.forEach(function(a){Ie(r,a,t[a])})}return r}function Ie(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var q=function(e,t){var n=F({},e,t.attrs);return f(V,F({},n,{icon:We}),null)};q.displayName="PlusOutlined";q.inheritAttrs=!1;var je=q,j={LEFT:37,UP:38,RIGHT:39,DOWN:40},De={width:0,height:0,overflow:"hidden",position:"absolute"},H={name:"Sentinel",props:{setRef:i.func,prevElement:i.any,nextElement:i.any},methods:{onKeyDown:function(e){var t=e.target,n=e.which,a=e.shiftKey,s=this.$props,o=s.nextElement,l=s.prevElement;n!==xe.TAB||document.activeElement!==t||(!a&&o&&o.focus(),a&&l&&l.focus())}},render:function(){var e=this.$props.setRef;return f("div",{tabindex:0,ref:e,style:De,onKeydown:this.onKeyDown,role:"presentation"},[W(this)])}};function He(r){var e=[];return r.forEach(function(t){Pe(t)&&e.push(t)}),e}function ie(r,e){for(var t=He(r),n=0;n<t.length;n++)if(t[n].key===e)return n;return-1}function D(r,e){r.transform=e,r.webkitTransform=e,r.mozTransform=e}function se(r){return("transform"in r||"webkitTransform"in r||"MozTransform"in r)&&window.atob}function ze(r){return{transform:r,WebkitTransform:r,MozTransform:r}}function z(r){return r==="left"||r==="right"}function Le(r,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"ltr",n=z(e)?"translateY":"translateX";return!z(e)&&t==="rtl"?"".concat(n,"(").concat(r*100,"%) translateZ(0)"):"".concat(n,"(").concat(-r*100,"%) translateZ(0)")}function Ue(r,e){var t=z(e)?"marginTop":"marginLeft";return u({},t,"".concat(-r*100,"%"))}function oe(r,e){return+window.getComputedStyle(r).getPropertyValue(e).replace("px","")}function ce(r){return Object.keys(r).reduce(function(e,t){return(t.substr(0,5)==="aria-"||t.substr(0,5)==="data-"||t==="role")&&(e[t]=r[t]),e},{})}function E(r,e){return+r.getPropertyValue(e).replace("px","")}function le(r,e,t,n,a){var s=oe(a,"padding-".concat(r));if(!n||!n.parentNode)return s;var o=n.parentNode.childNodes;return Array.prototype.some.call(o,function(l){if(!l.tagName)return!1;var c=window.getComputedStyle(l);return l!==n?(s+=E(c,"margin-".concat(r)),s+=l[e],s+=E(c,"margin-".concat(t)),c.boxSizing==="content-box"&&(s+=E(c,"border-".concat(r,"-width"))+E(c,"border-".concat(t,"-width"))),!1):(s+=E(c,"margin-".concat(r)),!0)}),s}function Ve(r,e){return le("left","offsetWidth","right",r,e)}function qe(r,e){return le("top","offsetHeight","bottom",r,e)}var Me=globalThis&&globalThis.__rest||function(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(r);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(r,n[a])&&(t[n[a]]=r[n[a]]);return t};function X(r){var e,t=r.children;return t.forEach(function(n){n&&!te(e)&&!n.disabled&&(e=n.key)}),e}function Ge(r,e){var t=r.children,n=t.map(function(a){return a&&a.key});return n.indexOf(e)>=0}var Fe=N({name:"Tabs",mixins:[I],inheritAttrs:!1,props:{destroyInactiveTabPane:i.looseBool,renderTabBar:i.func.isRequired,renderTabContent:i.func.isRequired,navWrapper:i.func.def(function(r){return r}),children:i.any.def([]),prefixCls:i.string.def("ant-tabs"),tabBarPosition:i.string.def("top"),activeKey:i.oneOfType([i.string,i.number]),defaultActiveKey:i.oneOfType([i.string,i.number]),direction:i.string.def("ltr"),tabBarGutter:i.number},setup:function(e){var t;e.activeKey!==void 0?t=e.activeKey:e.defaultActiveKey!==void 0?t=e.defaultActiveKey:t=X(e);var n=Be({_activeKey:t});return Ce(function(){e.activeKey!==void 0?n._activeKey=e.activeKey:Ge(e,n._activeKey)||(n._activeKey=X(e))},{flush:"sync"}),{state:n}},created:function(){this.panelSentinelStart=void 0,this.panelSentinelEnd=void 0,this.sentinelStart=void 0,this.sentinelEnd=void 0,Oe("sentinelContext",this)},beforeUnmount:function(){this.destroy=!0,cancelAnimationFrame(this.sentinelId)},methods:{onTabClick:function(e,t){this.tabBar.props&&this.tabBar.props.onTabClick&&this.tabBar.props.onTabClick(e,t),this.setActiveKey(e)},onNavKeyDown:function(e){var t=e.keyCode;if(t===j.RIGHT||t===j.DOWN){e.preventDefault();var n=this.getNextActiveKey(!0);this.onTabClick(n)}else if(t===j.LEFT||t===j.UP){e.preventDefault();var a=this.getNextActiveKey(!1);this.onTabClick(a)}},onScroll:function(e){var t=e.target,n=e.currentTarget;t===n&&t.scrollLeft>0&&(t.scrollLeft=0)},setSentinelStart:function(e){this.sentinelStart=e},setSentinelEnd:function(e){this.sentinelEnd=e},setPanelSentinelStart:function(e){e!==this.panelSentinelStart&&this.updateSentinelContext(),this.panelSentinelStart=e},setPanelSentinelEnd:function(e){e!==this.panelSentinelEnd&&this.updateSentinelContext(),this.panelSentinelEnd=e},setActiveKey:function(e){if(this.state._activeKey!==e){var t=this.$props;t.activeKey===void 0&&(this.state._activeKey=e),this.__emit("update:activeKey",e),this.__emit("change",e)}},getNextActiveKey:function(e){var t=this.state._activeKey,n=[];this.$props.children.forEach(function(o){var l,c;o&&!(!((l=o.props)===null||l===void 0)&&l.disabled)&&((c=o.props)===null||c===void 0?void 0:c.disabled)!==""&&(e?n.push(o):n.unshift(o))});var a=n.length,s=a&&n[0].key;return n.forEach(function(o,l){o.key===t&&(l===a-1?s=n[0].key:s=n[l+1].key)}),s},updateSentinelContext:function(){var e=this;this.destroy||(cancelAnimationFrame(this.sentinelId),this.sentinelId=requestAnimationFrame(function(){e.destroy||e.$forceUpdate()}))}},render:function(){var e,t=this.$props,n=t.prefixCls,a=t.navWrapper,s=t.tabBarPosition,o=t.renderTabContent,l=t.renderTabBar,c=t.destroyInactiveTabPane,d=t.direction,p=t.tabBarGutter,y=this.$attrs,v=y.class;y.onChange;var m=y.style,x=Me(y,["class","onChange","style"]),g=(e={},u(e,v,v),u(e,n,1),u(e,"".concat(n,"-").concat(s),1),u(e,"".concat(n,"-rtl"),d==="rtl"),e);this.tabBar=l();var P=k(this.tabBar,{prefixCls:n,navWrapper:a,tabBarPosition:s,panels:t.children,activeKey:this.state._activeKey,direction:d,tabBarGutter:p,onKeydown:this.onNavKeyDown,onTabClick:this.onTabClick,key:"tabBar"}),B=k(o(),{prefixCls:n,tabBarPosition:s,activeKey:this.state._activeKey,destroyInactiveTabPane:c,direction:d,onChange:this.setActiveKey,children:t.children,key:"tabContent"}),h=f(H,{key:"sentinelStart",setRef:this.setSentinelStart,nextElement:this.panelSentinelStart},null),C=f(H,{key:"sentinelEnd",setRef:this.setSentinelEnd,prevElement:this.panelSentinelEnd},null),T=[];s==="bottom"?T.push(h,B,C,P):T.push(P,h,B,C);var $=b(b({},ce(x)),{style:m,onScroll:this.onScroll,class:g});return f("div",$,[T])}}),fe=N({name:"TabPane",props:{active:i.looseBool,destroyInactiveTabPane:i.looseBool,forceRender:i.looseBool,placeholder:i.any,rootPrefixCls:i.string,tab:i.any,closable:i.looseBool,disabled:i.looseBool},setup:function(){return{isActived:void 0,sentinelContext:ne("sentinelContext",{})}},render:function(){var e,t=this.$props,n=t.destroyInactiveTabPane,a=t.active,s=t.forceRender,o=t.rootPrefixCls,l=W(this),c=R(this,"placeholder");this.isActived=this.isActived||a;var d="".concat(o,"-tabpane"),p=(e={},u(e,d,1),u(e,"".concat(d,"-inactive"),!a),u(e,"".concat(d,"-active"),a),e),y=n?a:this.isActived,v=y||s,m=this.sentinelContext,x=m.sentinelStart,g=m.sentinelEnd,P=m.setPanelSentinelStart,B=m.setPanelSentinelEnd,h,C;return a&&v&&(h=f(H,{setRef:P,prevElement:x},null),C=f(H,{setRef:B,nextElement:g},null)),f("div",{class:p,role:"tabpanel","aria-hidden":a?"false":"true"},[h,v?l:c,C])}}),de=N({name:"TabContent",inheritAttrs:!1,props:{animated:i.looseBool.def(!0),animatedWithMargin:i.looseBool.def(!0),prefixCls:i.string.def("ant-tabs"),activeKey:i.oneOfType([i.string,i.number]),tabBarPosition:i.string,direction:i.string,destroyInactiveTabPane:i.looseBool,children:i.any},computed:{classes:function(){var e,t=this.animated,n=this.prefixCls,a=this.$attrs.class;return e={},u(e,a,!!a),u(e,"".concat(n,"-content"),!0),u(e,t?"".concat(n,"-content-animated"):"".concat(n,"-content-no-animated"),!0),e}},methods:{getTabPanes:function(e){var t=this.$props,n=t.activeKey,a=[];return e.forEach(function(s){if(!!s){var o=s.key,l=n===o;a.push(k(s,{active:l,destroyInactiveTabPane:t.destroyInactiveTabPane,rootPrefixCls:t.prefixCls}))}}),a}},render:function(){var e=this.activeKey,t=this.tabBarPosition,n=this.animated,a=this.animatedWithMargin,s=this.direction,o=this.classes,l=this.children,c={};if(n&&l){var d=ie(l,e);if(d!==-1){var p=a?Ue(d,t):ze(Le(d,t,s));c=b(b({},this.$attrs.style),p)}else c=b(b({},this.$attrs.style),{display:"none"})}return f("div",{class:o,style:c},[this.getTabPanes(l||[])])}}),Xe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"}}]},name:"up",theme:"outlined"},Ze=Xe;function Z(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?Object(arguments[e]):{},n=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&(n=n.concat(Object.getOwnPropertySymbols(t).filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),n.forEach(function(a){Je(r,a,t[a])})}return r}function Je(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var M=function(e,t){var n=Z({},e,t.attrs);return f(V,Z({},n,{icon:Ze}),null)};M.displayName="UpOutlined";M.inheritAttrs=!1;var Ye=M,Qe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"}}]},name:"left",theme:"outlined"},et=Qe;function J(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?Object(arguments[e]):{},n=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&(n=n.concat(Object.getOwnPropertySymbols(t).filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),n.forEach(function(a){tt(r,a,t[a])})}return r}function tt(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var G=function(e,t){var n=J({},e,t.attrs);return f(V,J({},n,{icon:et}),null)};G.displayName="LeftOutlined";G.inheritAttrs=!1;var nt=G;function Y(r,e){var t=r.$props,n=t.styles,a=n===void 0?{}:n,s=t.panels,o=t.activeKey,l=t.direction,c=r.getRef("root"),d=r.getRef("nav")||c,p=r.getRef("inkBar"),y=r.getRef("activeTab"),v=p.style,m=r.$props.tabBarPosition,x=ie(s,o);if(e&&(v.display="none"),y){var g=y,P=se(v);if(D(v,""),v.width="",v.height="",v.left="",v.top="",v.bottom="",v.right="",m==="top"||m==="bottom"){var B=Ve(g,d),h=g.offsetWidth;h===c.offsetWidth?h=0:a.inkBar&&a.inkBar.width!==void 0&&(h=parseFloat(a.inkBar.width,10),h&&(B+=(g.offsetWidth-h)/2)),l==="rtl"&&(B=oe(g,"margin-left")-B),P?D(v,"translate3d(".concat(B,"px,0,0)")):v.left="".concat(B,"px"),v.width="".concat(h,"px")}else{var C=qe(g,d),T=g.offsetHeight;a.inkBar&&a.inkBar.height!==void 0&&(T=parseFloat(a.inkBar.height,10),T&&(C+=(g.offsetHeight-T)/2)),P?(D(v,"translate3d(0,".concat(C,"px,0)")),v.top="0"):v.top="".concat(C,"px"),v.height="".concat(T,"px")}}v.display=x!==-1?"block":"none"}var rt={name:"InkTabBarNode",mixins:[I],inheritAttrs:!1,props:{inkBarAnimated:{type:Boolean,default:!0},direction:i.string,prefixCls:String,styles:Object,tabBarPosition:String,saveRef:i.func.def(function(){}),getRef:i.func.def(function(){}),panels:i.array,activeKey:i.oneOfType([i.string,i.number])},updated:function(){var e=this;this.$nextTick(function(){Y(e)})},mounted:function(){var e=this;this.$nextTick(function(){Y(e,!0)})},render:function(){var e,t=this.prefixCls,n=this.styles,a=n===void 0?{}:n,s=this.inkBarAnimated,o="".concat(t,"-ink-bar"),l=(e={},u(e,o,!0),u(e,s?"".concat(o,"-animated"):"".concat(o,"-no-animated"),!0),e);return f("div",{style:a.inkBar,class:l,key:"inkBar",ref:this.saveRef("inkBar")},null)}},ue=function(){};{var at=function(e,t){var n=arguments.length;t=new Array(n>1?n-1:0);for(var a=1;a<n;a++)t[a-1]=arguments[a];var s=0,o="Warning: "+e.replace(/%s/g,function(){return t[s++]});typeof console!="undefined"&&console.error(o);try{throw new Error(o)}catch(l){}};ue=function(r,e,t){var n=arguments.length;t=new Array(n>2?n-2:0);for(var a=2;a<n;a++)t[a-2]=arguments[a];if(e===void 0)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");r||at.apply(null,[e].concat(t))}}var it=ue,st=it;function U(){}var ot={name:"TabBarTabsNode",mixins:[I],inheritAttrs:!1,props:{activeKey:i.oneOfType([i.string,i.number]),panels:i.any.def([]),prefixCls:i.string.def(""),tabBarGutter:i.any.def(null),onTabClick:i.func,saveRef:i.func.def(U),getRef:i.func.def(U),renderTabBarNode:i.func,tabBarPosition:i.string,direction:i.string},render:function(){var e=this,t=this.$props,n=t.panels,a=t.activeKey,s=t.prefixCls,o=t.tabBarGutter,l=t.saveRef,c=t.tabBarPosition,d=t.direction,p=[],y=this.renderTabBarNode||this.$slots.renderTabBarNode;return n.forEach(function(v,m){if(!!v){var x=re(v),g=v.key,P=a===g?"".concat(s,"-tab-active"):"";P+=" ".concat(s,"-tab");var B={},h=x.disabled;h?P+=" ".concat(s,"-tab-disabled"):B.onClick=function(){e.__emit("tabClick",g)};var C=R(v,"tab"),T=o&&m===n.length-1?0:o;T=typeof T=="number"?"".concat(T,"px"):T;var $=d==="rtl"?"marginLeft":"marginRight",L=u({},z(c)?"marginBottom":$,T);st(C!==void 0,"There must be `tab` property or slot on children of Tabs.");var S=f("div",_(_({role:"tab","aria-disabled":h?"true":"false","aria-selected":a===g?"true":"false"},B),{},{class:P.trim(),key:g,style:L,ref:a===g?l("activeTab"):U}),[C]);y&&(S=y(S)),p.push(S)}}),f("div",{ref:this.saveRef("navTabsContainer")},[p])}},ct=globalThis&&globalThis.__rest||function(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(r);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(r,n[a])&&(t[n[a]]=r[n[a]]);return t};function Q(){}var lt={name:"TabBarRootNode",mixins:[I],inheritAttrs:!1,props:{saveRef:i.func.def(Q),getRef:i.func.def(Q),prefixCls:i.string.def(""),tabBarPosition:i.string.def("top"),extraContent:i.any},methods:{onKeyDown:function(e){this.__emit("keydown",e)}},render:function(){var e,t=this.prefixCls,n=this.onKeyDown,a=this.tabBarPosition,s=this.extraContent,o=this.$attrs,l=o.class,c=o.style;o.onKeydown;var d=ct(o,["class","style","onKeydown"]),p=(e={},u(e,"".concat(t,"-bar"),!0),u(e,l,!!l),e),y=a==="top"||a==="bottom",v=y?{float:"right"}:{},m=W(this),x=m;return s&&(x=[k(s,{key:"extra",style:b({},v)}),k(m,{key:"content"})],x=y?x:x.reverse()),f("div",_({role:"tablist",class:p,tabindex:"0",onKeydown:n,style:c,ref:this.saveRef("root")},ce(d)),[x])}},ft={name:"ScrollableTabBarNode",mixins:[I],inheritAttrs:!1,props:{activeKey:i.any,getRef:i.func.def(function(){}),saveRef:i.func.def(function(){}),tabBarPosition:i.oneOf(["left","right","top","bottom"]).def("left"),prefixCls:i.string.def(""),scrollAnimated:i.looseBool.def(!0),navWrapper:i.func.def(function(r){return r}),prevIcon:i.any,nextIcon:i.any,direction:i.string},data:function(){return this.offset=0,this.prevProps=b({},this.$props),{next:!1,prev:!1}},watch:{tabBarPosition:function(){var e=this;this.tabBarPositionChange=!0,this.$nextTick(function(){e.setOffset(0)})}},mounted:function(){var e=this;this.$nextTick(function(){e.updatedCal(),e.debouncedResize=$e(function(){e.setNextPrev(),e.scrollToActiveTab()},200),e.resizeObserver=new Se(e.debouncedResize),e.resizeObserver.observe(e.$props.getRef("container"))})},updated:function(){var e=this;this.$nextTick(function(){e.updatedCal(e.prevProps),e.prevProps=b({},e.$props)})},beforeUnmount:function(){this.resizeObserver&&this.resizeObserver.disconnect(),this.debouncedResize&&this.debouncedResize.cancel&&this.debouncedResize.cancel()},methods:{updatedCal:function(e){var t=this,n=this.$props;if(e&&e.tabBarPosition!==n.tabBarPosition){this.setOffset(0);return}this.isNextPrevShown(this.$data)!==this.isNextPrevShown(this.setNextPrev())?(this.$forceUpdate(),this.$nextTick(function(){t.scrollToActiveTab()})):(!e||n.activeKey!==e.activeKey)&&this.scrollToActiveTab()},setNextPrev:function(){var e=this.$props.getRef("nav"),t=this.$props.getRef("navTabsContainer"),n=this.getScrollWH(t||e),a=this.getOffsetWH(this.$props.getRef("container"))+1,s=this.getOffsetWH(this.$props.getRef("navWrap")),o=this.offset,l=a-n,c=this.next,d=this.prev;if(l>=0)c=!1,this.setOffset(0,!1),o=0;else if(l<o)c=!0;else{c=!1;var p=s-n;this.setOffset(p,!1),o=p}return o<0?d=!0:d=!1,this.setNext(c),this.setPrev(d),{next:c,prev:d}},getOffsetWH:function(e){var t=this.$props.tabBarPosition,n="offsetWidth";return(t==="left"||t==="right")&&(n="offsetHeight"),e[n]},getScrollWH:function(e){var t=this.tabBarPosition,n="scrollWidth";return(t==="left"||t==="right")&&(n="scrollHeight"),e[n]},getOffsetLT:function(e){var t=this.$props.tabBarPosition,n="left";return(t==="left"||t==="right")&&(n="top"),e.getBoundingClientRect()[n]},setOffset:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,n=Math.min(0,e);if(this.offset!==n){this.offset=n;var a={},s=this.$props.tabBarPosition,o=this.$props.getRef("nav").style,l=se(o);s==="left"||s==="right"?l?a={value:"translate3d(0,".concat(n,"px,0)")}:a={name:"top",value:"".concat(n,"px")}:l?(this.$props.direction==="rtl"&&(n=-n),a={value:"translate3d(".concat(n,"px,0,0)")}):a={name:"left",value:"".concat(n,"px")},l?D(o,a.value):o[a.name]=a.value,t&&this.setNextPrev()}},setPrev:function(e){this.prev!==e&&(this.prev=e)},setNext:function(e){this.next!==e&&(this.next=e)},isNextPrevShown:function(e){return e?e.next||e.prev:this.next||this.prev},prevTransitionEnd:function(e){if(e.propertyName==="opacity"){var t=this.$props.getRef("container");this.scrollToActiveTab({target:t,currentTarget:t})}},scrollToActiveTab:function(e){var t=this.$props.getRef("activeTab"),n=this.$props.getRef("navWrap");if(!(e&&e.target!==e.currentTarget||!t)){var a=this.isNextPrevShown()&&this.lastNextPrevShown;if(this.lastNextPrevShown=this.isNextPrevShown(),!!a){var s=this.getScrollWH(t),o=this.getOffsetWH(n),l=this.offset,c=this.getOffsetLT(n),d=this.getOffsetLT(t);c>d?(l+=c-d,this.setOffset(l)):c+o<d+s&&(l-=d+s-(c+o),this.setOffset(l))}}},prevClick:function(e){this.__emit("prevClick",e);var t=this.$props.getRef("navWrap"),n=this.getOffsetWH(t),a=this.offset;this.setOffset(a+n)},nextClick:function(e){this.__emit("nextClick",e);var t=this.$props.getRef("navWrap"),n=this.getOffsetWH(t),a=this.offset;this.setOffset(a-n)}},render:function(){var e,t,n,a,s=this.next,o=this.prev,l=this.$props,c=l.prefixCls,d=l.scrollAnimated,p=l.navWrapper,y=R(this,"prevIcon"),v=R(this,"nextIcon"),m=o||s,x=f("span",{onClick:o&&this.prevClick,unselectable:"unselectable",class:(e={},u(e,"".concat(c,"-tab-prev"),1),u(e,"".concat(c,"-tab-btn-disabled"),!o),u(e,"".concat(c,"-tab-arrow-show"),m),e),onTransitionend:this.prevTransitionEnd},[y||f("span",{class:"".concat(c,"-tab-prev-icon")},null)]),g=f("span",{onClick:s&&this.nextClick,unselectable:"unselectable",class:(t={},u(t,"".concat(c,"-tab-next"),1),u(t,"".concat(c,"-tab-btn-disabled"),!s),u(t,"".concat(c,"-tab-arrow-show"),m),t)},[v||f("span",{class:"".concat(c,"-tab-next-icon")},null)]),P="".concat(c,"-nav"),B=(n={},u(n,P,!0),u(n,d?"".concat(P,"-animated"):"".concat(P,"-no-animated"),!0),n);return f("div",{class:(a={},u(a,"".concat(c,"-nav-container"),1),u(a,"".concat(c,"-nav-container-scrolling"),m),a),key:"container",ref:this.saveRef("container")},[x,g,f("div",{class:"".concat(c,"-nav-wrap"),ref:this.saveRef("navWrap")},[f("div",{class:"".concat(c,"-nav-scroll")},[f("div",{class:B,ref:this.saveRef("nav")},[p(W(this))])])])])}},dt={props:{children:i.func.def(function(){return null})},methods:{getRef:function(e){return this[e]},saveRef:function(e){var t=this;return function(n){n&&(t[e]=n)}}},render:function(){var e=this,t=function(s){return e.saveRef(s)},n=function(s){return e.getRef(s)};return this.children(t,n)}},ee=N({name:"ScrollableInkTabBar",inheritAttrs:!1,render:function(){var e=this,t=this.$attrs.children;return f(dt,{children:function(a,s){return f(lt,_({saveRef:a},e.$attrs),{default:function(){return[f(ft,_({saveRef:a,getRef:s},e.$attrs),{default:function(){return[f(ot,_({saveRef:a},b(b({},e.$attrs),{renderTabBarNode:t})),null),f(rt,_({saveRef:a,getRef:s},e.$attrs),null)]}})]}})}},null)}}),ut=N({name:"TabBar",inheritAttrs:!1,props:{prefixCls:i.string,centered:i.looseBool.def(!1),tabBarStyle:i.style,tabBarExtraContent:i.VNodeChild,type:i.oneOf(K("line","card","editable-card")),tabPosition:i.oneOf(K("top","right","bottom","left")).def("top"),tabBarPosition:i.oneOf(K("top","right","bottom","left")),size:i.oneOf(K("default","small","large")),animated:{type:[Boolean,Object],default:void 0},renderTabBar:i.func,panels:i.array.def([]),activeKey:i.oneOfType([i.string,i.number]),tabBarGutter:i.number},render:function(){var e,t=this.$props,n=t.centered,a=t.tabBarStyle,s=t.animated,o=s===void 0?!0:s,l=t.renderTabBar,c=t.tabBarExtraContent,d=t.tabPosition,p=t.prefixCls,y=t.type,v=y===void 0?"line":y,m=t.size,x=ae(o)==="object"?o.inkBar:o,g=d==="left"||d==="right",P=f("span",{class:"".concat(p,"-tab-prev-icon")},[g?f(Ye,{class:"".concat(p,"-tab-prev-icon-target")},null):f(nt,{class:"".concat(p,"-tab-prev-icon-target")},null)]),B=f("span",{class:"".concat(p,"-tab-next-icon")},[g?f(Ee,{class:"".concat(p,"-tab-next-icon-target")},null):f(_e,{class:"".concat(p,"-tab-next-icon-target")},null)]),h=(e={},u(e,this.$attrs.class,this.$attrs.class),u(e,"".concat(p,"-centered-bar"),n),u(e,"".concat(p,"-").concat(d,"-bar"),!0),u(e,"".concat(p,"-").concat(m,"-bar"),!!m),u(e,"".concat(p,"-card-bar"),v&&v.indexOf("card")>=0),e),C=b(b(b({},this.$props),this.$attrs),{children:null,inkBarAnimated:x,extraContent:c,prevIcon:P,nextIcon:B,style:a,class:h});return l?l(b(b({},C),{DefaultTabBar:ee})):f(ee,C,null)}}),vt=ut,pt=globalThis&&globalThis.__rest||function(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(r);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(r,n[a])&&(t[n[a]]=r[n[a]]);return t},O=N({TabPane:fe,name:"ATabs",inheritAttrs:!1,props:{prefixCls:i.string,activeKey:i.oneOfType([i.string,i.number]),defaultActiveKey:i.oneOfType([i.string,i.number]),hideAdd:i.looseBool.def(!1),centered:i.looseBool.def(!1),tabBarStyle:i.object,tabBarExtraContent:i.any,destroyInactiveTabPane:i.looseBool.def(!1),type:i.oneOf(K("line","card","editable-card")),tabPosition:i.oneOf(["top","right","bottom","left"]).def("top"),size:i.oneOf(["default","small","large"]),animated:we(i.oneOfType([i.looseBool,i.object])),tabBarGutter:i.number,renderTabBar:i.func,onChange:{type:Function},onTabClick:i.func,onPrevClick:{type:Function},onNextClick:{type:Function},onEdit:{type:Function}},emits:["update:activeKey","edit","change"],setup:function(){return{configProvider:ne("configProvider",ke)}},methods:{removeTab:function(e,t){t.stopPropagation(),te(e)&&this.$emit("edit",e,"remove")},handleChange:function(e){this.$emit("update:activeKey",e),this.$emit("change",e)},createNewTab:function(e){this.$emit("edit",e,"add")}},render:function(){var e,t=this,n,a=Re(this),s=a.prefixCls,o=a.size,l=a.type,c=l===void 0?"line":l,d=a.tabPosition,p=a.animated,y=p===void 0?!0:p,v=a.hideAdd,m=a.renderTabBar,x=this.$attrs,g=x.class,P=pt(x,["class"]),B=this.configProvider.getPrefixCls,h=B("tabs",s),C=Ne(W(this)),T=R(this,"tabBarExtraContent"),$=ae(y)==="object"?y.tabPane:y;c!=="line"&&($="animated"in a?$:!1);var L=(e={},u(e,g,g),u(e,"".concat(h,"-vertical"),d==="left"||d==="right"),u(e,"".concat(h,"-").concat(o),!!o),u(e,"".concat(h,"-card"),c.indexOf("card")>=0),u(e,"".concat(h,"-").concat(c),!0),u(e,"".concat(h,"-no-animation"),!$),e),S=[];c==="editable-card"&&(S=[],C.forEach(function(w,ge){var ye=re(w),A=ye.closable;A=typeof A=="undefined"?!0:A;var me=A?f(Ae,{class:"".concat(h,"-close-x"),onClick:function(Te){return t.removeTab(w.key,Te)}},null):null;S.push(k(w,{tab:f("div",{class:A?void 0:"".concat(h,"-tab-unclosable")},[R(w,"tab"),me]),key:w.key||ge}))}),v||(T=f("span",null,[f(je,{class:"".concat(h,"-new-tab"),onClick:this.createNewTab},null),T]))),T=T?f("div",{class:"".concat(h,"-extra-content")},[T]):null;var ve=m||this.$slots.renderTabBar,pe=b(b(b(b({},a),{prefixCls:h,tabBarExtraContent:T,renderTabBar:ve}),P),{children:C}),he=(n={},u(n,"".concat(h,"-").concat(d,"-content"),!0),u(n,"".concat(h,"-card-content"),c.indexOf("card")>=0),n),be=b(b(b(b({},a),{prefixCls:h,tabBarPosition:d,renderTabBar:function(){return f(vt,_({key:"tabBar"},pe),null)},renderTabContent:function(){return f(de,{class:he,animated:$,animatedWithMargin:!0},null)},children:S.length>0?S:C}),P),{onChange:this.handleChange,class:L});return f(Fe,be,null)}});O.TabPane=b(b({},fe),{name:"ATabPane",__ANT_TAB_PANE:!0});O.TabContent=b(b({},de),{name:"ATabContent"});O.install=function(r){return r.component(O.name,O),r.component(O.TabPane.name,O.TabPane),r.component(O.TabContent.name,O.TabContent),r};export{nt as L,O as T};
