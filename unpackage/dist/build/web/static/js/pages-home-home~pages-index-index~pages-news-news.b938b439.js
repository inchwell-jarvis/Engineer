(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-home~pages-index-index~pages-news-news"],{"1c9a":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var a={uIcon:n("fdc6").default,uBadge:n("b8ae").default},r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.show?n("v-uni-view",{staticClass:"u-tabbar",on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),function(){}.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"u-tabbar__content safe-area-inset-bottom",class:{"u-border-top":t.borderTop},style:{height:t.$u.addUnit(t.height),backgroundColor:t.bgColor}},[t._l(t.list,(function(e,a){return n("v-uni-view",{key:a,staticClass:"u-tabbar__content__item",class:{"u-tabbar__content__circle":t.midButton&&e.midButton},style:{backgroundColor:t.bgColor},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.clickHandler(a)}}},[n("v-uni-view",{class:[t.midButton&&e.midButton?"u-tabbar__content__circle__button":"u-tabbar__content__item__button"]},[n("u-icon",{attrs:{size:t.midButton&&e.midButton?t.midButtonSize:t.iconSize,name:t.elIconPath(a),"img-mode":"scaleToFill",color:t.elColor(a),"custom-prefix":e.customIcon?"custom-icon":"uicon"}}),e.count?n("u-badge",{attrs:{count:e.count,"is-dot":e.isDot,offset:[-2,t.getOffsetRight(e.count,e.isDot)]}}):t._e()],1),n("v-uni-view",{staticClass:"u-tabbar__content__item__text",style:{color:t.elColor(a)}},[n("v-uni-text",{staticClass:"u-line-1"},[t._v(t._s(e.text))])],1)],1)})),t.midButton?n("v-uni-view",{staticClass:"u-tabbar__content__circle__border",class:{"u-border":t.borderTop},style:{backgroundColor:t.bgColor,left:t.midButtonLeft}}):t._e()],2),n("v-uni-view",{staticClass:"u-fixed-placeholder safe-area-inset-bottom",style:{height:"calc("+t.$u.addUnit(t.height)+" + "+(t.midButton?48:0)+"rpx)"}})],1):t._e()},o=[]},2740:function(t,e,n){"use strict";var a=n("e0b3"),r=n.n(a);r.a},3454:function(t,e,n){var a=n("c86c");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-badge[data-v-2aee38b6]{display:inline-flex;justify-content:center;align-items:center;line-height:%?24?%;padding:%?4?% %?8?%;border-radius:%?100?%;z-index:9}.u-badge--bg--primary[data-v-2aee38b6]{background-color:#2979ff}.u-badge--bg--error[data-v-2aee38b6]{background-color:#fa3534}.u-badge--bg--success[data-v-2aee38b6]{background-color:#19be6b}.u-badge--bg--info[data-v-2aee38b6]{background-color:#909399}.u-badge--bg--warning[data-v-2aee38b6]{background-color:#f90}.u-badge-dot[data-v-2aee38b6]{height:%?16?%;width:%?16?%;border-radius:%?100?%;line-height:1}.u-badge-mini[data-v-2aee38b6]{-webkit-transform:scale(.8);transform:scale(.8);-webkit-transform-origin:center center;transform-origin:center center}.u-info[data-v-2aee38b6]{background-color:#909399;color:#fff}',""]),t.exports=e},"44c3":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.show?n("v-uni-view",{staticClass:"u-badge",class:[t.isDot?"u-badge-dot":"","mini"==t.size?"u-badge-mini":"",t.type?"u-badge--bg--"+t.type:""],style:[{top:t.offset[0]+"rpx",right:t.offset[1]+"rpx",fontSize:t.fontSize+"rpx",position:t.absolute?"absolute":"static",color:t.color,backgroundColor:t.bgColor},t.boxStyle]},[t._v(t._s(t.showText))]):t._e()},r=[]},"6ed6":function(t,e,n){"use strict";n.r(e);var a=n("f58c"),r=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},8904:function(t,e,n){"use strict";n("6a54"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("64aa");var a={name:"u-badge",props:{type:{type:String,default:"error"},size:{type:String,default:"default"},isDot:{type:Boolean,default:!1},count:{type:[Number,String]},overflowCount:{type:Number,default:99},showZero:{type:Boolean,default:!1},offset:{type:Array,default:function(){return[20,20]}},absolute:{type:Boolean,default:!0},fontSize:{type:[String,Number],default:"24"},color:{type:String,default:"#ffffff"},bgColor:{type:String,default:""},isCenter:{type:Boolean,default:!1}},computed:{boxStyle:function(){var t={};return this.isCenter?(t.top=0,t.right=0,t.transform="translateY(-50%) translateX(50%)"):(t.top=this.offset[0]+"rpx",t.right=this.offset[1]+"rpx",t.transform="translateY(0) translateX(0)"),"mini"==this.size&&(t.transform=t.transform+" scale(0.8)"),t},showText:function(){return this.isDot?"":this.count>this.overflowCount?"".concat(this.overflowCount,"+"):this.count},show:function(){return 0!=this.count||0!=this.showZero}}};e.default=a},9884:function(t,e,n){var a=n("c86c");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-fixed-placeholder[data-v-6a2f247c]{box-sizing:initial}.u-tabbar__content[data-v-6a2f247c]{display:flex;flex-direction:row;align-items:center;position:relative;position:fixed;bottom:0;left:0;width:100%;z-index:998;box-sizing:initial}.u-tabbar__content__circle__border[data-v-6a2f247c]{border-radius:100%;width:%?110?%;height:%?110?%;top:%?-48?%;position:absolute;z-index:4;background-color:#fff;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.u-tabbar__content__circle__border[data-v-6a2f247c]:after{border-radius:100px}.u-tabbar__content__item[data-v-6a2f247c]{flex:1;justify-content:center;height:100%;padding:%?12?% 0;display:flex;flex-direction:row;flex-direction:column;align-items:center;position:relative}.u-tabbar__content__item__button[data-v-6a2f247c]{position:absolute;top:%?14?%;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.u-tabbar__content__item__text[data-v-6a2f247c]{color:#606266;font-size:%?26?%;line-height:%?28?%;position:absolute;bottom:%?14?%;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.u-tabbar__content__circle[data-v-6a2f247c]{position:relative;display:flex;flex-direction:row;flex-direction:column;justify-content:space-between;z-index:10;height:calc(100% - 1px)}.u-tabbar__content__circle__button[data-v-6a2f247c]{width:%?90?%;height:%?90?%;border-radius:100%;display:flex;flex-direction:row;justify-content:center;align-items:center;position:absolute;background-color:#fff;top:%?-40?%;left:50%;z-index:6;-webkit-transform:translateX(-50%);transform:translateX(-50%)}',""]),t.exports=e},b8ae:function(t,e,n){"use strict";n.r(e);var a=n("44c3"),r=n("f48c");for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("f44a");var i=n("828b"),u=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,"2aee38b6",null,!1,a["a"],void 0);e["default"]=u.exports},c68c:function(t,e,n){"use strict";n.r(e);var a=n("1c9a"),r=n("6ed6");for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("2740");var i=n("828b"),u=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,"6a2f247c",null,!1,a["a"],void 0);e["default"]=u.exports},e0b3:function(t,e,n){var a=n("9884");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var r=n("967d").default;r("7770256f",a,!0,{sourceMap:!1,shadowMode:!1})},f44a:function(t,e,n){"use strict";var a=n("f8a2"),r=n.n(a);r.a},f48c:function(t,e,n){"use strict";n.r(e);var a=n("8904"),r=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},f58c:function(t,e,n){"use strict";n("6a54");var a=n("f5bd").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("2634")),o=a(n("2fdc"));n("64aa");var i={props:{show:{type:Boolean,default:!0},value:{type:[String,Number],default:0},bgColor:{type:String,default:"#ffffff"},height:{type:[String,Number],default:"50px"},iconSize:{type:[String,Number],default:40},midButtonSize:{type:[String,Number],default:90},activeColor:{type:String,default:"#303133"},inactiveColor:{type:String,default:"#606266"},midButton:{type:Boolean,default:!1},list:{type:Array,default:function(){return[]}},beforeSwitch:{type:Function,default:null},borderTop:{type:Boolean,default:!0},hideTabBar:{type:Boolean,default:!0}},data:function(){return{midButtonLeft:"50%",pageUrl:""}},created:function(){this.hideTabBar&&uni.hideTabBar();var t=getCurrentPages();this.pageUrl=t[t.length-1].route},computed:{elIconPath:function(){var t=this;return function(e){var n=t.list[e].pagePath;return n?n==t.pageUrl||n=="/"+t.pageUrl?t.list[e].selectedIconPath:t.list[e].iconPath:e==t.value?t.list[e].selectedIconPath:t.list[e].iconPath}},elColor:function(){var t=this;return function(e){var n=t.list[e].pagePath;return n?n==t.pageUrl||n=="/"+t.pageUrl?t.activeColor:t.inactiveColor:e==t.value?t.activeColor:t.inactiveColor}}},mounted:function(){this.midButton&&this.getMidButtonLeft()},methods:{clickHandler:function(t){var e=this;return(0,o.default)((0,r.default)().mark((function n(){var a;return(0,r.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e.beforeSwitch||"function"!==typeof e.beforeSwitch){n.next=10;break}if(a=e.beforeSwitch.bind(e.$u.$parent.call(e))(t),!a||"function"!==typeof a.then){n.next=7;break}return n.next=5,a.then((function(n){e.switchTab(t)})).catch((function(t){}));case 5:n.next=8;break;case 7:!0===a&&e.switchTab(t);case 8:n.next=11;break;case 10:e.switchTab(t);case 11:case"end":return n.stop()}}),n)})))()},switchTab:function(t){this.$emit("change",t),this.list[t].pagePath?uni.switchTab({url:this.list[t].pagePath}):this.$emit("input",t)},getOffsetRight:function(t,e){return e?-20:t>9?-40:-30},getMidButtonLeft:function(){var t=this.$u.sys().windowWidth;this.midButtonLeft=t/2+"px"}}};e.default=i},f8a2:function(t,e,n){var a=n("3454");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var r=n("967d").default;r("5fa17c75",a,!0,{sourceMap:!1,shadowMode:!1})}}]);