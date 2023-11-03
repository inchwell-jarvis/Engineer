<template>
	<view class="box pointerEvents">
		<u-section class='tipClickLook' title="保养合同耗材使用情况" sub-color='#09c'	 sub-title="点击查看" @click='ClickView'></u-section>

		<view class="boxx">
			<u-card padding="10" v-for="(item,index) in Data" :key='index' title-size='20rpx' style='border: 0.5px solid #000;'
			 :title="item.ProductCode" :sub-title="item.BarcodeMemo">
				<view class="" slot="body">
					<view class="u-body-item">
						<text>描述：</text>
						{{item.Characteristics}}
					</view>
				</view>
				<view class="" slot="foot">
					数量<u-number-box style='float: right;' v-model="item.Value"></u-number-box>
				</view>
			</u-card>



		</view>
		<button class="QRhc" type="primary" style="line-height: 40px;font-size: 14px;" @tap='Detection()' size="mini">确认耗材</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: [],
			};
		},
		created() {
			this.init()
		},
		onBackPress() {
			uni.navigateTo({
				url: "./maintenance",
			});
			return true
		},
		methods: {
			// 点击查看 ICMS.获取保养合同耗材使用情况
			ClickView: function() {
				uni.navigateTo({
					url: "./UsageOfConsumables",
				});
			},
			// 初始接口
			init: function() {
				var obj = {
					url: this.$store.state.url + 'Product/GetProducts2',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						pageNum: '1',
						numPerPage: '999',
						orderField: '',
						orderDirection: '',
						proType: 3,
						productCode: '',
						barcodeMemo: '',
						man: '',
						desc: '',
						memo: ''
					}
				}
				this.$http(obj).then((res) => {
					console.log(res)
					this.Data = res.Data.Dtos
					for (var i = 0; i < this.Data.length; i++) {
						this.Data[i]['Value'] = 0
					}
					console.log(this.Data)
				})
			},

			// 检测
			Detection: function() {
				var DataList = []
				for (var i = 0; i < this.Data.length; i++) {
					if (this.Data[i].Value != 0) {
						DataList.push({
							ProductId: this.Data[i].ID,
							Quantity: this.Data[i].Value
						})
					}
				}
				if (DataList.length == 0) {
					uni.showToast({
						title: '未选择！',
						icon: "none"
					})
					return false
				}
				this.UploadConsumables(DataList)
			},
			// 上传耗材
			UploadConsumables: function(Data) {
				var obj = {
					url: this.$store.state.url + 'Maintain/CreateMSSO',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						MaintainOrderId: this.$store.state.MaintenancestatusID,
						Goods: Data,
					}
				}
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: "./maintenance",
					});
				})
			}
		}
	}
</script>

<style lang="scss">
	.pointerEvents {
		// pointer-events: none 
	}

	.boxx {
		width: 100%;
		height: 100%;
		padding-top: 40px;
		box-sizing: border-box;
		// position: relative;

		.zanwu {
			width: 100%;
			height: 100%;
			color: red;
			padding-top: 100px;
			box-sizing: border-box;
			line-height: 30px;
			font-size: 20px;
			text-align: center;
		}

		// 循环的item
		.item {
			width: 98%;
			height: 60px;
			border: 1px solid #e3dfdf;
			margin: auto;
			border-radius: 5px;
			margin-top: 10px;

			-webkit-box-shadow: 3px 3px 6px #c1c1c1;
			-moz-box-shadow: 3px 3px 6px #c1c1c1;
			box-shadow: 3px 3px 6px #c1c1c1;

			.leftitem {
				width: calc(100% - 60px);
				height: 100%;
				float: left;

				// 上部分
				.itemTop {
					width: 100%;
					height: 50%;
					padding-left: 10px;
					overflow: hidden;
					box-sizing: border-box;
					line-height: 30px;
					font-weight: bold;
					font-size: 12px;
				}

				.itemBottom {
					width: 100%;
					height: 50%;
					padding-left: 10px;
					padding-right: 10px;
					overflow: hidden;
					box-sizing: border-box;
					line-height: 30px;
					font-size: 12px;

					span {
						color: #939393;
					}

					.span {
						float: right;
						color: #000000;
					}
				}
			}

			.rightitem {
				width: 60px;
				height: 100%;
				float: left;
				padding: 5px;
				box-sizing: border-box;
			}
		}

		.gwc {
			width: 70px;
			height: 70px;
			position: fixed;
			bottom: 20px;
			right: 60px;
			border-radius: 5px;
			background-color: #d5d5d5;
			border-radius: 50%;
			padding: 8px 8px 5px 5px;
			border: 3px solid #4CD964;
			box-sizing: border-box;
			z-index: 100;

			image {
				width: 50px;
				height: 50px;
				float: right;
			}

			.jioabiao {
				position: absolute;
				color: red;
				left: 3px;
				bottom: 15px;
				font-weight: bold;
				font-size: 20px;
			}
		}

	}

	// 确认耗材
	.QRhc {
		position: absolute;
		width: 130px;
		height: 40px;
		line-height: 40px;
		font-size: 12px;
		right: 10px;
		bottom: 10px;
		z-index: 99;
	}

	.tipClickLook {
		position: absolute;
		height: 40px;
		top: 0px;
		left: 0px;
		z-index: 99;
		background-color: #FFFFFF;
	}
</style>
