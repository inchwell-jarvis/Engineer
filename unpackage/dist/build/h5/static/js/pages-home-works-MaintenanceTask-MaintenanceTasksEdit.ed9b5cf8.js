(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-works-MaintenanceTask-MaintenanceTasksEdit"],{"0140":function(t,i,e){"use strict";e("7a82"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("a9e3");var s={name:"u-top-tips",props:{navbarHeight:{type:[Number,String],default:44},zIndex:{type:[Number,String],default:""}},data:function(){return{timer:null,isShow:!1,title:"",type:"primary",duration:2e3}},computed:{uZIndex:function(){return this.zIndex?this.zIndex:this.$u.zIndex.topTips}},methods:{show:function(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};clearTimeout(this.timer),i.duration&&(this.duration=i.duration),i.type&&(this.type=i.type),this.title=i.title,this.isShow=!0,this.timer=setTimeout((function(){t.isShow=!1,clearTimeout(t.timer),t.timer=null}),this.duration)}}};i.default=s},"0c57":function(t,i,e){"use strict";e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){}));var s=function(){var t=this.$createElement,i=this._self._c||t;return i("v-uni-view",{staticClass:"u-tips",class:["u-"+this.type,this.isShow?"u-tip-show":""],style:{top:this.navbarHeight+"px",zIndex:this.uZIndex}},[this._v(this._s(this.title))])},a=[]},1378:function(t,i,e){"use strict";e.r(i);var s=e("7814"),a=e("5081");for(var n in a)["default"].indexOf(n)<0&&function(t){e.d(i,t,(function(){return a[t]}))}(n);e("bd77");var r=e("f0c5"),o=Object(r["a"])(a["default"],s["b"],s["c"],!1,null,"7421b564",null,!1,s["a"],void 0);i["default"]=o.exports},"1a35":function(t,i,e){"use strict";var s=e("cf2d"),a=e.n(s);a.a},"2b18":function(t,i,e){"use strict";e.r(i);var s=e("0140"),a=e.n(s);for(var n in s)["default"].indexOf(n)<0&&function(t){e.d(i,t,(function(){return s[t]}))}(n);i["default"]=a.a},"369b":function(t,i,e){"use strict";e("7a82"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s={data:function(){return{Data:{},DetailDtos:[],newTime:"",show:!1}},onLoad:function(t){console.log(JSON.parse(t.ID)),this.Data=JSON.parse(t.ID),this.GetMCEquSupplie(this.Data.ContractId)},methods:{GetMCEquSupplie:function(t){var i=this,e={url:this.$store.state.url+"Maintain/GetMCEquSupplie",method:"GET",header:this.$store.state.token,data:{Id:t}};this.$http(e).then((function(t){console.log(t),i.DetailDtos=t.Data.DetailDtos}))},confirm:function(t){var i=this;console.log(t),this.newTime=t.year+"-"+t.month+"-"+t.day;var e={url:this.$store.state.url+"Maintain/UpdateMCOEstimatedTime",method:"POST",header:this.$store.state.token,data:{Id:this.Data.Id,Str:this.newTime}};this.$http(e).then((function(t){i.$refs.uTips.show({title:"修改成功！",type:"success",duration:"2300"})}))},start:function(){var t=this,i={url:this.$store.state.url+"Maintain/BeginMaintainOrder",method:"POST",header:this.$store.state.token,data:{ID:this.Data.Id}};this.$http(i).then((function(i){t.$refs.uTips.show({title:"启动成功！",type:"success",duration:"2300"})}))}}};i.default=s},5081:function(t,i,e){"use strict";e.r(i);var s=e("369b"),a=e.n(s);for(var n in s)["default"].indexOf(n)<0&&function(t){e.d(i,t,(function(){return s[t]}))}(n);i["default"]=a.a},7814:function(t,i,e){"use strict";e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return n})),e.d(i,"a",(function(){return s}));var s={uTopTips:e("d03d").default,uButton:e("fc48").default,uPicker:e("68db").default},a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"box"},[e("u-top-tips",{ref:"uTips"}),e("v-uni-view",{staticClass:"Customer"},[e("v-uni-view",{staticClass:"Customer_Top"},[t._v("客户信息"),"待保养"==t.Data.StateStr?e("u-button",{staticStyle:{float:"right","margin-right":"10px"},attrs:{type:"primary",size:"mini"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.start()}}},[t._v("启动")]):t._e()],1),e("v-uni-view",{staticClass:"Mini_list"},[e("v-uni-view",{staticClass:"Mini_list_left"},[t._v("客户名称")]),e("v-uni-view",{staticClass:"Mini_list_right"},[t._v(t._s(this.Data.CustomerName))])],1),e("v-uni-view",{staticClass:"Mini_list"},[e("v-uni-view",{staticClass:"Mini_list_left"},[t._v("合同号")]),e("v-uni-view",{staticClass:"Mini_list_right"},[t._v(t._s(this.Data.ContractCode))])],1),e("v-uni-view",{staticClass:"Mini_list"},[e("v-uni-view",{staticClass:"Mini_list_left"},[t._v("频次")]),e("v-uni-view",{staticClass:"Mini_list_right"},[t._v(t._s(this.Data.PinCi))])],1),e("v-uni-view",{staticClass:"Mini_list"},[e("v-uni-view",{staticClass:"Mini_list_left"},[t._v("客户特征")]),e("v-uni-view",{staticClass:"Mini_list_right"},[t._v(t._s(this.Data.Feature))])],1),e("v-uni-view",{staticClass:"Mini_list"},[e("v-uni-view",{staticClass:"Mini_list_left"},[t._v("单号")]),e("v-uni-view",{staticClass:"Mini_list_right"},[t._v(t._s(this.Data.OrderCode))])],1),e("v-uni-view",{staticClass:"Mini_list"},[e("v-uni-view",{staticClass:"Mini_list_left"},[t._v("状态")]),e("v-uni-view",{staticClass:"Mini_list_right"},[t._v(t._s(this.Data.StateStr))])],1),e("v-uni-view",{staticClass:"Mini_list"},[e("v-uni-view",{staticClass:"Mini_list_left"},[t._v("耗材状态")]),e("v-uni-view",{staticClass:"Mini_list_right"},[t._v(t._s(this.Data.MSSOStateStr))])],1),e("v-uni-view",{staticClass:"Mini_list"},[e("v-uni-view",{staticClass:"Mini_list_left"},[t._v("预计时间")]),e("v-uni-view",{staticClass:"Mini_list_right"},[t._v(t._s(this.Data.EstimatedTime))])],1),"待保养"==t.Data.StateStr?e("v-uni-view",{staticClass:"Mini_list",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.show=!0}}},[e("v-uni-view",{staticClass:"Mini_list_left"},[t._v("新预计时间")]),e("v-uni-view",{staticClass:"Mini_list_right",staticStyle:{color:"blue"}},[t._v(t._s(t.newTime||this.Data.EstimatedTime))])],1):t._e(),e("v-uni-view",{staticClass:"Mini_list"},[e("v-uni-view",{staticClass:"Mini_list_left"},[t._v("启动时间")]),e("v-uni-view",{staticClass:"Mini_list_right"},[t._v(t._s(this.Data.ActualTime))])],1),e("v-uni-view",{staticClass:"Mini_list"},[e("v-uni-view",{staticClass:"Mini_list_left"},[t._v("开始时间")]),e("v-uni-view",{staticClass:"Mini_list_right"},[t._v(t._s(this.Data.BeginTime))])],1),e("v-uni-view",{staticClass:"Mini_list"},[e("v-uni-view",{staticClass:"Mini_list_left"},[t._v("结束时间")]),e("v-uni-view",{staticClass:"Mini_list_right"},[t._v(t._s(this.Data.EndTime))])],1)],1),e("v-uni-view",{staticClass:"Customer"},[e("v-uni-view",{staticClass:"Customer_Top"},[t._v("设备信息")]),t._l(t.DetailDtos,(function(i,s){return e("div",{key:s,staticClass:"li"},[e("h4",[t._v(t._s(i.ProType))]),e("p",[t._v("编号："+t._s(i.ProductCode))]),e("p",[t._v("数量："+t._s(i.Numner))]),e("p",[t._v(t._s(i.ProductDesc))])])}))],2),e("u-picker",{attrs:{mode:"time","default-time":t.newTime},on:{confirm:function(i){arguments[0]=i=t.$handleEvent(i),t.confirm.apply(void 0,arguments)}},model:{value:t.show,callback:function(i){t.show=i},expression:"show"}})],1)},n=[]},8150:function(t,i,e){var s=e("24fb");i=s(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-a29e3518]{box-sizing:border-box}.u-tips[data-v-a29e3518]{width:100%;position:fixed;z-index:1;padding:%?20?% %?30?%;color:#fff;font-size:%?28?%;left:0;right:0;display:flex;flex-direction:row;align-items:center;justify-content:center;opacity:0;-webkit-transform:translateY(-100%);transform:translateY(-100%);transition:all .35s linear}.u-tip-show[data-v-a29e3518]{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;z-index:99}.u-primary[data-v-a29e3518]{background:#2979ff}.u-success[data-v-a29e3518]{background:#19be6b}.u-warning[data-v-a29e3518]{background:#f90}.u-error[data-v-a29e3518]{background:#fa3534}.u-info[data-v-a29e3518]{background:#909399}',""]),t.exports=i},"9ebb":function(t,i,e){var s=e("24fb");i=s(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.box[data-v-7421b564]{height:100%;font-size:14px;box-sizing:border-box}.box .Customer[data-v-7421b564]{width:100%;background-color:#fff;margin-top:20px}.box .Customer .li[data-v-7421b564]{width:90%;min-height:50px;box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);margin:auto;border-radius:5px;margin-top:10px;padding:5px;box-sizing:border-box}.box .Customer .thisphotos[data-v-7421b564]{width:100%;background-color:#fff}.box .Customer .thisphotos uni-image[data-v-7421b564]{width:80%;display:block;margin:auto;margin-top:10px}.box .Customer .Customer_Top[data-v-7421b564]{width:100%;height:40px;border-bottom:1px solid #c3c3c3;line-height:40px;padding-left:20px;font-weight:700;box-sizing:border-box}.box .Customer .textarea[data-v-7421b564]{width:90%;margin:auto;margin:10px}.box .Customer .textarea .textarea[data-v-7421b564]{text-indent:10px;font-size:14px;color:#555}.box .Customer .textarea .Quote[data-v-7421b564]{width:100%;border-radius:10px;margin-bottom:10px;height:100px;padding-top:10px;box-sizing:border-box}.box .Customer .textarea .Quote uni-button[data-v-7421b564]{float:right}.box .Customer .textarea .Quote .Quote_Top[data-v-7421b564]{width:100%;height:25px}.box .Customer .textarea .Quote .Quote_Top uni-text[data-v-7421b564]{float:right}.box .Customer .textarea .Customer_Top_Code[data-v-7421b564]{width:100%;height:20px;border-bottom:1px solid #c8c7cc}.box .Customer .textarea .Customer_Top_Code .Customer_Top_Code_left[data-v-7421b564]{width:50%;float:left;line-height:20px;color:#999}.box .Customer .textarea .Customer_Top_Code .Customer_Top_Code_right[data-v-7421b564]{text-align:right;line-height:20px}.box .Customer .textarea uni-image[data-v-7421b564]{width:100px;height:100px;margin-left:10px}.box .Customer .Mini_list[data-v-7421b564]{width:100%;height:30px;line-height:30px;padding-left:20px;box-sizing:border-box}.box .Customer .Mini_list .Mini_list_left[data-v-7421b564]{width:25%;height:100%;font-weight:700;float:left;font-size:12px;color:#555}.box .Customer .Mini_list .Mini_list_right[data-v-7421b564]{width:75%;height:100%;color:grey;float:left;overflow:hidden;font-size:12px}',""]),t.exports=i},b2f0:function(t,i,e){var s=e("9ebb");s.__esModule&&(s=s.default),"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var a=e("4f06").default;a("c457c414",s,!0,{sourceMap:!1,shadowMode:!1})},bd77:function(t,i,e){"use strict";var s=e("b2f0"),a=e.n(s);a.a},cf2d:function(t,i,e){var s=e("8150");s.__esModule&&(s=s.default),"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var a=e("4f06").default;a("7c0ce16a",s,!0,{sourceMap:!1,shadowMode:!1})},d03d:function(t,i,e){"use strict";e.r(i);var s=e("0c57"),a=e("2b18");for(var n in a)["default"].indexOf(n)<0&&function(t){e.d(i,t,(function(){return a[t]}))}(n);e("1a35");var r=e("f0c5"),o=Object(r["a"])(a["default"],s["b"],s["c"],!1,null,"a29e3518",null,!1,s["a"],void 0);i["default"]=o.exports}}]);