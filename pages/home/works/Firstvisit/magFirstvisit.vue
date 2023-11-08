<template>
	<view class="box">

		<view class="basicinformation">
			<view class="text">
				<view class="span">拜访发起人：</view> {{Dto.VisiterName }}
			</view>
			<view class="text2">
				<view class="span">客户全称：</view> {{Dto.CusFullName }}
			</view>
			<view class="text">
				<view class="span">当前状态：</view> {{Dto.StateStr }}
			</view>
			<view class="text">
				<view class="span">创建时间：</view> {{Dto.CreateDate | timeData }}
			</view>
			<view class="text">
				<view class="span">开始时间：</view> {{Dto.BeginTime | timeData}}
			</view>
			<view class="text">
				<view class="span">结束时间：</view> {{Dto.EndTime | timeData}}
			</view>
		</view>

		<view class="basicinformation" style="padding-left: 10px;" v-if="Dto.State != 1">
			<u-form :model="form" ref="uForm">
				<u-form-item label-width='200rpx' label="售后产值(万)">
					<u-input type='number' auto-height placeholder="请输入金额" v-model="form.OutputValue" />
				</u-form-item>
				<u-form-item label-width='200rpx' label="隶属集团">
					<u-input type='textarea' maxlength="99999" auto-height v-model="form.AffiliatedGroup" />
				</u-form-item>
				<u-form-item label-width='200rpx' label="审批流程">
					<u-input type='textarea' maxlength="99999" auto-height v-model="form.ApprovalProcess" />
				</u-form-item>
				<u-form-item label-width='200rpx' label="财务预算">
					<u-input type='textarea' maxlength="99999" auto-height v-model="form.FinancialBudget" />
				</u-form-item>
				<u-form-item label-width='200rpx' label="建店年份">
					<u-input type='number' auto-height placeholder="请输入建店年份" v-model="form.BuildYear" />
				</u-form-item>

				<u-form-item label-width='200rpx' label="其它信息">
					<u-input type='textarea' maxlength="99999" auto-height v-model="form.OtherInfo" />
				</u-form-item>
			</u-form>
		</view>
		<u-button v-if="Dto.State == 2" size='mini' style='float: right;margin-right: 10px;'
			@tap='CreateProuctionList()' type="success">设备分类</u-button>
		<u-button v-if="Dto.State == 2" size='mini' style='float: right;margin-right: 10px;' @tap='CreateProuction()'
			type="success">添加设备</u-button>

		<u-subsection v-if="Dto.State == 2" :list="subsectionlist" height='50' font-size='25'
			style='width:180px;float: left;margin-left: 10px;' active-color='#ff9900' @change='ModifyCurrent'
			:current="current"></u-subsection>
		<br>
		<view v-if="Dto.State == 2"
			style="width: 100%;float: right;text-align: right;padding-right: 10px;box-sizing: border-box;line-height: 40px;color: #2979ff;">
			<span @tap='route_path()'>查看已扫码录入的设备</span>
		</view>



		<!-- 备注 -->
		<view class="cu-form-group" v-if="Dto.State != 1">
			<textarea id="Content" style="width: 100%;height: 300px;" maxlength='-1' v-model="indexEquOverview"
				placeholder="请输入设备概述" />
		</view>


		<u-button v-if="Dto.State == 2" size='mini' style='float: right;margin-right: 10px;' @tap='CreateCusLinkMan()'
			type="success">添加联系人</u-button>
		<view v-if="Dto.State != 1" class="basicinformation" style="background: #f4f4f4;">
			<u-card v-for="(item,indexs) in LinkMans" :key='indexs' :title="item.Name">
				<view class="" slot="body">
					<view class="textstylecelo">
						<span class='span1'>英文名：</span>
						<span>{{item.NameEn || ' - - '}}</span>
					</view>
					<view class="textstylecelo">
						<span class='span1'>职位：</span>
						<span>{{item.Position || ' - - '}}</span>
					</view>
					<view class="textstylecelo">
						<span class='span1'>手机号：</span>
						<span>{{item.Mobile || ' - - '}}</span>
					</view>
					<view class="textstylecelo">
						<span class='span1'>电话：</span>
						<span>{{item.Tel || ' - - '}}</span>
					</view>
					<view class="textstylecelo">
						<span class='span1'>邮箱：</span>
						<span>{{item.Email || ' - - '}}</span>
					</view>
				</view>
			</u-card>
		</view>


		<view class="clattab" v-if="Dto.State == 1" style="border: none;">
			<u-button @click="UpdateCusVisitState(0)" size='mini' type="info">撤回</u-button>
			<u-button @click="UpdateCusVisitState(2)" size='mini' type="primary">开始拜访</u-button>
		</view>
		<view class="clattab" v-if="Dto.State == 2" style="border: none;">
			<u-button @click="SaveCusVisit()" size='mini' type="info">保存</u-button>
			<u-button @click="UpdateCusVisitState(3)" size='mini' type="primary">完成</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				subsectionlist: [{
						name: '首次拜访',
						index: 0,
					},
					{
						name: '非首次拜访',
						index: 1,
					}
				],
				Dto: {},
				LinkMans: [],
				indexEquOverview: '',
				form: {
					OutputValue: '',
					AffiliatedGroup: '',
					ApprovalProcess: '',
					FinancialBudget: '',
					OtherInfo: '',
					BuildYear: '',
				},
			};
		},
		created() {
			this.init()
		},
		onBackPress() { //自定义返回逻辑
			uni.navigateTo({
				url: '/pages/home/works/Firstvisit/Firstvisit',
			})
			this.$store.state.ClickCardText = ''
			return true
		},
		filters: {
			timeData(res) {
				if (res == '' || res == null || res == undefined) {
					return ' - - '
				} else {
					return res.split('T')[0]
				}
			}
		},
		methods: {

			route_path() {
				// 使用uni.navigateTo进行页面跳转，并将参数添加到URL中
				uni.navigateTo({
					url: `/pages/home/works/Firstvisit/device_list?CusId=${this.Dto.CusId}`,
				});
			},

			ModifyCurrent: function(index) {
				console.log(index)
				this.current = index
			},
			init: function() {

				var obj = {
					url: this.$store.state.url + 'CRM/GetCusVisit',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						Id: this.$store.state.FirstvisitIdindexId
					}
				}
				this.$http(obj).then((res) => {
					console.log(res)
					this.Dto = res.Data.Dto
					this.form = this.Dto
					this.LinkMans = res.Data.LinkMans
					this.form.BuildYear == 0 ? this.form.BuildYear = '' : ''
					var index = this.$store.state.ClickCardText
					var indexEquOverviewsssss = this.Dto.EquOverview
					if (index != '') {
						if (indexEquOverviewsssss == '' || indexEquOverviewsssss == null) {
							indexEquOverviewsssss = this.$store.state.ClickCardText
						} else {
							indexEquOverviewsssss += '\n ----- \n' + this.$store.state.ClickCardText
							console.log('000000')
						}

					}
					this.indexEquOverview = indexEquOverviewsssss
					document.getElementById("Content").style.height = "450px";
				})
			},
			SaveCusVisit: function() {
				var obj = {
					url: this.$store.state.url + 'CRM/SaveCusVisit',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.$store.state.FirstvisitIdindexId,
						OutputValue: this.form.OutputValue,
						AffiliatedGroup: this.form.AffiliatedGroup,
						EquOverview: this.indexEquOverview,
						ApprovalProcess: this.form.ApprovalProcess,
						FinancialBudget: this.form.FinancialBudget,
						OtherInfo: this.form.OtherInfo,
						BuildYear: this.form.BuildYear,
					}
				}
				console.log(obj)
				this.$http(obj).then((res) => {
					// uni.showToast({
					// 	title: '保存成功！',
					// 	icon: "none"
					// })
					this.Detect()
				})
			},
			Detect: function() {
				// 检测输入框十项数据是否输入齐全
				console.log(this.indexEquOverview)
				var List = this.indexEquOverview == null ? [] : this.indexEquOverview

				var textSearch = ['举升机', '轮胎拆装机', '轮胎平衡仪', '冷媒加注机', '定位仪', '大灯检测仪', '制动试验台', '焊机', '烤漆房', '充电机']
				var textSearchNo = []
				var showToastText = ''

				for (var i = 0; i < textSearch.length; i++) {
					if (List.indexOf(textSearch[i]) == -1) {
						textSearchNo.push(textSearch[i])
						showToastText += textSearch[i] + '-'
					}
				}
				if (textSearchNo.length != 0 && this.current == 0 && this.Dto.CusType == '奥迪') {
					// 全选 进行添加
					// 提示未选项
					uni.showModal({
						title: '保存成功!',
						content: '未选择 ： ' + showToastText + '\n' + '无法进行完成操作！',
						success: function(resTwo) {
							if (resTwo.confirm) {
								console.log('用户点击确定')
							} else if (resTwo.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					uni.showModal({
						title: '保存成功!',
						content: '',
						success: function(resTwo) {
							if (resTwo.confirm) {
								console.log('用户点击确定')
							} else if (resTwo.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}



			},
			async UpdateCusVisitState(index) {
				console.log(this.current)
				console.log(this.Dto)
				if (index == 3) {
					// 完成时进行必填项校验
					if (this.form.OutputValue == '' || this.form.OutputValue == null) {
						uni.showToast({
							title: '请补全售后产值！',
							icon: "none"
						})
						return false;
					}

					if (this.form.AffiliatedGroup == '' || this.form.AffiliatedGroup == null) {
						uni.showToast({
							title: '请补全隶属集团！',
							icon: "none"
						})
						return false;
					}

					if (this.form.ApprovalProcess == '' || this.form.ApprovalProcess == null) {
						uni.showToast({
							title: '请补全审批流程！',
							icon: "none"
						})
						return false;
					}

					if (this.form.FinancialBudget == '' || this.form.FinancialBudget == null) {
						uni.showToast({
							title: '请补全财务预算！',
							icon: "none"
						})
						return false;
					}

					if (this.form.BuildYear == '' || this.form.BuildYear == null) {
						uni.showToast({
							title: '请补全建店年份！',
							icon: "none"
						})
						return false;
					}

					// 判断是否为首次
					if (this.current == 0)

						// 奥迪的判断设备概述 奥迪 并且 是首次
						if (this.Dto.CusType == '奥迪' && this.current == 0) {
							if (this.indexEquOverview == '' || this.indexEquOverview == null) {
								uni.showToast({
									title: '请补全设备概述！',
									icon: "none"
								})
								return false;
							}
							var textSearch = ['举升机', '轮胎拆装机', '轮胎平衡仪', '冷媒加注机', '定位仪', '大灯检测仪', '制动试验台', '焊机', '烤漆房',
								'充电机'
							]
							var textSearchNo = []
							var showToastText = ''
							for (var i = 0; i < textSearch.length; i++) {
								if (this.indexEquOverview.indexOf(textSearch[i]) == -1) {
									textSearchNo.push(textSearch[i])
									showToastText += textSearch[i] + '-'
								}
							}

							if (textSearchNo.length != 0) {
								// 全选 进行添加
								// 提示未选项
								uni.showModal({
									title: '存在未选项!',
									content: '未选择 ： ' + showToastText + '\n' + '无法进行完成操作！',
									success: function(resTwo) {
										if (resTwo.confirm) {
											console.log('用户点击确定')
										} else if (resTwo.cancel) {
											console.log('用户点击取消');
										}
									}
								});
								return false
							}

						}
				}
				var obj = {
					url: this.$store.state.url + 'CRM/SaveCusVisit',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.$store.state.FirstvisitIdindexId,
						OutputValue: this.form.OutputValue,
						AffiliatedGroup: this.form.AffiliatedGroup,
						EquOverview: this.indexEquOverview,
						ApprovalProcess: this.form.ApprovalProcess,
						FinancialBudget: this.form.FinancialBudget,
						OtherInfo: this.form.OtherInfo,
						BuildYear: this.form.BuildYear,
					}
				}

				// 确保this功能正常
				let me = this
				
				// 获取定位
				let ip = await this.getLocation();
				console.log(ip)

				me.$http(obj).then((res) => {
					var obj2 = {
						url: me.$store.state.url + 'CRM/UpdateCusVisitState',
						method: 'POST',
						header: me.$store.state.token,
						data: {
							Id: me.$store.state.FirstvisitIdindexId,
							str: index,
							longitude: String(ip.longitude),
							latitude: String(ip.latitude),
						}
					}
					console.log(obj2)
					console.log('---------------------------------------------')
					me.$http(obj2).then((res) => {
						me.$store.state.indexcurrent = index
						if (index == 3) {
							uni.navigateTo({
								url: '/pages/home/works/Firstvisit/Firstvisit',
							})
						}
						if (index == 0) {
							uni.navigateTo({
								url: '/pages/home/works/Firstvisit/Firstvisit',
							})
						}
						me.init()
					})
				})
			},
			CreateCusLinkMan: function() {
				var obj = {
					url: this.$store.state.url + 'CRM/SaveCusVisit',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.$store.state.FirstvisitIdindexId,
						OutputValue: this.form.OutputValue,
						AffiliatedGroup: this.form.AffiliatedGroup,
						EquOverview: this.indexEquOverview,
						ApprovalProcess: this.form.ApprovalProcess,
						FinancialBudget: this.form.FinancialBudget,
						OtherInfo: this.form.OtherInfo,
						BuildYear: this.form.BuildYear,
					}
				}
				this.$http(obj).then((res) => {
					this.$store.state.CreateCusLinkMan = this.Dto.CusId
					uni.navigateTo({
						url: '/pages/home/works/Firstvisit/CreateCusLinkMan',
					})
				})
			},
			// 向输入框中添加设备信息
			CreateProuction: function() {
				var obj = {
					url: this.$store.state.url + 'CRM/SaveCusVisit',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.$store.state.FirstvisitIdindexId,
						OutputValue: this.form.OutputValue,
						AffiliatedGroup: this.form.AffiliatedGroup,
						EquOverview: this.indexEquOverview,
						ApprovalProcess: this.form.ApprovalProcess,
						FinancialBudget: this.form.FinancialBudget,
						OtherInfo: this.form.OtherInfo,
						BuildYear: this.form.BuildYear,
					}
				}
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: './addGetProductMinis',
					})
					this.$store.state.ClickCardText = ''
				})

			},
			CreateProuctionList: function() {
				var obj = {
					url: this.$store.state.url + 'CRM/SaveCusVisit',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.$store.state.FirstvisitIdindexId,
						OutputValue: this.form.OutputValue,
						AffiliatedGroup: this.form.AffiliatedGroup,
						EquOverview: this.indexEquOverview,
						ApprovalProcess: this.form.ApprovalProcess,
						FinancialBudget: this.form.FinancialBudget,
						OtherInfo: this.form.OtherInfo,
						BuildYear: this.form.BuildYear,
					}
				}
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: '/pages/home/works/Firstvisit/CreateProuctionList',
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #FFFFFF;
		padding-bottom: 80px;
		box-sizing: border-box;

		.cu-form-group {
			width: 95%;
			// height: 500px;
			background: #FFFFFF;
			margin: auto;
			border-radius: 10px;
			margin-top: 10px;
			margin-left: 2.5%;
			margin-bottom: 10px;
			padding: 10px;
			padding-bottom: 30px;
			border: 1px solid #C0C0C0;
			float: left;
		}

		.textstylecelo {
			line-height: 25px;

			.span1 {
				display: block;
				float: left;
				width: 80px;
			}
		}

		.clattab {
			width: 100%;
			position: fixed;
			bottom: -10px;
			text-align: center;
			background-color: #FFFFFF;
			z-index: 99;
			margin-bottom: 0px;
			border-radius: 0;

			button {
				width: 120px;
				height: 40px;
				margin: 20px;
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

			.text2 {
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
	}
</style>