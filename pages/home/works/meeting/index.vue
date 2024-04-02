<template>
	<view class="box_2232">
		<u-card
			v-for="(item, index) in data"
			:key="index"
			:title="item.StateStr + '(' + (item.CurrentJoin ? '已加入' : '未加入') + ')'"
			box-shadow="2px 3px 4px #c1c1c1"
			:sub-title="item.CreateDate.split('T')[0]"
			sub-title-color="#5b8eff"
			@tap="click_item(item)"
		>
			<view class="" slot="body">
				<view class="textCode">
					<p>( {{ item.Joiner.split(',').length }} 人) {{ item.Joiner }}</p>
				</view>
			</view>
		</u-card>
		<u-empty v-if="!data[0]" text="暂无" mode="message"></u-empty>

		<!-- 模态框 -->
		<u-modal
			v-model="show"
			:content="content"
			:show-confirm-button="true"
			:show-cancel-button="true"
			confirm-text="创建"
			cancel-text="取消"
			confirm-color="#19be6b"
			@confirm="create_meeting()"
		></u-modal>

		<!-- 消息提示 -->
		<u-toast ref="uToast" />
	</view>
</template>
<script>
export default {
	data() {
		return {
			data: [],
			show: false,
			content: '',
			retrieval:{
				Id: '',
				joiner: '', // 与会人
				creater: '', // 创建人
				pageNum: 1,
				numPerPage: 20,
				orderField: '',
				orderDirection: '',
				begin: '',
				end: '',
				from: 1
			}
		};
	},
	onBackPress() {
		uni.switchTab({
			url: '../../home'
		});
		return true;
	},
	onShow() {
		this.start();
	},
	onNavigationBarButtonTap: function (e) {
		if (e.text == '创建') {
			this.content = '确认要创建员工见面会吗？';
			this.show = true;
		}
	},
	onReachBottom: function(e) {
		this.retrieval.pageNum += 1
		this.start()
	},
	methods: {
		// 获取列表
		start: function () {
			this.API_GET('PCenter/GetEmployeeMeetings', this.retrieval).then((rv) => {
				this.data[0] ? this.data = this.data.concat(rv.Data.Dtos) : this.data = rv.Data.Dtos
			});
		},
		// 创建会议
		async create_meeting() {
			let IP = await this.getLocation();
			console.log(IP);
			this.API_POST('PCenter/AddEmployeeMeeting', { Coordinate: IP.longitude + ',' + IP.latitude }).then((rv) => {
				this.$refs.uToast.show({
					title: '创建成功！',
					type: 'success'
				});
				this.start();
			});
		},
		// 点击见面会
		click_item(item) {
			console.log(item);
			uni.navigateTo({
				url: './edit?id=' + item.ID
			});
		}
	}
};
</script>

<style scoped lang="scss">
.box_2232 {
	width: 100%;
	background: #ffffff;
	overflow: auto;

	.div {
		width: 95%;
		height: 90px;
		margin-left: 5%;
		padding: 10px;
		display: block;
		border-bottom: 1px solid #d4d4d4;
		box-sizing: border-box;

		text {
			display: block;
			font-size: 15px;
		}

		.text1 {
			font-weight: bold;
			height: 30px;
			line-height: 30px;
			overflow: hidden;
		}

		.text2 {
			font-size: 15px;
			line-height: 25px;
		}

		.text3 {
			font-size: 13px;
			line-height: 20px;
		}

		button {
			float: right;
		}
	}
}
</style>
