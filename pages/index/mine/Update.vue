<template>
	<view class="box" style="background-color: #FFFFFF;">
		<!-- 初始状态 -->

		<u-form :model="form" ref="uForm" label-width="width:80%">
			<u-form-item label="当前版本:" label-width="150rpx"><text>{{version}}</text>
				<button type="primary" style="float: right;" size="mini" @tap="Jiann" :loading="load">{{Msg}}</button>
			</u-form-item>
		</u-form>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				Msg: '检查更新',
				load: false,
				version: this.$store.state.currentVersion
			};
		},
		methods: {
			//检查更新
			Jiann: function() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('经度：' + res.longitude);
						console.log('纬度：' + res.latitude);
					},
					fail: function() {
						uni.showToast({
							title: "地理位置获取失败,请开通权限！",
							icon: "none"
						})
					}
				});


				this.Msg = '正在检查'
				this.load = true
				var obj = {
					url: this.$store.state.url + 'System/GetSysVersion',
					data: {
						mobile: 1,
						type: 2,
						clientVersion: this.version,
					},
				}
				this.$http(obj).then((res) => {
					console.log(res)
					// 判断是否需要更新  Update  True/false
					if (res.Data.Update) {
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
							// WgtUrl 有值为小更新
						} else {
							// 小更新
							plus.nativeUI.toast("下载更新文件...");
							me.downWgt(res.Data.WgtUrl) //下载wgt文件的方法
						}
					} else {
						// 否则 不需要更新
						uni.showModal({
							title: '当前为最新版本',
							success: function(resTwo) {
								if (resTwo.confirm) {
									console.log('用户点击确定')
								} else if (resTwo.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
					this.load = false
					this.Msg = '检查完成'
				})
			},
			downWgt(WgtUrl) { //下载安装包
				const me = this;
				plus.downloader.createDownload(WgtUrl, {
					filename: "_doc/update/"
				}, function(d, status) {
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
					plus.nativeUI.toast("应用资源更新完成！请重启App！", function() {
						plus.runtime.restart();
					});
				}, function(e) {
					plus.nativeUI.toast("安装wgt文件失败[" + e.code + "]：" + e.message);
				});
			}
		}
	}
</script>

<style lang="scss">
	.box {
		background-color: #f4f4f4;

	}
</style>
