import getLocation from '../utils/getLocation.js'
const http = (obj) => {
	return new Promise((resolve, reject) => {
		var TokenId = ''
		uni.getStorage({
			key: 'Token',
			success: function(res) {
				TokenId = res.data
				// 首先进行接口
				uni.request({
					url: obj.url,
					method: obj.method || 'GET',
					header: {
						'Token': TokenId
					},
					data: obj.data,
					success: (res) => {
						// console.log(res)
						var COdeState = JSON.parse(res.data).Code
						if (COdeState == 3) {
							// 登录失效
							uni.navigateTo({
								url: '/pages/signIn/index',
							});
							return false
						}
						// 弹出错误信息
						if (COdeState != 0) {

							console.log(obj)
							uni.showToast({
								title: JSON.parse(res.data).Msg,
								icon: "none"
							})
							return false
						}
						resolve(JSON.parse(res.data))
					},
					fail: (err) => {
						// console.log('err' + err)
						reject(err)
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