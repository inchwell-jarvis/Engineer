<template>
	<view class="box">
		<!-- 报修信息 -->
		<view class="Customer">
			<view class="Customer_Top">报修信息</view>

			<view class="Mini_list">
				<view class="Mini_list_left">报修单号</view>
				<view class="Mini_list_right">
					{{ data.RequestCode }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">报修设备</view>
				<view class="Mini_list_right">
					{{ data.ProductDes }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">序列号</view>
				<view class="Mini_list_right">
					{{ data.SerialNumber }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">客户名称</view>
				<view class="Mini_list_right">
					{{ data.CustomerName }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">报修人地址</view>
				<view class="Mini_list_right">
					{{ data.Address }}
				</view>
			</view>
		</view>

		<!-- 联系人信息 -->
		<view class="Customer">
			<view class="Customer_Top">联系人信息</view>

			<view class="Mini_list">
				<view class="Mini_list_left">姓名</view>
				<view class="Mini_list_right">
					{{ RepairManInfo.ChineseName }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">英文名</view>
				<view class="Mini_list_right">
					{{ RepairManInfo.EnglishName }}
				</view>
			</view>
			<view class="Mini_list" @tap="Tel(RepairManInfo.MobilePhone)">
				<view class="Mini_list_left">手机</view>
				<view class="Mini_list_right">
					{{ RepairManInfo.MobilePhone }}
					<u-icon name="phone-fill" color="#2979ff" size="28"></u-icon>
					<span>点击呼叫</span>
				</view>
			</view>
			<view class="Mini_list" @tap="Tel(RepairManInfo.Tel)">
				<view class="Mini_list_left">电话</view>
				<view class="Mini_list_right">
					{{ RepairManInfo.Tel }}
					<u-icon name="phone-fill" color="#2979ff" size="28"></u-icon>
					<span>点击呼叫</span>
				</view>
			</view>
		</view>

		<!-- 基础信息 -->
		<view class="Customer">
			<view class="Customer_Top">基础信息</view>

			<view class="Mini_list">
				<view class="Mini_list_left">工单单号</view>
				<view class="Mini_list_right">
					{{ data.WorkOrderCode }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">工单类型</view>
				<view class="Mini_list_right">
					{{ data.OrderTypeStr }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">工单状态</view>
				<view class="Mini_list_right">
					{{ data.StatusStr }}
				</view>
			</view>
		</view>

		<view class="Customer">
			<view class="Customer_Top">备注</view>
			<view class="textarea">
				{{ data.Memo }}
			</view>
		</view>

		<view class="Customer">
			<view class="Customer_Top">故障描述</view>
			<view class="textarea">
				{{ data.TroubleDescriptions }}
			</view>
		</view>

		<text v-if="this.RepairFaultImages.length != 0">故障图片</text>
		<view class="thisphotos" v-if="this.RepairFaultImages.length != 0">
			<image v-if="item.Type == 'picture'" v-for="(item, index) in this.RepairFaultImages" :key="index" :src="item.Path" mode="" @tap="yulan(index)"></image>

			<image class="uploade-img" v-if="Videoshow" @tap="show()" :src="icon" mode=""></image>
		</view>

		<u-select v-model="shows" mode="single-column" :list="selector" @confirm="GcsHD"></u-select>

		<text v-if="this.codeurlids == 1">指派工程师</text>
		<view v-if="this.codeurlids == 1" class="view">
			<view class="tie">
				<view class="text">选择工程师</view>
				<div class="right">
					<u-radio-group v-model="Dat.name" :wrap="true">
						<u-radio v-for="(item, index) in selector" :key="index" :name="item.name" :disabled="item.disabled">
							<p>{{ item.name }}</p>
						</u-radio>
					</u-radio-group>
					<view style="height: 30px"></view>
				</div>
			</view>
			<!--  -->
			<view class="tie">
				<view class="text">类型</view>
				<div class="right">
					<u-radio-group v-model="Dat.ServiceType" :wrap="true">
						<u-radio v-for="(item, index) in ServiceTypeList" :key="index" :name="item.name" :disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
					<view style="height: 30px"></view>
				</div>
			</view>
			<!--  -->
			<view class="tie">
				<view class="text">工时</view>
				<div class="right">
					<u-input v-model="Dat.time" type="number" />
					<view style="height: 30px"></view>
				</div>
			</view>
			<button type="primary" class="buttons" @tap="but" size="mini">指派</button>
			<view style="width: 100%; height: 50px; float: right"></view>
		</view>

		<view class="buts" v-if="this.codeurlids == 2">
			<button type="warn" size="mini" @tap="warn">拒绝</button>
			<button type="primary" size="mini" @tap="primary">接受</button>
		</view>

		<view v-if="this.codeurlids == 5" class="cu-form-group align-start">
			<view class="title">工作内容</view>
			<textarea maxlength="-1" v-model="textareaAValue" class="textred" placeholder="点击输入"></textarea>
		</view>

		<view class="buts" v-if="this.codeurlids == 3">
			<button type="success" size="mini" @tap="(popup_task = true), (task_textarea = '')">远程解决任务</button>
			<button type="primary" size="mini" @tap="good(47)">出发</button>
		</view>

		<view class="buts" v-if="this.codeurlids == 4">
			<button type="success" size="mini" @tap="(popup_task = true), (task_textarea = '')">远程解决任务</button>
			<button type="primary" size="mini" @tap="good(48)">到达</button>
		</view>

		<u-popup v-model="popup_task" mode="bottom" :closeable="false">
			<view class="popup_task">
				<div class="popup_task_header">
					<u-button type="success" size="medium" style="float: right" @click="RemoteProcessingTask()">远程解决</u-button>
				</div>
				<div class="popup_task_content">
					<u-input v-model="task_textarea" type="textarea" :border="true" style="height: 100%" :auto-height="false" placeholder="请填已远程解决任务的内容" />
				</div>
			</view>
		</u-popup>

		<button v-if="this.codeurlids == 5" class="bulone button" @tap="wnac">工单完成</button>
		<button v-if="this.codeurlids == 5" type="primary" class="button" @tap="Finishcreating">工单完成并创建订单</button>
	</view>
</template>
<script>
export default {
	name: 'one',
	data() {
		return {
			data: {},
			Dat: {
				name: '',
				id: '',
				ServiceType: '',
				time: ''
			},

			ServiceTypeList: [
				{
					name: '维修',
					disabled: false
				},
				{
					name: '安装',
					disabled: false
				},
				{
					name: '保养',
					disabled: false
				}
			],

			codeurlids: '', //判断进来的状态
			textareaAValue: '', //处理任务备注
			CustomerId: '', //跳转并创建订单携带
			RepairFaultImages: [],
			icon: require('../../../../static/icon/icon/video.png'),
			Videoshow: false,
			RepairManInfo: '', //联系人信息

			selector: [],
			shows: false,
			popup_task: false,
			task_textarea: ''
		};
	},
	mounted() {
		console.log(this.$store.state.codeurlid);

		this.GetEmployeeMini();

		this.codeurlids = this.$store.state.codeurlids;

		var obj = {
			url: this.$store.state.url + 'WO/GetWorkOrderDetailFE',
			method: 'GET',
			data: {
				woId: this.$store.state.codeurlid.WorkOrderId
			}
		};
		this.$http(obj).then((res) => {
			this.CustomerId = res.Data.CustomerId;
			this.data = res.Data.Dto;
			this.RepairManInfo = res.Data.RepairManInfo;
			this.RepairFaultImages = res.Data.RepairFaultImages;
			for (var i = 0; i < this.RepairFaultImages.length; i++) {
				if (this.RepairFaultImages[i].Type == 'video') {
					this.Videoshow = true;
				}
			}
			console.log(res);
			setTimeout(function () {
				uni.hideLoading();
			}, 500);
		});
	},
	onBackPress() {
		uni.navigateTo({
			url: '../work.1'
		});
		return true;
	},
	methods: {
		// 远程完成出发和到达
		RemoteProcessingTask() {
			console.log(this.task_textarea);
			if (this.task_textarea.trim() == '') {
				uni.showToast({
					title: '请填已远程解决任务的内容',
					icon: 'none'
				});
				return false;
			}
			let data = {
				WoId: this.$store.state.codeurlid.WorkOrderId,
				RepairRemark: this.task_textarea
			};
			//
			this.API_POST('WO/RemoteProcessingTask', data).then((rv) => {
				uni.navigateTo({
					url: '../work.1'
				});
			});
		},
		// 打电话
		Tel: function (str) {
			uni.makePhoneCall({
				phoneNumber: str //仅为示例
			});
		},
		// 弹出gcs选择框
		showTrue: function () {
			this.shows = true;
		},

		// 选择工程师回调
		GcsHD: function (ar) {
			console.log(ar);
			this.Dat.name = ar[0].label;
			this.Dat.id = ar[0].value;
		},

		// 获取工程师
		GetEmployeeMini: function () {
			var obj = {
				url: this.$store.state.url + 'System/GetEmployeeMini',
				method: 'GET',
				data: {
					type: '1'
				}
			};
			this.$http(obj).then((res) => {
				this.selector = [];
				for (var i = 0; i < res.Data.length; i++) {
					this.selector.push({
						name: res.Data[i].Name,
						disabled: false,
						EmployeeId: res.Data[i].EmployeeId
					});
				}
			});
		},
		good: function (res) {
			var obj = {
				url: this.$store.state.url + 'WO/GotoArrive',
				method: 'POST',

				data: {
					WoId: this.$store.state.codeurlid.WorkOrderId,
					Status: res
				}
			};
			this.$http(obj).then((res) => {
				uni.navigateTo({
					url: '../work.1'
				});
			});
		},
		show: function () {
			// this.shows = true
			this.$store.state.textVideo = this.RepairFaultImages;
			uni.navigateTo({
				url: './textVideo'
			});
		},
		Finishcreating: function () {
			//工单完成并创建订单
			console.log(this.data);
			if (this.textareaAValue.length > 0) {
				this.$store.state.WorkOrderIdid = this.$store.state.codeurlid.WorkOrderId;
				this.$store.state.CustomerIdid = this.CustomerId;

				var obj = {
					url: this.$store.state.url + 'WO/ProcessingTask',
					method: 'POST',

					data: {
						WoId: this.$store.state.codeurlid.WorkOrderId,
						RepairRemark: this.textareaAValue
					}
				};
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: '../Spareparts/classification?state=Finishcreating'
					});
				});
			} else {
				uni.showToast({
					title: '请输入工作内容',
					icon: 'none'
				});
			}
		},
		gcsapi: function () {
			var obj = {
				url: this.$store.state.url + 'System/GetEmployeeMini',
				method: 'POST',

				data: {
					type: '1'
				}
			};
			this.$http(obj).then((res) => {
				var asd = [];
				for (var i = 0; i < res.Data.length; i++) {
					asd.push(res.Data[i].Name);
				}
				console.log(res.Data);
				uni.showActionSheet({
					title: '选择工程师',
					itemList: asd,
					success: (e) => {
						this.Dat.name = asd[e.tapIndex];
						this.Dat.id = res.Data[e.tapIndex].EmployeeId;
					}
				});
			});
		},
		type: function () {
			uni.showActionSheet({
				title: '选择类型',
				itemList: ['维修', '安装', '保养'],
				success: (e) => {
					this.Dat.ServiceType = this.itemList[e.tapIndex];
				}
			});
		},
		//提交按钮
		but: function () {
			if (this.Dat.name == '') {
				uni.showToast({
					title: '请选择工程师',
					icon: 'none'
				});
			} else if (this.Dat.ServiceType == '') {
				uni.showToast({
					title: '请选择类型',
					icon: 'none'
				});
			} else if (this.Dat.time == '') {
				uni.showToast({
					title: '请输入工时',
					icon: 'none'
				});
			} else {
				console.log(this.selector);
				this.Dat.id = this.selector.filter((rv) => {
					return rv.name == this.Dat.name;
				})[0].EmployeeId;
				console.log(this.Dat.id);
				console.log('---------------------------------------------------');

				var obj = {
					url: this.$store.state.url + 'WO/AssignTask',
					method: 'POST',

					data: {
						EngineerId: this.Dat.id,
						RepairType: this.Dat.ServiceType,
						RepairTime: this.Dat.time,
						WoId: this.$store.state.codeurlid.WorkOrderId
					}
				};
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: '../work.1'
					});
				});
			}
		},
		//接受按钮
		primary: function () {
			var obj = {
				url: this.$store.state.url + 'WO/ConfirmAssign',
				method: 'POST',

				data: {
					WoId: this.$store.state.codeurlid.WorkOrderId,
					Accept: true
				}
			};
			this.$http(obj).then((res) => {
				uni.navigateTo({
					url: '../work.1'
				});
			});
		},
		//拒绝
		warn: function () {
			var obj = {
				url: this.$store.state.url + 'WO/ConfirmAssign',
				method: 'POST',

				data: {
					WoId: this.$store.state.codeurlid.WorkOrderId,
					Accept: false
				}
			};
			this.$http(obj).then((res) => {
				uni.navigateTo({
					url: '../work.1'
				});
			});
		},
		//处理完成
		wnac: function () {
			if (this.textareaAValue.length > 0) {
				var obj = {
					url: this.$store.state.url + 'WO/ProcessingTask',
					method: 'POST',

					data: {
						WoId: this.$store.state.codeurlid.WorkOrderId,
						RepairRemark: this.textareaAValue
					}
				};
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: '../work.1'
					});
				});
			} else {
				uni.showToast({
					title: '请输入工作内容',
					icon: 'none'
				});
			}
		},
		yulan: function (index) {
			console.log(index);
			var xx = [];
			xx[0] = this.RepairFaultImages[index].Path;
			console.log(xx);
			uni.previewImage({
				urls: xx
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.box {
	height: 100%;
	font-size: 14px;
	box-sizing: border-box;
	// 搬运客户APP详情页

	.Customer {
		width: 100%;
		background-color: #ffffff;
		margin-top: 20px;

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
	background-color: #ffffff;
	font-size: 14px;

	text {
		//副标题
		font-weight: bold;
		background-color: #ffffff;
		display: block;
		padding: 5px;
		border-bottom: 1px solid #333333;
	}

	.wendangxinxi {
		width: 100%;
		height: 30px;
		border-bottom: 0.5px solid #d9d9d9;
		background-color: #ffffff;

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
		min-height: 100px;
	}

	.tie {
		width: 100%;
		min-height: 50px;
		line-height: 30px;
		padding-left: 30px;
		font-size: 12px;
		box-sizing: border-box;

		.text {
			width: 120px;
			min-height: 100%;
			display: block;
			float: left;
			font-weight: none;
			border: none;
		}
		.right {
			width: calc(100% - 130px);
			min-height: 100%;
			float: left;
			input {
				width: 100%;
				float: left;
				display: block;
				margin-top: 7px;
				border: 1px solid #808080;
				border-radius: 5px;
				font-size: 15px;
			}
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
		background-color: #4cd964;
		color: #ffffff;
		margin-top: 30px;
		margin-bottom: 30px;
	}

	.buts {
		width: 100%;
		margin-top: 50px;
		display: flex;
		justify-content: center;

		button {
			height: none;
		}
	}

	.cu-form-group {
		width: 100%;
		background: #ffffff;
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
		background-color: #ffffff;

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
		background: #ffffff;
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

	//
	.popup_task {
		width: 100%;
		height: 300px;
		.popup_task_header {
			width: 100%;
			height: 50px;
			line-height: 50px;
			padding: 5px;
			box-sizing: border-box;
		}
		.popup_task_content {
			width: 100%;
			height: calc(100% - 50px);
		}
	}
}
</style>
