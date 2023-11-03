<template>
	<view class="box">
		<u-empty  v-if="!Data.Dtos"  text="暂无订单" mode="message	"></u-empty>
		
			<u-card  v-for="(item,index) in Data.Dtos" :key="index" @tap="order(item)"   :title="item.SOCode" :sub-title="item.CreateDateStr"     >
				<view class="" slot="body">
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2" style="color: #2979ff;">{{item.CusName}}</view>
					</view>
				</view>
				<view class="" slot="foot">
					<u-icon name="coupon-fill" size="34" color="#fcbd71" :label="item.StateStr"></u-icon>
					</view>
			</u-card>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				name: '赵鸿飞',
				numPerPage: 20, //展示条数
				Data: []
			}
		},
		onBackPress() {//自定义返回逻辑
			uni.switchTab({
				url: "../home"
			});
			return true
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				var obj = {
					url: this.$store.state.url +  '/SO/GetSOs',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						pageNum: '1',
						numPerPage: this.numPerPage,
						orderField: '',
						orderDirection: '',
						search: ''
					}
				}
				this.$http(obj).then((res) => {
					this.Data = res.Data
					// for(var i = 0; i < this.Data.Dtos.length; i ++){
					// 	this.Data.Dtos[i].CusName = this.Data.Dtos[i].CusName.substring(0,17)
					// }
				})
			},
			order(item) {
				this.$store.state.SOId = item.SOId
				uni.navigateTo({
					url: "./Order/Order",
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {

		.boxx {
			width: 100%;
			height: 70px;
			border-bottom: 3px solid #C0C0C0;
			padding: 10px;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 10px;
			margin-top: 5px;
			
			view{
				
				height: 50%;
				float: left;
				line-height: 35px;
				box-sizing: border-box;
			}
			.text1,.text2{
				padding-bottom: 10px;
				box-sizing: border-box;
			}
			.text3,.text4{
				padding-top: 5px;
				box-sizing: border-box;
			}
			.text1,{
				width: 80%;
				font-weight: bold;
				overflow: hidden;
			}
			.text2{
				width: 20%;
			}
			.text2 , .text4 {
				text{
					float: right;
				}
			}
			.text3 {
				width: 50%;
				display: block;
				float: left;
			}
			.text4{
				width: 50%;
			}
		}
	}
</style>
