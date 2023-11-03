<template>
	<view class="box">
		<web-view id="web" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			};
		},
		created() {
			if(uni.getSystemInfoSync().platform == 'ios'){
				this.url = this.$store.state.webviewurl
			}else{
				this.url = 'http://icms.inchwell.com.cn/web/Fei_Preview_PDF/web/viewer.html?file='+this.$store.state.webviewurl
			}
		}
	}
</script>

<style lang="scss">
	.box {
		background-color: #FFFFFF;
	}
</style>
