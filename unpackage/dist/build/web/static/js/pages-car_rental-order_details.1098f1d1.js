(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-car_rental-order_details"],{"05dd":function(t,a,e){"use strict";e.r(a);var i=e("43e6"),n=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return i[t]}))}(o);a["default"]=n.a},"18cb":function(t,a,e){"use strict";var i=e("90d4"),n=e.n(i);n.a},"214b":function(t,a,e){"use strict";e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){}));var i=function(){var t=this.$createElement,a=this._self._c||t;return a("v-uni-view",{staticClass:"u-time-axis-item"},[this._t("content"),a("v-uni-view",{staticClass:"u-time-axis-node",style:[this.nodeStyle]},[this._t("node",[a("v-uni-view",{staticClass:"u-dot"})])],2)],2)},n=[]},"2ec5":function(t,a,e){"use strict";t.exports=function(t,a){return a||(a={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),a.hash&&(t+=a.hash),/["'() \t\n]/.test(t)||a.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},3361:function(t,a,e){"use strict";e.r(a);var i=e("f94c"),n=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return i[t]}))}(o);a["default"]=n.a},"3e17":function(t,a,e){"use strict";e.r(a);var i=e("bc7a"),n=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return i[t]}))}(o);a["default"]=n.a},4222:function(t,a,e){"use strict";var i=e("4e29"),n=e.n(i);n.a},"43e6":function(t,a,e){"use strict";e("6a54"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,e("5c47"),e("0506"),e("795c"),e("c9b5"),e("bf0f"),e("ab80"),e("c223");var i={data:function(){return{Id:"",data:{},show:!1,show_item:{},input_y:"",show2:!1,SystemLog2:[],reallocate_pop_ups:!1,reallocate_pop_data:{},reallocate_pop_ups2:!1,reallocate_pop_data2:{}}},onLoad:function(t){var a=t.id;this.Id=a,this.start()},onShow:function(){this.Id&&this.start()},methods:{contact_customers:function(){/^(\+?86)?(0\d{2,3}-)?1[3-9]\d{9}$|^(0\d{2,3}-)?\d{7,8}$/.test(this.data.LinkMan.MobilePhone)?uni.makePhoneCall({phoneNumber:this.data.LinkMan.MobilePhone}):uni.showToast({title:"电话格式不正确",duration:2e3,icon:"error"})},distribution:function(t){this.$store.state.car_delivery_selection_engineer=t,uni.navigateTo({url:"./distribution"})},reallocate_pop_ups_fun:function(t){this.reallocate_pop_data=t,this.reallocate_pop_ups=!0},operation_task:function(t,a){var e=this;this.apix("CarRental/UpdateCarSOOrderStateB",{id:t.ID,str:a},{method:"post"}).then((function(t){e.reallocate_pop_ups=!1,e.reallocate_pop_ups2=!1,uni.showToast({title:a?"已接受":"已拒绝",duration:2e3,icon:a?"success":"error"}),uni.navigateTo({url:"./index"})}))},the_car_has_returned:function(t){this.apix("CarRental/UpdateCarSOOrderStateE",{ID:t.ID},{method:"post"}).then((function(t){uni.showToast({title:"归位成功",duration:2e3,icon:"success"}),uni.navigateTo({url:"./index"})}))},operation_service:function(t){this.show=!0,this.show_item=t},operation_get:function(t){var a=this;this.apix("CarRental/UpdateCarSOOrderStateD",{ID:t.ID},{method:"post"}).then((function(t){a.show2=!0,uni.navigateTo({url:"./index"})}))},input_y_change:function(t){this.input_y=t},confirm_password:function(){var t=this;this.apix("CarRental/UpdateCarSOOrderStateC",{ID:this.show_item.ID,str:this.input_y},{method:"post"}).then((function(a){uni.showToast({title:"送车成功",duration:2e3,icon:"success"}),t.show=!1,uni.navigateTo({url:"./index"})}))},start:function(){var t=this,a={pageNum:1,numPerPage:999,orderField:"",orderDirection:"",cusName:"",plate:"",waitDo:-1,state:-1,Id:this.Id,cusId:""};this.apix("CarRental/GetCarSOOrders",a).then((function(a){t.data=a.Data.Dtos[0],console.log(t.SystemLog2),t.data.Image=t.$store.state.httpurl+t.data.Image,t.data.LinkManStr=t.data.LinkMan.ChineseName+" "+t.data.LinkMan.MobilePhone,t.data.Feature&&(t.data.Feature=JSON.parse(t.data.Feature).join("、")),t.data["web_time"]=t.date_conversion(t.data.TargetDate)+" "+("送车"==t.data.Direction?"送车上门":"上门取车")}))},date_conversion:function(t){var a,e=new Date,i=new Date(t),n=e-i,o=Math.round(n/864e5),r="";0===o?r="今天":1===o?r="昨天":2===o?r="前天":o>2?r="".concat(o,"天前"):o<0&&(r=-1===o?"明天":-2===o?"后天":"".concat(-o,"天后"));var s=i.getMonth()+1,d=i.getDate(),c=i.getHours(),l=i.getMinutes().toString().padStart(2,"0");return a="".concat(c>11?c-12:c,":").concat(l),"".concat(s,"月").concat(d,"日 ").concat(r," ").concat(a)}}};a.default=i},"44b8":function(t,a,e){var i=e("c86c");a=i(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-time-axis[data-v-41643a00]{padding-left:%?40?%;position:relative}.u-time-axis[data-v-41643a00]::before{content:" ";position:absolute;left:0;top:%?12?%;width:1px;bottom:0;border-left:1px solid #ddd;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}',""]),t.exports=a},"4e29":function(t,a,e){var i=e("44b8");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("967d").default;n("268b86a7",i,!0,{sourceMap:!1,shadowMode:!1})},"513b":function(t,a,e){"use strict";e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){}));var i=function(){var t=this.$createElement,a=this._self._c||t;return a("v-uni-view",{staticClass:"u-time-axis"},[this._t("default")],2)},n=[]},7484:function(t,a,e){"use strict";var i=e("f010"),n=e.n(i);n.a},"7b2b":function(t,a,e){"use strict";e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return i}));var i={uNavbar:e("8033").default,uImage:e("4c41").default,uIcon:e("fdc6").default,uTimeLine:e("ae17").default,uTimeLineItem:e("bfc0").default,uPopup:e("8de2").default,uMessageInput:e("1c5d").default},n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",{staticClass:"order_details_2312"},[i("u-navbar",{attrs:{"border-bottom":!1,background:{background:"rgba(0, 0, 0, 0)"},"back-icon-color":"#ffffff"}}),i("div",{staticClass:"h1"},[t._v(t._s(t.data.StateStr2))]),i("div",{staticClass:"item"},[i("div",{staticClass:"left_text"},[i("div",{staticClass:"p1"},[t._v(t._s(t.data.Plate))]),i("div",{staticClass:"p2"},[i("div",{staticClass:"car"},[t._v(t._s(t.data.CarType))]),i("span",[t._v(t._s(t.data.Feature))])])]),i("div",{staticClass:"images"},["null"!=t.data.Image?i("u-image",{attrs:{mode:"widthFix",src:t.data.Image,"show-loading":!1,fade:!1}}):i("span",[t._v("未上传")])],1)]),i("div",{staticClass:"item"},["送车"==t.data.Direction?i("div",{staticClass:"left_icon left_icon_song"},[t._v("送车")]):t._e(),"取车"==t.data.Direction?i("div",{staticClass:"left_icon left_icon_qu"},[t._v("取车")]):t._e(),i("div",{staticClass:"delivery_information"},[i("p",{staticClass:"delivery_information_h1"},[t._v(t._s(t.data.web_time))]),i("p",{staticClass:"delivery_information_p1"},[t._v(t._s(t.data.TargetAddress))])])]),i("div",{staticClass:"link_man"},[i("div",{staticClass:"link_man_1"},[i("u-icon",{attrs:{name:"account",color:"#181C26"}}),i("span",[t._v("联系人")]),i("span",{staticClass:"link_icon"},[t._v("客户")])],1),i("div",{staticClass:"link_man_2"},[i("div",{staticClass:"icon",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.contact_customers()}}},[i("div",{staticClass:"phone"},[i("u-icon",{attrs:{name:"phone-fill",color:"#181C26"}})],1)]),t.data.LinkMan?i("div",{staticClass:"man"},[i("div",{staticClass:"man_name"},[t._v(t._s(t.data.LinkMan.ChineseName))]),i("p",[t._v(t._s(t.data.LinkMan.MobilePhone))])]):t._e()])]),i("div",{staticClass:"order_information"},[i("div",{staticClass:"title"},[i("u-icon",{attrs:{name:"order",color:"#181C26"}}),i("span",[t._v("订单详情")])],1),i("div",{staticClass:"order_information_item"},[i("span",[t._v("订单号")]),i("span",{staticClass:"info"},[t._v(t._s(t.data.OrderCode))])]),i("div",{staticClass:"order_information_item"},[i("span",[t._v("订单类型")]),i("span",{staticClass:"info"},[t._v(t._s(t.data.Direction))])]),i("div",{staticClass:"order_information_item",staticStyle:{"margin-bottom":"10px"}},[i("span",[t._v("订单状态")]),i("span",{staticClass:"info"},[t._v(t._s(t.data.StateStr2))])]),i("u-time-line",t._l(t.SystemLog2,(function(a,e){return a?i("u-time-line-item",{key:e,scopedSlots:t._u([{key:"content",fn:function(){return[i("p",[t._v(t._s(a.split(" ")[0]+" "+a.split(" ")[1]))]),i("p",[t._v(t._s(a.split(" ")[2]+" "+a.split(" ")[3]))])]},proxy:!0}],null,!0)}):t._e()})),1)],1),4!=t.data.State&&9!=t.data.State?i("div",{staticClass:"operation_area"},[1==t.data.State?i("div",{staticClass:"but"},[i("div",{staticClass:"button",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.distribution(t.data)}}},[t._v("分配")])]):t._e(),2==t.data.State||5==t.data.State?i("div",{staticClass:"but"},[i("div",{staticClass:"refuse",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.reallocate_pop_ups2=!0,t.reallocate_pop_data2=t.data}}},[t._v("拒绝")]),i("div",{staticClass:"accept",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.operation_task(t.data,1)}}},[t._v("接受")])]):t._e(),3==t.data.State||6==t.data.State?i("div",{staticClass:"but"},[i("div",{staticClass:"reassignment",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.reallocate_pop_ups_fun(t.data)}}},[t._v("申请重分配")]),i("div",{staticClass:"contact_customers",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.contact_customers()}}},[i("u-icon",{attrs:{name:"phone-fill",color:"#181c26",size:"28"}}),t._v("联系客户")],1),3==t.data.State?i("div",{staticClass:"edit",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.operation_service(t.data)}}},[t._v(t._s("我已送达"))]):t._e(),6==t.data.State?i("div",{staticClass:"edit",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.operation_get(t.data)}}},[t._v(t._s("我已取车"))]):t._e()]):t._e(),7==t.data.State?i("div",{staticClass:"but"},[i("div",{staticClass:"button",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.the_car_has_returned(t.data)}}},[t._v("车已归位")])]):t._e()]):t._e(),i("u-popup",{attrs:{mode:"bottom","border-radius":"20"},model:{value:t.show,callback:function(a){t.show=a},expression:"show"}},[i("v-uni-view",{staticClass:"popclass"},[i("div",{staticClass:"popclass_head"},[i("div",{staticClass:"popclass_head_img"},[i("u-image",{attrs:{width:"55px",height:"55px",src:e("d26c")}})],1),i("div",{staticClass:"popclass_head_h1"},[t._v("请输入"),i("span",[t._v("取车码")])]),i("div",{staticClass:"popclass_head_h2"},[t._v("需要客户出示取车码才能够将车辆交接给客户")])]),i("div",{staticClass:"popclass_number"},[i("u-message-input",{attrs:{mode:"box"},on:{change:function(a){arguments[0]=a=t.$handleEvent(a),t.input_y_change.apply(void 0,arguments)}},model:{value:t.input_y,callback:function(a){t.input_y=a},expression:"input_y"}})],1),i("div",{staticClass:"popclass_but"},[i("div",{staticClass:"popclass_buttton"},[i("div",{staticClass:"edit_quxiao",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.show=!1}}},[t._v("取消")]),i("div",{staticClass:"edit_queren",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.confirm_password()}}},[t._v("确认")])])])])],1),i("u-popup",{attrs:{mode:"center",width:"500rpx",height:"150px","border-radius":"20"},model:{value:t.show2,callback:function(a){t.show2=a},expression:"show2"}},[i("v-uni-view",{staticClass:"return_the_car"},[i("p",{staticClass:"p1"},[t._v("取车成功")]),i("p",{staticClass:"p2"},[t._v("请将车辆开往指定的办事处，或者送到下一个客户的预定送车地点。")]),i("div",{staticClass:"but",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.show2=!1}}},[t._v("我知道了")])])],1),i("u-popup",{attrs:{mode:"center",width:"500rpx",height:"150px","border-radius":"20"},model:{value:t.reallocate_pop_ups,callback:function(a){t.reallocate_pop_ups=a},expression:"reallocate_pop_ups"}},[i("v-uni-view",{staticClass:"return_the_car"},[i("p",{staticClass:"p1"},[t._v("申请重分配")]),i("p",{staticClass:"p2"},[t._v("您确定要申请重分配 "+t._s(t.reallocate_pop_data.web_time)+" 任务吗？")]),i("div",{staticClass:"but2"},[i("div",{staticClass:"but2_1",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.reallocate_pop_ups=!1}}},[t._v("再想想")]),i("div",{staticClass:"but2_1",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.operation_task(t.data,0)}}},[t._v("确定")])])])],1),i("u-popup",{attrs:{mode:"center",width:"500rpx",height:"150px","border-radius":"20"},model:{value:t.reallocate_pop_ups2,callback:function(a){t.reallocate_pop_ups2=a},expression:"reallocate_pop_ups2"}},[i("v-uni-view",{staticClass:"return_the_car"},[i("p",{staticClass:"p1"},[t._v("申请重分配")]),i("p",{staticClass:"p2"},[t._v("您确定要拒绝 "+t._s(t.reallocate_pop_data2.web_time)+" 任务吗？")]),i("div",{staticClass:"but2"},[i("div",{staticClass:"but2_1",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.reallocate_pop_ups2=!1}}},[t._v("再想想")]),i("div",{staticClass:"but2_1",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.operation_task(t.reallocate_pop_data2,0)}}},[t._v("确定")])])])],1)],1)},o=[]},"81c5":function(t,a,e){t.exports=e.p+"static/car_rental/blue_background.png"},"90d4":function(t,a,e){var i=e("c1ec");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("967d").default;n("5ae294c2",i,!0,{sourceMap:!1,shadowMode:!1})},"9db3":function(t,a,e){var i=e("c86c");a=i(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-time-axis-item[data-v-640ca214]{display:flex;flex-direction:row;flex-direction:column;width:100%;position:relative;margin-bottom:%?32?%}.u-time-axis-node[data-v-640ca214]{position:absolute;top:%?12?%;left:%?-40?%;-webkit-transform-origin:0;transform-origin:0;-webkit-transform:translateX(-50%);transform:translateX(-50%);display:flex;flex-direction:row;align-items:center;justify-content:center;z-index:1;font-size:%?24?%}.u-dot[data-v-640ca214]{height:%?16?%;width:%?16?%;border-radius:%?100?%;background:#ddd}',""]),t.exports=a},ae17:function(t,a,e){"use strict";e.r(a);var i=e("513b"),n=e("3e17");for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(o);e("4222");var r=e("828b"),s=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"41643a00",null,!1,i["a"],void 0);a["default"]=s.exports},bc7a:function(t,a,e){"use strict";e("6a54"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;a.default={name:"u-time-line",data:function(){return{}}}},bfc0:function(t,a,e){"use strict";e.r(a);var i=e("214b"),n=e("3361");for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(o);e("7484");var r=e("828b"),s=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"640ca214",null,!1,i["a"],void 0);a["default"]=s.exports},c1ec:function(t,a,e){var i=e("c86c"),n=e("2ec5"),o=e("81c5");a=i(!1);var r=n(o);a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.order_details_2312[data-v-1cb460f8]{width:100%;height:100%;padding-bottom:100px;background-image:url('+r+");background-repeat:no-repeat;background-size:100% 172px;\r\n  /* 或者具体的尺寸，如 '100px 100px' */box-sizing:border-box;overflow:auto}.order_details_2312 .h1[data-v-1cb460f8]{width:100%;height:32px;font-size:28px;font-weight:700;line-height:32px;text-align:left;margin:15px 0;color:#fff;padding-left:%?50?%;box-sizing:border-box}.order_details_2312 .item[data-v-1cb460f8]{width:calc(100% - %?40?%);min-height:20px;background-color:#fff;border-radius:8px;margin:10px auto;padding:12px 16px;box-sizing:border-box;display:flex;\r\n  /* 启用Flex布局 */justify-content:space-between\r\n  /* 子元素两边分布 */}.order_details_2312 .item .images[data-v-1cb460f8]{width:72px;height:54px;float:right}.order_details_2312 .item .left_text[data-v-1cb460f8]{width:calc(100% - 60px);height:54px}.order_details_2312 .item .left_text .p1[data-v-1cb460f8]{width:100%;height:28px;font-size:20px;font-weight:700;margin-bottom:5px}.order_details_2312 .item .left_text .p2[data-v-1cb460f8]{width:100%;height:20px;white-space:nowrap;\r\n  /* 保持文本在一行显示 */overflow:hidden;\r\n  /* 隐藏超出部分 */text-overflow:ellipsis\r\n  /* 超出部分显示省略号 */}.order_details_2312 .item .left_text .p2 .car[data-v-1cb460f8]{min-width:%?10?%;height:100%;background:rgba(65,112,252,.10196078431372549);color:#181c26;font-size:11px;font-weight:500;line-height:18px;text-align:left;float:left;padding:0 5px;box-sizing:border-box;border-radius:2px;margin-right:10px}.order_details_2312 .item .left_text .p2 span[data-v-1cb460f8]{font-size:13px;font-weight:400;line-height:18px;text-align:left;color:rgba(24,28,38,.6980392156862745)}.order_details_2312 .item .left_icon[data-v-1cb460f8]{width:32px;height:20px;border-radius:3px;color:#fff;text-align:center;line-height:20px;font-size:12px;margin-top:4px}.order_details_2312 .item .left_icon_song[data-v-1cb460f8]{background-color:#e54337}.order_details_2312 .item .left_icon_qu[data-v-1cb460f8]{background-color:#4170fc}.order_details_2312 .item .delivery_information[data-v-1cb460f8]{width:calc(100% - 40px);min-height:100%}.order_details_2312 .item .delivery_information .delivery_information_h1[data-v-1cb460f8]{width:100%;height:26px;line-height:26px;font-size:18px;font-weight:700}.order_details_2312 .item .delivery_information .delivery_information_p1[data-v-1cb460f8]{line-height:20px;font-size:13px;color:rgba(24,28,38,.6980392156862745)}.order_details_2312 .link_man[data-v-1cb460f8]{width:calc(100% - %?40?%);min-height:20px;background-color:#fff;border-radius:8px;margin:10px auto;padding:0 16px;box-sizing:border-box}.order_details_2312 .link_man .link_man_1[data-v-1cb460f8]{width:100%;height:48px;border-bottom:.5px solid rgba(9,15,32,.0784313725490196);line-height:48px;font-size:16px;font-weight:700}.order_details_2312 .link_man .link_man_1 span[data-v-1cb460f8]{margin:0 3px}.order_details_2312 .link_man .link_man_1 .link_icon[data-v-1cb460f8]{font-size:10px;color:#fff;font-weight:400;background:linear-gradient(114.95deg,#efb066 2.67%,#b56b16 83.89%);border-radius:2px;padding:2px 5px}.order_details_2312 .link_man .link_man_2[data-v-1cb460f8]{width:100%;height:58px;padding:8px 0;box-sizing:border-box}.order_details_2312 .link_man .link_man_2 .icon[data-v-1cb460f8]{width:30px;height:100%;float:right;position:relative}.order_details_2312 .link_man .link_man_2 .icon .phone[data-v-1cb460f8]{width:28px;height:28px;background-color:#f5f6fa;border-radius:4px;text-align:center;line-height:28px;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto}.order_details_2312 .link_man .link_man_2 .man[data-v-1cb460f8]{width:calc(100% - 30px);height:100%}.order_details_2312 .link_man .link_man_2 .man .man_name[data-v-1cb460f8]{width:100%;height:22px;line-height:22px;font-size:15px;font-weight:700}.order_details_2312 .link_man .link_man_2 .man p[data-v-1cb460f8]{height:20px;line-height:20px;font-size:13px;color:rgba(24,28,38,.6980392156862745)}.order_details_2312 .order_information[data-v-1cb460f8]{width:calc(100% - %?40?%);min-height:20px;background-color:#fff;border-radius:8px;margin:10px auto;padding:0 16px 5px;box-sizing:border-box}.order_details_2312 .order_information .title[data-v-1cb460f8]{width:100%;height:48px;border-bottom:.5px solid rgba(9,15,32,.0784313725490196);line-height:48px;font-size:16px;font-weight:700;margin-bottom:10px}.order_details_2312 .order_information .title span[data-v-1cb460f8]{margin:0 3px}.order_details_2312 .order_information .order_information_item[data-v-1cb460f8]{width:100%;height:32px;font-size:13px;font-weight:400;line-height:32px;text-align:left;color:rgba(24,28,38,.6980392156862745)}.order_details_2312 .order_information .order_information_item .info[data-v-1cb460f8]{display:block;float:right;text-align:right;color:#181c26}.order_details_2312 .operation_area[data-v-1cb460f8]{width:100%;height:100px;position:fixed;left:0;bottom:0;background:#fff;border-top:1px solid #ececee;padding:20px 0 40px;box-sizing:border-box}.order_details_2312 .operation_area .but[data-v-1cb460f8]{width:100%;height:40px;padding:0 10px;box-sizing:border-box;display:flex;\r\n  /* 启用Flexbox布局 */justify-content:space-around}.order_details_2312 .operation_area .but .button[data-v-1cb460f8]{width:100%;height:100%;background:#4170fc;border-radius:6px;font-size:16px;font-weight:700;text-align:center;line-height:40px;color:#fff}.order_details_2312 .operation_area .but .refuse[data-v-1cb460f8]{width:18%;height:100%;margin:auto;background:rgba(229,67,55,.10196078431372549);border-radius:6px;font-size:16px;font-weight:700;text-align:center;line-height:40px;color:#e54337}.order_details_2312 .operation_area .but .accept[data-v-1cb460f8]{width:80%;height:100%;margin:auto;background:#4170fc;border-radius:6px;font-size:16px;font-weight:700;text-align:center;line-height:40px;color:#fff}.order_details_2312 .operation_area .but .reassignment[data-v-1cb460f8]{width:20%;height:100%;margin:auto;border-radius:6px;font-size:12px;text-align:center;line-height:40px;color:rgba(24,28,38,.6980392156862745)}.order_details_2312 .operation_area .but .contact_customers[data-v-1cb460f8]{width:30%;height:100%;margin:auto;background:#f5f6fa;border-radius:6px;font-size:16px;font-weight:700;text-align:center;line-height:40px;color:#181c26}.order_details_2312 .operation_area .but .edit[data-v-1cb460f8]{width:40%;height:100%;margin:auto;background:#4170fc;border-radius:6px;font-size:16px;font-weight:700;text-align:center;line-height:40px;color:#fff}.order_details_2312 .popclass[data-v-1cb460f8]{width:100%;min-height:10px;padding:30px 20px 20px;box-sizing:border-box}.order_details_2312 .popclass .popclass_head[data-v-1cb460f8]{width:100%;height:120px;box-sizing:border-box}.order_details_2312 .popclass .popclass_head .popclass_head_img[data-v-1cb460f8]{width:100%;height:55px;display:flex;justify-content:center}.order_details_2312 .popclass .popclass_head .popclass_head_h1[data-v-1cb460f8]{width:100%;height:40px;line-height:40px;font-size:24px;color:#181c26;text-align:center;font-weight:700}.order_details_2312 .popclass .popclass_head .popclass_head_h1 span[data-v-1cb460f8]{color:#e54337}.order_details_2312 .popclass .popclass_head .popclass_head_h2[data-v-1cb460f8]{width:100%;height:20px;line-height:20px;font-size:14px;color:rgba(24,28,38,.6980392156862745);text-align:center}.order_details_2312 .popclass .popclass_number[data-v-1cb460f8]{width:100%;height:80px;padding:10px 0;box-sizing:border-box}.order_details_2312 .popclass .popclass_but[data-v-1cb460f8]{width:100%;height:100px;padding:30px 0 20px;box-sizing:border-box}.order_details_2312 .popclass .popclass_but .popclass_buttton[data-v-1cb460f8]{width:100%;height:50px;box-sizing:border-box;display:flex;\r\n  /* 启用Flexbox布局 */justify-content:space-around}.order_details_2312 .popclass .popclass_but .popclass_buttton .edit_quxiao[data-v-1cb460f8]{width:20%;height:100%;border-radius:8px;background:#f5f6fa;text-align:center;line-height:50px;font-size:16px;font-weight:700}.order_details_2312 .popclass .popclass_but .popclass_buttton .edit_queren[data-v-1cb460f8]{width:76%;height:100%;border-radius:8px;background:#4170fc;text-align:center;line-height:50px;font-size:16px;font-weight:700;color:#fff}.order_details_2312 .return_the_car[data-v-1cb460f8]{width:100%;height:100%;padding:15px;box-sizing:border-box;position:relative}.order_details_2312 .return_the_car .p1[data-v-1cb460f8]{line-height:26px;font-size:18px;font-weight:700;text-align:center}.order_details_2312 .return_the_car .p2[data-v-1cb460f8]{font-size:13px;color:rgba(24,28,38,.6980392156862745);line-height:22px;text-align:center}.order_details_2312 .return_the_car .but[data-v-1cb460f8]{width:calc(100% - 30px);height:40px;border-radius:8px;background-color:#2e7bfd;font-family:PingFang SC;font-size:16px;font-weight:700;line-height:40px;text-align:center;color:#fff;position:absolute;bottom:15px;left:15px;right:15px}.order_details_2312 .return_the_car .but2[data-v-1cb460f8]{width:calc(100% - 30px);height:40px;border-radius:8px;font-family:PingFang SC;font-size:16px;font-weight:700;line-height:40px;text-align:center;color:#fff;position:absolute;bottom:15px;left:15px;right:15px;display:flex;\r\n  /* 启用flex布局 */justify-content:space-between\r\n  /* 子级元素平均分布，两端对齐 */}.order_details_2312 .return_the_car .but2 .but2_1[data-v-1cb460f8]{width:44%;height:100%;border-radius:4px;background:#f5f6fa;color:#000;font-size:14px;line-height:40px;text-align:center}.order_details_2312 .return_the_car .but2 .but2_1[data-v-1cb460f8]:nth-child(2){background:rgba(229,67,55,.10196078431372549);color:#e54337}",""]),t.exports=a},f010:function(t,a,e){var i=e("9db3");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("967d").default;n("4064aace",i,!0,{sourceMap:!1,shadowMode:!1})},f5df:function(t,a,e){"use strict";e.r(a);var i=e("7b2b"),n=e("05dd");for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(o);e("18cb");var r=e("828b"),s=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"1cb460f8",null,!1,i["a"],void 0);a["default"]=s.exports},f94c:function(t,a,e){"use strict";e("6a54"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,e("64aa");var i={name:"u-time-line-item",props:{bgColor:{type:String,default:"#ffffff"},nodeTop:{type:[String,Number],default:""}},data:function(){return{}},computed:{nodeStyle:function(){var t={backgroundColor:this.bgColor};return""!=this.nodeTop&&(t.top=this.nodeTop+"rpx"),t}}};a.default=i}}]);