const http = (uniobj) => {
	return new Promise((resolve, reject) => {

		// resolve    弹出数据
		// reject 	  拒收数据

		// 调取接口   
		// uniobj:{
		// 	url: 接口尾部,
		// 	method: 请求方式,
		// 	header: 身份验证信息
		// 	data: 传输数据,
		// 	msg: true / false, 是否给出错误报告,
		// }

		// 接口任务
		uni.request({
			url: uniobj.url,
			method: uniobj.method,
			header: {
				'Token': uniobj.header
			},
			data: uniobj.data,


			// 收到开发者服务器成功返回的回调函数
			success: (res) => {
				// 当给出需要错误报告 并且 接口异常时弹出错误窗口
				if (uniobj.msg && JSON.parse(res.data).Code != 0) {
					uni.showToast({
						title: JSON.parse(res.data).Msg,
						icon: "none"
					})
					return false
				}
				// 如果没有错误  直接返回数据
				resolve(JSON.parse(res.data))
			},



			// 接口调用失败的回调函数	
			fail: (err) => {
				// 暂时没用  参数异常等介通过 success 接收返回
				console.log('err' + err)
				reject(err)
			},
			
			
			
			// 接口调用结束的回调函数（调用成功、失败都会执行）
			complete: () => {

			}
		})

	})
}

export default http
