<template>
	<view class="box">
		<div class="alert">校准成功后，任务会更改成 
		 <span>在途</span> <br>
		 到达客户现场后，仍需要点击“ <span>到达</span>”按钮</div>
		<!-- <u-notice-bar mode="horizontal" class='bar'  type='error' :list="list"></u-notice-bar> -->

		<view class="titles" v-if="WorkTypesover == 1">
			暂无正在处理的任务
		</view>

		<u-card v-if="WorkTypesover == 2" v-for="(item,index) in DatabaseConnection" :key='index' :title="item.ZT" @click="StateTracedCallback(item)"
		 :head-style='headStyle' :body-style='bodyStyle' box-shadow='2px 3px 4px #c1c1c1' sub-title="点击校准" sub-title-color='#5b8eff'
		 class='ZTstate'>
			<view class="" slot="body">
				<view class="textCode">
					{{item.CusFullName}}
				</view>
				<view class="textCode">
					{{item.OrderCode}}
				</view>
				<view class="textCode">
					{{item.OrderState}}
				</view>
			</view>
		</u-card>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 卡片头部样式
				headStyle: {
					'padding': '10px 5px',
					'font-weight': 'bold'
				},
				bodyStyle: {
					'padding': '10px 10px'
				},
				DatabaseConnection: [],
				WorkTypesover: 0,
		
				list: [
					'区域经理&工程师执行的所有任务(安装、拆装、维修、保养)',
					'必须通过系统指派和处理，通过线下通知等方式告知的任务不会被系统统计到',
					'请勿执行',
				],
				
			};
		},
		mounted() {
			this.init()
		},
		methods: {
			init: function() {
				var obj = {
					url: this.$store.state.url + 'System/GetEnginnerWorking',
					method: 'GET',
					header: this.$store.state.token,
				}
				this.$httpnone(obj).then((res) => {
					console.log(res.Data.Dtos)
					this.DatabaseConnection = res.Data.Dtos
					if (this.DatabaseConnection.length != 0) {
						this.WorkTypesover = 2
					} else {
						this.WorkTypesover = 1
					}

					for (var index = 0; index < this.DatabaseConnection.length; index++) {
						if (this.DatabaseConnection[index].WorkType == 1) {
							this.DatabaseConnection[index]['ZT'] = '保养'
						}
						if (this.DatabaseConnection[index].WorkType == 2) {
							this.DatabaseConnection[index]['ZT'] = '维修'
						}
						if (this.DatabaseConnection[index].WorkType == 3) {
							this.DatabaseConnection[index]['ZT'] = '安装'
						}
					}
				})
			},
			StateTracedCallback: function(item) {

				var obj = {
					url: this.$store.state.url + 'System/AlignEnginnerState',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						CusId: item.CusId,
						OrderId: item.OrderId,
						WorkType: item.WorkType,
					}
				}
				this.$httpnone(obj).then((res) => {
					console.log(res)
					uni.switchTab({
						url: "../../home"
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #FFFFFF;
		padding-top: 30px;
		box-sizing: border-box;

		.bar {
			width: 100%;
			position: absolute;
			top: 0;
			z-index: 999;
		}

		.textCode {
			width: 100%;
			line-height: 20px;
		}

		.item {
			width: 95%;
			background-color: #FFFFFF;
			height: 100px;
			margin: auto;
			border-radius: 10px;
			margin-top: 10px;
			padding: 5px;
			box-sizing: border-box;

			-webkit-box-shadow: 3px 3px 6px #c1c1c1;
			-moz-box-shadow: 3px 3px 6px #c1c1c1;
			box-shadow: 3px 3px 6px #c1c1c1;

			.items_left {
				width: 12%;
				height: 100%;
				float: left;
				font-size: 16px;
				box-sizing: border-box;
				border: 1px solid #CCCCCC;
				border-radius: 5px;
				box-sizing: border-box;

				.top,
				.bottom {
					width: 100%;
					height: 50%;
					text-align: center;
					line-height: 50px;
					font-weight: bold;
				}
			}

			.items {
				width: 88%;
				height: 100%;
				float: left;
				padding-left: 10px;
				box-sizing: border-box;

				.title {
					width: 100%;
					height: 18px;
					line-height: 18px;
					overflow: hidden;
					font-weight: bold;
					font-size: 14px;
				}

				.header {
					width: 100%;
					height: 40px;
					line-height: 40px;
				}

				button {
					margin-left: 80%;
				}
			}

		}

		.titles {
			width: 90%;
			height: 100px;
			text-align: center;
			line-height: 100px;
			background-color: #FFFFFF;
			margin: auto;
			border-radius: 10px;
			margin-top: 10px;


			-webkit-box-shadow: 3px 3px 6px #c1c1c1;
			-moz-box-shadow: 3px 3px 6px #c1c1c1;
			box-shadow: 3px 3px 6px #c1c1c1;
		}
		
		.alert{
			width: 95%;
			min-height: 10px;
			border-radius: 5px;
			border: 1px solid #fcbd71;
			background: #fdf6ec;
			margin: auto;
			padding: 5px;
			box-sizing: border-box;
			line-height: 20px;
			span{
				color: red;
			}
		}
	}
</style>
