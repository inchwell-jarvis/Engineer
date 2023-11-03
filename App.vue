<script>
	export default {
		onLaunch: function() {

			// // #ifdef H5 
			// console.log('运行在H5平台，停止获取定位')
			// console.log('H5控制台如果爆出警告：DevTools failed ··· ··· error: status code 404, net::ERR_HTTP_RESPONSE_CODE_FAILURE' +
			// 	'\n' +
			// 	'请点击右上角设置图标，找到Sources，禁用下面的 Enable JavaScript source maps')
			// // #endif


			// #ifndef H5 
			const me = this
			plus.runtime.getProperty(plus.runtime.appid, function(inf) {
				me.$store.state.app_version = inf.version
				uni.request({
					url: me.$store.state.url + 'System/GetSysVersion',
					data: {
						mobile: 1,
						type: 2,
						clientVersion: inf.version,
					},
					success: (data) => {
						let res = JSON.parse(data.data)
						// 判断是否需要更新  Update  True/false
						if (res.Data.Update) {
							me.$store.state.Update = true
							// PkgUrl 有值为大更新
							if (res.Data.PkgUrl != null) {
								uni.showModal({
									title: '更新',
									content: res.Data.Description,
									success: function(resTwo) {
										if (resTwo.confirm) {
											console.log('用户点击确定')
											plus.runtime.openURL(res.Data.PkgUrl)
										} else if (resTwo.cancel) {
											console.log('用户点击取消');
										}
									}
								});
								// WgtUrl 有值为大更新
							} else {
								// 小更新
								plus.nativeUI.toast("下载更新文件...");
								me.downWgt(res.Data.WgtUrl) //下载wgt文件的方法
							}
						} else {
							// 否则 不需要更新
							me.$store.state.Update = false
							console.log('不需要更新！')
						}
					}
				});
			});

			// #endif
		},
		methods: {
			downWgt(WgtUrl) { //下载安装包
				const me = this;
				plus.downloader.createDownload(WgtUrl, {filename: "_doc/update/"}, function(d, status) {
					if (status == 200) {
						//plus.nativeUI.toast("下载wgt成功："+d.filename); 
						plus.nativeUI.toast("下载更新文件成功，安装中");
						me.installWgt(d.filename); // 安装wgt包  
					} else {
						plus.nativeUI.toast("下载更新失败！");
					}
					plus.nativeUI.closeWaiting();
				}).start();
			},
			installWgt(path) { //更新资源包
				plus.runtime.install(path, {}, function() {
					plus.nativeUI.toast("应用资源更新完成！请重启应用！", function() {
						plus.runtime.restart();
					});
					uni.showModal({
						title: '更新完成！',
						content: '热更新完成，请重启手机app',
						success: function(resTwo) {
							if (resTwo.confirm) {
								console.log('用户点击确定')
								plus.runtime.restart();
							} else if (resTwo.cancel) {
								console.log('用户点击取消');
								plus.runtime.restart();
							}
						}
					});
				}, function(e) {
					plus.nativeUI.toast("安装更新文件失败[" + e.code + "]：" + e.message);
				});
			}
		}
	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "@/components/hx-navbar/iconfont.css";
	/*每个页面公共css */
	html,
	body,
	uni-page-body,
	uni-page-refresh {
		width: 100%;
		height: 100%;
		background: #f7f6f6;
		font-size: 14px;
		font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif !important;
	}

	.box {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		overflow: auto;
	}

	/* 暂无数据 */
	.Nodata {
		width: 100%;
		height: 100%;
		font-size: 30px;
		font-weight: bolder;
		text-align: center;
		padding-top: 300px;
		box-sizing: border-box;
		background: linear-gradient(to right, red, blue);
		-webkit-background-clip: text;
		color: transparent;
	}
</style>