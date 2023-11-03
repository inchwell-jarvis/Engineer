<template>
	<view class="box">
		<view class="ka" v-for="(item,index) in data" :key="index">
			<view class="left">
				<label class="label">
					<checkbox class="checkbox" :checked="item.bool" @tap="checkbox(index)" />
				</label>
			</view>
			<view class="right">
				<view class="text1">{{item.ProductCode}}
					<image @tap="dilit(item)" :src="img"></image>
				</view>
				<text class="Desc">{{item.Desc}}</text>
				<text class="text2">数量：{{item.Number}}</text>
				<text class="text3">{{item.Branch}}</text>
				<text class="text4" v-if="item.IsAssembly">甲方安装</text>
				<text class="text4" v-if="!item.IsAssembly">非甲方安装</text>
			</view>
		</view>
		<view class="xxxxxxxxxxx"></view>
		<view class="AssemblyUnitPrice">
			<label class="label">
				<checkbox @click="all()" :checked="alls" color="#FF0000" class="checkbox" />
			</label>
			<view @tap="xiadingdan" class="fu">
				下订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				alls: false,
				data: [],
				img: require('../../../../static/icon/icon/shan.png'),
				CustomerId: '', //客户id
			};
		},
		onBackPress() { //自定义返回逻辑
			uni.navigateTo({
				url: "./ProductDetails",
			});
			return true
		},
		mounted() {
			if (this.$store.state.initstates) {
				this.CustomerId = this.$store.state.Customercode
			} //客户id
			if (!this.$store.state.initstates) {
				this.CustomerId = this.$store.state.CustomerIdid
			} //订单带过来的客户id 
			//获取购物车
			this.chushihua()
		},
		methods: {
			//初始化
			chushihua: function() {
				var obj = {
					url: this.$store.state.url + 'CRM/ShoppingCarList',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						cusId: this.CustomerId, //客户id
					}
				}
				this.$http(obj).then((res) => {
					var asd = res.Data.Dtos
					for (var i = 0; i < asd.length; i++) {
						asd[i].bool = false
						if (asd[i].Desc.length > 15) {
							asd[i].Desc = asd[i].Desc.replace(/[\r\n]/g, "").substring(0, 20)
						}
					}
					this.data = asd
					console.log(this.data)
				})
			},


			//删除商品
			dilit: function(item) {
				var obj = {
					url: this.$store.state.url + 'CRM/DeleteProductFromCar',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						id: item.ShoppingCarId
					}
				}
				this.$http(obj).then((res) => {
					this.chushihua()
				})
			},
			all: function() {
				this.alls = !this.alls
				for (var i = 0; i < this.data.length; i++) {
					this.data[i].bool = this.alls
				}
			},
			//点击勾选
			checkbox(i) {
				this.data[i].bool = !this.data[i].bool
				var asd = true
				for (var i = 0; i < this.data.length; i++) {
					if (!this.data[i].bool) {
						asd = false
					}
				}
				this.alls = asd
			},
			//下订单
			xiadingdan: function() {
				var asd = []
				for (var i = 0; i < this.data.length; i++) {
					if (this.data[i].bool) {
						asd.push(this.data[i])
					}
				}
				if(asd.length == 0){
					uni.showToast({title: "请添加商品",icon: "none"})
					return false
				}
				this.$store.state.Buy = asd
				console.log(this.$store.state.Buy)
				uni.navigateTo({
					url: "./Buy",
				});

			}

		}
	}
</script>

<style scoped lang="scss">
	.box {
		background-color: #f1f0f3;
		overflow: auto;

		//商品卡片
		.ka {
			width: 95%;
			height: 100px;
			background: #ffffff;
			border-radius: 10px;
			margin: auto;
			margin-top: 10px;
			padding: 10px;
			box-sizing: border-box;

			.left {
				width: 10%;
				height: 10px;
				float: left;
				margin-top: 15px;
			}

			.right {
				width: 90%;
				height: 100%;
				float: left;

				text {
					display: block;
				}

				.text1 {
					width: 100%;
					display: block;
					font-weight: bold;

					image {
						width: 20px;
						height: 20px;
						display: block;
						float: right;
					}
				}

				.Desc {
					width: 100%;
					line-height: 32px;
				}

				.text2 {
					width: 100px;
					float: left;
				}

				.text3 {
					float: left;
				}

				.text4 {
					float: right;
				}
			}
		}

		.xxxxxxxxxxx {
			width: 100%;
			height: 60px;
		}
	}







	// 最下面的窗口
	.AssemblyUnitPrice {
		position: fixed;
		bottom: 0px;
		width: 92%;
		padding: 0 4%;
		height: 45px;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.fu {
			width: 100px;
			height: 30px;
			background-color: #FF0000;
			border-radius: 30px;
			color: #FFFFFF;
			text-align: center;
			line-height: 30px;
		}
	}

	uni-checkbox .uni-checkbox-input {
		border-radius: 50%;
	}
</style>
