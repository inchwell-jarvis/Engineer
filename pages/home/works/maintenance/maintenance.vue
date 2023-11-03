<template>
	<view class="box">

		<!-- 	//基础信息 -->
		<view class="basicinformation">
			<view class="text">
				<view class="span">客户名称：</view> {{data.CustomerName}}
			</view>
			<view class="text">
				<view class="span">单号：</view> {{data.Code}}
			</view>
			<view class="text">
				<view class="span">联系人：</view> {{data.LinkMan}}
			</view>
			<view class="text" @tap='Tel(data.LinkManTel)'>
				<view class="span">电话：</view>{{data.LinkManTel }}
				<u-icon name="phone-fill" color="#2979ff" size="28"></u-icon>
				<span>点击呼叫</span>
			</view>
			<view class="text">
				<view class="span">预计保养时间：</view> {{data.EstimatedTime}}
			</view>
			<view class="text">
				<view class="span">任务启动时间：</view> {{data.ActualTime}}
			</view>
			<view class="text">
				<view class="span">开始时间：</view> {{data.BeginTime}}
			</view>
			<view class="text">
				<view class="span">完成时间：</view> {{data.EndTime}}
			</view>
		</view>


		<!-- 	//基础信息 -->
		<view class="basicinformation" v-if="MSSODtoState">
			<view class="text">
				<view class="span">耗材状态：</view> {{MSSODto.MSSOStateStr}}
			</view>

			<view class="text" style="background-color: #dfdfe5;border-radius: 5px;margin-bottom: 5px;"
				v-for="(item,indexsss) in MSSODto.GoosDtos" :key='indexsss'>
				<view class="span">需求：{{item.Quantity}}</view>
				<view class="span">已发：{{item.Quantity}}</view>
				描述：{{item.ProDesc}}
			</view>

		</view>





		<!-- 详细信息 -->
		<view v-if="this.state != 1 && this.state != 8  && this.state != 9" class="basicinformation">
			<view v-for="(item,index) in EngineerDtos" :key="index" class="text">
				<view class="span">{{item.Name}}</view> {{item.State}}
			</view>
		</view>



		<!-- 选择工程师 -->
		<view class="cu-form-group gcd" v-if="this.state == 1 ||this.state == 8 || this.state == 9">
			<view class="title">选择工程师</view>
			<input type="text" :value="gcsName" @tap="onKeyInputs" disabled="true" />
		</view>


		<!-- 日期选择 -->
		<view v-if="this.state == 1 ||this.state == 8 || this.state == 9" class="cu-form-group">
			<view class="title">选择日期</view>
			<picker mode="date" :value="Time" start="2015-09-01" end="2090-09-01" @change="DateChange">
				<view class="picker">
					{{Time}}
				</view>
			</picker>
		</view>
		<!-- 展示设备 处理 -->
		<view v-if="this.state == 7 && this.EquipmentDtos[0]" class="basicinformation">
			<view v-for="(item,index) in this.EquipmentDtos" :key="index" class="Task1">
				<view class="head">{{item.Name}}</view>
				<view @tap="addimslists(item.ContrastId)" class="ps">
					<image src="../../../../static/icon/icon/addto.png" mode=""></image>
				</view>
				<view v-for="(items,indexs) in item.EquPhotos" :key="indexs" class="EquPhotos">
					<view class="texts"> 照片组{{indexs+1}}:
						<image @tap="err(items,item)" src="../../../../static/xuan-popup/err.png" mode=""></image>
					</view>
					<view class="pushimg">
						<view @tap="addimgleright(items,1)" class="left right">
							<u-image width="100%" height='100%' :src="items.Before"
								mode="widthFix" border-radius='10px' @click="previewImg(items,0)" v-if="items.Before">
								<view slot="error" style="font-size: 24rpx;">加载失败</view>
							</u-image>
							
							<UploadPictures :count='1' :news='items.PhotoId+"%%1"' :sourceType="sourceType"
								@ReturnBase64='ReturnBase64' :icon='"camera"' :text='"拍摄上传"' v-if="!items.Before"></UploadPictures>
						</view>

						<view @tap="addimgleright(items,2)" class="left ">
							<u-image width="100%" height='100%' :src="items.After"
								mode="widthFix" border-radius='10px' @click="previewImg(items,1)" v-if="items.After">
								<view slot="error" style="font-size: 24rpx;">加载失败</view>
							</u-image>
							
							<UploadPictures :count='1' :news='items.PhotoId+"%%2"' :sourceType="sourceType"
								@ReturnBase64='ReturnBase64' :icon='"camera"' :text='"拍摄上传"' v-if="!items.After"></UploadPictures>
						</view>

					</view>
				</view>
			</view>
		</view>











		<!-- 备注 -->
		<view v-if="this.state == 7" class="cu-form-group align-start">
			<view class="title">工作内容</view>
			<textarea maxlength="-1" v-model="workcontent" class="textred" placeholder="点击输入"></textarea>
		</view>
		<!-- 指派 -->
		<!-- <u-button v-if="this.state == 1 && !MSSODtoState" :disabled="GOstatus" class="button" @tap="SelectConsumables" style='margin-bottom: 0px;'>选择耗材</u-button> -->
		<u-button v-if="this.state == 1 ||this.state == 8 || this.state == 9" :disabled="GOstatus" class="button"
			@tap="zhi">指
			派</u-button>
		<!-- 接受 ？？ 拒绝-->
		<view v-if="this.state == 2" class="buttons">
			<button class="jie" :disabled="GOstatus" @tap="Go(3)"> 接 受 </button>
			<button class="jujue" :disabled="GOstatus" @tap="Go(1)"> 拒 绝 </button>
		</view>
		<!-- 出发 -->
		<u-button v-if="this.state == 3" :disabled="GOstatus" class="button" @tap="Go(6)">出 发</u-button>
		<!-- 到达 -->
		<u-button v-if="this.state == 6" :disabled="GOstatus" class="button" @tap="Go(7)">到 达</u-button>
		<!-- 处理 -->
		<u-button v-if="this.state == 7" :disabled="GOstatus" class="button" @tap="GoOK()">完 成 保 养</u-button>
		<!-- 回显 -->
		<hxpreviewimg :list.sync="previewImgList" :current.sync="currentImg" :start.sync="PINum"></hxpreviewimg>
		<!-- 弹出层 -->







		<!-- 工程师选择 -->
		<u-popup v-model="show" mode="bottom" length="60%" :closeable='true' close-icon-pos='top-left'
			border-radius='10'>
			<view class="content">
				<u-button type="primary" size="medium" @click="close()">确定</u-button>
				<scroll-view scroll-y="true" class="ListView">
					<u-cell-group>
						<u-cell-item :arrow="false" icon="man-add-fill" v-for="(item,index) in gcss" :key="index"
							:title="item.Name">
							<switch :value="item.switch" :checked="item.switch" @tap="switchs(index)"
								style="transform:scale(0.6)" />
						</u-cell-item>
					</u-cell-group>
				</scroll-view>
			</view>
		</u-popup>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue" //弹窗选择工程师
	import hxpreviewimg from '@/components/hx-preview-img/hx-preview-img.vue'
	import UploadPictures from '../../../../components/UploadPictures/UploadPictures.vue'

	export default {
		components: {
			uniPopup,
			hxpreviewimg,
			UploadPictures
		},
		data() {
			return {
				state: 0, //    1 指派     全场的状态 ，	
				url: "", //    判断后进行修改请求路径
				data: {}, //    数据
				Time: '', //时间
				gcss: [], //获取来的工程师列表
				gcs: [], // 已选择的工程师id
				index: 0, //选择工程师的下标
				gcsName: '', // 选择的工程师的name集合
				EngineerDtos: [], //指派的工程师
				EquipmentDtos: [], //待保养的设备
				Base64: '',
				workcontent: '', //备注内容
				itemsid: '', //上传照片的id
				itemsimgtype: '', //上传的前后
				currentImg: '',
				previewImgList: [],
				PINum: 0,
				imgList: ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
				Gcsscz: false,
				GOstatus: false,
				GOstatuss: 0, //二级保险

				MSSODto: {}, // 耗材信息  没有为null
				MSSODtoState: false,
				show: false,
				sourceType: ['camera'],
			};
		},
		mounted() {
			uni.showLoading({
				title: '加载中'
			}); //声明过渡
			//获取当前时间
			var curDate = new Date()
			var curYear = curDate.getFullYear(); //获取完整的年份(4位,1970-????)
			var curMonth = curDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
			var curDay = curDate.getDate(); //获取当前日(1-31)
			this.Time = curYear + '-' + curMonth + '-' + curDay
			this.state = this.$store.state.Maintenancestatus //获得上级的状态
			this.http()
			this.httpgcs()
		},
		onBackPress() {
			uni.navigateTo({
				url: "../work.3",
			});
			return true
		},
		methods: {
			// 接受Base64
			ReturnBase64: function(row) {
				console.log(row)
				var Data = row.news.split('%%')
				console.log(Data)
				var obj = {
					url: this.$store.state.url + 'Maintain/UploadMaintainPhoto',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: Data[0],
						Type: Data[1],
						FileStr: row.Data[0]
					}
				}
				this.$http(obj)
					.then((res) => {
						this.$refs.uToast.show({
							title: '上传成功!',
							type: 'success'
						})
						this.http()
					})
					.catch((err) => {
						this.$refs.uToast.show({
							title: '上传失败!',
							type: 'error'
						})
					})
			},
			// 打电话
			Tel: function(str) {
				uni.makePhoneCall({
					phoneNumber: str //仅为示例
				});
			},
			//查看大图
			previewImg: function(imgs, indexs) {
				this.previewImgList = []
				if (imgs.Before != '' && imgs.After != '') {
					var asd = []
					asd[0] = imgs.Before
					asd[1] = imgs.After
					this.currentImg = asd[indexs]
					this.previewImgList = asd
					this.PINum++
				} else {
					var asd = []
					if (imgs.Before != '') {
						asd[0] = imgs.Before
					}
					if (imgs.After != '') {
						asd[0] = imgs.After
					}
					this.currentImg = asd[0]
					this.previewImgList = asd
					this.PINum++
				}
			},
			//删除接口
			err: function(items, item) {
				uni.showLoading({
					title: '加载中'
				})
				if (item.EquPhotos.length == 1) {
					uni.showToast({
						title: "当前图片仅剩一组",
						icon: "none"
					})
					return false
				}
				var obj = {
					url: this.$store.state.url + 'Maintain/DelEquPhoto',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						id: items.PhotoId,
					}
				}
				this.$http(obj).then((res) => {
					this.http()
				})
			},
			//完成保养
			GoOK: function() {
				//检查备注
				if (this.workcontent == '') {
					uni.showToast({
						title: "请输入工作内容！",
						icon: "none"
					})
					return false
				}
				//完成保养
				if (this.GOstatuss == 1) {
					return false
				}
				this.GOstatuss = 1
				var obj = {
					url: this.$store.state.url + 'Maintain/CompleteMaintain',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.$store.state.MaintenancestatusID,
						WorkContent: this.workcontent
					}
				}
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: "../work.3",
					});
				})
			},
			//上传照片
			addimgleright: function(items, index) {
				this.$store.state.addimgbaoidandlr = items.PhotoId + '%%' + index
			},
			//添加照片组
			addimslists: function(id) {
				var obj = {
					url: this.$store.state.url + 'Maintain/AddEquPhoto',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: id
					}
				}
				this.$http(obj).then((res) => {
					this.http()
				})
			},

			//按钮
			Go: function(i) {
				if (this.GOstatuss == 1) {
					return false
				}
				this.GOstatuss = 1
				this.GOstatus = true
				console.log('00')
				var obj = {
					url: this.$store.state.url + 'Maintain/UpdateMaintainState',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						id: this.$store.state.MaintenancestatusID,
						State: i
					}
				}
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: "../work.3",
					});
				})
			},

			//初始接口   判断状态后调用
			http: function() {
				var Goto = this.$store.state.MaintenancestatusGoto
				if (Goto == 1) {
					// ICMS.获取保养基础信息
					this.url = 'Maintain/GetMaintainBaseInfo'
				} //指派
				if (Goto == 2) {
					// ICMS.获取保养详细信息
					this.url = 'Maintain/GetMaintainDetailInfo'
				} //处理  
				console.log(this.url)
				var obj = {
					url: this.$store.state.url + this.url,
					method: 'GET',
					header: this.$store.state.token,
					data: {
						Id: this.$store.state.MaintenancestatusID
					}
				}
				this.$http(obj).then((res) => {
					console.log(res)
					this.MSSODto = res.Data.MSSODto
					// 判断是否含有耗材  是否展示耗材
					if (this.MSSODto == null) {
						// 没有耗材
						this.MSSODtoState = false
					} else {
						// 有耗材
						this.MSSODtoState = true
					}
					if (res.Data.BaseInfo) {
						this.data = res.Data.BaseInfo //详细信息
						this.EngineerDtos = res.Data.EngineerDtos
						this.EquipmentDtos = res.Data.EquipmentDtos
					} else {
						this.data = res.Data //基本信息
					}
				})
			},
			//获取gcs
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
					this.gcss = res.Data
					for (var i = 0; i < this.gcss.length; i++) {
						this.gcss[i]['switch'] = false
					}
				})

			},
			//时间
			DateChange(e) {
				this.Time = e.detail.value
			},
			//指派gcs
			zhi: function() {
				if (this.gcs.length == 0) {
					uni.showToast({
						title: "请选择工程师",
						icon: "none"
					})
					return false
				}
				if (this.GOstatuss == 1) {
					return false
				}
				this.GOstatuss = 1
				var obj = {
					url: this.$store.state.url + 'Maintain/AssignTaskForM',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.$store.state.MaintenancestatusID,
						EIds: this.gcs,
						BeginTime: this.Time
					}
				}
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: "../work.3",
					});
				})
			},
			//点击工程师选择
			onKeyInputs: function(event) {
				// this.$refs.popup.open()
				this.show = true
			},
			//确认gcs
			close: function() {
				this.gcs = []
				this.gcsName = ''
				this.Gcsscz = false
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
				this.show = false
				this.zhi()
			},
			DataChange: function(e) {},
			switchs: function(i) {
				this.$set(this.gcss[i], 'switch', !this.gcss[i].switch)
			},
			// 选择耗材
			SelectConsumables: function() {
				uni.navigateTo({
					url: "./SelectConsumables",
				});
			}

		}
	}
</script>

<style lang="scss">
	.box {
		overflow: auto;

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
					background-color: #FFFFFF;
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
				color: #FFFFFF;
				background-color: #2a91ff;
				line-height: 40px;
				border-radius: 5px;
			}

			.jujue {
				width: 40%;
				height: 80%;
				float: left;
				color: #FFFFFF;
				background-color: #ff7300;
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

	}
</style>
