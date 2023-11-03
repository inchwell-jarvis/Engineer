<template>
	<view class="box">


		<!-- 	//基础信息 -->
		<view class="basicinformation" v-for="(MSSODto,index) in Data" :key='index'>
			<view v-if="Maintenan == MSSODto.OrderId" style="color: #007AFF;">当前任务</view>
			<view class="text">
				<view class="span">任务状态：</view> {{MSSODto.MaintainOrderStateStr}}
			</view>
			<view class="text">
				<view class="span">任务单号：</view> {{MSSODto.OrderCode}}
			</view>
			<view class="text" style="background-color: #dfdfe5;border-radius: 5px;margin-bottom: 5px;" v-for="(item,indexsss) in MSSODto.GoosDtos"
			 :key='indexsss'>
				<view class="span">需求：{{item.Quantity}}</view>
				<view class="span">已发：{{item.Quantity}}</view>
				<view style="width: 100%;">
					描述：{{item.ProDesc}}'这是描述，这是描述这是描述这是描述这是描述这是描述'
				</view>
			</view>

			<view v-if="MSSODto.GoosDtos.length == 0" style="text-align: right;color: #DD524D;" >此任务未选择耗材</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: [],
				Maintenan: this.$store.state.MaintenancestatusID,
			};
		},
		created() {
			this.init()
		},
		methods: {
			init: function() {
				var obj = {
					url: this.$store.state.url + 'Maintain/GetMSUsageInfo',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						Id: this.$store.state.MaintenancestatusID,
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data.MSUsageInfoDtos)
					this.Data = res.Data.MSUsageInfoDtos
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #FFFFFF;
		padding: 0 5px;
		box-sizing: border-box;

		.text {
			text-indent: 30px;
			margin-bottom: 10px;
		}

		.basicinformation {
			width: 95%;
			background: #FFFFFF;
			margin: auto;
			border-radius: 10px;
			margin-top: 10px;
			margin-left: 2.5%;
			margin-bottom: 10px;
			border: 1px solid #C0C0C0;
			float: left;

			.Task1 {
				width: 95%;
				margin: auto;
				box-sizing: border-box;
				background-color: #007AFF;

				.head {
					//蓝色标题
					width: 80%;
					height: 25px;
					background-color: #007AFF;
					color: #FFFFFF;
					border-radius: 5px;
					font-weight: bold;
					overflow: hidden;
					line-height: 25px;
					padding-left: 15px;
					box-sizing: border-box;
					font-size: 13px;
					float: left;
				}

				.ps {
					width: 25px;
					height: 25px;
					line-height: 25px;
					box-sizing: border-box;
					float: left;
					margin-left: 20px;

					image {
						display: block;
						width: 25px;
						height: 25px;
						float: left;
					}
				}

				.EquPhotos {
					//照片组
					width: 100%;
					height: 135px;
					background-color: #d8d8d8;
					border-radius: 10px;
					float: left;
					margin-top: 10px;
					margin-bottom: 10px;
					padding: 5px;
					box-sizing: border-box;

					.texts {
						width: 100%;
						height: 20px;
						line-height: 20px;
						font-size: 13px;
						font-weight: bold;

						image {
							width: 20px;
							height: 20px;
							float: right;
						}
					}

					.pushimg {
						width: 100%;
						height: 105px;

						.left {
							width: 105px;
							height: 105px;
							float: left;
							margin-left: 20px;
							overflow: hidden;

							.images {
								width: 100%;
								height: 100%;
							}
						}

						.right {
							margin-left: 60px;
						}
					}
				}
			}

			.text {
				width: 95%;
				// height: 30px;
				display: block;
				margin: auto;
				line-height: 30px;

				.span {
					width: 30%;
					display: block;
					height: 100%;
					float: left;
					margin-right: 20%;
				}
				
			}
		}


	}
</style>
