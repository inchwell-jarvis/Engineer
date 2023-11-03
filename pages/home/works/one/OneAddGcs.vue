<template>
	<view class="box">
		<!-- 报修信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				报修信息
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">
					报修单号
				</view>
				<view class="Mini_list_right">
					{{data.RequestCode}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					报修设备
				</view>
				<view class="Mini_list_right">
					{{data.ProductDes}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					序列号
				</view>
				<view class="Mini_list_right">
					{{data.SerialNumber}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					客户名称
				</view>
				<view class="Mini_list_right">
					{{data.CustomerName}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					报修人地址
				</view>
				<view class="Mini_list_right">
					{{data.Address}}
				</view>
			</view>
		</view>


		<!-- 联系人信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				联系人信息
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">
					姓名
				</view>
				<view class="Mini_list_right">
					{{RepairManInfo.ChineseName}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					英文名
				</view>
				<view class="Mini_list_right">
					{{RepairManInfo.EnglishName}}
				</view>
			</view>
			<view class="Mini_list"  @tap='Tel(RepairManInfo.MobilePhone)'>
				<view class="Mini_list_left">
					手机
				</view>
				<view class="Mini_list_right">
					{{RepairManInfo.MobilePhone}}
					<u-icon name="phone-fill" color="#2979ff" size="28"></u-icon>
					<span>点击呼叫</span>
				</view>
			</view>
			<view class="Mini_list"  @tap='Tel(RepairManInfo.Tel)'>
				<view class="Mini_list_left">
					电话
				</view>
				<view class="Mini_list_right">
					{{RepairManInfo.Tel}}
					<u-icon name="phone-fill" color="#2979ff" size="28"></u-icon>
					<span>点击呼叫</span>
				</view>
			</view>
		</view>

		<!-- 基础信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				基础信息
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">
					工单单号
				</view>
				<view class="Mini_list_right">
					{{data.WorkOrderCode }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					工单类型
				</view>
				<view class="Mini_list_right">
					{{data.OrderTypeStr }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					工单状态
				</view>
				<view class="Mini_list_right">
					{{data.StatusStr }}
				</view>
			</view>
		</view>

		<view class="Customer">
			<view class="Customer_Top">
				备注
			</view>
			<view class="textarea">
				{{data.Memo}}
			</view>
		</view>


		<view class="Customer">
			<view class="Customer_Top">
				故障描述
			</view>
			<view class="textarea">
				{{data.TroubleDescriptions}}
			</view>
		</view>

		<view class="Customer">
			<view class="Customer_Top">
				工程师
			</view>
			<view class="textarea">
				{{ Enginner }}
			</view>
		</view>

		<text v-if="this.RepairFaultImages.length != 0 ">故障图片</text>
		<view class="thisphotos" v-if="this.RepairFaultImages.length != 0 ">
			<image v-if="item.Type == 'picture'" v-for="(item,index) in this.RepairFaultImages" :key="index"
				:src="item.Path" mode="" @tap='yulan(index)'></image>

			<image class="uploade-img" v-if="Videoshow" @tap="show()" :src=icon mode=""></image>

		</view>






		<u-select v-model="shows" mode="single-column" :list="selector" @confirm="GcsHD"></u-select>
		<u-select v-model="showss" mode="single-column" :list="itemList" @confirm="GcsLX"></u-select>


		<text v-if="Status == 7 || Status == 8 || Status == 47 || Status == 48">增派工程师</text>
		<view v-if="Status == 7 || Status == 8 || Status == 47 || Status == 48" class="view">
			<view class="tie">
				<text>选择工程师</text>
				<text @tap="showTrue()">{{Dat.name}}</text>
			</view>
			<view class="tie">
				<text>类型</text>
				<text @tap="showTrues()">{{Dat.lei}}</text>
			</view>
			<view class="tie">
				<text>工时</text>
				<u-input v-model="Dat.time" type="number"  />
			</view>
			<button type="primary" class="buttons" @tap="but" size="mini">增派</button>
		</view>

	</view>
</template>
<script>
	export default {
		name: 'one',
		data() {
			return {
				data: {},
				Dat: {
					name: '点击选择工程师',
					id: '',
					lei: '维修',
					time: '0'
				},
				itemList: [{
					label: '维修',
					value: '维修'
				}, {
					label: '安装',
					value: '安装'
				}, {
					label: '保养',
					value: '保养'
				}],
				textareaAValue: '', //处理任务备注
				CustomerId: '', //跳转并创建订单携带
				RepairFaultImages: [],
				icon: require('../../../../static/icon/icon/video.png'),
				Videoshow: false,
				RepairManInfo: '', //联系人信息

				selector: [],
				shows: false,
				showss: false,

				Status: 0,
				Enginner: '',
			}
		},
		mounted() {
			this.initgcs()
			uni.showLoading({
				title: '加载中'
			});

			var obj = {
				url: this.$store.state.url + 'WO/GetWorkOrderDetailFE',
				method: 'GET',
				header: this.$store.state.token,
				data: {
					WoId: this.$store.state.codeurlid.WorkOrderId,
				}
			}
			this.$http(obj).then((res) => {
				this.CustomerId = res.Data.CustomerId
				this.data = res.Data.Dto
				this.RepairManInfo = res.Data.RepairManInfo
				this.RepairFaultImages = res.Data.RepairFaultImages
				this.Enginner = res.Data.Dto.Enginner
				for (var i = 0; i < this.RepairFaultImages.length; i++) {
					if (this.RepairFaultImages[i].Type == 'video') {
						this.Videoshow = true
					}
				}
				this.Status = res.Data.Dto.Status
				console.log(res)
				setTimeout(function() {
					uni.hideLoading();
				}, 500);
			})



			// 	uni. request({
			// 		url: this.$store.state.url + 'WO/GetWorkOrderDetailFE',
			// 		method: 'GET',
			// 		data: {
			// 			woId: this.$store.state.codeurlid.WorkOrderId
			// 		},
			// 		header: {
			// 			'Token': this.$store.state.token
			// 		},
			// 		success: (res) => {
			// 			this.CustomerId = JSON.parse(res.data).Data.CustomerId
			// 			this.data = JSON.parse(res.data).Data.Dto
			// 			this.RepairManInfo = JSON.parse(res.data).Data.RepairManInfo
			// 			this.RepairFaultImages = JSON.parse(res.data).Data.RepairFaultImages
			// 			this.Enginner = JSON.parse(res.data).Data.Dto.Enginner
			// 			for (var i = 0; i < this.RepairFaultImages.length; i++) {
			// 				if (this.RepairFaultImages[i].Type == 'video') {
			// 					this.Videoshow = true
			// 				}
			// 			}
			// 			this.Status = JSON.parse(res.data).Data.Dto.Status
			// 			console.log(JSON.parse(res.data))
			// 			setTimeout(function() {
			// 				uni.hideLoading();
			// 			}, 500);
			// 		}
			// 	});

		},
		onBackPress() {
			uni.navigateTo({
				url: "./OneListLS",
			});
			return true
		},
		methods: {
			// 打电话
			Tel: function(str) {
				uni.makePhoneCall({
					phoneNumber: str //仅为示例
				});
			},
			// 弹出gcs选择框
			showTrue: function() {
				this.shows = true
			},
			// showTrues
			showTrues: function() {
				this.showss = true
			},
			// 选择工程师回调
			GcsHD: function(ar) {
				console.log(ar)
				this.Dat.name = ar[0].label
				this.Dat.id = ar[0].value
			},
			// 选择工程师回调
			GcsLX: function(ar) {
				console.log(ar)
				this.Dat.lei = ar[0].label
			},
			// 获取工程师
			initgcs: function() {


				var obj = {
					url: this.$store.state.url + 'System/GetEmployeeMini',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						type: '1'
					}
				}
				this.$http(obj).then((res) => {
					this.selector = []
					console.log(res)
					for (var i = 0; i < res.Data.length; i++) {
						this.selector.push({
							value: res.Data[i].EmployeeId,
							label: res.Data[i].Name
						})
					}
					console.log(this.selector)
				})



				// uni. request({
				// 	url: this.$store.state.url + 'System/GetEmployeeMini',
				// 	method: 'GET',
				// 	data: {
				// 		type: '1'
				// 	},
				// 	header: {
				// 		'Token': this.$store.state.token
				// 	},
				// 	success: (res) => {
				// 		this.selector = []
				// 		console.log(res)
				// 		for (var i = 0; i < JSON.parse(res.data).Data.length; i++) {
				// 			this.selector.push({
				// 				value: JSON.parse(res.data).Data[i].EmployeeId,
				// 				label: JSON.parse(res.data).Data[i].Name
				// 			})
				// 		}
				// 		console.log(this.selector)
				// 	}
				// });
			},
			good: function(res) {
				var obj = {
					url: this.$store.state.url + 'WO/GotoArrive',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						WoId: this.$store.state.codeurlid.WorkOrderId,
						Status: res
					}
				}
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: "../work.1",
					});
				})
			},
			show: function() {
				// this.shows = true
				this.$store.state.textVideo = this.RepairFaultImages
				uni.navigateTo({
					url: "./textVideo"
				})
			},
			gcsapi: function() {

				var obj = {
					url: this.$store.state.url + 'System/GetEmployeeMini',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						type: '1'
					}
				}
				this.$http(obj).then((res) => {
					var asd = []
					for (var i = 0; i < res.Data.length; i++) {
						asd.push(res.Data[i].Name)
					}
					console.log(res.Data)
					uni.showActionSheet({
						title: '选择工程师',
						itemList: asd,
						success: (e) => {
							this.Dat.name = asd[e.tapIndex]
							this.Dat.id = res.Data[e.tapIndex].EmployeeId
						}
					})
				})


				// 	uni. request({
				// 		url: this.$store.state.url + 'System/GetEmployeeMini',
				// 		method: 'GET',
				// 		data: {
				// 			type: '1'
				// 		},
				// 		header: {
				// 			'Token': this.$store.state.token
				// 		},
				// 		success: (res) => {
				// 			var asd = []
				// 			for (var i = 0; i < JSON.parse(res.data).Data.length; i++) {
				// 				asd.push(JSON.parse(res.data).Data[i].Name)
				// 			}
				// 			console.log(JSON.parse(res.data).Data)
				// 			uni.showActionSheet({
				// 				title: '选择工程师',
				// 				itemList: asd,
				// 				success: (e) => {
				// 					this.Dat.name = asd[e.tapIndex]
				// 					this.Dat.id = JSON.parse(res.data).Data[e.tapIndex].EmployeeId
				// 				}
				// 			})
				// 		}
				// 	});

			},
			type: function() {
				uni.showActionSheet({
					title: '选择类型',
					itemList: ['维修', '安装', '保养'],
					success: (e) => {
						this.Dat.lei = this.itemList[e.tapIndex]
					}
				})
			},
			//提交按钮
			but: function() {
				if (this.Dat.id == '') {
					uni.showToast({
						title: "请选择工程师",
						icon: "none"
					})
				} else if (this.Dat.lei == '') {
					uni.showToast({
						title: "请选择类型",
						icon: "none"
					})
				} else if (this.Dat.time == '') {
					uni.showToast({
						title: "请输入工时",
						icon: "none"
					})
				} else {
					console.log(this.Dat)


					var obj = {
						url: this.$store.state.url + 'WO/WODeploy',
						method: 'POST',
						header: this.$store.state.token,
						data: {
							EnginnerId: this.Dat.id,
							ServiceType: this.Dat.lei,
							Manhour: this.Dat.time,
							WoId: this.$store.state.codeurlid.WorkOrderId,
						},
					}
					this.$http(obj).then((res) => {
						uni.navigateTo({
							url: "../work.1",
						});
					})
				
				}
			},

			yulan: function(index) {
				console.log(index)
				var xx = []
				xx[0] = this.RepairFaultImages[index].Path
				console.log(xx)
				uni.previewImage({
					urls: xx
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

	// 1431  2405



	.box {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		font-size: 14px;

		text {
			//副标题
			font-weight: bold;
			background-color: #FFFFFF;
			display: block;
			padding: 5px;
			border-bottom: 1px solid #333333;
		}

		.wendangxinxi {
			width: 100%;
			height: 30px;
			border-bottom: 0.5px solid #d9d9d9;
			background-color: #FFFFFF;

			padding-top: 8rpx;
			padding: 8rpx 10rpx 0 10rpx;
			box-sizing: border-box;

			.text1 {
				float: left;
			}

			.text2 {
				float: right;
			}
		}

		.view {
			width: 100%;
			height: 200px;

			.zhipai {
				width: 100%;

				text {
					display: block;
					float: left;
				}
			}
		}

		.tie {
			width: 100%;
			height: 50px;
			line-height: 30px;
			padding-left: 30px;
			box-sizing: border-box;
			font-size: 13px;

			text {
				width: 120px;
				display: block;
				float: left;
				font-weight: none;
				border: none;
			}

			input {
				width: 200px;
				float: left;
				display: block;
				margin-top: 7px;
				border: 1px solid #808080;
				border-radius: 5px;
				font-size: 15px;
			}

		}

		.buttons {
			display: block;
			float: right;
			margin-right: 10%;
		}

		.button {
			//按钮   工单完成、工单完成并创建订单
			margin-top: 10px;
			width: 80%;
			margin-bottom: 30px;
		}

		.bulone {
			background-color: #4CD964;
			color: #FFFFFF;
			margin-top: 30px;
			margin-bottom: 30px;
		}



		.cu-form-group {
			width: 100%;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 10px;
			color: #999999;
			float: left;
			margin: auto;

			.title {
				width: 100px;
				display: block;
				float: left;
				color: #333333;

			}

			input {
				font-size: 14px;
			}
		}

		.thisphotos {
			//图片外框
			width: 100%;
			float: left;
			background-color: #FFFFFF;

			// image {
			// 	width: 80%;
			// 	display: block;
			// 	margin: auto;
			// 	margin-top: 10px;
			// }
			image {
				width: 100px;
				height: 100px;
				display: block;
				margin: 10px;
				float: left;
			}
		}

		.align-start {
			.title {
				font-weight: bold;
			}

			uni-textarea {
				width: 100%;
				margin-top: 40px;
			}
		}

		.cu-form-groupas {
			height: 40px;
			padding: 0;
		}

		.textms {
			padding: 10px;
			box-sizing: border-box;
		}

		.cu-form-group {
			width: 95%;
			background: #FFFFFF;
			border: 1px solid #ccc;
			box-sizing: border-box;
			padding: 10px;
			color: #999999;
			margin: auto;
			border-radius: 10px;
			margin-top: 10px;

			.title {
				width: 100px;
				display: block;
				float: left;
				color: #333333;

			}

			input {
				font-size: 14px;
			}
		}
	}
</style>
