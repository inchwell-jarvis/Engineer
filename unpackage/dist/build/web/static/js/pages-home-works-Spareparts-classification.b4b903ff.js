(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-works-Spareparts-classification"],{"2ec5":function(t,e,n){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},4192:function(t,e,n){"use strict";n.r(e);var i=n("6b35"),a=n("4373");for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("7a30");var s=n("828b"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"cfc3ef9a",null,!1,i["a"],void 0);e["default"]=c.exports},4373:function(t,e,n){"use strict";n.r(e);var i=n("4cba"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},"4cba":function(t,e,n){"use strict";n("6a54"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{imgurl:[{url:"/static/image/1.jpg",text:"举升机",index:1},{url:"/static/image/2.jpg",text:"轮胎维修设备",index:2},{url:"/static/image/7.jpg",text:"清洁设备",index:7},{url:"/static/image/3.jpg",text:"悬架调整设备",index:3},{url:"/static/image/4.jpg",text:"制动系统维修设备",index:4},{url:"/static/image/5.jpg",text:"空调设备",index:5},{url:"/static/image/6.jpg",text:"车灯调整设备",index:6},{url:"/static/image/8.jpg",text:"钣金设备",index:8},{url:"/static/image/9.jpg",text:"喷漆设备",index:9},{url:"/static/image/2.jpg",text:"一般设备",index:10}]}},onLoad:function(t){"init"==t.state&&(this.$store.state.initstates=!0),"Finishcreating"==t.state&&(this.$store.state.initstates=!1)},onBackPress:function(){return uni.navigateTo({url:"../work.7"}),!0},created:function(){},methods:{RouverView:function(){uni.navigateTo({url:"./Spareparts"})},enter:function(t){var e=this;if(99==t)return uni.navigateTo({url:"./ReXiaoShangPin"}),!1;var n={url:this.$store.state.url+"System/GetPartDrawing",method:"GET",header:this.$store.state.token,data:{sparePartsType:t}};this.$http(n).then((function(t){console.log(t),e.$store.state.Ninedetails=t.Data.sparePartsReclassifys,uni.navigateTo({url:"./Navigationindetail"})}))}}};e.default=i},"6b35":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={uIcon:n("fdc6").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"box"},[n("v-uni-view",{staticClass:"Top10",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.enter(99)}}}),t._l(t.imgurl,(function(e,i){return n("v-uni-view",{key:i,staticClass:"img",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.enter(e.index)}}},[n("v-uni-image",{attrs:{src:e.url,mode:""}}),n("v-uni-text",[t._v(t._s(e.text))])],1)})),n("v-uni-text",{staticStyle:{position:"fixed",bottom:"30px",right:"30px","line-height":"30px",color:"#007AFF","font-size":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.RouverView()}}},[t._v("找不到设备，点击这里"),n("u-icon",{attrs:{name:"search"}})],1)],2)},r=[]},"7a30":function(t,e,n){"use strict";var i=n("cdca"),a=n.n(i);a.a},8089:function(t,e,n){var i=n("c86c"),a=n("2ec5"),r=n("8ba8");e=i(!1);var s=a(r);e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.img[data-v-cfc3ef9a]{width:calc(100% / 3);height:160px;text-align:center;float:left;border:5px solid #fff;overflow:hidden;box-sizing:border-box;line-height:30px;font-weight:700}.img uni-image[data-v-cfc3ef9a]{width:100%;height:125px;display:block;border-radius:30px 5px;-webkit-box-shadow:0 3px 3px #c8c8c8;-moz-box-shadow:0 3px 3px #c8c8c8;box-shadow:0 3px 3px #c8c8c8}.Top10[data-v-cfc3ef9a]{width:100%;height:100px;float:left;background-image:url('+s+");background-size:100%}",""]),t.exports=e},"8ba8":function(t,e,n){t.exports=n.p+"static/image/Top10.png"},cdca:function(t,e,n){var i=n("8089");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("967d").default;a("74f6ca62",i,!0,{sourceMap:!1,shadowMode:!1})}}]);