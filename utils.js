import getCoordinates from './utils/getCoordinates.js'
import API_POST from './utils/API_POST.js'
import API_GET from './utils/API_GET.js'

export default {
    install(Vue, options) {

       // 获取定位信息
       Vue.prototype.getCoordinates = getCoordinates
	   // 封装POST请求
	   Vue.prototype.API_POST = API_POST
	   // 封装GET请求
	   Vue.prototype.API_GET = API_GET
	   
    }
};
