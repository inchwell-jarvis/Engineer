<template>
	<view class="box">

		<u-card v-for="(item, index) in Data" :key="index" :title="item.head" @tap='FunClick(item)'
			title-color='#303133'>
			<view class="" slot="body">
				<text>
					{{item.body}}
				</text>
			</view>
		</u-card>


		<view class="Customer" v-if="State == 'OldParcelBack'">
			<view class="Customer_Top">
				附图
			</view>
			<h5>图1</h5>
			<view class="thisphotos">
				<image src="../../../../static/img/001.png" mode=""></image>
			</view>
			<h5>图2</h5>
			<view class="thisphotos">
				<image src="../../../../static/img/002.png" mode=""></image>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: [],
				State:''
			};
		},
		onBackPress() {
			uni.switchTab({
				url: '../UserManual'
			})
		},
		created() {
			console.log(this.$store.state.DescribeId)
			var State = this.$store.state.DescribeId
			this.State = this.$store.state.DescribeId
			if (State == '') {
				// 未选择   错误进入
			}
			if (State == 'InstallationTasks') {
				// 安装任务
				this.Data = [{
						head: "指派安装任务",
						body: "- - 在安装任务列表页面选择需要派送的任务，点击进入详情页。\n " +
							"- - 点击底部 '工程师选择' 区域，在弹出的工程师列表中选择想要指派的工程师，然后点击确认保存。\n" +
							"- - 此时如果想要修改工程师，重复以上操作，再次点击 '工程师选择' 区域，重新选择工程师即可。\n " +
							"- - 确认无误以后点击 '指派' 按钮 进行指派 ",
					},
					{
						head: "接受/拒绝 安装任务",
						body: "- - 在安装任务列表页面选择想要接受/拒绝的任务，点击进入详情页。\n " +
							"- - 根据需求，点击底部 '接受'/'拒绝' 按钮，按钮完成操作",
					},
					{
						head: "修改任务状态为 '出发' ",
						body: "- - 在安装任务列表页面选择想要操作的任务，点击进入详情页。\n " +
							"- - 点击底部 '出发' 按钮，按钮完成操作",
					},
					{
						head: "修改任务状态为 '到达' ",
						body: "- - 在安装任务列表页面选择想要操作的任务，点击进入详情页。\n " +
							"- - 确认到达目的地后，点击底部 '到达' 按钮，按钮完成操作",
					},
					{
						head: "修改任务状态为 '处理' ",
						body: "- - 在安装任务列表页面选择想要操作的任务，点击进入详情页。\n " +
							"- - 完成任务以后，输入工作内容（必填项），然后点击底部 '处理' 按钮完成操作 ",
					},
					{
						head: "增派工程师",
						body: "- - 在安装任务列表页面，点击右上角图标，进入安装任务历史记录页面\n " +
							"- - 选择想要增派工程师的任务，点击进入详情页， " +
							"点击 '工程师' 区域的 '增派工程师'按钮，在弹出的工程师列表内选择想要增派的工程师， " +
							"点击底部确认按钮进行增派",
					},
				]
			}
			if (State == 'MaintenanceManagement') {
				// 保养管理
				this.Data = [{
						head: "接受/拒绝 保养任务",
						body: "- - 在保养任务列表页面选择想要接受/拒绝的任务，点击进入详情页。\n " +
							"- - 根据需求，点击底部 '接受'/'拒绝' 按钮，按钮完成操作",
					},
					{
						head: "修改任务状态为 '出发' ",
						body: "- - 在保养任务列表页面选择想要操作的任务，点击进入详情页。\n " +
							"- - 点击底部 '出发' 按钮，按钮完成操作",
					},
					{
						head: "修改任务状态为 '到达' ",
						body: "- - 在保养任务列表页面选择想要操作的任务，点击进入详情页。\n " +
							"- - 确认到达目的地后，点击底部 '到达' 按钮，按钮完成操作",
					},
					{
						head: "修改任务状态为 '处理' ",
						body: "- - 在保养任务列表页面选择想要操作的任务，点击进入详情页。\n " +
							"- - 完成任务以后，上传保养设备图片，输入工作内容（必填项），然后点击底部 '完成保养' 按钮完成操作 ",
					},
					{
						head: "增派工程师",
						body: "- - 在保养任务列表页面，点击右上角图标，进入保养任务历史记录页面\n " +
							"- - 选择想要增派工程师的任务，点击进入详情页， " +
							"点击 '工程师' 区域的 '增派工程师按钮'，在弹出的工程师列表内选择想要增派的工程师， " +
							"点击底部确认按钮进行增派",
					},
				]
			}
			if (State == 'RepairPositioning') {
				// 修复定位
				this.Data = [{
						head: "修复手机定位失败",
						body: "- - 如果手机处于wifi状态，请切换至数据网络，随后重启APP",
					},
					{
						head: "授权APP定位",
						body: "- - 如果您没有给予APP定位权限，请点击此卡片前往授权，随后重启APP",
					}
				]
			}

			if (State == 'OldParcelBack') {
				// 旧件寄回
				this.Data = [{
					head: "旧件寄回流程说明",
					body: "- - 1 执行零配件安装任务时，有些旧件需要寄回。\n " +
						"- - 2 在安装任务详细页可以看到零配件是否需要寄回，如图1。\n " +
						"- - 3 当没有任何旧件需要寄回时，则不显示“旧件寄回”按钮。\n " +
						"- - 4 当有旧件需要寄回时，可以点击“旧件寄回”按钮，如图2  \n " +
						"- - 5 在图2中选择确定寄回的旧件并输入物流单号然后确认即可。\n " +
						"- - 6 寄回旧件非强制要求：即使标注了需要寄回旧件，也可以不寄回，不影响处理完成任务。\n "
				}, ]
			}




		},
		methods: {
			FunClick: function(item) {
				if (item.head == '授权APP定位') {
					// #ifdef APP-PLUS
					uni.getSystemInfo({
						success(res) {
							if (res.platform == 'ios') { //IOS
								plus.runtime.openURL("app-settings://");
							} else if (res.platform == 'android') { //安卓
								let main = plus.android.runtimeMainActivity();
								let Intent = plus.android.importClass("android.content.Intent");
								let mIntent = new Intent('android.settings.ACTION_SETTINGS');
								main.startActivity(mIntent);
							}
						}
					});
					// #endif
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #f4f4f4;
		box-sizing: border-box;

		.u-card__head {
			margin: -5px;
		}

		.Customer {
			width: 100%;
			background-color: #FFFFFF;
			margin-top: 20px;
			
			h5{
				line-height: 20px;
				text-align: center;
				color: #007AFF;
			}

			.thisphotos {
				//图片外框
				width: 100%;
				background-color: #f4f4f4;
				height: 750px;

				image {
					width: 80%;
					height: 100%;
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
</style>
