<template>
	<view class="box" v-if="data.CreateDate">
		<!-- 基础信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				基础信息
				<u-button v-if="data.State == 2 && data.IsCreater" type="error" size="mini" style="float: right; margin-right: 10px" @tap="operation_close_meeting(true)">
					结束见面会
				</u-button>
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">创建时间</view>
				<view class="Mini_list_right">
					{{ data.CreateDate.split('T')[0] }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">坐标</view>
				<view class="Mini_list_right">
					{{ data.Coordinate || ' - - ' }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">人数</view>
				<view class="Mini_list_right">
					{{ data.Joiner ? data.Joiner.split(',').length : ' - - ' }}
				</view>
			</view>
			<view class="Mini_list2">
				<view class="Mini_list_left">参会人</view>
				<view class="Mini_list_right">
					{{ data.Joiner || ' - - ' }}
				</view>
			</view>
			<!-- <view class="Mini_list">
				<view class="Mini_list_left">城市</view>
				<view class="Mini_list_right">
					{{ data.City || ' - - ' }}
				</view>
			</view> -->
			<view class="Mini_list">
				<view class="Mini_list_left">状态</view>
				<view class="Mini_list_right">
					{{ data.StateStr || ' - - ' }}
				</view>
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">开启时间</view>
				<view class="Mini_list_right">
					{{ data.BeginDt || ' - - ' }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">结束时间</view>
				<view class="Mini_list_right">
					{{ data.EndDt || ' - - ' }}
				</view>
			</view>
		</view>

		<!-- 保存 -->
		<view class="Customer" v-if="data.State > 1 && data.CurrentJoin">
			<view class="Customer_Top">
				收获
				<u-button v-if="item.bool" type="primary" size="mini" style="float: right; margin-right: 10px" @tap="operation_save_meeting(true)">保存</u-button>
			</view>

			<view style="padding-left: 20px; box-sizing: border-box">
				<!-- 心得/收获 -->
				<!-- 当前状态为进行中 且 自己参与了 -->
				<view class="Customer_Top" style="border: none; color: #82848a">心得</view>

				<view style="padding: 0 10px; box-sizing: border-box" v-if="item.bool">
					<u-input v-model="item.Experience" type="textarea" :border="true" :height="100" :auto-height="true" :maxlength="999" placeholder="请输入心得" />
				</view>

				<view style="padding: 0 20px; box-sizing: border-box" v-else>
					<pre>{{ item.Experience }}</pre>
				</view>

				<!-- 建议 -->
				<!-- 当前状态为进行中 且 自己参与了 -->
				<view class="Customer_Top" style="border: none; color: #82848a">建议</view>

				<view style="padding: 0 10px; box-sizing: border-box" v-if="item.bool">
					<u-input v-model="item.Proposal" type="textarea" :border="true" :height="100" :auto-height="true" :maxlength="999" placeholder="请输入建议" />
				</view>

				<view style="padding: 0 20px; box-sizing: border-box" v-else>
					<pre>{{ item.Proposal }}</pre>
				</view>
			</view>
		</view>

		<!-- 管理员保存后展示所有人的数据 -->
		<!-- 成员保存后展示自己的数据 -->
		<view class="Customer" v-if="other_item.length != 0">
			<view class="Customer_Top">其他参与人</view>

			<view style="width: 90%; float: right; min-height: 50px; margin-top: 20px; box-sizing: border-box" v-for="(item, index) in other_item" :key="index">
				<view style="width: 100%; height: 30px; line-height: 30px; color: #82848a; font-weight: bold">
					<view style="width: 120px; float: left">
						参会人：
						<span style="color: #2979ff">{{ item.Creater }}</span>
					</view>
					<!-- <span>状态：{{ item.BelongCurrent ? '未保存' : '已保存' }}</span> -->
				</view>
				<view style="width: 100%">
					<view class="Customer_Top" style="border: none; color: #82848a">心得</view>
					<view style="padding: 0 20px; box-sizing: border-box" v-html="item.Experience"></view>
					<view class="Customer_Top" style="border: none; color: #82848a">建议</view>
					<view style="padding: 0 20px; box-sizing: border-box" v-html="item.Proposal"></view>
				</view>
			</view>
		</view>

		<!-- 开启 或者 删除 -->
		<!-- 当前状态为临时创建 且 自己就是创建人 即可开始或者删除 -->
		<view class="Customer" v-if="data.StateStr === '临时创建' && data.IsCreater">
			<view class="Customer_Top">操作</view>

			<view style="width: 100%; display: flex; justify-content: space-evenly; padding: 20px 0">
				<u-button type="error" size="medium" @tap="operation_meeting(false)">删除见面会</u-button>
				<u-button type="primary" size="medium" @tap="operation_meeting(true)">开启见面会</u-button>
			</view>
		</view>

		<!-- 加入见面会 -->
		<!-- 当前状态为进行中 且 自己没加入 即可加入 -->
		<view class="Customer" v-if="data.StateStr === '进行中' && !data.CurrentJoin">
			<view class="Customer_Top">操作</view>

			<view style="width: 100%; display: flex; justify-content: space-evenly; padding: 20px 0">
				<u-button type="primary" size="medium" @tap="operation_join_meeting(true)">加入见面会</u-button>
			</view>
		</view>

		<!-- 空白框 -->
		<view style="width: 100%; height: 50px; float: left"></view>

		<!-- 模态框 -->
		<u-modal
			v-model="show"
			:content="content"
			:show-confirm-button="true"
			:show-cancel-button="true"
			confirm-text="确定"
			cancel-text="取消"
			confirm-color="#2979ff"
			@confirm="confirm()"
		></u-modal>

		<!-- 消息提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			Id: '',
			data: {},

			show: false, // 是否显示二级弹窗
			content: '', // 弹窗内容
			api_url: '', // 弹窗下一步

			item: {
				Experience: '', //心得/收获
				Proposal: '' //建议
			},

			// 其他人的内容
			other_item: [],

			confirm_url: 0
		};
	},
	onLoad: function (option) {
		// 记录
		this.Id = option.id;
		// 获取详情
		this.start();
	},
	methods: {
		// 获取列表
		start: function () {
			let data = {
				Id: this.Id,
				joiner: '', // 与会人
				creater: '', // 创建人
				pageNum: 1,
				numPerPage: 999,
				orderField: '',
				orderDirection: '',
				begin: '',
				end: '',
				from: 1
			};
			this.API_GET('PCenter/GetEmployeeMeetings', data).then((rv) => {
				this.data = rv.Data.Dtos[0];
				this.other_item = []
				// 从 EmployeeMeetingDetailDtos 中找到自己信息
				this.data.EmployeeMeetingDetailDtos.forEach((rv) => {
					if (rv.BelongCurrent) {
						this.item = JSON.parse(JSON.stringify(rv));
						console.log(this.item);
						// 判断是否输入了
						this.$set(this.item, 'bool', !this.item.Experience ? true : false);
					} else {
						this.other_item.push(JSON.parse(JSON.stringify(rv)));
					}
				});
			});
		},
		// 操作
		operation_meeting(bool) {
			this.confirm_url = 1;
			this.content = bool ? '你确定要开启见面会吗？' : '你确定要删除见面会吗？';
			this.api_url = bool ? 'PCenter/DoEmployeeMeeting' : 'PCenter/DelEmployeeMeeting';
			this.show = true;
		},
		//
		confirm() {
			if (this.confirm_url == 1) {
				this.edit_meeting();
			}
			if (this.confirm_url == 2) {
				this.save_meeting();
			}
			if (this.confirm_url == 3) {
				this.join_meeting();
			}
			if (this.confirm_url == 4) {
				this.close_meeting();
			}
		},
		//
		async edit_meeting() {
			let IP = await this.getLocation();
			console.log(IP);

			this.API_POST(this.api_url, { Id: this.Id, str: IP.longitude + ',' + IP.latitude }).then((rv) => {
				this.$refs.uToast.show({
					title: '操作成功！',
					type: 'success'
				});

				if (this.api_url == 'PCenter/DelEmployeeMeeting') {
					uni.navigateTo({
						url: './index'
					});
				} else {
					this.start();
				}
			});
		},

		// 操作
		operation_save_meeting() {
			console.log(this.item);
			if (!this.item.Experience) {
				return this.$refs.uToast.show({
					title: '请输入心得！',
					type: 'warning'
				});
			}
			if (!this.item.Proposal) {
				return this.$refs.uToast.show({
					title: '请输入建议！',
					type: 'warning'
				});
			}

			this.confirm_url = 2;
			this.content = '保存后无法更改，是否继续 ？';
			this.show = true;
		},
		// 保存见面会
		save_meeting() {
			this.API_POST('PCenter/SaveEmployeeMeeting', { Id: this.data.EmployeeMeetingDetailDtos[0].ID, Experience: this.item.Experience, Proposal: this.item.Proposal }).then(
				(rv) => {
					this.$refs.uToast.show({
						title: '保存成功！',
						type: 'success'
					});

					this.start();
				}
			);
		},

		// 加入见面会
		operation_join_meeting() {
			this.confirm_url = 3;
			this.content = '加入当前见面会，是否继续 ？';
			this.show = true;
		},
		// join_meeting
		async join_meeting() {
			let IP = await this.getLocation();
			console.log(IP);

			this.API_POST('PCenter/JoinEmployeeMeeting', { ID: this.data.ID, str: IP.longitude + ',' + IP.latitude }).then((rv) => {
				this.$refs.uToast.show({
					title: '已加入！',
					type: 'success'
				});

				this.start();
			});
		},

		// 结束见面会
		operation_close_meeting() {
			this.confirm_url = 4;
			this.content = '结束当前见面会，是否继续 ？';
			this.show = true;
		},
		close_meeting() {
			this.API_POST('PCenter/CloseEmployeeMeeting', { ID: this.data.ID }).then((rv) => {
				this.$refs.uToast.show({
					title: '已结束！',
					type: 'success'
				});

				uni.navigateTo({
					url: './index'
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.box {
	width: 100%;
	height: 100%;
	overflow: auto;

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
		
		.Mini_list2 {
			width: 100%;
			min-height: 30px;
			line-height: 30px;
			padding-left: 20px;
			box-sizing: border-box;
		
			.Mini_list_left {
				width: 25%;
				height: 30px;
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
