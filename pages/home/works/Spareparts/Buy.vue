<template>
	<view class="box">
		<!-- 联系人 -->
		<view class="address">
			<view class="addresss">
				<text>{{ this.Contactperson.Name }}</text>
				<text>{{ this.Contactperson.Mobile || '暂无联系方式' }}</text>
				<text>{{ this.Contactperson.Address || '暂无详细地址' }}</text>
			</view>
			<view @tap="huan()" class="adds1">
				<image src="../../../../static/icon/icon/arrow_right.png" mode=""></image>
			</view>
		</view>
		<!-- 商品 -->
		<view class="shaoping">
			<view v-if="BUY" class="one" v-for="(item, index) in BUY" :key="index">
				<text class="text1">{{ item.title || item.Desc }}</text>
				<text>数量：{{ item.Number }}</text>
				<text v-if="item.IsAssembly">甲方安装</text>
				<text v-if="!item.IsAssembly">非甲方安装</text>
				<text class="text4">￥{{ item.mani * item.Number || item.UnitPrice * item.Number || 0 }}</text>
			</view>
		</view>

		<!-- 备注 -->
		<view class="memo">
			<text class="title">备注</text>
			<u-input v-model="Memo" type="textarea" :border="true" />
		</view>
		<view class="AssemblyUnitPrice">
			<label class="label"></label>
			<button @tap="fukuan" :disabled="disabled" class="fu">提交订单</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			Contactpersons: [],
			Contactperson: {}, //默认联系人
			BUY: [], //商品
			GoodsInfos: [], //提交商品集合
			CustomerId: '',
			disabled: false,
			asd: 0,
			Memo: '' //备注
		};
	},
	onBackPress() {
		uni.navigateTo({
			url: './ProductDetails'
		});
		return true;
	},
	mounted() {
		var asd = this.$store.state.ShoppingCartasd;
		// console.log(this.$store.state.Buy) //商品
		this.BUY = this.$store.state.Buy;

		if (this.$store.state.initstates) {
			this.CustomerId = this.$store.state.Customercode;
		} //客户id
		if (!this.$store.state.initstates) {
			this.CustomerId = this.$store.state.CustomerIdid;
		} //订单带过来的客户id

		//切换联系人
		if (this.$store.state.lianxir.Name) {
			this.Contactperson = this.$store.state.lianxir;
			this.$store.state.lianxir = {};
			return false;
		}
		//获取联系人
		var obj = {
			url: this.$store.state.url + 'CRM/GetCusLinkManMini',
			method: 'GET',
			header: this.$store.state.token,
			data: {
				cusId: this.CustomerId
			}
		};
		this.$http(obj).then((res) => {
			this.Contactpersons = res.Data.Dtos;
			console.log(this.Contactpersons);
			for (var i = 0; i < this.Contactpersons.length; i++) {
				if (this.Contactpersons[i].Default) {
					this.Contactperson = this.Contactpersons[i];
					console.log(this.Contactperson);
					return false;
				}
			}
			if (!this.Contactperson) {
				console.log('没有默认联系人');
				this.Contactperson = this.Contactpersons[0];
			}
		});
	},
	methods: {
		//付款

		fukuan: function () {
			if (this.asd == 1) {
				return false;
			}
			this.asd = 1;
			this.disabled = true;

			for (var i = 0; i < this.BUY.length; i++) {
				//输出需要的商品信息集合
				console.log(this.BUY[i].ProductId);
				var GOOD = {};
				GOOD.ProductId = this.BUY[i].ProductId;
				GOOD.Number = this.BUY[i].Number;
				GOOD.IsAssembly = this.BUY[i].IsAssembly;
				this.GoodsInfos[i] = GOOD;
			}
			//判断客户和工单
			if (this.$store.state.initstates) {
				console.log('客户');
				var obj = {
					url: this.$store.state.url + 'CRM/SubmitOrder',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						AddressId: this.Contactperson.LinkManId, //收货地址id
						Type: 2, //1：传工单Id/// 2：传客户Id
						CustomerId: this.$store.state.Customercode, //客户id
						WorkorderId: '', //工单id
						GoodsInfos: this.GoodsInfos, //商品集合
						Memo: this.Memo // 备注
					}
				};
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: '/pages/home/works/work.2'
					});
				});
			} else {
				var obj = {
					url: this.$store.state.url + 'CRM/SubmitOrder',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						AddressId: this.Contactperson.LinkManId, //收货地址id
						Type: 1, //1：传工单Id/// 2：传客户Id
						CustomerId: '', //客户id
						WorkorderId: this.$store.state.WorkOrderIdid, //工单id
						GoodsInfos: this.GoodsInfos, //商品集合
						Memo: this.Memo // 备注
					}
				};
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: '/pages/home/works/work.2'
					});
				});
			}
		},
		//切换联系人
		huan: function () {
			uni.navigateTo({
				url: './qielxr'
			});
		}
	}
};
</script>

<style scoped lang="scss">
.box {
	background-color: #f1f0f3;
}

.memo {
	width: 100%;
	background-color: #ffffff;
	padding: 10px;
	box-sizing: border-box;
	.title {
		font-weight: bold;
	}
}
.address {
	width: 100%;
	height: 120px;
	background-color: #ffffff;
	padding: 10px;
	box-sizing: border-box;

	.addresss {
		width: 90%;
		height: 100%;
		float: left;

		text {
			font-size: 16px;
			display: block;
			line-height: 25px;
			font-weight: bold;
		}
	}

	.adds1 {
		width: 10%;
		height: 100%;
		float: left;

		image {
			width: 30px;
			height: 30px;
			margin-top: 30px;
		}
	}
}

.shaoping {
	width: 100%;
	margin-top: 5px;

	.one {
		width: 100%;
		height: 120px;
		padding: 10px;
		box-sizing: border-box;
		border-radius: 5px;
		background: #ffffff;
		margin-bottom: 5px;

		text {
			display: block;
		}

		.text1 {
			font-weight: bold;
			overflow: hidden;
			display: block;
			height: 32px;
		}

		.text4 {
			color: #ff0000;
			font-weight: bold;
			font-size: 18px;
		}
	}
}

.AssemblyUnitPrice {
	position: fixed;
	bottom: 0px;
	width: 100%;
	padding: 0 4%;
	height: 45px;
	border-top: solid 1upx #eee;
	background-color: #fff;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	align-items: center;

	text {
		font-weight: bold;
		color: #ff0000;
		font-size: 20px;
	}

	.fu {
		width: 100px;
		height: 30px;
		background-color: #ff0000;
		border-radius: 30px;
		text-align: center;
		line-height: 30px;
		color: #ffffff;
		float: right;
		margin-right: 50px;
	}
}
</style>
