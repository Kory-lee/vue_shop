import{as as _,a as v,aE as f,i as g,a1 as a,a2 as e,a3 as c,ab as C,ac as x,af as w,a4 as n,c as t,aK as E,aJ as i,a5 as s,a6 as B}from"./entry-index-59c4b1ac.js";import{C as T}from"./chunk-index-57b9b8ad.js";import"./chunk-index-44cae4a1.js";/* empty css                    */import{T as h}from"./chunk-index-d27f297f.js";import{c as y}from"./chunk-createAsyncComponent-70686f1f.js";import"./chunk-index-e30899d7.js";import"./chunk-index-fd369756.js";import"./chunk-Col-b57d8e1c.js";import"./chunk-responsiveObserve-8835c1d6.js";import"./chunk-_flatRest-879d047a.js";import"./chunk-_setToString-8cb76f28.js";import"./chunk-useRefs-9e91302d.js";import"./chunk-hasIn-48caf0de.js";const $=[{title:"\u8BBF\u95EE\u6570",icon:"visit-count|svg",value:2e3,total:12e4,color:"green",action:"\u6708"},{title:"\u6210\u4EA4\u989D",icon:"total-sales|svg",value:2e4,total:5e5,color:"blue",action:"\u6708"},{title:"\u4E0B\u8F7D\u6570",icon:"download-count|svg",value:8e3,total:12e4,color:"orange",action:"\u5468"},{title:"\u6210\u4EA4\u6570",icon:"transaction|svg",value:5e3,total:5e4,color:"purple",action:"\u5E74"}],b=y(()=>_(()=>import("./chunk-CountTo-072eac84.js"),["assets/chunk-CountTo-072eac84.js","assets/entry-index-59c4b1ac.js","assets/index.7205449a.css"])),k=v({name:"GrowCard",components:{Card:T,Tag:h,Icon:f,CountTo:b},props:{loading:Boolean},setup(){return{growCardList:$}}}),A={class:"md:flex"},D={class:"py-4 px-4 flex justify-between"},I={class:"p-2 px-4 flex justify-between"};function L(r,V,z,F,G,N){const u=a("Tag"),l=a("CountTo"),d=a("Icon"),p=a("Card");return e(),c("div",A,[(e(!0),c(C,null,x(r.growCardList,(o,m)=>(e(),w(p,{key:o.title,loading:r.loading,title:o.title,"can-expan":!1,class:B([[m+1<4&&"!md:mr-4"],"md:w-1/4 w-full !md:mt-0 !mt-4"]),size:"small"},{extra:n(()=>[t(u,{color:o.color},{default:n(()=>[E(i(o.action),1)]),_:2},1032,["color"])]),default:n(()=>[s("div",D,[t(l,{prefix:"$","start-val":1,"end-val":o.value,class:"text-2xl"},null,8,["end-val"]),t(d,{icon:o.icon,size:40},null,8,["icon"])]),s("div",I,[s("span",null,"\u603B"+i(o.title),1),t(l,{prefix:"$","start-val":1,"end-val":o.total},null,8,["end-val"])])]),_:2},1032,["loading","title","class"]))),128))])}var Y=g(k,[["render",L],["__file","/home/runner/work/admin/admin/src/views/dashboard/analysis/components/GrowCard.vue"]]);export{Y as default};
