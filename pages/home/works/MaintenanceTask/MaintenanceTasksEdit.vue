<template>
	<view class="box">
		<u-top-tips ref="uTips"></u-top-tips>

		<!-- 基础信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				客户信息

				<u-button type="primary" size="mini" @click='start()' v-if="Data.StateStr == '待保养'"
					style="float: right;margin-right: 10px;">启动</u-button>
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">
					客户名称
				</view>
				<view class="Mini_list_right">
					{{this.Data.CustomerName}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					合同号
				</view>
				<view class="Mini_list_right">
					{{this.Data.ContractCode}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					频次
				</view>
				<view class="Mini_list_right">
					{{this.Data.PinCi}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					客户特征
				</view>
				<view class="Mini_list_right">
					{{this.Data.Feature}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					单号
				</view>
				<view class="Mini_list_right">
					{{this.Data.OrderCode}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					状态
				</view>
				<view class="Mini_list_right">
					{{this.Data.StateStr}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					耗材状态
				</view>
				<view class="Mini_list_right">
					{{this.Data.MSSOStateStr}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					预计时间
				</view>
				<view class="Mini_list_right">
					{{this.Data.EstimatedTime}}
				</view>
			</view>
			<view class="Mini_list" @tap='show = true' v-if="Data.StateStr == '待保养'">
				<view class="Mini_list_left">
					新预计时间
				</view>
				<view class="Mini_list_right" style="color:blue">
					{{newTime || this.Data.EstimatedTime}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					启动时间
				</view>
				<view class="Mini_list_right">
					{{this.Data.ActualTime}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					开始时间
				</view>
				<view class="Mini_list_right">
					{{this.Data.BeginTime}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					结束时间
				</view>
				<view class="Mini_list_right">
					{{this.Data.EndTime}}
				</view>
			</view>
		</view>


		<view class="Customer">
			<view class="Customer_Top">
				设备信息
			</view>

			<div class="li" v-for="(item,index) in DetailDtos" :key="index">
				<h4>{{item.ProType}}</h4>
				<p>编号：{{item.ProductCode}}</p>
				<p>数量：{{item.Numner}}</p>
				<p>{{item.ProductDesc}}</p>
			</div>


		</view>

		<u-picker v-model="show" mode="time" :default-time='newTime' @confirm='confirm'></u-picker>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: {},
				DetailDtos: [],
				newTime: '',
				show: false,
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(JSON.parse(option.ID)); //打印出上个页面传递的参数。
			this.Data = JSON.parse(option.ID)
			this.GetMCEquSupplie(this.Data.ContractId)
		},
		methods: {
			// 获取保养所需耗材
			GetMCEquSupplie: function(ContractId) {
				var obj = {
					url: this.$store.state.url + 'Maintain/GetMCEquSupplie',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						Id: ContractId
					}
				}
				this.$http(obj).then((rv) => {
					console.log(rv)
					this.DetailDtos = rv.Data.DetailDtos
				})
			},
			confirm: function(time) {
				console.log(time)
				this.newTime = time.year + '-' + time.month + '-' + time.day
				var obj = {
					url: this.$store.state.url + 'Maintain/UpdateMCOEstimatedTime',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.Data.Id,
						Str: this.newTime,
					}
				}
				this.$http(obj).then((res) => {
					this.$refs.uTips.show({
						title: '修改成功！',
						type: 'success',
						duration: '2300'
					})
				})
			},
			start: function() {
				var obj = {
					url: this.$store.state.url + 'Maintain/BeginMaintainOrder',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						ID: this.Data.Id
					}
				}
				this.$http(obj).then((res) => {
					this.$refs.uTips.show({
						title: '启动成功！',
						type: 'success',
						duration: '2300'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		height: 100%;
		font-size: 14px;
		box-sizing: border-box;
		// 搬运客户APP详情页

		.Customer {
			width: 100%;
			background-color: #FFFFFF;
			margin-top: 20px;

			.li {
				width: 90%;
				min-height: 50px;
				box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
				margin: auto;
				border-radius: 5px;
				margin-top: 10px;
				padding: 5px;
				box-sizing: border-box;
			}

			.thisphotos {
				//图片外框
				width: 100%;
				background-color: #FFFFFF;

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
					border-bottom: 1px solid #C8C7CC;

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
				height: 30px;
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
			}
		}
	}
</style>