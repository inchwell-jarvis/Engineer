<template>
	<view class="box">

		<!-- 手风琴效果 -->
		<uni-collapse accordion="true" v-for="(item,index) in Data" :key="index" class="collapse1">
			<uni-collapse-item :title="item.Name">

				<uni-collapse accordion="true" v-for="(items,indexs) in item.EpTwos" :key="items+indexs" class="collapse2">
					<uni-collapse-item :title="items.Name">

						<uni-collapse accordion="true" v-for="(itemss,indexss) in items.EpThrees" :key="itemss+indexss" class="collapse3">
							<view style="padding: 30rpx;" @tap="Det(itemss)">
								{{itemss.Name}}
							</view>
						</uni-collapse>

					</uni-collapse-item>
				</uni-collapse>
			</uni-collapse-item>
		</uni-collapse>




	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				Data: []
			}
		},
		created() {
			this.init()
			uni.showLoading({
				title: '加载中'
			});
		},
		methods: {
			init() {
				var obj = {
					url: this.$store.state.url + 'System/GetepInstruction',
					method: 'GET',
					header: this.$store.state.token,
					
				}
				this.$http(obj).then((res) => {
					this.Data = res.Data
					setTimeout(function() {
						uni.hideLoading();
					}, 100);
				})
				
				
				

			},
			Det(item) {

				this.$store.state.webviewurl = item.Url
				uni.navigateTo({
					url: "../../../../../components/webview/webview",
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		font-size: 14px;

		// 一级菜单
		.collapse1 {
			font-weight: bold;

			.collapse2 {
				padding-left: 50px;
				box-sizing: border-box;
				color: #009688;

				.collapse3 {
					padding-left: 50px;
					box-sizing: border-box;
					color: #0000FF;
				}
			}
		}
	}
</style>
