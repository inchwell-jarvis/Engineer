<template>
	<view class="box">
		<view class="Amier">
			<view class="left">订单编号</view>
			<view class="right">{{ Data.SOCode }}</view>
		</view>
		<view class="Amier">
			<view class="left">状态</view>
			<view class="right">{{ Data.StateStr }}</view>
		</view>

		<!-- 详细信息 -->
		<view class="Customer">
			<view class="Customer_Top">详细信息</view>
			<view class="Mini_list">
				<view class="Mini_list_left">物流费</view>
				<view class="Mini_list_right">
					{{ TotalPrice.LogisticCharge }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">差旅费</view>
				<view class="Mini_list_right">
					{{ TotalPrice.TravelAmount }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">总价</view>
				<view class="Mini_list_right">
					{{ TotalPrice.Amount }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">优惠价</view>
				<view class="Mini_list_right">
					{{ TotalPrice.DiscountAmount }}
				</view>
			</view>
		</view>

		<!-- 设备清单 -->
		<view class="Customer" v-if="this.Data.SOEquipmentList">
			<view class="Customer_Top">设备清单</view>
			<view class="Listdan" v-for="(itemss, indexss) in this.Data.SOEquipmentList" :key="indexss">
				<view class="li">
					{{ '设备' + (indexss + 1) }}
				</view>
				<view class="Mini_list">
					<view class="Mini_list_left">设备编号</view>
					<view class="Mini_list_right">
						{{ itemss.ProcodeCode }}
					</view>
				</view>

				<view class="Mini_list">
					<view class="Mini_list_left">数量</view>
					<view class="Mini_list_right">
						{{ itemss.Number }}
					</view>
				</view>
				<view class="Mini_list">
					<view class="Mini_list_left">销售单价</view>
					<view class="Mini_list_right">
						{{ itemss.UnitPrice }}
					</view>
				</view>

				<view class="Mini_list">
					<view class="Mini_list_left">安装费单价</view>
					<view class="Mini_list_right">
						{{ itemss.AssemblyPeice }}
					</view>
				</view>

				<view class="Mini_list">
					<view class="Mini_list_left">是否甲方安装</view>
					<view class="Mini_list_right">
						{{ itemss.IsAssembly ? '是' : '否' }}
					</view>
				</view>

				<view class="Mini_list">
					<view class="Mini_list_left">描述</view>
					<view class="Mini_list_right2">
						{{ itemss.Desc || '暂无描述' }}
					</view>
				</view>
			</view>
		</view>

		<!-- 详细信息 -->
		<view class="Customer">
			<view class="Customer_Top">收货人</view>
			<view class="Mini_list">
				<view class="Mini_list_left">收货人</view>
				<view class="Mini_list_right">
					{{ Consignee.Name }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">手机号码</view>
				<view class="Mini_list_right">
					{{ Consignee.MobilePhone }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">固定电话</view>
				<view class="Mini_list_right">
					{{ Consignee.Tel }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">收货地址</view>
				<view class="Mini_list_right">
					{{ Consignee.Address }}
				</view>
			</view>
		</view>

		<view class="Customer">
			<view class="Customer_Top">备注</view>
			<view class="textarea">
				{{ Data.Memo }}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			Data: {},
			SOEquipmentList: [],
			TotalPrice: {},
			Consignee: {}
		};
	},
	created() {
		var obj = {
			url: this.$store.state.url + '/SO/GetSo',
			method: 'GET',
			header: this.$store.state.token,
			data: {
				SOId: this.$store.state.SOId
			}
		};
		this.$http(obj).then((res) => {
			this.Data = res.Data;
			this.SOEquipmentList = this.Data.SOEquipmentList;
			this.TotalPrice = this.Data.TotalPrice;
			this.Consignee = this.Data.Consignee;
			console.log(this.Data);
		});
	},
	methods: {}
};
</script>

<style scoped lang="scss">
.box {
	height: 100%;
	font-size: 14px;
	box-sizing: border-box;

	// 搬运客户APP详情页

	.Amier {
		width: 100%;
		height: 40px;
		background-color: #ffffff;
		line-height: 40px;
		padding-left: 20px;
		padding-right: 20px;
		margin-top: 10px;
		box-sizing: border-box;

		view {
			width: 50%;
			height: 100%;
			float: left;
		}
		.left {
			font-weight: bold;
		}

		.right {
			float: right;
			text-align: right;
			color: #808080;
		}
	}

	.Customer {
		width: 100%;
		background-color: #ffffff;
		margin-top: 20px;

		// 设备订单 for
		.Listdan {
			width: 100%;
			margin-bottom: 50px;
			// 标识
			.li {
				width: 100%;
				height: 30px;
				line-height: 30px;
				padding-left: 20px;
				color: #007aff;
				font-weight: bold;
				font-size: 13px;
				box-sizing: border-box;
			}
		}

		.thisphotos {
			//图片外框
			width: 100%;
			background-color: #ffffff;

			image {
				width: 80%;
				display: block;
				margin: auto;
				margin-top: 10px;
			}
		}

		.Customer_Top {
			width: 100%;
			height: 40px;
			border-bottom: 1px solid #c3c3c3;
			line-height: 40px;
			padding-left: 20px;
			font-weight: bold;
			box-sizing: border-box;
		}

		.textarea {
			width: 90%;
			margin: auto;
			margin: 10px;

			.textarea {
				text-indent: 10px;
				font-size: 14px;
				color: #555555;
			}

			.Quote {
				width: 100%;
				// background-color: #dddddd;
				border-radius: 10px;
				margin-bottom: 10px;
				height: 100px;
				padding-top: 10px;
				box-sizing: border-box;

				button {
					float: right;
				}

				.Quote_Top {
					width: 100%;
					height: 25px;

					text {
						float: right;
					}
				}
			}

			.Customer_Top_Code {
				width: 100%;
				height: 20px;
				border-bottom: 1px solid #c8c7cc;

				.Customer_Top_Code_left {
					width: 50%;
					float: left;
					line-height: 20px;
					color: #999999;
				}

				.Customer_Top_Code_right {
					text-align: right;
					line-height: 20px;
				}
			}

			image {
				width: 100px;
				height: 100px;
				margin-left: 10px;
			}
		}

		.Mini_list {
			width: 100%;
			min-height: 30px;
			line-height: 30px;
			padding-left: 20px;
			box-sizing: border-box;

			.Mini_list_left {
				width: 25%;
				height: 100%;
				font-weight: bold;
				float: left;
				font-size: 12px;
				color: #555555;
			}

			.Mini_list_right {
				width: 75%;
				height: 100%;
				color: #808080;
				float: left;
				overflow: hidden;
				font-size: 12px;
			}

			.Mini_list_right2 {
				width: 75%;
				min-height: 30px;
				color: #808080;
				float: left;
				overflow: hidden;
				font-size: 12px;
				word-break: break-all;
				overflow-wrap: break-word;
				white-space: normal;
			}
		}
	}
}

// 1431  2405
</style>
