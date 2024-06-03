<template>
	<view class="box">
		<view class="basicinformation">
			<view class="texts">
				<view class="span">客户名称：</view>
				{{ data.CustomerName }}
			</view>
			<view class="text">
				<view class="span">单号：</view>
				{{ data.Code }}
			</view>
			<view class="text">
				<view class="span">大包特性：</view>
				<span>{{ data.Feature2 }}</span>
			</view>
			<view class="text">
				<view class="span">联系人：</view>
				{{ data.LinkMan }}
			</view>
			<view class="text" @tap="Tel(data.LinkManTel)">
				<view class="span">电话：</view>
				{{ data.LinkManTel }}
				<u-icon name="phone-fill" color="#2979ff" size="28"></u-icon>
				<span>点击呼叫</span>
			</view>
			<view class="text">
				<view class="span">预计保养时间：</view>
				{{ data.EstimatedTime }}
			</view>
			<view class="text">
				<view class="span">任务启动时间：</view>
				{{ data.ActualTime }}
			</view>
			<view class="text">
				<view class="span">开始时间：</view>
				{{ data.BeginTime }}
			</view>
			<view class="text">
				<view class="span">完成时间：</view>
				{{ data.EndTime }}
			</view>
		</view>

		<!--  -->

		<!-- 工程师选择 -->
		<u-popup v-model="show" mode="bottom" length="60%" :closeable="true" close-icon-pos="top-left" border-radius="10">
			<view class="content">
				<u-button type="primary" size="medium" @click="close()">确定</u-button>
				<scroll-view scroll-y="true" class="ListView">
					<u-cell-group>
						<u-cell-item :arrow="false" icon="man-add-fill" v-for="(item, index) in gcss" :key="index" :title="item.Name">
							<switch :value="item.switch" :checked="item.switch" @tap="switchs(index)" style="transform: scale(0.6)" />
						</u-cell-item>
					</u-cell-group>
				</scroll-view>
			</view>
		</u-popup>
		<u-button type="success" size="mini" style="float: right; margin-right: 2.5%" @click="show = true">增派工程师</u-button>
		<view class="basicinformation">
			<view v-for="(item, index) in EngineerDtos" :key="index" class="text">
				<view class="span">{{ item.Name }}</view>
				{{ item.State }}
			</view>
		</view>

		<!-- 展示设备 处理 -->
		<view class="basicinformation">
			<view v-for="(item, index) in this.EquipmentDtos" :key="index" class="Task1">
				<view class="head">{{ item.Name }}</view>

				<view v-for="(items, indexs) in item.EquPhotos" :key="indexs" class="EquPhotos" v-if="items.show">
					<view class="pushimg">
						<view class="left right">
							<image @click="previewImg(items.Before)" class="images" v-if="items.Before" :src="items.Before" mode=""></image>
						</view>
						<view class="left">
							<image @click="previewImg(items.After)" class="images" v-if="items.After" :src="items.After" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data: {},
			EngineerDtos: [],
			EquipmentDtos: [],
			previewImgList: [],
			gcsName: '',
			gcss: [], //获取来的工程师列表
			gcs: [], // 已选择的工程师id
			Time: '',
			show: false
		};
	},
	created() {
		this.init();
		this.httpgcs();
		var curDate = new Date();
		var curYear = curDate.getFullYear(); //获取完整的年份(4位,1970-????)
		var curMonth = curDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
		var curDay = curDate.getDate(); //获取当前日(1-31)
		this.Time = curYear + '-' + curMonth + '-' + curDay;
	},
	methods: {
		// 打电话
		Tel: function (str) {
			uni.makePhoneCall({
				phoneNumber: str //仅为示例
			});
		},
		switchs: function (i) {
			this.$set(this.gcss[i], 'switch', !this.gcss[i].switch);
		},
		//确认gcs
		close: function () {
			this.gcs = [];
			this.gcsName = '';
			this.Gcsscz = false;
			for (var i = 0; i < this.gcss.length; i++) {
				if (this.gcss[i].switch) {
					this.gcs.push(this.gcss[i].EmployeeId);
					this.gcsName += '/' + this.gcss[i].Name;
				}
			}
			for (var i = 0; i < this.gcss.length; i++) {
				this.gcss[i].switch = false;
			}
			this.zhi();
		},
		//获取gcs
		httpgcs: function () {
			var obj = {
				url: this.$store.state.url + 'System/GetEmployeeMini',
				method: 'GET',
				header: this.$store.state.token,
				data: {
					type: '1'
				}
			};
			this.$http(obj).then((res) => {
				this.gcss = res.Data;
				for (var i = 0; i < this.gcss.length; i++) {
					this.gcss[i]['switch'] = false;
				}
			});
		},
		//点击工程师选择
		onKeyInputs: function (event) {
			// this.$refs.popup.open()
			this.Gcsscz = true;
		},
		//初始接口   判断状态后调用
		init: function () {
			// if (this.state == 1) {
			// 	this.url = 'Maintain/GetMaintainBaseInfo'
			// } //指派
			// if (this.state != 1) {
			// 	this.url = 'Maintain/GetMaintainDetailInfo'
			// } //处理
			var url = '';
			var Goto = this.$store.state.MaintenancestatusGoto;
			if (Goto == 1) {
				url = 'Maintain/GetMaintainBaseInfo';
			} //指派
			if (Goto == 2) {
				url = 'Maintain/GetMaintainDetailInfo';
			} //处理
			var obj = {
				url: this.$store.state.url + url,
				method: 'GET',
				header: this.$store.state.token,
				data: {
					Id: this.$store.state.MaintenancestatusID
				}
			};
			this.$http(obj).then((res) => {
				// if (res.Data.BaseInfo) {
				this.data = res.Data.BaseInfo; //详细信息
				this.data['Feature2'] = this.data.Feature ? JSON.parse(this.data.Feature).join('、') : ' - ';
				
				console.log(res.Data);
				this.EngineerDtos = res.Data.EngineerDtos;
				this.EquipmentDtos = res.Data.EquipmentDtos;

				for (var index = 0; index < this.EquipmentDtos.length; index++) {
					var item = this.EquipmentDtos[index].EquPhotos;
					for (var indexs = 0; indexs < item.length; indexs++) {
						if (item[indexs].After == '' && item[index].Before == '') {
							item[indexs]['show'] = false;
						} else {
							item[indexs]['show'] = true;
						}
					}
				}
				console.log(this.EquipmentDtos);
			});
		},
		previewImg: function (imgs) {
			console.log(imgs);
			uni.previewImage({
				current: 0, //预览图片的下标
				urls: [imgs] //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
			});
		},
		//指派gcs
		zhi: function () {
			this.show = false;
			if (this.gcs.length == 0) {
				uni.showToast({
					title: '请选择工程师',
					icon: 'none'
				});
				return false;
			}
			var obj = {
				url: this.$store.state.url + 'Maintain/AssignTaskForM',
				method: 'POST',
				header: this.$store.state.token,
				data: {
					Id: this.$store.state.MaintenancestatusID,
					EIds: this.gcs,
					BeginTime: this.Time
				}
			};
			this.$http(obj).then((res) => {
				this.init();
			});
		}
	}
};
</script>

<style lang="scss" scoped>
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

.gcs {
	width: 80%;
	height: 300px;
	position: fixed;
	background-color: #ececec;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	border-radius: 10px;
	box-sizing: border-box;
	z-index: 99;

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
	}

	.gcss {
		width: 100%;
		height: 200px;
		overflow: auto;

		.kuang {
			width: 80%;
			height: 33px;
			background-color: #ffffff;
			margin-left: 10%;
			margin-top: 3px;
			line-height: 33px;
			padding-left: 10px;
			box-sizing: border-box;
			border-radius: 3px;

			switch {
				float: right;
			}
		}

		.bottomone {
			width: 100%;
			height: 85%;

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
			}
		}
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
			height: 115px;
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

	.texts {
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
		width: 100px;
		display: block;
		color: #333333;
	}

	input {
		font-size: 14px;
	}
}
</style>
