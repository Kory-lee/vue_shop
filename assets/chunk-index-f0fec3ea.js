import{S as M,a as S,u as _,b as r,D,c as d,f as a,_ as f}from"./entry-index-204be9fe.js";var b={prefixCls:String,type:{type:String,default:"horizontal"},dashed:{type:Boolean,default:!1},orientation:{type:String,default:"center"},plain:{type:Boolean,default:!1},orientationMargin:[String,Number]},p=S({name:"ADivider",props:b,setup:function(n,s){var l=s.slots,u=_("divider",n),o=u.prefixCls,g=u.direction,c=r(function(){return n.orientation==="left"&&n.orientationMargin!=null}),v=r(function(){return n.orientation==="right"&&n.orientationMargin!=null}),h=r(function(){var t,i=n.type,y=n.dashed,C=n.plain,e=o.value;return t={},a(t,e,!0),a(t,"".concat(e,"-").concat(i),!0),a(t,"".concat(e,"-dashed"),!!y),a(t,"".concat(e,"-plain"),!!C),a(t,"".concat(e,"-rtl"),g.value==="rtl"),a(t,"".concat(e,"-no-default-orientation-margin-left"),c.value),a(t,"".concat(e,"-no-default-orientation-margin-right"),v.value),t}),m=r(function(){var t=typeof n.orientationMargin=="number"?"".concat(n.orientationMargin,"px"):n.orientationMargin;return f(f({},c.value&&{marginLeft:t}),v.value&&{marginRight:t})}),x=r(function(){return n.orientation.length>0?"-"+n.orientation:n.orientation});return function(){var t,i=D((t=l.default)===null||t===void 0?void 0:t.call(l));return d("div",{class:[h.value,i.length?"".concat(o.value,"-with-text ").concat(o.value,"-with-text").concat(x.value):""],role:"separator"},[i.length?d("span",{class:"".concat(o.value,"-inner-text"),style:m.value},[i]):null])}}}),P=M(p);export{P as D};
