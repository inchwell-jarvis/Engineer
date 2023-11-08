import getLocation from '../utils/getLocation.js'
const http = (obj) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中'
		});
		var TokenId = ''
		uni.getStorage({
			key: 'Token',
			success: function(res) {
				TokenId = res.data
				// 首先进行接口
				uni.request({
					url: obj.url,
					method: obj.method,
					header: {
						'Token': TokenId
					},
					data: obj.data,
					success: (res) => {
						console.log(res)
						console.log(typeof res.data)
						if (typeof res.data === "string") {
							var Data = JSON.parse(res.data)
						} else {
							var Data = res.data;
						}
						console.log(Data)
						// 登录失效   自动跳转至登录页
						if (Data.Code == 3) {
							uni.navigateTo({
								url: '/pages/Logo/Logo',
							});
							uni.hideLoading();
							return false
						}
						// 弹出错误信息
						if (Data.Code != 0) {
							uni.showToast({
								title: Data.Msg,
								icon: "none"
							})
							return false
						}
						resolve(Data)
						setTimeout(function() {
							uni.hideLoading();
						}, 100);
					},
					fail: (err) => {
						// console.log('err' + err)
						reject(err)
						setTimeout(function() {
							uni.hideLoading();
						}, 100);
					},
					complete: () => {

					}
				})

			}
		})
		console.log('上传位置')
		// 上传定位
		getLocation()
	})
}

export default http