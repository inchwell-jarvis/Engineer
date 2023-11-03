<template>
	<view class="box">
		<uni-collapse accordion="true" v-for="(item,index) in Data" :key="index" class="collapse1">
			<uni-collapse-item :title="item.Value">

				<uni-collapse accordion="true" v-for="(items,indexs) in item.TrainingCaseThree" :key="items+indexs" class="collapse2">
					<view style="padding: 30rpx;" @tap="Det(items)">
						{{items.Value}}
					</view>
				</uni-collapse>

			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	// require插件名称
	export default {
		data() {
			return {
				Data: []
			};
		},
		created() {
			this.init()
		},
		methods: {
			//初始
			init: function() {
				var obj = {
					url: this.$store.state.url + "System/GetServiceManage",
					method: 'GET',
					header: this.$store.state.token,
				}
				this.$http(obj).then((res) => {
					this.Data = res.Data[0].TrainingCaseTwo;
				})
			},
			Det: function(item) {
				if (item.Key == '') {
					uni.showToast({
						title: "暂无文件",
						icon: "none"
					})
					return false
				}
				this.$store.state.webviewurl = item.Key
				uni.navigateTo({
					url: "../../../../components/webview/webview",
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #FFFFFF;

		.collapse1 {
			font-weight: bold;

			.collapse2 {
				padding-left: 50px;
				box-sizing: border-box;
				color: #009688;


			}
		}
	}
</style>
