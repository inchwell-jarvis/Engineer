<template>
	<view class="box">
		<u-cell-group>
			<u-cell-item icon="bookmark-fill" :title="'当前版本 : ' + app_version" :arrow="false">
				<span slot="right-icon" style="color: #2979ff" @tap="GetSysVersion()">
					<u-loading mode="flower" v-if="loading"></u-loading>
					检查更新
				</span>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			app_version: this.$store.state.app_version // 此版本来自初始页面 App.vue 存储
		};
	},
	created() {
		// #ifdef APP-PLUS
		const me = this;
		plus.runtime.getProperty(plus.runtime.appid, function (inf) {
			me.app_version = inf.version;
			me.$store.state.currentVersion = inf.version;
		});
		// #endif
	},
	methods: {
		//检查更新
		GetSysVersion: function () {
			this.loading = true;
			var obj = {
				url: this.$store.state.url + 'System/GetSysVersion',
				data: {
					mobile: 1,
					type: 2,
					clientVersion: this.app_version
				}
			};
			this.$http(obj).then((res) => {
				console.log(res);
				// 判断是否需要更新  Update  True/false
				if (res.Data.Update) {
					// PkgUrl 有值为大更新
					if (res.Data.PkgUrl != null) {
						uni.showModal({
							title: '更新',
							content: res.Data.Description,
							success: function (resTwo) {
								if (resTwo.confirm) {
									console.log('用户点击确定');
									plus.runtime.openURL(res.Data.PkgUrl);
								} else if (resTwo.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						// WgtUrl 有值为小更新
					} else {
						// 小更新
						plus.nativeUI.toast('下载更新文件...');
						me.downWgt(res.Data.WgtUrl); //下载wgt文件的方法
					}
				} else {
					// 否则 不需要更新
					uni.showModal({
						title: '当前为最新版本',
						success: function (resTwo) {
							if (resTwo.confirm) {
								console.log('用户点击确定');
							} else if (resTwo.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
				this.loading = false;
			});
		},
		downWgt(WgtUrl) {
			//下载安装包
			const me = this;
			plus.downloader
				.createDownload(
					WgtUrl,
					{
						filename: '_doc/update/'
					},
					function (d, status) {
						if (status == 200) {
							//plus.nativeUI.toast("下载wgt成功："+d.filename);
							plus.nativeUI.toast('下载更新文件成功，安装中');
							me.installWgt(d.filename); // 安装wgt包
						} else {
							plus.nativeUI.toast('下载更新失败！');
						}
						plus.nativeUI.closeWaiting();
					}
				)
				.start();
		},
		installWgt(path) {
			//更新资源包
			plus.runtime.install(
				path,
				{},
				function () {
					plus.nativeUI.toast('应用资源更新完成！请重启App！', function () {
						plus.runtime.restart();
					});
				},
				function (e) {
					plus.nativeUI.toast('安装wgt文件失败[' + e.code + ']：' + e.message);
				}
			);
		}
	}
};
</script>

<style lang="scss"></style>
