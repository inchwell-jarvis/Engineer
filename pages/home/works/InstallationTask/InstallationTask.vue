<template>
	<view class="box">
		<u-top-tips ref="uTips"></u-top-tips>

		<view class="titles">基础信息</view>

		<view v-if="Data.Dto" class="basicinformation">
			<view class="text">
				<view class="span">创建者：</view>
				{{ Data.Dto.Creater }}
			</view>
			<view class="textx">
				<view class="span">客户：</view>
				{{ Data.Dto.CusFullName }}
			</view>

			<view class="textx">
				<view class="span">联系人：</view>
				{{ Data.Dto.Linkman }}
			</view>
			<view class="textx" @tap="Tel(Data.Dto.LinkmanTel)">
				<view class="span">电话：</view>
				{{ Data.Dto.LinkmanTel }}
				<u-icon name="phone-fill" color="#2979ff" size="28"></u-icon>
				<span>点击呼叫</span>
			</view>
			<view class="text">
				<view class="span">服务类型：</view>
				{{ Data.Dto.TypeStr }}
			</view>
			<view class="text">
				<view class="span">当前状态：</view>
				{{ Data.Dto.StateStr }}
			</view>
			<view class="text">
				<view class="span">区域经理：</view>
				{{ Data.Dto.Manager }}
			</view>
			<view class="text">
				<view class="span">指派时间：</view>
				{{ Data.Dto.DeliveryDate }}
			</view>
			<view class="text">
				<view class="span">接受时间：</view>
				{{ Data.Dto.AcceptDate }}
			</view>
			<view class="text">
				<view class="span">出发时间：</view>
				{{ Data.Dto.GotoDate }}
			</view>
			<view class="text">
				<view class="span">到达时间：</view>
				{{ Data.Dto.ArriveDate }}
			</view>
			<view class="text">
				<view class="span">完成时间：</view>
				{{ Data.Dto.CompleteDate }}
			</view>
		</view>

		<view class="titles" v-if="Data.EnginnerDtos != undefined && Data.EnginnerDtos.length != 0">工程师</view>
		<!--  -->

		<view class="basicinformation" v-if="Data.EnginnerDtos" v-for="(item, index) in Data.EnginnerDtos" :key="index">
			<view class="text">
				<view class="span">姓名：</view>
				{{ item.Name }}
			</view>
			<view class="text">
				<view class="span">任务编号：</view>
				{{ item.OrderCode }}
			</view>
			<view class="text">
				<view class="span">任务状态：</view>
				{{ item.StateStr }}
			</view>
		</view>

		<view class="titles" v-if="Data.FileDtos && Data.FileDtos.length != 0">附件</view>
		<!--  -->
		<image class="pdf" src="../../../../static/icon/icon/PD.png" mode="" @click="PDF(items)" v-for="(items, indexss) in Data.FileDtos" :key="indexss + 666"></image>

		<!-- <view  class="basicinformation" v-if="Data.FileDtos"  >
			<view class="text locknone">
				{{items.Name}}
			</view>
		</view>
		 -->

		<view class="titles" v-if="Data.Dto && Data.Dto.State == 2">设备</view>

		<view v-if="Data.EquDtos" v-for="(item, index) in Data.EquDtos" class="basicinformation">
			<view class="text">
				<view class="span">编号：</view>
				{{ item.ProductCode }}
			</view>
			<view class="text">
				<view class="span">品牌：</view>
				{{ item.Brand }}
			</view>
			<view class="text">
				<view class="span">数量：</view>
				{{ item.Number }}
			</view>
			<view class="text">
				<view class="span">寄回：</view>
				<span :style="{ color: item.Recovery ? '#007AFF' : '' }">
					{{ item.Recovery ? '需要' : '不需要' }}
				</span>
			</view>
			<view class="textx">
				<view class="span">描述：</view>
				{{ item.Desc }}
			</view>
		</view>

		<!-- 指派工程师 -->

		<view class="titles" v-if="Data.Dto && Data.Dto.State == 2">指派工程师</view>

		<!-- 选择工程师 -->
		<view class="cu-form-group gcd" v-if="Data.Dto && Data.Dto.State == 2">
			<scroll-view scroll-y="true" class="ListView">
				<u-cell-group>
					<u-cell-item :arrow="false" icon="man-add-fill" v-for="(item, index) in gcss" :key="index" :title="item.Name">
						<switch :value="item.switch" :checked="item.switch" @tap="switchs(index)" style="transform: scale(0.6)" />
					</u-cell-item>
				</u-cell-group>
			</scroll-view>
		</view>
		

		<!--  -->

		<view v-if="Data.Dto && Data.Dto.State == 7 && Data.Dto.TypeStr == '培训室拆装服务'" class="cu-form-group align-start">
			<view style="padding-left: 15px">添加图片说明</view>
			<view class="image">
				<!-- <an-upload-img></an-upload-img> -->
				<u-upload :auto-upload="false" ref="uUpload"></u-upload>
			</view>
		</view>

		<!-- 上传设备图片 -->
		<view v-if="Data.Dto && Data.Dto.State == 7 && DataType != 1" class="cu-form-group align-start">
			<view class="title red">
				有需要删除/作废的设备吗？
				<br />
				如果有的话，请拍照，图片中需要包含清晰的英之杰二维码
			</view>
			<div class="ShangChuanImg" @tap="previewImage(item.Image)" v-for="(item, index) in this.Data.DelOldEquDtos">
				<u-image width="100px" height="100px" border-radius="10px" :src="item.Image"></u-image>
			</div>

			<UploadPictures :count="1" :sourceType="sourceType" @ReturnBase64="ReturnBase64" :icon="'camera'"></UploadPictures>
		</view>

		<!-- 备注 -->
		<view v-if="Data.Dto && Data.Dto.State == 7 && DataType != 1" class="cu-form-group align-start">
			<view class="title">工作内容</view>
			<textarea maxlength="-1" v-model="Str" class="textred" placeholder="点击输入"></textarea>
		</view>

		<!-- 操作 -->
		<button class="lickgcs" v-if="Data.Dto && Data.Dto.State == 2 && DataType == 1" @click="assign()" type="primary">指派</button>
		<button class="lickgcss" v-if="Data.Dto && Data.Dto.State == 3 && DataType == 2" @click="GOgcs(4)" type="primary">接受</button>
		<button class="lickgcs" v-if="Data.Dto && Data.Dto.State == 3 && DataType == 2" @click="GOgcs(5)" type="primary">拒绝</button>

		<view class="buts" v-if="Data.Dto && Data.Dto.State == 4 && DataType == 2">
			<button type="success" size="mini" @tap="(popup_task = true), (task_textarea = '')">远程解决任务</button>
			<button type="primary" size="mini" @tap="GOgcs(6)">出发</button>
		</view>

		<view class="buts" v-if="Data.Dto && Data.Dto.State == 6 && DataType == 2">
			<button type="success" size="mini" @tap="(popup_task = true), (task_textarea = '')">远程解决任务</button>
			<button type="primary" size="mini" @tap="GOgcs(7)">到达</button>
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

		<button class="lickgcs" v-if="Data.Dto && Data.Dto.State == 7 && DataType == 2 && Data.Dto.Recovery" @click="ClickOldPieces()" type="default" style="margin-bottom: 10px">
			旧件寄回
		</button>
		<button class="lickgcs" v-if="Data.Dto && Data.Dto.State == 7 && DataType == 2" @click="Upimg()" type="primary">处理</button>

		<u-popup v-model="OldPieces" mode="bottom" border-radius="14" length="600px" :closeable="true">
			<h3 style="line-height: 40px; text-indent: 1em">旧件寄回</h3>
			<u-alert-tips type="warning" title="" description="数量为 0 视为不寄回"></u-alert-tips>
			<u-field v-model="mobile" label="物流单号" placeholder="点击此处输入物流单号"></u-field>
			<scroll-view scroll-y="true" style="height: 750rpx">
				<view>
					<view v-for="(item, index) in SendBackData" :key="index" class="SendBackItem" v-if="item.Recovery">
						<h4>{{ item.Brand }}</h4>
						<h6>{{ item.Desc }}</h6>
						<u-number-box style="float: right" v-model="item.Number"></u-number-box>
						<br />
					</view>
					<br />
				</view>
			</scroll-view>
			<view class="confrim-btn" style="float: bottom; margin-bottom: 5px">
				<u-row gutter="16" justify="center">
					<u-col span="3">
						<u-button type="info" @tap="OldPieces = false">取消</u-button>
					</u-col>
					<u-col span="3"></u-col>
					<u-col span="3">
						<u-button type="primary" @tap="ConfirmSending()">确定</u-button>
					</u-col>
				</u-row>
			</view>
		</u-popup>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { pathToBase64 } from '../../../../components/Base64/index.js';
