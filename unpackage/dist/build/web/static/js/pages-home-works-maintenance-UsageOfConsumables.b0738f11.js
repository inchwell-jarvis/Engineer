(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-works-maintenance-UsageOfConsumables"],{"0b77":function(t,i,a){"use strict";a.r(i);var n=a("d709"),o=a("6d1d");for(var e in o)["default"].indexOf(e)<0&&function(t){a.d(i,t,(function(){return o[t]}))}(e);a("666a");var s=a("828b"),r=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"4dc206dc",null,!1,n["a"],void 0);i["default"]=r.exports},4932:function(t,i,a){var n=a("c86c");i=n(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.box[data-v-4dc206dc]{background-color:#fff;padding:0 5px;box-sizing:border-box}.box .text[data-v-4dc206dc]{text-indent:30px;margin-bottom:10px}.box .basicinformation[data-v-4dc206dc]{width:95%;background:#fff;margin:auto;border-radius:10px;margin-top:10px;margin-left:2.5%;margin-bottom:10px;border:1px solid silver;float:left}.box .basicinformation .Task1[data-v-4dc206dc]{width:95%;margin:auto;box-sizing:border-box;background-color:#007aff}.box .basicinformation .Task1 .head[data-v-4dc206dc]{width:80%;height:25px;background-color:#007aff;color:#fff;border-radius:5px;font-weight:700;overflow:hidden;line-height:25px;padding-left:15px;box-sizing:border-box;font-size:13px;float:left}.box .basicinformation .Task1 .ps[data-v-4dc206dc]{width:25px;height:25px;line-height:25px;box-sizing:border-box;float:left;margin-left:20px}.box .basicinformation .Task1 .ps uni-image[data-v-4dc206dc]{display:block;width:25px;height:25px;float:left}.box .basicinformation .Task1 .EquPhotos[data-v-4dc206dc]{width:100%;height:135px;background-color:#d8d8d8;border-radius:10px;float:left;margin-top:10px;margin-bottom:10px;padding:5px;box-sizing:border-box}.box .basicinformation .Task1 .EquPhotos .texts[data-v-4dc206dc]{width:100%;height:20px;line-height:20px;font-size:13px;font-weight:700}.box .basicinformation .Task1 .EquPhotos .texts uni-image[data-v-4dc206dc]{width:20px;height:20px;float:right}.box .basicinformation .Task1 .EquPhotos .pushimg[data-v-4dc206dc]{width:100%;height:105px}.box .basicinformation .Task1 .EquPhotos .pushimg .left[data-v-4dc206dc]{width:105px;height:105px;float:left;margin-left:20px;overflow:hidden}.box .basicinformation .Task1 .EquPhotos .pushimg .left .images[data-v-4dc206dc]{width:100%;height:100%}.box .basicinformation .Task1 .EquPhotos .pushimg .right[data-v-4dc206dc]{margin-left:60px}.box .basicinformation .text[data-v-4dc206dc]{width:95%;display:block;margin:auto;line-height:30px}.box .basicinformation .text .span[data-v-4dc206dc]{width:30%;display:block;height:100%;float:left;margin-right:20%}',""]),t.exports=i},"666a":function(t,i,a){"use strict";var n=a("80c0"),o=a.n(n);o.a},"6d1d":function(t,i,a){"use strict";a.r(i);var n=a("7b63"),o=a.n(n);for(var e in n)["default"].indexOf(e)<0&&function(t){a.d(i,t,(function(){return n[t]}))}(e);i["default"]=o.a},"7b63":function(t,i,a){"use strict";a("6a54"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{Data:[],Maintenan:this.$store.state.MaintenancestatusID}},created:function(){this.init()},methods:{init:function(){var t=this,i={url:this.$store.state.url+"Maintain/GetMSUsageInfo",method:"GET",header:this.$store.state.token,data:{Id:this.$store.state.MaintenancestatusID}};this.$http(i).then((function(i){console.log(i.Data.MSUsageInfoDtos),t.Data=i.Data.MSUsageInfoDtos}))}}};i.default=n},"80c0":function(t,i,a){var n=a("4932");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=a("967d").default;o("356b044b",n,!0,{sourceMap:!1,shadowMode:!1})},d709:function(t,i,a){"use strict";a.d(i,"b",(function(){return n})),a.d(i,"c",(function(){return o})),a.d(i,"a",(function(){}));var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"box"},t._l(t.Data,(function(i,n){return a("v-uni-view",{key:n,staticClass:"basicinformation"},[t.Maintenan==i.OrderId?a("v-uni-view",{staticStyle:{color:"#007AFF"}},[t._v("当前任务")]):t._e(),a("v-uni-view",{staticClass:"text"},[a("v-uni-view",{staticClass:"span"},[t._v("任务状态：")]),t._v(t._s(i.MaintainOrderStateStr))],1),a("v-uni-view",{staticClass:"text"},[a("v-uni-view",{staticClass:"span"},[t._v("任务单号：")]),t._v(t._s(i.OrderCode))],1),t._l(i.GoosDtos,(function(i,n){return a("v-uni-view",{key:n,staticClass:"text",staticStyle:{"background-color":"#dfdfe5","border-radius":"5px","margin-bottom":"5px"}},[a("v-uni-view",{staticClass:"span"},[t._v("需求："+t._s(i.Quantity))]),a("v-uni-view",{staticClass:"span"},[t._v("已发："+t._s(i.Quantity))]),a("v-uni-view",{staticStyle:{width:"100%"}},[t._v("描述："+t._s(i.ProDesc)+"'这是描述，这是描述这是描述这是描述这是描述这是描述'")])],1)})),0==i.GoosDtos.length?a("v-uni-view",{staticStyle:{"text-align":"right",color:"#DD524D"}},[t._v("此任务未选择耗材")]):t._e()],2)})),1)},o=[]}}]);