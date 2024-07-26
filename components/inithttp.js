import getLocation from '../utils/getLocation.js'
const httpsa = (obj) => {
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
						var COdeState = JSON.parse(res.data).Code
						if (COdeState == 3) {
							console.log(
								'-------------------------------------------------------------------------'
							)
							console.log(obj)
							// 登录失效   自动跳转至登录页
							uni.navigateTo({
								url: '/pages/signIn/index',
							});
							uni.hideLoading();
							return false
						}
						// 弹出错误信息
						// if (COdeState != 0) {
						// 	uni.showToast({
						// 		title: JSON.parse(res.data).Msg,
						// 		icon: "none"
						// 	})
						// 	return false
						// }
						resolve(res)
						setTimeout(function() {
							uni.hideLoading();
						}, 100);
					},
					fail: (err) => {
						// console.log('请求失败，下一条是失败报告：')
						// console.log(err)
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

export default httpsa