import API_GET from '../../../../utils/API_GET.js';
import UploadPictures from '../../../../components/UploadPictures/UploadPictures.vue';

export default {
	data() {
		return {
			action: 'http://www.example.com/uploadi',
			OldPieces: false,
			SendBackData: [],
			mobile: '',
			Data: {}, //总数据
			gcss: [], //gcs集合
			Gcsscz: false,
			DataType: this.$store.state.InstallationTaskresIndex,
			Str: '', //工作内容
			imgLength: 0,
			ImgData: [],
			url: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/9a952c80-6080-11eb-a16f-5b3e54966275.png',
			sourceType: ['camera', 'album'],
			img: [],

			popup_task: false,
			task_textarea: ''
		};
	},
	components: {
		UploadPictures
	},
	created() {
		this.initdata();
		this.obtainEngineer();
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
				Id: this.Data.Dto.ID,
				Str: this.task_textarea
			};
			//
			this.API_POST('WO/RemoteCompanyEquInstallOrder', data).then((rv) => {
				uni.navigateTo({
					url: '../work.6'
				});
			});
		},

		ReturnBase64: function (value) {
			var Base = value.Data[0];
			var that = this;
			var obj = {
				url: that.$store.state.url + 'WO/EIDelOldEqu',
				method: 'POST',
				data: {
					Id: that.$store.state.InstallationTaskres,
					FileStr: Base
				},
				header: that.$store.state.token
			};
			that.$http(obj)
				.then((res) => {
					this.$refs.uToast.show({
						title: '上传成功!',
						type: 'success'
					});
					this.initdata();
				})
				.catch((err) => {
					this.$refs.uToast.show({
						title: '上传失败!',
						type: 'error'
					});
				});
		},
		// 预览图片
		previewImage: function (url) {
			uni.previewImage({
				urls: [url]
			});
		},
		// 打电话
		Tel: function (str) {
			uni.makePhoneCall({
				phoneNumber: str
			});
		},

		ConfirmSending: function () {
			var Data = [];
			this.SendBackData.forEach(function (item) {
				if (item.Recovery && item.Number != 0) {
					Data.push({
						ProductId: item.ProductId,
						Number: item.Number
					});
				}
			});

			console.log(Data);
			console.log(this.Data.Dto.ID);
			if (Data.length == 0) {
				uni.showToast({
					title: '请添加需要寄回的物品数量！',
					icon: 'none'
				});
				return false;
			}

			var obj = {
				url: this.$store.state.url + 'WO/CreateRecovery',
				method: 'POST',
				data: {
					EquInstallOrderId: this.Data.Dto.ID,
					Logistic: this.mobile,
					RecoveryGoodDtos: Data
				},
				header: this.$store.state.token
			};
			this.$http(obj).then((res) => {
				console.log(res.Data);
				uni.showToast({
					title: '寄回成功!',
					icon: 'none'
				});
				this.OldPieces = false;
			});
		},
		// 打开寄出弹窗
		ClickOldPieces: function () {
			console.log(this.SendBackData);
			this.OldPieces = true;
		},
		// 初始数据
		initdata: function () {
			var COdeurl = '';
			if (this.$store.state.InstallationTaskresIndex == 1) {
				COdeurl = this.$store.state.url + 'WO/GetEquInstallOrder';
			} else {
				COdeurl = this.$store.state.url + 'WO/GetEquInstallOrderItem';
			}
			var obj = {
				url: COdeurl,
				method: 'GET',
				data: {
					id: this.$store.state.InstallationTaskres
				},
				header: this.$store.state.token
			};
			this.$http(obj).then((res) => {
				console.log(res.Data);
				this.Data = res.Data;

				for (var i = 0; i < this.Data.DelOldEquDtos.length; i++) {
					var item = this.Data.DelOldEquDtos[i];
					item.Image = 'http://icms.inchwell.com.cn/file/EIDelOldEqu/' + item.Image;
				}
				console.log(this.Data.DelOldEquDtos);
				this.SendBackData = JSON.parse(JSON.stringify(this.Data.EquDtos));
				var Time = this.Data.Dto;
				Time.CreateDate = this.timeLv(Time.CreateDate);
				Time.DeliveryDate = this.timeLv(Time.DeliveryDate);
				Time.AcceptDate = this.timeLv(Time.AcceptDate);
				Time.GotoDate = this.timeLv(Time.GotoDate);
				Time.ArriveDate = this.timeLv(Time.ArriveDate);
				Time.CompleteDate = this.timeLv(Time.CompleteDate);
			});
		},
		// 打开附件
		PDF: function (item) {
			this.$store.state.webviewurl = item.Url;
			uni.navigateTo({
				url: '../../../../components/webview/webview'
			});
		},
		//时间过滤
		timeLv: function (res) {
			if (res == null || res == '') {
				return ' - - ';
			} else {
				return res.split('T')[0];
			}
		},

		// 获取gcs
		obtainEngineer: function () {
			this.API_GET('System/GetEmployeeMini', { type: '1' }).then((rv) => {
				console.log(rv);
				this.gcss = rv.Data;
				for (var i = 0; i < this.gcss.length; i++) {
					this.$set(this.gcss[i], 'switch', false);
				}
			});
		},

		// 选择工程师的按钮 需要动态改变
		switchs: function (i) {
			this.$set(this.gcss[i], 'switch', !this.gcss[i].switch);
		},

		// 点击指派事件
		assign: function () {
			
			// 收集已选择的数据
			let engineerAssembly = (this.gcss || []).filter((item) => item.switch).map((item) => item.EmployeeId);
			
			// 检查是否未选择
			if (engineerAssembly.length == 0) return uni.showToast({ title: '请选择工程师', icon: 'none' });
			
			// 开启接口
			let data = {
				Id: this.Data.Dto.ID,
				Str: engineerAssembly.toString()
			};
			this.API_POST('WO/DeliveryEquInstallOrder', data).then((rv) => {
				uni.navigateTo({ url: '../work.6' });
			});
		},

		Upimg: function () {
			if (this.Str == '') {
				uni.showToast({
					title: '请输入工作内容！',
					icon: 'none'
				});
				return false;
			}
			// 是否存在培训室图片
			if (this.Data.Dto && this.Data.Dto.State == 7 && this.Data.Dto.TypeStr == '培训室拆装服务') {
				console.log(this.Data.Dto.TypeStr);
				let files = [];
				files = this.$refs.uUpload.lists;
				console.log(files);
				if (files.length != 0) {
					this.imgLength = files.length;
					for (var i = 0; i < files.length; i++) {
						this.$refs.uTips.show({
							title: '正在上传第' + i + '张图片！',
							type: 'success',
							duration: '1000'
						});

						pathToBase64(files[i].url)
							.then((base64) => {
								this.UpimgData(base64);
							})
							.catch((error) => {
								console.error(error);
							});
					}
				} else {
					this.GOgcs(8);
				}
			} else {
				this.GOgcs(8);
			}
		},
		UpimgData: function (base64) {
			console.log('上传了一次！----------------------');
			var obj = {
				url: this.$store.state.url + 'WO/UploadEIImage',
				method: 'POST',
				header: this.$store.state.token,
				data: {
					Id: this.Data.Dto.ID,
					FileStr: base64,
					Type: 1
				}
			};
			this.$http(obj).then((res) => {
				this.imgLength -= 1;
				if (this.imgLength == 0) {
					this.GOgcs(8);
				}
			});
		},
		// 工程师操作
		GOgcs: function (code) {
			if (code == 8) {
				var obj = {
					url: this.$store.state.url + 'WO/CompanyEquInstallOrder',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.Data.Dto.ID,
						Str: this.Str
					}
				};
				this.$http(obj).then((res) => {
					console.log(res);
					uni.navigateTo({
						url: '../work.6'
					});
				});
				return false;
			}
			var obj = {
				url: this.$store.state.url + 'WO/UpdateEquInstallOrder',
				method: 'POST',
				header: this.$store.state.token,
				data: {
					Id: this.Data.Dto.ID,
					State: code
				}
			};
			this.$http(obj).then((res) => {
				console.log(res);
				uni.navigateTo({
					url: '../work.6'
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.box {
	background-color: #ffffff;

	// 寄回物品 item
	.SendBackItem {
		width: 90%;
		min-height: 50px;
		margin: auto;
		border-radius: 5px;
		margin-top: 10px;
		padding: 10px;
		box-sizing: border-box;
		-webkit-box-shadow: 3px 3px 6px #c1c1c1;
		-moz-box-shadow: 3px 3px 6px #c1c1c1;
		box-shadow: 3px 3px 6px #c1c1c1;
	}
}

.ShangChuanImg {
	width: 100px;
	height: 100px;
	border-radius: 10px;
	margin: 10px;
	box-sizing: border-box;
	color: #5f5f5f;
	float: left;
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
	border-bottom: 1px solid #c8c7cc;
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
	margin-bottom: 70px;
}

.lickgcss {
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
	background: #ffffff;
	margin: auto;
	border-radius: 10px;
	margin-top: 10px;
	margin-left: 2.5%;
	margin-bottom: 10px;
	border: 1px solid #c0c0c0;
	float: left;

	.Task1 {
		width: 95%;
		margin: auto;
		box-sizing: border-box;
		background-color: #007aff;

		.head {
			//蓝色标题
			width: 80%;
			height: 25px;
			background-color: #007aff;
			color: #ffffff;
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
	background: #ffffff;
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
		width: 100%;
		display: block;
		color: #333333;
	}
	.red {
		color: red;
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
	background-color: #007aff;
	color: #ffffff;
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
	color: #ffffff;
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
		background-color: #007aff;
		line-height: 40px;
		border-radius: 5px;
	}

	.jujue {
		width: 40%;
		height: 80%;
		float: left;
		background-color: #ff0000;
		line-height: 40px;
		border-radius: 5px;
	}
}

.bottomone {
	width: 100%;
	height: 85%;
	background-color: #ffffff;

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
	background-color: #ffffff;
	overflow: auto;
	padding: 5px;
	box-sizing: border-box;
	font-size: 15px;
}

.buts {
	width: 100%;
	margin: 50px 0;
	display: flex;
	justify-content: center;

	button {
		height: none;
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
</style>
