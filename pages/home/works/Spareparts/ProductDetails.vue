<template>
	<view class="box">
		<!-- 头部 -->
		<view class="head">
			<image src="../../../../static/img/yzj.png" mode=""></image>
		</view>
		<!-- 价格区域 -->
		<view class="info-box goods-info">
			<view class="price">￥{{data.UnitPrice}}</view>
			<view class="title">
				{{data.Describe}}
			</view>
		</view>
		<view class="kongbai">
			<view class='text'>数量：</view>
			<u-number-box v-model="shulinag" @change="valChange" :min='1' style='float:right'></u-number-box>
		</view>
		<!-- 甲方安装 -->
		<view class="kongbai">
			<view class='text'>甲方安装</view>
			<u-switch v-model="PartyA" style='float:right'></u-switch>
		</view>
		<!-- //底部操作框 -->
		<view v-if="footer" class="footer">
			<view class="icons">
				<view @tap="Cart" class="boxx">
					<view class="icon fenxiang">
						<image src="../../../../static/icon/icon/shao.png" mode=""></image>
					</view>
					<view class="text">购物车</view>
				</view>
			</view>
			<view class="btn">
				<view class="joinCart" @tap="joinCart">加入购物车</view>
				<view class="buy" @tap="buy">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				asd: '1000000000184812',
				data: {},
				shulinag: 1,
				ProductId: '',
				PartyA: false,
				productCodce: '',
				CustomerId: "",
				footer: true,
				dsfdfsd: 0
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			if (option.code) {
				this.productCodce = option.code
				this.$store.state.productCodce = option.code
			} else {
				this.productCodce = this.$store.state.productCodce
				console.log(this.productCodce)

			}
		},
		onBackPress() {
			console.log(this.$store.state.pageUrl)
			if (this.$store.state.pageUrl == 1) {
				uni.navigateTo({
					url: "./ReXiaoShangPin",
				});
				
			} else if (this.$store.state.pageUrl == 2) {
				uni.navigateTo({
					url: "./Spareparts",
				});
			} else {
				uni.navigateTo({
					url: "./drawings",
				});
			}
			
			
			this.$store.state.pageUrl = 0
			
			return true
		},
		mounted() {
			//获取商品信息
			var obj = {
				url: this.$store.state.url + 'Product/GetProductMini',
				method: 'GET',
				header: this.$store.state.token,
				data: {
					productCodce: this.$store.state.buyids || this.productCodce
				}
			}
			console.log(obj)
			this.$http(obj).then((res) => {
				this.data = res.Data
			})
		},
		methods: {
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},










			//修改状态
			alls: function() {
				this.PartyA = !this.PartyA
			},
			//增加商品数量
			jia: function() {
				this.shulinag += 1
			},
			//减少商品数量
			jian: function() {
				if (this.shulinag == 1) {
					uni.showToast({
						title: '商品数量最少为 1',
						icon: 'none'
					})
				} else {
					this.shulinag -= 1
				}
			},
			//打开购物车
			Cart: function() {
				uni.navigateTo({
					url: "./ShoppingCart",
				});
			},
			//加入购物车
			joinCart: function() {
				if (this.$store.state.initstates) {
					this.CustomerId = this.$store.state.Customercode
				} //客户id
				if (!this.$store.state.initstates) {
					this.CustomerId = this.$store.state.CustomerIdid
				} //订单带过来的客户id 
				var obj = {
					url: this.$store.state.url + 'CRM/AddToShopCar',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						CustomerId: this.CustomerId, //客户id
						ProductId: this.data.ProductId, //产品id
						Number: this.shulinag,
						IsAssembly: this.PartyA, //甲方安装
					}
				}
				this.$http(obj).then((res) => {
					uni.showToast({
						title: "成功加入购物车",
						icon: "none"
					})
				})
			},
			//立即购买
			buy: function() {
				if (this.dsfdfsd == 1) {
					return false
				}
				this.dsfdfsd = 1
				var asd = {}
				this.$store.state.Buy = []
				asd.mani = this.data.UnitPrice, //商品价格
					asd.title = this.data.Describe, // 商品标题
					asd.ProductId = this.data.ProductId, // 商品id
					asd.Number = this.shulinag, // 商品数量
					asd.IsAssembly = this.PartyA, // 是否甲方安装

					this.$store.state.Buy[0] = asd
				uni.navigateTo({
					url: "./Buy",
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		width: 100%;
		height: 200px;
		overflow: hidden;
		background-color: #FFFFFF;

		image {
			width: 100px;
			height: 100px;
			display: block;
			margin: 50px auto;
			box-sizing: border-box;
		}
	}

	.add {
		width: 100%;
		height: 150px;
		background: #57dddd;
		padding: 10px;
		box-sizing: border-box;

		text {
			display: block;
		}

		.Describe {
			font-weight: bold;
			font-size: 16px;
			margin-bottom: 15px;
		}

		.UnitPrice {
			color: red;
			font-size: 14px;

			span {
				font-size: 20px;
			}

		}

		.AssemblyUnitPrice {
			float: right;

			span {
				color: red;
				font-size: 20px;
				margin-right: 10px;
			}
		}

		.Branch {
			font-weight: bold;
			margin-top: 10px;
		}

	}

	.gou {
		width: 100%;
		height: 50px;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 10px;
		box-sizing: border-box;

		view {
			width: 30%;
			float: right;
			height: 100%;

			text-align: center;
			line-height: 30px;
			font-size: 12px;

			color: #FFFFFF;
		}

		.gous {
			background-color: #F5C443;
			border-radius: 30px 0 0 30px;
		}

		.buy {
			background: #EC682C;
			border-radius: 0 30px 30px 0;
		}

		.icon {
			width: 40px;
			height: 50px;
			float: left;
			margin-left: 50px;
			background-color: #007AFF;

			image {
				width: 20px;
				height: 20px;
				display: block;
			}

			text {
				font-size: 14px;
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0upx;
		width: 92%;
		padding: 0 4%;
		height: 99upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icons {
			display: flex;
			height: 80upx;
			margin-left: -4%;

			.boxx {
				width: 80upx;
				height: 80upx;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				margin-left: 30px;

				.icon {
					width: 20px;
					height: 20px;
					font-size: 40upx;
					color: #828282;

					image {
						width: 100%;
						height: 100%;

					}
				}

				.text {
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 22upx;
					color: #666;
				}
			}
		}

		.btn {
			height: 80upx;
			border-radius: 40upx;
			overflow: hidden;
			display: flex;
			margin-right: -2%;

			.joinCart,
			.buy {
				height: 80upx;
				padding: 0 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 28upx;
			}

			.joinCart {
				background-color: $uni-color-error;
			}

			.buy {
				background-color: $uni-color-warning;
			}
		}
	}

	.info-box {
		width: 92%;
		padding: 20upx 4%;
		background-color: #fff;
		margin-bottom: 20upx;
	}

	.goods-info {
		.price {
			font-size: 46upx;
			font-weight: 600;
			color: $uni-color-error;
		}

		.title {
			font-size: 30upx;
		}
	}

	.kongbai {
		width: 95%;
		height: 45px;
		background-color: #dddddd;
		padding: 10px 15px;
		border-radius: 10px;
		margin: auto;
		margin-bottom: 10px;
		box-sizing: border-box;

		.text {
			float: left;
			width: 100px;
			font-weight: bold;
		}
	}
</style>
