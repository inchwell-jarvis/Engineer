<template>
	<view class="con">
		<web-view id="web" :src="url"></web-view>
		<!-- <iframe :src="url" width="100%" height="100%"></iframe> -->
	</view>
</template>

<script>
	var wv; //计划创建的webview
	export default {
		data() {
			return {
				url: '',
			};
		},
		onBackPress() {
			uni.navigateTo({
				url: "./Navigationindetail",
			});
			return true
		},
		onReady() {
			// #ifdef APP-PLUS
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			setTimeout(function() {
				wv = currentWebview.children()[0]
				wv.setStyle({
					scalable: true
				})
			}, 1000); //如果是页面初始化调用时，需要延时一下
			// #endif
		},
		mounted() {
			this.url = this.$store.state.httpurl + this.$store.state.NinedetailsHTML + "?data=" + this.$store.state.token
			console.log(this.url)
		}
	}
</script>

<style lang="scss" scoped>
	.con {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
</style>
