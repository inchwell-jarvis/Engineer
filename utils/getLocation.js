import $store from '../store/index.js'
import API_POST from './API_POST.js'
// 定义一个公共函数名为 getLocation    
export default async function getLocation() {
	// 记录当前时间    
	const startTime = Date.now();

	// 返回一个新的Promise对象    
	return new Promise((resolve, reject) => {
		// 调用uni.getLocation方法，获取用户地理位置    
		uni.getLocation({
			type: 'gcj02', // 优先使用 gcj02 - 高德定位，如果定位不到或者报KEY错误或者更换了新的KEY请重新制作自定义基座
			// type: 'wgs84', // 定义获取的地理位置类型为wgs84
			geocode: true, // 是否解析地址信息
			altitude: false, // 不获取高度信息
			// isHighAccuracy: true, // 开启高精度定位	
			// 获取成功时，执行该回调函数    
			success: function(res) {
				// console.log(res)
				// 计算函数执行时间    
				const endTime = Date.now();
				const elapsedTime = endTime - startTime;
				// console.log('耗时：' + elapsedTime + '毫秒');
				// 获取到定位的耗时
				res['elapsedTime'] = elapsedTime + 'ms'

				let now = new Date();
				let year = now.getFullYear();
				let month = now.getMonth() + 1; // getMonth() 方法返回的月份从0开始，因此需要加1  
				let date = now.getDate();
				let hours = now.getHours();
				let minutes = now.getMinutes();
				let seconds = now.getSeconds();
				// 获取当定位的时间
				let acquisitionTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
				res['acquisitionTime'] = acquisitionTime

				// 打印当前位置的经度和纬度    
				// console.log('当前位置的经度：' + res.longitude);
				// console.log('当前位置的纬度：' + res.latitude);
				
				// 制作返回详细地址 判断如果省区名称与市区名称一致，即不添加省区名称
				try{
					res.address_2 = (res.address.province === res.address.city ? '' : res.address.province ) + res.address.city +  res.address.district +  res.address.street +  res.address.poiName
				}catch (error) {
					res.address_2 = '解析失败'
				}
			
				// 解析Promise，并返回地理位置结果
				if (res.longitude != '5e-324' && res.longitude != '') {
					// 写入到 vuex
					$store.state.ip = res
				}
				
				resolve(res);
				
				// 上传位置
				// 检查是否包含token 
				if($store.state.token){
					API_POST('system/UploadMapCoordinate',{longitude: String(res.longitude),latitude: String(res.latitude),})
						.then(rv=>{
							console.log('位置上传成功！')
						})
				}else{
					console.log('没有token不上传位置')
				}
				
			},
			// 获取失败时，执行该回调函数    
			fail: function(err) {
				// 显示错误提示信息    
				uni.showToast({
					title: "地理位置获取失败,请开通权限！",
					icon: "none"
				})
				// 拒绝Promise，并传递错误信息    
				reject(err);
			}
		});
	});
}