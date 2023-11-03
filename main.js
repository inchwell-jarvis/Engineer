import Vue from 'vue'
import App from './App'




import utils from './utils.js'                                        	// 封装function 方法
Vue.use(utils)                                 							// 添加



import http from './components/init.js'
Vue.prototype.$http = http

import uniweb from './unihttp/index.js'
Vue.prototype.$uniweb = uniweb

import httpsa from './components/inithttp.js'
Vue.prototype.$httpsa = httpsa

import httpnone from './components/msgnone.js'
Vue.prototype.$httpnone = httpnone




// 改版  结合获取定位  and  获取数据是否提示
import LocationAndData from './store/Location_and_data.js'
Vue.prototype.$unidata = LocationAndData

// main.js 文件
import uView from "uview-ui";
Vue.use(uView);

// 自定义导航栏
import hxNavbar from "./components/hx-navbar/hx-navbar"
Vue.component('hx-navbar',hxNavbar)


//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
