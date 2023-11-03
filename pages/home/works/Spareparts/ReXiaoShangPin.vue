<template>
	<view class="box">


		<u-card v-for="(item,index) in Data" :key="index" :title="item.ProductCode" @tap="asdurl(item)" box-shadow='2px 3px 4px #c1c1c1'
		 sub-title="点击查看" sub-title-color="#5b8eff" class='ZTstate'>
			<view class="" slot="body">
				<view class="textCode">
					<!-- <p>{{item.StatusStr + ' - ' + item.WorkOrderCode}}</p> -->
					<p>{{item.Desc}}</p>
				</view>

			</view>
		</u-card>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: []
			};
		},
		created() {
			var obj = {
				url: this.$store.state.url + 'Product/GetCUSpareParts',
				method: 'GET',
				header: this.$store.state.token,
				data: {
					month: 6
				}
			}
			this.$http(obj).then((res) => {
				this.Data = res.Data
				console.log(this.Data)

			})
		},


		onBackPress() {
			uni.navigateTo({
				url: "./classification",
			});
			return true
		},
		methods: {
			asdurl: function(item) {


				// 让 购物车页面知道返回到哪里

				this.$store.state.pageUrl = 1
				uni.navigateTo({
					url: "./ProductDetails?code=" + item.ProductCode
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
