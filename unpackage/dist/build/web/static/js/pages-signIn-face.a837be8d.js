(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-signIn-face"],{"3f05":function(e,n,t){"use strict";t.r(n);var a=t("4df6"),i=t("f987");for(var o in i)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(o);t("d8f7");var s=t("828b"),r=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"02357985",null,!1,a["a"],void 0);n["default"]=r.exports},4147:function(n,t,a){"use strict";a("6a54"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("d4b5"),a("aa9c");a("a4cf");var i={data:function(){return{msg:"",isSound:!0,AutoClip:!0,backCamera:!1,loginPhone:"",data:[],Base64:""}},onLoad:function(){},methods:{inter:function(e){var n=this;if(""==n.loginPhone)return uni.showToast({title:"请输入登录名",icon:"none"}),!1;n.Base64="";var t=uni.requireNativePlugin("PP-BaiduFace"),a={licenseName:"idl-license",licenseSuffix:"face-android",licenseId:"com-gcs-yzj-face-android",liveActionArray:["Eye","HeadLeft","HeadLeftOrRight"],bgColor:"#56445D",textColor:"#C5E99B",isSound:n.isSound,AutoClip:n.AutoClip,isBackCamera:n.backCamera};"iOS"==plus.os.name&&(a.licenseSuffix="face-ios",a.licenseId="com-gcs-yzj-face-ios"),1==e?t.faceliveness(a,(function(e){n.msg=(new Date).getHours()+":"+(new Date).getMinutes()+"  "+JSON.stringify(e)+"<br/>"+n.msg,'"OK"'==e.FaceStatusEnum&&n.saveImgs(e.base64ImageMap)})):2==e&&t.recycler(a,(function(e){n.msg=(new Date).getHours()+":"+(new Date).getMinutes()+"  "+JSON.stringify(e)+"<br/>"+n.msg,'"OK"'==e.FaceStatusEnum&&n.saveImgs(e.base64ImageMap)}))},saveImgs:function(e){var n=this;for(var t in n.logoSrcs=[],e){var a=e[t];n.bitmapsave(a),n.Base64=a}var i={url:n.$store.state.url+"Account/FaceLogin",method:"POST",data:{UserName:n.loginPhone,FileStr:n.Base64}};n.$http(i).then((function(e){n.$store.state.username=n.loginPhone,n.$store.state.token=e.Data,uni.setStorage({key:"Token",data:e.Data,success:function(){uni.setStorage({key:"admin",data:n.loginPhone,success:function(){uni.switchTab({url:"/pages/home/home"})}})}})}))},bitmapsave:function(n){var t=this,a=new plus.nativeObj.Bitmap("test");a.loadBase64Data(n,(function(e){a.save("_doc/_tmp/head"+(new Date).getTime()+".png",{},(function(e){t.logoSrcs.push(e.target)}))}),(function(){console.log("加载Base64图片数据失败："+JSON.stringify(e))}))}}};t.default=i},"4df6":function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){}));var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-uni-view",{staticClass:"content"},[t("v-uni-view",{staticClass:"inputArea assd"},[t("v-uni-input",{staticClass:"inputClass",attrs:{placeholder:"请输入账号",maxlength:"20"},model:{value:e.loginPhone,callback:function(n){e.loginPhone=n},expression:"loginPhone"}})],1),t("v-uni-view",[t("v-uni-button",{on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.inter(1)}}},[e._v("活体检测")]),t("v-uni-button",{on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.inter(2)}}},[e._v("人脸图像采集")])],1),t("v-uni-view",{staticClass:"asd"},[t("v-uni-textarea",{model:{value:e.Base64,callback:function(n){e.Base64=n},expression:"Base64"}})],1),t("v-uni-scroll-view",{attrs:{"scroll-y":"true"}},[t("v-uni-view",{staticClass:"msg",domProps:{innerHTML:e._s(e.logoSrcs)}})],1)],1)},i=[]},6783:function(e,n,t){var a=t("c86c");n=a(!1),n.push([e.i,".content[data-v-02357985]{text-align:center;height:%?400?%}.asd[data-v-02357985]{width:100%;height:200px;overflow:auto}.logo[data-v-02357985]{height:%?200?%;width:%?200?%;margin-top:%?50?%}.title[data-v-02357985]{font-size:%?36?%;color:#8f8f94}.msg[data-v-02357985]{text-align:left;padding:%?40?%;font-size:%?25?%;color:#f0ad4e}.inputArea[data-v-02357985]{padding:%?20?% 10%;.right{float:right}}.assd[data-v-02357985]{margin-top:30px;box-sizing:border-box}.inputClass[data-v-02357985]{border:2px solid #ccc;border-radius:22px;outline:0;padding:8px 15px;font-weight:700}",""]),e.exports=n},9156:function(e,n,t){var a=t("6783");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=t("967d").default;i("a9f8588c",a,!0,{sourceMap:!1,shadowMode:!1})},a4cf:function(e,n,t){"use strict";t("6a54");var a=t("f5bd").default;Object.defineProperty(n,"__esModule",{value:!0}),n.base64ToPath=function(e){return new Promise((function(n,t){if("object"===("undefined"===typeof window?"undefined":(0,i.default)(window))&&"document"in window){e=e.split(",");var a=e[0].match(/:(.*?);/)[1],o=atob(e[1]),s=o.length,r=new Uint8Array(s);while(s--)r[s]=o.charCodeAt(s);return n((window.URL||window.webkitURL).createObjectURL(new Blob([r],{type:a})))}var u=e.match(/data\:\S+\/(\S+);/);u?u=u[1]:t(new Error("base64 error"));var c=Date.now()+"."+u;if("object"!==("undefined"===typeof plus?"undefined":(0,i.default)(plus)))if("object"===("undefined"===typeof wx?"undefined":(0,i.default)(wx))&&wx.canIUse("getFileSystemManager")){var d=wx.env.USER_DATA_PATH+"/"+c;wx.getFileSystemManager().writeFile({filePath:d,data:e.replace(/^data:\S+\/\S+;base64,/,""),encoding:"base64",success:function(){n(d)},fail:function(e){t(e)}})}else t(new Error("not support"));else{var f=new plus.nativeObj.Bitmap("bitmap"+Date.now());f.loadBase64Data(e,(function(){var e="_doc/uniapp_temp/"+c;f.save(e,{},(function(){f.clear(),n(e)}),(function(e){f.clear(),t(e)}))}),(function(e){f.clear(),t(e)}))}}))},n.pathToBase64=function(e){return new Promise((function(n,t){if("object"===("undefined"===typeof window?"undefined":(0,i.default)(window))&&"document"in window){if("function"===typeof FileReader){var a=new XMLHttpRequest;return a.open("GET",e,!0),a.responseType="blob",a.onload=function(){if(200===this.status){var e=new FileReader;e.onload=function(e){n(e.target.result)},e.onerror=t,e.readAsDataURL(this.response)}},a.onerror=t,void a.send()}var o=document.createElement("canvas"),s=o.getContext("2d"),r=new Image;return r.onload=function(){o.width=r.width,o.height=r.height,s.drawImage(r,0,0),n(o.toDataURL()),o.height=o.width=0},r.onerror=t,void(r.src=e)}"object"!==("undefined"===typeof plus?"undefined":(0,i.default)(plus))?"object"===("undefined"===typeof wx?"undefined":(0,i.default)(wx))&&wx.canIUse("getFileSystemManager")?wx.getFileSystemManager().readFile({filePath:e,encoding:"base64",success:function(e){n("data:image/png;base64,"+e.data)},fail:function(e){t(e)}}):t(new Error("not support")):plus.io.resolveLocalFileSystemURL(function(e){if(0===e.indexOf("_www")||0===e.indexOf("_doc")||0===e.indexOf("_documents")||0===e.indexOf("_downloads"))return e;if(0===e.indexOf("file://"))return e;if(0===e.indexOf("/storage/emulated/0/"))return e;if(0===e.indexOf("/")){var n=plus.io.convertAbsoluteFileSystem(e);if(n!==e)return n;e=e.substr(1)}return"_www/"+e}(e),(function(e){e.file((function(e){var a=new plus.io.FileReader;a.onload=function(e){n(e.target.result)},a.onerror=function(e){t(e)},a.readAsDataURL(e)}),(function(e){t(e)}))}),(function(e){t(e)}))}))};var i=a(t("fcf3"));t("5ef2"),t("bf0f"),t("7a76"),t("c9b5"),t("5c47"),t("2c10"),t("15d1"),t("d5c6"),t("5a56"),t("f074"),t("4db2"),t("c976"),t("4d8f"),t("7b97"),t("668a"),t("c5b7"),t("8ff5"),t("2378"),t("641a"),t("64e0"),t("cce3"),t("efba"),t("d009"),t("bd7d"),t("7edd"),t("d798"),t("f547"),t("5e54"),t("b60a"),t("8c18"),t("12973"),t("f991"),t("198e"),t("8557"),t("63b1"),t("1954"),t("1cf1"),t("18f7"),t("de6c"),t("dc89"),t("2425"),t("a1c1")},d8f7:function(e,n,t){"use strict";var a=t("9156"),i=t.n(a);i.a},f987:function(e,n,t){"use strict";t.r(n);var a=t("4147"),i=t.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return a[e]}))}(o);n["default"]=i.a}}]);