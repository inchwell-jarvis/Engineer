const httpsa = (obj) => {
	return new Promise((resolve, reject) => {

		// 获取地理位置

		
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
								url: '/pages/Logo/Logo',
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
				// -----
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						// console.log('获取定位')
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
									console.log('--------------------------------------------------------inithttp-----------------------------------------------------------')
									uni.showToast({
										title: JSON.parse(dedsf.data).Msg,
										icon: "none"
									})
									return false
								}
							},
						})
					},
					complete: () => {
						// console.log('正在获取定位')
					},
					fail: (err) => {
						uni.showToast({
							title: "地理位置获取失败,请开通权限！",
							icon: "none"
						})
						// console.log('ininhttp')
					},
				});
			}
		})


	})
}

export default httpsa
