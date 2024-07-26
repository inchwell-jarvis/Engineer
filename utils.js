import getLocation from './utils/getLocation.js'
import API_POST from './utils/API_POST.js'
import API_GET from './utils/API_GET.js'
import apix from './utils/apix'
import format_price from './utils/format_price.js'

export default {
	install(Vue, options) {

		// 获取定位信息
		Vue.prototype.getLocation = getLocation
		// 封装POST请求
		Vue.prototype.API_POST = API_POST
		// 封装GET请求
		Vue.prototype.API_GET = API_GET
		// 封装apx请求
		Vue.prototype.apix = apix
		// 格式化金额
		Vue.prototype.format_price = format_price
	}
};