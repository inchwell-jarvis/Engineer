import $store from '../store/index.js'

// 常量定义
const TOKEN_KEY = 'Token';
const LOGIN_PAGE_URL = '../pages/signIn/index';

/**
 * 调用接口的通用函数
 * @param {string} http - 接口地址
 * @param {object} [data={}] - 请求数据
 * @param {object} [methods={}] - 请求方法，默认是 GET
 * @returns {Promise} - 返回一个 Promise 对象
 */

export default async function apix(http, data = {}, methods = {}) {
	return new Promise((resolve, reject) => {
		// 获取本地存储的 token
		uni.getStorage({
			key: TOKEN_KEY,
			success: function(res) {
				let headerToken = res.data;

				// 调接口
				uni.request({
					url: `${$store.state.url}${http}`,
					method: methods.method || 'GET',
					header: {
						'token': headerToken
					},
					data: data,
					success: (response) => {

						let api_response = {
							url: $store.state.url + http,
							method: methods.method || 'GET',
							header: {
								'token': headerToken
							},
							data,
							response
						}
						console.log('接口记录 apx：', api_response);

						// 解析响应数据
						let responseData = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
						let state = responseData.Code;

						if (state !== 0) {
							uni.showToast({ title: responseData.Msg, icon: "none" });

							// 身份过期
							if (state === 3) {
								uni.navigateTo({ url: LOGIN_PAGE_URL });
								uni.hideLoading();
							}
							return;
						}
						resolve(responseData);
					},
					fail: (error) => {
						console.log('error', error)
						reject(error);
					},
					complete: () => {
						console.log('complete[apix]——来自接口:' + `${$store.state.url}${http}`)
					}
				});
			},
			fail: (error) => {
				reject(error);
			}
		});
	});
}