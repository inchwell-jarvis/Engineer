(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-works-EquipmentEvaluation-report"],{"015c":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var r={uForm:n("eb00").default,uFormItem:n("c9ac").default,uInput:n("8db5").default,uDivider:n("26f3").default,uCard:n("9c12").default,uRadioGroup:n("f29e").default,uRadio:n("b029").default,uButton:n("1351").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"box"},[n("u-form",{staticStyle:{background:"#FFFFFF"},attrs:{model:t.form}},[n("u-form-item",{attrs:{"label-width":"240rpx",label:"经销商CKD："}},[n("u-input",{model:{value:t.CusCKD,callback:function(e){t.CusCKD=e},expression:"CusCKD"}})],1),n("u-form-item",{attrs:{"label-width":"240rpx",label:"经销商名称："}},[n("u-input",{model:{value:t.CusFullName,callback:function(e){t.CusFullName=e},expression:"CusFullName"}})],1),n("u-form-item",{attrs:{"label-width":"240rpx",label:"经销商联系信息："}},[n("u-input",{model:{value:t.CusLinkInfo,callback:function(e){t.CusLinkInfo=e},expression:"CusLinkInfo"}})],1),n("u-form-item",{attrs:{"label-width":"240rpx",label:"设备类型："}},[n("u-input",{model:{value:t.EquType,callback:function(e){t.EquType=e},expression:"EquType"}})],1),n("u-form-item",{attrs:{"label-width":"240rpx",label:"设备品牌："}},[n("u-input",{model:{value:t.Brand,callback:function(e){t.Brand=e},expression:"Brand"}})],1),n("u-form-item",{attrs:{"label-width":"240rpx",label:"设备型号："}},[n("u-input",{model:{value:t.EquModel,callback:function(e){t.EquModel=e},expression:"EquModel"}})],1),n("u-form-item",{attrs:{"label-width":"240rpx",label:"序列号："}},[n("u-input",{model:{value:t.EquSN,callback:function(e){t.EquSN=e},expression:"EquSN"}})],1),n("u-form-item",{attrs:{"label-width":"240rpx",label:"安装方式："}},[n("u-input",{model:{value:t.InstallType,callback:function(e){t.InstallType=e},expression:"InstallType"}})],1),n("u-form-item",{attrs:{"label-width":"240rpx",label:"安装年份："}},[n("u-input",{attrs:{type:"number"},model:{value:t.InstallYear,callback:function(e){t.InstallYear=e},expression:"InstallYear"}})],1),n("u-form-item",{attrs:{"label-width":"240rpx",label:"累积使用年数："}},[n("u-input",{attrs:{type:"number"},model:{value:t.CumulativeUse,callback:function(e){t.CumulativeUse=e},expression:"CumulativeUse"}})],1)],1),n("u-divider",[t._v("设备相关")]),t._l(t.DataTab,(function(e,r){return n("u-card",{key:r,staticStyle:{border:"1px solid #F0AD4E"},attrs:{title:e.name}},[n("v-uni-view",{attrs:{slot:"body"},slot:"body"},[n("u-radio-group",{model:{value:e.itemcheckbox,callback:function(n){t.$set(e,"itemcheckbox",n)},expression:"item.itemcheckbox"}},t._l(e.checkbox,(function(e,r){return n("u-radio",{key:r,attrs:{name:e.name},model:{value:e.checked,callback:function(n){t.$set(e,"checked",n)},expression:"items.checked"}},[t._v(t._s(e.name))])})),1)],1),n("v-uni-view",{attrs:{slot:"body"},slot:"body"},[n("u-input",{attrs:{type:"textarea",maxlength:"99999","auto-height":!0,placeholder:"备注"},model:{value:e.MEno,callback:function(n){t.$set(e,"MEno",n)},expression:"item.MEno"}})],1)],1)})),n("u-divider",[t._v("设备评估建议")]),n("u-card",{staticStyle:{border:"1px solid #007AFF"},attrs:{title:"设备评估建议"}},[n("v-uni-view",{attrs:{slot:"body"},slot:"body"},[n("u-radio-group",{model:{value:t.checkboxListstrue,callback:function(e){t.checkboxListstrue=e},expression:"checkboxListstrue"}},t._l(t.checkboxLists,(function(e,r){return n("u-radio",{key:r,attrs:{name:e.name,disabled:e.checked}},[t._v(t._s(e.name))])})),1)],1)],1),n("u-divider",[t._v("备注")]),n("u-card",{staticStyle:{border:"1px solid #007AFF"},attrs:{title:"备注"}},[n("v-uni-view",{attrs:{slot:"body"},slot:"body"},[n("u-input",{attrs:{type:"textarea",maxlength:"99999","auto-height":!0,placeholder:"备注"},model:{value:t.OtherInfo,callback:function(e){t.OtherInfo=e},expression:"OtherInfo"}})],1)],1),n("v-uni-view",{staticClass:"clattab",staticStyle:{border:"none"}},[n("u-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.EvaluateCusEqu()}}},[t._v("完成")])],1)],2)},i=[]},"0bde":function(t,e,n){var r=n("c86c");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-card[data-v-b6c63cd2]{position:relative;overflow:hidden;font-size:%?28?%;background-color:#fff;box-sizing:border-box}.u-card-full[data-v-b6c63cd2]{margin-left:0!important;margin-right:0!important}.u-card--border[data-v-b6c63cd2]:after{border-radius:%?16?%}.u-card__head--left[data-v-b6c63cd2]{color:#303133}.u-card__head--left__thumb[data-v-b6c63cd2]{margin-right:%?16?%}.u-card__head--left__title[data-v-b6c63cd2]{max-width:%?400?%}.u-card__head--right[data-v-b6c63cd2]{color:#909399;margin-left:%?6?%}.u-card__body[data-v-b6c63cd2]{color:#606266}.u-card__foot[data-v-b6c63cd2]{color:#909399}',""]),t.exports=e},1960:function(t,e,n){var r=n("0bde");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var a=n("967d").default;a("76e96516",r,!0,{sourceMap:!1,shadowMode:!1})},"22c0":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-card",class:{"u-border":t.border,"u-card-full":t.full,"u-card--border":t.borderRadius>0},style:{borderRadius:t.borderRadius+"rpx",margin:t.margin,boxShadow:t.boxShadow},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)}}},[t.showHead?n("v-uni-view",{staticClass:"u-card__head",class:{"u-border-bottom":t.headBorderBottom},style:[{padding:t.padding+"rpx"},t.headStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.headClick.apply(void 0,arguments)}}},[t.$slots.head?t._t("head"):n("v-uni-view",{staticClass:"u-flex u-row-between"},[t.title?n("v-uni-view",{staticClass:"u-card__head--left u-flex u-line-1"},[t.thumb?n("v-uni-image",{staticClass:"u-card__head--left__thumb",style:{height:t.thumbWidth+"rpx",width:t.thumbWidth+"rpx",borderRadius:t.thumbCircle?"100rpx":"6rpx"},attrs:{src:t.thumb,mode:"aspectfull"}}):t._e(),n("v-uni-text",{staticClass:"u-card__head--left__title u-line-1",style:{fontSize:t.titleSize+"rpx",color:t.titleColor}},[t._v(t._s(t.title))])],1):t._e(),t.subTitle?n("v-uni-view",{staticClass:"u-card__head--right u-line-1"},[n("v-uni-text",{staticClass:"u-card__head__title__text",style:{fontSize:t.subTitleSize+"rpx",color:t.subTitleColor}},[t._v(t._s(t.subTitle))])],1):t._e()],1)],2):t._e(),n("v-uni-view",{staticClass:"u-card__body",style:[{padding:t.padding+"rpx"},t.bodyStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bodyClick.apply(void 0,arguments)}}},[t._t("body")],2),t.showFoot?n("v-uni-view",{staticClass:"u-card__foot",class:{"u-border-top":t.footBorderTop},style:[{padding:t.$slots.foot?t.padding+"rpx":0},t.footStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.footClick.apply(void 0,arguments)}}},[t._t("foot")],2):t._e()],1)},a=[]},"26f3":function(t,e,n){"use strict";n.r(e);var r=n("6101"),a=n("fa0d");for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("e3b7");var o=n("828b"),u=Object(o["a"])(a["default"],r["b"],r["c"],!1,null,"f2b386da",null,!1,r["a"],void 0);e["default"]=u.exports},"290e":function(t,e,n){"use strict";n.r(e);var r=n("95b6"),a=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=a.a},3776:function(t,e,n){var r=n("74e0");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var a=n("967d").default;a("04b4b2b5",r,!0,{sourceMap:!1,shadowMode:!1})},"3d14":function(t,e,n){"use strict";n("6a54"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("64aa");var r={name:"u-card",props:{full:{type:Boolean,default:!1},title:{type:String,default:""},titleColor:{type:String,default:"#303133"},titleSize:{type:[Number,String],default:"30"},subTitle:{type:String,default:""},subTitleColor:{type:String,default:"#909399"},subTitleSize:{type:[Number,String],default:"26"},border:{type:Boolean,default:!0},index:{type:[Number,String,Object],default:""},margin:{type:String,default:"30rpx"},borderRadius:{type:[Number,String],default:"16"},headStyle:{type:Object,default:function(){return{}}},bodyStyle:{type:Object,default:function(){return{}}},footStyle:{type:Object,default:function(){return{}}},headBorderBottom:{type:Boolean,default:!0},footBorderTop:{type:Boolean,default:!0},thumb:{type:String,default:""},thumbWidth:{type:[String,Number],default:"60"},thumbCircle:{type:Boolean,default:!1},padding:{type:[String,Number],default:"30"},showHead:{type:Boolean,default:!0},showFoot:{type:Boolean,default:!0},boxShadow:{type:String,default:"none"}},data:function(){return{}},methods:{click:function(){this.$emit("click",this.index)},headClick:function(){this.$emit("head-click",this.index)},bodyClick:function(){this.$emit("body-click",this.index)},footClick:function(){this.$emit("foot-click",this.index)}}};e.default=r},4395:function(t,e,n){var r=n("df9a");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var a=n("967d").default;a("b8590a8a",r,!0,{sourceMap:!1,shadowMode:!1})},6101:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-divider",style:{height:"auto"==t.height?"auto":t.height+"rpx",backgroundColor:t.bgColor,marginBottom:t.marginBottom+"rpx",marginTop:t.marginTop+"rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"u-divider-line",class:[t.type?"u-divider-line--bordercolor--"+t.type:""],style:[t.lineStyle]}),t.useSlot?n("v-uni-view",{staticClass:"u-divider-text",style:{color:t.color,fontSize:t.fontSize+"rpx"}},[t._t("default")],2):t._e(),n("v-uni-view",{staticClass:"u-divider-line",class:[t.type?"u-divider-line--bordercolor--"+t.type:""],style:[t.lineStyle]})],1)},a=[]},7421:function(t,e,n){"use strict";n("6a54"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("64aa"),n("5ef2");var r={name:"u-divider",props:{halfWidth:{type:[Number,String],default:150},borderColor:{type:String,default:"#dcdfe6"},type:{type:String,default:"primary"},color:{type:String,default:"#909399"},fontSize:{type:[Number,String],default:26},bgColor:{type:String,default:"#ffffff"},height:{type:[Number,String],default:"auto"},marginTop:{type:[String,Number],default:0},marginBottom:{type:[String,Number],default:0},useSlot:{type:Boolean,default:!0}},computed:{lineStyle:function(){var t={};return-1!=String(this.halfWidth).indexOf("%")?t.width=this.halfWidth:t.width=this.halfWidth+"rpx",this.borderColor&&(t.borderColor=this.borderColor),t}},methods:{click:function(){this.$emit("click")}}};e.default=r},"74e0":function(t,e,n){var r=n("c86c");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.box[data-v-0cc1c48a]{background:#fff;padding-left:5px;padding-bottom:60px;box-sizing:border-box}.clattab[data-v-0cc1c48a]{width:100%;position:fixed;bottom:-10px;text-align:center;background-color:#fff;z-index:99;margin-bottom:0;border-radius:0}.clattab uni-button[data-v-0cc1c48a]{width:120px;height:40px;margin:20px}',""]),t.exports=e},"775b":function(t,e,n){"use strict";n.r(e);var r=n("015c"),a=n("290e");for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("87b0");var o=n("828b"),u=Object(o["a"])(a["default"],r["b"],r["c"],!1,null,"0cc1c48a",null,!1,r["a"],void 0);e["default"]=u.exports},"87b0":function(t,e,n){"use strict";var r=n("3776"),a=n.n(r);a.a},"95b6":function(t,e,n){"use strict";n("6a54"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("aa9c");var r={data:function(){return{CusId:"",CusCKD:"",CusFullName:"",CusLinkInfo:"",EquType:"",Brand:"",EquModel:"",EquSN:"",InstallType:"",InstallYear:"",CumulativeUse:"",Result:"",OtherInfo:"",EvaluateProjectDtos:[],DataTab:[],form:{},checkboxList:[{name:"正常",checked:!1},{name:"异常",checked:!1},{name:"故障",checked:!1}],checkboxLists:[{name:"工况正常",checked:!1},{name:"建议维修",checked:!1},{name:"建议更换",checked:!1}],checkboxListstrue:""}},created:function(){for(var t=this,e=[],n=this.$store.state.TotalEquipmentData,r=0;r<n.length;r++){var a={name:n[r],MEno:"",itemcheckbox:"",checkbox:this.checkboxList};e.push(a)}this.DataTab=e;var i={url:this.$store.state.url+"WO/GetRepairInfo",method:"GET",header:this.$store.state.token,data:{inchwellCode:this.$store.state.report}};this.$http(i).then((function(e){console.log(e.Data),t.EquModel=e.Data.CustomerEquDto.ProdcutCode,t.CusEquId=e.Data.CustomerEquDto.Id,t.Brand=e.Data.CustomerEquDto.Brand,t.CusId=e.Data.CusInfo.CusId,t.CusFullName=e.Data.CusInfo.FullName,t.EquType=t.$store.state.TotalEquText}))},methods:{EvaluateCusEqu:function(){for(var t=[],e=0;e<this.DataTab.length;e++){var n=this.DataTab[e];t.push({Pos:e,Name:n.name,Result:n.itemcheckbox,Memo:n.MEno})}console.log(t);var r={CusId:this.CusId,CusEquId:this.CusEquId,CusCKD:this.CusCKD,CusFullName:this.CusFullName,CusLinkInfo:this.CusLinkInfo,EquType:this.EquType,Brand:this.Brand,EquModel:this.EquModel,EquSN:this.EquSN,InstallType:this.InstallType,InstallYear:this.InstallYear,CumulativeUse:this.CumulativeUse,Result:this.checkboxListstrue,OtherInfo:this.OtherInfo,EvaluateProjectDtos:t};if(""==r.CusCKD||null==r.CusCKD)return uni.showToast({title:"请输入经销商CKD！",icon:"none"}),!1;if(""==r.CusFullName||null==r.CusFullName)return uni.showToast({title:"请输入经销商名称！",icon:"none"}),!1;if(""==r.CusLinkInfo||null==r.CusLinkInfo)return uni.showToast({title:"请输入经销商联系信息！",icon:"none"}),!1;if(""==r.EquModel||null==r.EquModel)return uni.showToast({title:"请输入设备型号！",icon:"none"}),!1;if(""==r.EquType||null==r.EquType)return uni.showToast({title:"请输入设备类型！",icon:"none"}),!1;if(""==r.Brand||null==r.Brand)return uni.showToast({title:"请输入设备品牌！",icon:"none"}),!1;if(""==r.EquSN||null==r.EquSN)return uni.showToast({title:"请输入设备序列号！",icon:"none"}),!1;if(""==r.InstallType||null==r.InstallType)return uni.showToast({title:"请输入安装方式！",icon:"none"}),!1;if(""==r.InstallYear||null==r.InstallYear)return uni.showToast({title:"请输入安装年份！",icon:"none"}),!1;if(""==r.CumulativeUse||null==r.CumulativeUse)return uni.showToast({title:"请输入设备累计使用年数！",icon:"none"}),!1;if(""==r.Result||null==r.Result)return uni.showToast({title:"请选择设备评估建议！",icon:"none"}),!1;var a={url:this.$store.state.url+"CRM/EvaluateCusEqu",method:"post",header:this.$store.state.token,data:r};this.$http(a).then((function(t){console.log(t),uni.showToast({title:"设备评估完成！",icon:"none",duration:2e3}),uni.navigateTo({url:"./EquipmentEvaluation"})}))}}};e.default=r},"9c12":function(t,e,n){"use strict";n.r(e);var r=n("22c0"),a=n("c61e");for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("f83e");var o=n("828b"),u=Object(o["a"])(a["default"],r["b"],r["c"],!1,null,"b6c63cd2",null,!1,r["a"],void 0);e["default"]=u.exports},c61e:function(t,e,n){"use strict";n.r(e);var r=n("3d14"),a=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=a.a},df9a:function(t,e,n){var r=n("c86c");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-divider[data-v-f2b386da]{width:100%;position:relative;text-align:center;display:flex;flex-direction:row;justify-content:center;align-items:center;overflow:hidden;flex-direction:row}.u-divider-line[data-v-f2b386da]{border-bottom:1px solid #e4e7ed;-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:center;transform-origin:center}.u-divider-line--bordercolor--primary[data-v-f2b386da]{border-color:#2979ff}.u-divider-line--bordercolor--success[data-v-f2b386da]{border-color:#19be6b}.u-divider-line--bordercolor--error[data-v-f2b386da]{border-color:#2979ff}.u-divider-line--bordercolor--info[data-v-f2b386da]{border-color:#909399}.u-divider-line--bordercolor--warning[data-v-f2b386da]{border-color:#f90}.u-divider-text[data-v-f2b386da]{white-space:nowrap;padding:0 %?16?%;display:inline-flex}',""]),t.exports=e},e3b7:function(t,e,n){"use strict";var r=n("4395"),a=n.n(r);a.a},f83e:function(t,e,n){"use strict";var r=n("1960"),a=n.n(r);a.a},fa0d:function(t,e,n){"use strict";n.r(e);var r=n("7421"),a=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=a.a}}]);