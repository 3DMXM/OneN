import{_ as x}from"./index.fbc522f6.js";import{o as i,h as p,C as M,i as e,t as f,y as q,z as L,n as v,r as I,k as c,w as y,F as C,j as R,m as N,D as F,E as S,q as h,s as m,c as V,G as A}from"./vendor.d9abb3a6.js";import{_ as g}from"./plugin-vue_export-helper.21dcd24c.js";var D="/favicon.ico";const z={name:"Header"},B={class:"nav"},E=M('<div class="navSize" data-v-63a503d6><a href="/" data-v-63a503d6><img class="avatar" src="'+D+'" data-v-63a503d6></a><div class="navRight" data-v-63a503d6><li class="navli" data-v-63a503d6><a href="https://www.aoe.top" target="_blank" data-v-63a503d6>\u535A\u5BA2</a></li><li class="navli" data-v-63a503d6><a href="https://mod.3dmgame.com/u/9688990" target="_blank" data-v-63a503d6>Mod</a></li><li class="navli" data-v-63a503d6><a href="https://wanwang.aliyun.com/nametrade/detail/online.html?domainName=aoe.top" target="_blank" data-v-63a503d6>\u4E70\u4E0B\u6211</a></li></div></div>',1),j=[E];function H(a,o,r,d,_,t){return i(),p("header",B,j)}var O=g(z,[["render",H],["__scopeId","data-v-63a503d6"]]);const P={name:"Fotter",computed:{year(){return new Date().getFullYear()}},methods:{buyMeCoffee(){layer.open({type:1,area:["300px","400px"],title:"\u7ED9\u5C0F\u83AB\u6295\u98DF",resize:!1,scrollbar:!1,shadeClose:!0,content:'<div class="donate-box"><div class="meta-pay text-center"><strong>\u5C0F\u83AB\u5DF2\u7ECF\u5FEB\u8981\u997F\u6B7B\u4E86<br/>\u5FEB\u6765\u7ED9\u5C0F\u83AB\u6295\u5582\u70B9\u98DF\u7269\u5427~</strong></div> <div class="qr-pay text-center"><img class="pay-img" id="alipay_qr" src="https://code.aoe.top/img/buyMeCoffee/zfb.png"><img class="pay-img d-none" id="wechat_qr" src="https://code.aoe.top/img/buyMeCoffee/wx.png"></div><div class="choose-pay text-center mt-2"><input id="alipay" type="radio" name="pay-method" checked><label for="alipay" class="pay-button"><img src="https://code.aoe.top/img/buyMeCoffee/alipay.png"></label><input id="wechatpay" type="radio" name="pay-method"><label for="wechatpay" class="pay-button"><img src="https://code.aoe.top/img/buyMeCoffee/wechat.png"></label></div></div>'}),$('.choose-pay input[type="radio"]').click(function(){var a=$(this).attr("id");a=="alipay"&&($(".qr-pay #alipay_qr").removeClass("d-none"),$(".qr-pay #wechat_qr").addClass("d-none")),a=="wechatpay"&&($(".qr-pay #alipay_qr").addClass("d-none"),$(".qr-pay #wechat_qr").removeClass("d-none"))})}}},b=a=>(q("data-v-4eb18bca"),a=a(),L(),a),T={class:"fotter"},U=b(()=>e("p",null,[e("a",{href:"https://www.aoe.top/notes/490",target:"_blank"},"\u4E0B\u8F7D\u901F\u5EA6\u6162\u63D0\u901F\u65B9\u6848"),v("| "),e("a",{href:"https://www.aoe.top/notes/497",target:"_blank"},"\u4E0B\u8F7D\u63D0\u793A\u9700\u8981\u767B\u5F55\uFF1F"),v("| "),e("a",{href:"https://www.aoe.top/notes/511",target:"_blank"},"\u4E0B\u8F7D\u5B8C\u4E0D\u4F1A\u5B89\u88C5\uFF1F")],-1)),G={class:"buyMeCoffee"},Y=b(()=>e("source",{srcset:"https://mod.3dmgame.com/static/upload/mod/202201/MOD61e506a426bd9.webp",type:"image/webp"},null,-1)),J=b(()=>e("img",{src:"https://code.aoe.top/img/buyMeCoffee/buyMeCoffee.png",alt:"\u7ED9\u5C0F\u83AB\u6295\u98DF"},null,-1)),K=[Y,J];function Q(a,o,r,d,_,t){return i(),p("div",T,[e("p",null,"\u5C0F\u83AB\u7F51\u76D8 @2020-"+f(t.year)+" \u5982\u679C\u7F51\u76D8\u4E2D\u6709\u5305\u542B\u4FB5\u72AF\u60A8\u6743\u5229\u7684\u5185\u5BB9\uFF0C\u8BF7\u8054\u7CFB\u90AE\u7BB1xm@xmsky.onmicrosoft.com",1),U,e("p",null,[e("span",{class:"buyMeCoffee-a",onClick:o[0]||(o[0]=(...n)=>t.buyMeCoffee&&t.buyMeCoffee(...n))},"\u7ED9\u5C0F\u83AB\u6295\u98DF")]),e("p",null,"CopyRight 2021-"+f(t.year)+" www.aoe.top All Right Reserved \u6E58ICP\u59072021011453\u53F7-1",1),e("div",G,[e("picture",{onClick:o[1]||(o[1]=(...n)=>t.buyMeCoffee&&t.buyMeCoffee(...n))},K)])])}var W=g(P,[["render",Q],["__scopeId","data-v-4eb18bca"]]);const X={name:"Navigation",props:["isChild","pathList"]},Z={class:"mdui-toolbar nexmoe-item"},ee=e("i",{class:"mdui-icon material-icons mdui-icon-dark",style:{margin:"0"}},"chevron_right",-1);function ae(a,o,r,d,_,t){const n=I("RouterLink");return i(),p("div",Z,[c(n,{to:"/"},{default:y(()=>[v(f(a.$store.state.site_name),1)]),_:1}),r.isChild?(i(!0),p(C,{key:0},R(r.pathList,(s,l)=>(i(),p(C,{key:l},[ee,c(n,{to:s.path},{default:y(()=>[v(f(s.name),1)]),_:2},1032,["to"])],64))),128)):N("",!0)])}var te=g(X,[["render",ae]]);const se={class:"index"},oe={class:"mdui-container"},ne=e("h3",null,"\u6587\u4EF6\u52A0\u8F7D\u4E2D...",-1),ie={name:"IndexView"},ce=Object.assign(ie,{setup(a){const o=F(()=>x(()=>import("./FileList.a12e7dec.js"),["assets/FileList.a12e7dec.js","assets/FileList.ac41b10d.css","assets/vendor.d9abb3a6.js","assets/plugin-vue_export-helper.21dcd24c.js"])),r=S();let d=h(()=>decodeURIComponent(r.params.path)),_=h(()=>{let s=d.value.split("/");return s.shift(),s}),t=h(()=>{let s=[],l=_.value;for(let u=0;u<l.length;u++){let w=decodeURIComponent(l[u]),k="/"+l.slice(0,u+1).join("/");s.push({name:w,path:k})}return s}),n=h(()=>d.value!=="/");return(s,l)=>(i(),p("div",se,[c(O),e("div",oe,[c(te,{pathList:m(t),isChild:m(n)},null,8,["pathList","isChild"]),(i(),V(A,null,{default:y(()=>[c(m(o),{path:m(d)},null,8,["path"])]),fallback:y(()=>[ne]),_:1}))]),c(W)]))}});export{ce as default};