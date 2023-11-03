const http = (obj) => {
	return new Promise((resolve, reject) => {
		// 获取地理位置



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
						console.log('隐性弹窗接口')
						// console.log(res)
						var COdeState = JSON.parse(res.data).Code
						if (COdeState == 3) {
							// 登录失效   自动跳转至登录页

							uni.navigateTo({
								url: '/pages/Logo/Logo',
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
				// -------------------------------------------------------------------------------------------------------
				uni.getLocation({
					type: 'wgs84',
					// 获取定位成功
					success: function(res) {
						// console.log('经度：' + res.longitude);
						// console.log('纬度：' + res.latitude);
						if (res.longitude == '5e-324') {
							uni.showToast({
								title: "地理位置获取失败,请检查网络与定位！",
								icon: "none"
							})
							return false

						}
						uni.request({
							url: obj.url.split('/api/')[0] + '/api/' +
								'system/UploadMapCoordinate',
							method: 'post',
							header: {
								'Token': TokenId,
							},
							data: {
								'Longitude': String(res.longitude),
								'Latitude': String(res.latitude),
							},
							success: (dedsf) => {
								// console.log(dedsf)
								if (JSON.parse(dedsf.data).Code != 0) {
									console.log(
										'+++++++no-IP+++++++no-IP+++++++no-IP+++++++no-IP+++++++no-IP+++++++no-IP+++++++no-IP+++++++no-IP+++++++no-IP+++++++no-IP+++++++no-IP'
									)
									console.log(dedsf)
									uni.showToast({
										title: JSON.parse(dedsf
											.data).Msg,
										icon: "none"
									})
									return false
								}
							},
						})
					},
					// 获取定位失败
					fail: (err) => {
						// console.log(err.errMsg)
						uni.showToast({
							title: "地理位置获取失败,请开通权限！",
							icon: "none"
						})
						// console.log('msgnone')
					},
				});
			}
		})
	})
}

export default http
