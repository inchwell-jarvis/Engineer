<template>
	<view class="box">
		<view class="titles">基础信息</view>
		<view v-if="Data.Dto" class="basicinformation">
			<view class="text">
				<view class="span">创建者：</view> {{Data.Dto.Creater}}
			</view>
			<view class="textx">
				<view class="span">客户：</view> {{Data.Dto.CusFullName}}
			</view>

			<view class="text">
				<view class="span">联系人：</view> {{Data.Dto.Linkman}}
			</view>
			<view class="textx" @tap='Tel(Data.Dto.LinkmanTel)'>
				<view class="span">电话：</view> {{Data.Dto.LinkmanTel}}
				<u-icon name="phone-fill" color="#2979ff" size="28"></u-icon>
				<span>点击呼叫</span>
			</view>


			<view class="text">
				<view class="span">服务类型：</view> {{Data.Dto.TypeStr}}
			</view>
			<view class="text">
				<view class="span">当前状态：</view> {{Data.Dto.StateStr}}
			</view>
			<view class="text">
				<view class="span">物流单号：</view>
				<span style="color: #409EFF;" @click="view_logistics(Data.Dto.TrackingNumber)">{{ Data.Dto.TrackingNumber }}</span>
			</view>
			<view class="text">
				<view class="span">区域经理：</view> {{Data.Dto.Manager}}
			</view>
			<view class="text">
				<view class="span">指派时间：</view> {{Data.Dto.DeliveryDate}}
			</view>
			<view class="text">
				<view class="span">接受时间：</view> {{Data.Dto.AcceptDate}}
			</view>
			<view class="text">
				<view class="span">出发时间：</view> {{Data.Dto.GotoDate}}
			</view>
			<view class="text">
				<view class="span">到达时间：</view> {{Data.Dto.ArriveDate}}
			</view>
			<view class="text">
				<view class="span">完成时间：</view> {{Data.Dto.CompleteDate}}
			</view>
		</view>


		<view class="titles" v-if="Data.EnginnerDtos != undefined && Data.EnginnerDtos.length != 0">工程师</view>
		<u-button v-if="Data.EnginnerDtos != undefined && Data.EnginnerDtos.length != 0" type="success" size="mini" style='float: right;margin-right: 2.5%;margin-top: 5px;' @click="show = true">增派工程师</u-button>
		<view class="basicinformation" v-if="Data.EnginnerDtos" v-for="(item,index) in Data.EnginnerDtos" :key="index">
			<view class="text">
				<view class="span">姓名：</view> {{item.Name}}
			</view>
			<view class="text">
				<view class="span">任务编号：</view> {{item.OrderCode}}
			</view>
			<view class="text">
				<view class="span">任务状态：</view> {{item.StateStr}}
			</view>
		</view>



		<view class="titles" v-if="Data.FileDtos && Data.FileDtos.length != 0">
			附件
		</view>
		<!--  -->
		<image class="pdf" src="../../../../static/icon/icon/PD.png" mode="" @click="PDF(items)" v-for="(items,indexss) in Data.FileDtos" :key="indexss+666"></image>

		<view class="titles" v-if=" Data.Dto && Data.Dto.State == 2 ">
			设备
		</view>


		<view v-if="Data.EquDtos" v-for="(item,index) in Data.EquDtos" class="basicinformation">
			<view class="text">
				<view class="span">编号：</view> {{item.ProductCode}}
			</view>
			<view class="text">
				<view class="span">品牌：</view> {{item.Brand}}
			</view>
			<view class="text">
				<view class="span">数量：</view> {{item.Number}}
			</view>
			<view class="textx">
				<view class="span">描述：</view> {{item.Desc}}
			</view>
		</view>




		<view class="titles" v-if=" Data.Dto && Data.Dto.State == 2 ">
			指派工程师
		</view>

		<!-- 选择工程师 -->
		<!-- <view class="cu-form-group gcd"  v-if="State == 2||State == 3 || State == 4 || State == 6  || State == 7 "  >
			<view class="title">新增工程师</view>
			<input type="text" :value="gcsName" @tap="onKeyInputs" disabled="true" style="color: #0000FF;" />
		</view>

 -->
		<!-- 工程师选择 -->
		<u-popup v-model="show" mode="bottom" length="60%" :closeable='true' close-icon-pos='top-left' border-radius='10'>
			<view class="content">
				<u-button type="primary" size="medium" @click="close()">确定</u-button>
				<scroll-view scroll-y="true" class="ListView">
					<u-cell-group>
						<u-cell-item :arrow="false" icon="man-add-fill" v-for="(item,index) in gcss" :key="index" :title="item.Name">
							<switch :value="item.switch" :checked="item.switch" @tap="switchs(index)" style="transform:scale(0.6)" />
						</u-cell-item>
					</u-cell-group>
				</scroll-view>
			</view>
		</u-popup>

		<!-- <button class="lickgcs"  @click="GO()"  v-if="State == 2||State == 3 || State == 4 || State == 6  || State == 7 " type="primary">指派</button> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: {}, //总数据
				gcss: [], //gcs集合
				Gcsscz: false,
				gcsName: '', // 选择的工程师的name集合
				gcs: [], // gcs已选择集合
				State: '',
				show: false,
				DataType: this.$store.state.InstallationTaskresIndex,
				Str: '', //工作内容
			};
		},
		created() {
			this.initdata(),
				this.httpgcs()
		},
		methods: {

			// 查看物流
			view_logistics(code) {
				console.log(code)
				uni.navigateTo({
					url: '/pages/home/works/InstallationTask/sf_express?sf_express=' + code
				})
			},

			// 打电话
			Tel: function(str) {
				uni.makePhoneCall({
					phoneNumber: str //仅为示例
				});
			},
			extractTrackingNumber(str) {
				if (typeof str !== 'string') return '';

				const match = str.match(/物流单号\[(.*?)\]/);
				return match ? match[1] : '';
			},
			// 初始数据
			initdata: function() {
				var COdeurl = ''
				if (this.$store.state.InstallationTaskresIndex == 1) {
					COdeurl = this.$store.state.url + 'WO/GetEquInstallOrder'
				} else {
					COdeurl = this.$store.state.url + 'WO/GetEquInstallOrderItem'
				}
				var obj = {
					url: COdeurl,
					method: 'GET',
					data: {
						id: this.$store.state.InstallationTaskres
					},
					header: this.$store.state.token,
				}
				this.$http(obj).then((res) => {
					console.log(res.Data)
					console.log(res.Data.Dto.Origin)

					this.Data = res.Data
					// 分割出物流单号
					this.Data.Dto.TrackingNumber = this.extractTrackingNumber(this.Data.Dto.Origin)
					console.log(this.Data.Dto.TrackingNumber)

					// 
					this.State = res.Data.Dto.State
					var Time = this.Data.Dto
					Time.CreateDate = this.timeLv(Time.CreateDate);
					Time.DeliveryDate = this.timeLv(Time.DeliveryDate);
					Time.AcceptDate = this.timeLv(Time.AcceptDate);
					Time.GotoDate = this.timeLv(Time.GotoDate);
					Time.ArriveDate = this.timeLv(Time.ArriveDate);
					Time.CompleteDate = this.timeLv(Time.CompleteDate);

				})
			},
			// 打开附件
			PDF: function(item) {
				this.$store.state.webviewurl = item.Url
				uni.navigateTo({
					url: "../../../../components/webview/webview",
				});
			},
			//时间过滤
			timeLv: function(res) {
				if (res == null || res == "") {
					return " - - ";
				} else {
					return res.split("T")[0];
				}
			},
			// 工程师选项确认事件
			close: function() {
				this.gcs = []
				this.gcsName = ''
				this.show = false
				for (var i = 0; i < this.gcss.length; i++) {
					if (this.gcss[i].switch) {
						this.gcs.push(this.gcss[i].EmployeeId)
						this.gcsName += "/" + this.gcss[i].Name
					}
				}
				for (var i = 0; i < this.gcss.length; i++) {
					this.gcss[i].switch = false
				}
				console.log(this.gcs)
				this.GO()
			},
			// 获取gcs
			httpgcs: function() {
				var obj = {
					url: this.$store.state.url + 'System/GetEmployeeMini',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						type: '1'
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data)
					this.gcss = res.Data
					for (var i = 0; i < this.gcss.length; i++) {
						this.gcss[i]['switch'] = false
					}
				})

			},
			// 开启工程师选项
			onKeyInputs: function(event) {
				// this.$refs.popup.open()
				this.show = true
			},
			// 点击按钮
			switchs: function(i) {
				this.$set(this.gcss[i], 'switch', !this.gcss[i].switch)
			},
			// 按钮事件  暂时无用
			DataChange: function(e) {},
			// 点击指派事件
			GO: function() {
				if (this.gcs.length == 0) {
					uni.showToast({
						title: "请选择工程师",
						icon: "none"
					})
					return false
				}
				var obj = {
					url: this.$store.state.url + 'WO/DeliveryEquInstallOrder',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.Data.Dto.ID,
						Str: this.gcs.toString(),
					}
				}
				this.$http(obj).then((res) => {
					console.log(res)
					// 
					uni.navigateTo({
						url: "../work.6",
					});
				})
			},
			// 工程师操作
			GOgcs: function(code) {

				if (code == 8) {

					if (this.Str == '') {
						uni.showToast({
							title: "请输入工作内容！",
							icon: "none"
						})
						return false
					}
					var obj = {
						url: this.$store.state.url + 'WO/CompanyEquInstallOrder',
						method: 'POST',
						header: this.$store.state.token,
						data: {
							Id: this.Data.Dto.ID,
							Str: this.Str,
						}
					}
					this.$http(obj).then((res) => {
						console.log(res)
						uni.navigateTo({
							url: "../work.6",
						});
					})
					return false
				}
				var obj = {
					url: this.$store.state.url + 'WO/UpdateEquInstallOrder',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.Data.Dto.ID,
						State: code,
					}
				}
				this.$http(obj).then((res) => {
					console.log(res)
					uni.navigateTo({
						url: "../work.6",
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #FFFFFF;
	}

	.locknone {
		overflow: hidden;
	}

	.pdf {
		width: 30px;
		height: 30px;
		display: block;
		float: left;
		margin: 10px;
	}

	.titles {
		width: 100%;
		height: 20px;
		background-color: #90beeb;
		font-weight: bolder;
		color: #000000;
		padding-left: 20px;
		line-height: 20px;
		box-sizing: border-box;
		float: left;
	}

	.item {
		width: 100%;
		height: 30px;
		border-bottom: 1px solid #C8C7CC;
		box-sizing: border-box;

		text {
			line-height: 30px;
			padding-left: 10px;
			box-sizing: border-box;
		}

		.lefttext {
			width: 30%;
			display: block;
			float: left;
		}
	}


	.lickgcs {
		width: 90%;
		float: left;
		margin-left: 5%;
		margin-top: 30px;
	}


	.content {
		padding: 24rpx;
		text-align: center;
		box-sizing: border-box;

		button {
			float: right;
		}

		.ListView {
			height: 360px;
		}
	}






	// 000000000000000000000000000000000000000000000000000



	.gcs {
		width: 80%;
		height: 300px;
		background-color: #dde0e4;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		border-radius: 10px;
		box-sizing: border-box;
		z-index: 250;
		-webkit-box-shadow: 0px 3px 3px #c8c8c8;
		-moz-box-shadow: 0px 3px 3px #c8c8c8;
		box-shadow: 2px 6px 6px #c8c8c8;

		.title_Top {
			width: 100%;
			height: 50px;
			padding: 0 10px;
			line-height: 50px;
			box-sizing: border-box;
			text-align: center;
			line-height: 50px;
			font-size: 20px;
			font-weight: bold;
			background-color: #dde0e4;
		}

		.gcss {
			width: 100%;
			height: 200px;
			overflow: auto;

			.bottomone {
				width: 100%;
				height: 85%;
				background-color: #dde0e4;

				.topone {
					width: 100%;
					height: 30px;
					padding: 10px;

					button {
						float: right;
						margin-right: 30px;
					}
				}

				.bomone {
					width: 100%;
					height: calc(100% - 30px);
					padding-bottom: 20px;
					box-sizing: border-box;

					.kuang {
						width: 80%;
						height: 30px;
						margin-left: 10%;
						margin-top: 3px;

						switch {
							float: right;
						}
					}
				}
			}
		}

		button {
			margin-left: 40%;
			margin-top: 10px;
		}



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
			height: 30px;
			display: block;
			margin: auto;
			line-height: 30px;

			.span {
				width: 100px;
				display: block;
				height: 100%;
				float: left;
			}
		}

		.textx {
			width: 95%;
			display: block;
			margin: auto;
			line-height: 30px;

			.span {
				width: 100px;
				display: block;
				height: 100%;
				float: left;
			}
		}
	}

	.cu-form-groupas {
		height: 40px;
		padding: 0;
		float: left;
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
		float: left;
		margin-left: 2.5%;

		.title {
			width: 100px;
			display: block;
			color: #333333;

		}

		input {
			font-size: 14px;
		}
	}

	.align-start {
		.title {
			font-weight: bold;
		}

		uni-textarea {
			margin-top: 20px;
		}
	}

	.button {
		width: 80%;
		display: block;
		background-color: #007AFF;
		color: #FFFFFF;
		height: 50px;
		text-align: center;
		line-height: 50px;
		margin-top: 50px;
		border-radius: 10px;
		box-sizing: border-box;
		font-size: 20px;
		margin-bottom: 50px;
		float: left;
		margin-left: 10%;
	}

	.buttons {
		width: 80%;
		display: block;
		margin: auto;
		color: #FFFFFF;
		height: 50px;
		text-align: center;
		line-height: 50px;
		margin-top: 50px;
		box-sizing: border-box;
		margin-bottom: 50px;

		.jie {
			width: 40%;
			height: 80%;
			float: right;
			background-color: #007AFF;
			line-height: 40px;
			border-radius: 5px;
		}

		.jujue {
			width: 40%;
			height: 80%;
			float: left;
			background-color: #FF0000;
			line-height: 40px;
			border-radius: 5px;
		}
	}

	.bottomone {
		width: 100%;
		height: 85%;
		background-color: #FFFFFF;

		// overflow: auto;
		.topone {
			width: 100%;
			height: 30px;
			padding: 10px;

			button {
				float: right;
				margin-right: 30px;
			}
		}

		.bomone {
			width: 100%;
			height: calc(100% - 30px);
			padding-bottom: 20px;
			box-sizing: border-box;

			.kuang {
				width: 50%;
				height: 30px;
				margin-left: 20%;
				margin-top: 3px;

				switch {
					float: right;
				}
			}
		}
	}

	.uni-textarea {
		width: 95%;
		border-radius: 10px;
		margin: auto;
		height: 200px;
		margin-top: 10px;
		background-color: #FFFFFF;
		overflow: auto;
		padding: 5px;
		box-sizing: border-box;
		font-size: 15px;
	}
</style>