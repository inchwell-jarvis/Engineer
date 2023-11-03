import $store from '../store/index.js'
const API_GET = (url, data, show = false) => {
	return new Promise((resolve, reject) => {
		// 根据条件显示加载
		if (show) uni.showLoading({ title: '加载中' });
		// 获取 token 
		uni.getStorage({
			key: 'Token',
			success: function(token) {

				console.log({
					url: $store.state.url + url,
					data: data,
					token: token.data
				})
				// 开始接口
				uni.request({
					url: $store.state.url + url,
					method: 'GET',
					header: {
						'token': token.data,
					},
					data: data,
					success: (res) => {
						console.log(res)
						// 清空加载状态
						setTimeout(function() {
							uni.hideLoading();
						}, 100);

						let Data = {}

						// 判断是否为JSON类型  新版为Obiect 旧版为JSON
						if (typeof res.data === "string") {
							Data = JSON.parse(res.data);
						} else {
							Data = res.data;
						}
						// 输出错误
						if (Data.Code != 0) {
							uni.showToast({
								title: Data.Msg,
								icon: "none"
							})
							return false
						}
						// 
						resolve(Data)
					},
				})
			}
		})
	})
}

export default API_GET