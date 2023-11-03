<template>
	<view class="box">
		<!-- 指派 -->
		<div class="Basic" v-if='data.State == 1'>
			<div class="title">指派
				<u-button v-if="gcs && time" type="primary" class='but' size='mini' @tap='Submit()'>提交</u-button>
			</div>
			<view class="TM">
				<view class="TL">指派工程师</view>
				<!-- <view class="TR">{{gcs.label}}</view> -->
				<u-button type="primary" class='but' size='mini' @tap='Assign()'>{{gcs.label || "指派工程师"}}</u-button>
				<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
			</view>
			<view class="TM">
				<view class="TL">计划到场时间</view>
				<!-- <view class="TR">{{time}}</view> -->
				<u-button type="primary" class='but' size='mini' @tap='Plannedtime()'>{{time || "计划到场时间"}}</u-button>
				<u-picker mode='time' v-model="timeshow" @confirm="timeconfirm" :default-time='defaultTime'
					:params="params"></u-picker>
			</view>
		</div>
		<!-- 接受&拒绝 -->
		<div class="Basic BasicFlex" v-if='data.State == 2'>
			<u-button type="primary" size="medium" @tap='UpdateECState(3)'>接受</u-button>
			<u-button type="error" size="medium" @tap='UpdateECState(1)'>拒绝</u-button>
		</div>
		<!-- 出发 -->
		<div class="Basic BasicFlex" v-if='data.State == 3'>
			<u-button type="primary" size="medium" @tap='UpdateECState(4)'>出发</u-button>
		</div>
		<!-- 到达 -->
		<div class="Basic BasicFlex" v-if='data.State == 4'>
			<u-button type="primary" size="medium" @tap='UpdateECState(5)'>到达</u-button>
		</div>
		<!-- 出发 -->
		<div class="Basic BasicFlex" v-if='data.State == 5'>
			<u-button type="primary" size="medium" @tap='UpdateECState(6)'>清单完成</u-button>
		</div>
		<!-- 基础信息 -->
		<div class="Basic">
			<div class="title">基础信息</div>
			<view class="TM">
				<view class="TL">创建时间</view>
				<view class="TR">{{data.CreateDate}}</view>
			</view>
			<view class="TM">
				<view class="TL">工程师</view>
				<view class="TR">{{data.Engineer}}</view>
			</view>
			<view class="TM">
				<view class="TL">客户全称</view>
				<view class="TR">{{data.CusFullName}}</view>
			</view>
			<view class="TM">
				<view class="TL">区域</view>
				<view class="TR">{{data.Area}}</view>
			</view>
			<view class="TM">
				<view class="TL">状态</view>
				<view class="TR">{{data.StateStr}}</view>
			</view>

		</div>




		<div class="Basic">
			<div class="title">订单信息</div>
			<view class="TM" v-for="(item,index) in Other" :key='index'>
				<view class="TL">{{item.T01}}</view>
				<view class="TR">{{item.T02}}</view>
			</view>
		</div>


		<div class="Basic">
			<div class="title">设备清点
				<span>清点设备</span>
				<u-button v-if='data.State != 1' type="primary" class='but' size='mini' @tap='Router()'>清点设备</u-button>
			</div>
			<view class="TM">
				<view class="TL">设备总数</view>
				<view class="TR  LAN">{{data.TotalEquipment}}</view>
			</view>
			<view class="TM">
				<view class="TL">已清点</view>
				<view class="TR  LAN">{{Counted}}</view>
			</view>
			<view class="TM">
				<view class="TL">未清点</view>
				<view class="TR  LAN">{{CountedNo}}</view>
			</view>
		</div>



		<div class="Basic">
			<div class="title">签字</div>


			<view class="TM" style="margin-top: 20px;">
				<view class="TL">英之杰清点人签字</view>
				<view class="TR LAN">
					<span v-if='!data.InchwellGcsSign' @tap='doss(3)'>未签字 点击签字</span>
					<span v-if='data.InchwellGcsSign' @tap='previewImage(data.InchwellGcsSign)'>点击查看
						签字时间：{{data.InchwellGcsSignDt.split('T')[0]}}</span>
					</u-icon>
				</view>
			</view>




			<view class="TM" style="margin-top: 20px;">
				<view class="TL">客户清点人签字</view>
				<view class="TR LAN">
					<span v-if='!data.CheckCusSign'>未签字</span>
					<span v-if='data.CheckCusSign' @tap='previewImage(data.CheckCusSign)'>点击查看
						签字时间：{{data.CheckCusSignDt.split('T')[0]}}</span>
					</u-icon>
				</view>
			</view>




			<view class="TM" style="margin-top: 20px;">
				<view class="TL">服务经理签字</view>
				<view class="TR LAN">
					<span v-if='!data.ServiceManagerSign'>未签字</span>
					<span v-if='data.ServiceManagerSign' @tap='previewImage(data.ServiceManagerSign)'>点击查看
						签字时间：{{data.ServiceManagerSignDt.split('T')[0]}}</span>
					</u-icon>
				</view>
			</view>


		</div>
		
	<!-- 	<u-link :href="DcPDF">点击导出PDF文件</u-link>
		<u-button type="primary" @tap='downloadFile()'>下载测试</u-button> -->



		<view style="height: 40px;"></view>
		<sign canvasId="canvas1" @close="close" @save="save" :visible="isShow" ref='hello' />
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import sign from '../../../../components/sign/sign.vue'
	import {
		pathToBase64
	} from '../../../../components/Base64/index.js'
	export default {
		components: {
			sign
		},
		data() {
			return {
				data: {},
				Other: [],
				Id: '',
				// 选择工程师
				show: false,
				list: [],
				gcs: {},
				// 到场时间
				timeshow: false,
				time: '',
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: false,
					second: false
				},
				defaultTime: '2021-01-01 12:00:00',



				divider: false,
				isShow: false,
				signindex: 0,

				// 已清点
				Counted: 0,
				CountedNo: 0,
				// 导出PDF地址
				DcPDF: 'http://39.101.201.199:8005/AS&MC/ASs.html?url=aHR0cDovL2VycC5pbmNod2VsbC5jb20uY24vYXBpL2FwaS9NYWludGFpbi9HZXRNQ1l1&ID=MGQ4ZGNkZWItYzI3My00NjllLTlhNDYtMjViMGJiMzczYWE0&token=M2JmYTU5M2VlMzZmNGRlNzgxMDllM2ExNTE2M2JiMDE'
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			this.Id = option.id
			this.start()
			this.initgcs()


			var myDate = new Date();
			myDate.getYear(); //获取当前年份(2位)
			myDate.getFullYear(); //获取完整的年份(4位,1970-????)
			myDate.getMonth(); //获取当前月份(0-11,0代表1月)
			myDate.getDate(); //获取当前日(1-31)
			this.defaultTime = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate(); +
			'12:00:00'
		},
		onShow() {
			this.start()
		},
		onBackPress() {
			uni.navigateTo({
				url: "./EquipmentInventorySheet"
			});
			return true
		},
		methods: {

			downloadFile: function() {
				/* 下载文件 */
				// uni.downloadFile({
				//     url: 'http://icms.inchwell.com.cn/File/Document/f461b14aa7dd4268ae0ade964b60429a.pdf', //仅为示例，并非真实的资源
				//     success: (res) => {
				//         if (res.statusCode === 200) {
				//             console.log('下载成功');
				//         }
				//     }
				// });
				
				
						console.log();
						const downloadTask = uni.downloadFile({
							url: 'http://icms.inchwell.com.cn/File/Document/f461b14aa7dd4268ae0ade964b60429a.pdf', //仅为示例，并非真实的资源
							success: (res) => {
								if (res.statusCode === 200) {
									uni.saveFile({
										tempFilePath: res.tempFilePath,
										success:(red)=> {
											console.log(red.savedFilePath);
											uni.showToast({
												icon: 'none',
												mask: true,
												title: '文件已保存：' + red.savedFilePath, //保存路径
												duration: 3000,
											});
											setTimeout(() => {
												//打开文档查看
												uni.openDocument({
													filePath: red.savedFilePath,
													success: function(res) {
														console.log('打开文档成功');
													}
												});
											},3000)
										}
									});
								}
								
							},
							fail: (err) => {
								uni.showToast({
									icon: 'none',
									mask: true,
									title: '失败请重新下载',
								});
							},
						})
				
					
			},
			previewImage: function(url) {
				var icmsUrl = 'http://icms.inchwell.com.cn/file/sign/' + url
				console.log(icmsUrl)
				uni.previewImage({
					current: 0, //预览图片的下标
					background: '#FFFFFF',
					urls: [icmsUrl] //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				})
			},
			start: function(Id) {
				var obj = {
					url: this.$store.state.url + 'Bill/GetEquCheckBill',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						ecId: this.Id,
						search: '',
						state: '-1',
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data.Dto)
					this.data = res.Data.Dto
					this.Other = JSON.parse(this.data.Other)


					this.Counted = 0
					this.CountedNo = 0
					var data = this.data.EquDtos
					for (var i = 0; i < data.length; i++) {
						if (data[i].CusConfirm) {
							this.Counted += data[i].Quantity
						} else {
							this.CountedNo += data[i].Quantity
						}
					}
				})
			},
			Router: function() {
				if (this.data.State == 5) {
					uni.navigateTo({
						url: 'EquipmentInventorySheetEQ?id=' + this.Id
					});
				} else {
					this.$refs.uToast.show({
						title: '到达后才能开始清点',
						type: 'warning'
					})
				}
			},
			// 选择工程师
			Assign: function() {
				this.show = true
			},
			// 
			confirm(e) {
				console.log(e);
				this.gcs = e[0]
				console.log(this.gcs)
			},
			// 确定工程师：
			Submit: function() {
				var that = this
				var obj = {
					url: that.$store.state.url + 'Bill/ECBAssign',
					method: 'POST',
					header: that.$store.state.token,
					data: {
						Id: this.Id,
						Str: this.gcs.value,
						Type: this.time
					},
				}
				that.$http(obj).then((res) => {
					uni.navigateTo({
						url: './EquipmentInventorySheet'
					});
				})
			},
			// 获取工程师
			initgcs: function() {
				var that = this
				var obj = {
					url: that.$store.state.url + 'System/GetEmployeeMini',
					method: 'GET',
					header: that.$store.state.token,
					data: {
						type: '1'
					},
				}
				that.$http(obj).then((res) => {
					console.log(res)
					var data = []
					var Data = res.Data
					for (var i = 0; i < Data.length; i++) {
						var Obj = {
							value: Data[i].EmployeeId,
							label: Data[i].Name
						}
						data.push(Obj)
					}
					that.list = data
				})
			},

			// 选择时间
			Plannedtime: function() {
				this.timeshow = true
			},
			// 获取当前时间
			timeconfirm(e) {
				console.log(e);
				this.time = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':00:00'
				console.log(this.time)
			},
			// ICMS.更新设备清点单状态
			UpdateECState: function(State) {
				var that = this
				var obj = {
					url: that.$store.state.url + 'Bill/UpdateECState',
					method: 'POST',
					header: that.$store.state.token,
					data: {
						Id: that.Id,
						ToState: State
					},
				}
				that.$http(obj).then((res) => {
					uni.navigateTo({
						url: './EquipmentInventorySheet'
					});
				})
			},
			doss(row) {
				this.isShow = true;
				this.signindex = row
			},
			close() {
				this.isShow = false;
			},
			save(val) {
				console.log(val)
				this.isShow = false;
				pathToBase64(val.path)
					.then(base64 => {
						console.log(base64)
						var that = this
						var obj = {
							url: that.$store.state.url + 'Bill/CheckBillSign',
							method: 'POST',
							header: that.$store.state.token,
							data: {
								Id: that.Id,
								FileStr: base64,
								Type: that.signindex,
							},
						}
						that.$http(obj).then((res) => {
							that.start()
						})
					})
					.catch(error => {
						console.error(error)
					})
			},

		}
	}
</script>

<style lang="scss">
	.Basic {
		width: 100%;

		.title {
			width: 100%;
			height: 40px;
			border-bottom: 1px solid #c3c3c3;
			line-height: 40px;
			padding-left: 20px;
			font-weight: bold;
			box-sizing: border-box;
			float: left;
			position: relative;

			.but {
				position: absolute;
				right: 10px;
				top: 10px;
			}
		}


		.TM {
			width: 100%;
			min-height: 30px;
			line-height: 30px;
			padding-left: 20px;
			box-sizing: border-box;
			float: left;

			.TL {
				width: 35%;
				height: 100%;
				font-weight: bold;
				float: left;
				font-size: 12px;
				color: #555555;
			}

			.TR {
				width: 65%;
				min-height: 100%;
				color: #808080;
				float: left;
				overflow: hidden;
				font-size: 12px;
			}

			.LAN {
				color: #2979FF;

			}
		}


		.Conter {
			width: 90%;
			min-height: 100px;
			background-color: #FFFFFF;
			border-radius: 10px;
			margin: auto;
			overflow: hidden;
			text-align: center;
			line-height: 100px;
		}

	}

	.BasicFlex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
