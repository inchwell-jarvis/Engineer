<template>
	<view class="installation_list">
		<u-navbar title="安装管理">
			<view class="slot-wrap" style="width: 100%; height: 100%; text-align: right; padding-right: 20rpx; box-sizing: border-box; color: #5b5b5b; font-size: 22px">
				<u-icon name="clock" @tap="view_history()"></u-icon>
			</view>
		</u-navbar>

		<view v-for="(item, index) in data" class="item" :key="index" @click="Assign(item)" :style="[{ background: item.DataType == 2 ? '#fbffb5' : '#fff' }]">
			<view class="title">
				{{ item.CusFullName }}
			</view>
			<view class="bottom">
				<text class="OrderCode">{{ item.OrderCode }}</text>
				<text>{{ item.CreateDate }}</text>
			</view>
			<view class="bottom">
				<text class="OrderCode">{{ item.TypeStr }}</text>

				<text style="color: #333333; font-size: 13px; margin-left: 5px">{{ item.StateStr }}</text>
				<button v-if="item.State == 2 && item.DataType == 1" type="primary" size="mini" @click="Assign(item)">指派</button>

				<button v-if="item.State == 3 && item.DataType == 2" type="primary" size="mini" @click="Assign(item)">接受</button>

				<button v-if="item.State == 4 && item.DataType == 2" type="primary" size="mini" @click="Assign(item)">出发</button>

				<button v-if="item.State == 5 && item.DataType == 2" type="primary" size="mini" @click="Assign(item)">查看</button>

				<button v-if="item.State == 6 && item.DataType == 2" type="primary" size="mini" @click="Assign(item)">到达</button>

				<button v-if="item.State == 7 && item.DataType == 2" type="primary" size="mini" @click="Assign(item)">处理</button>

				<button v-if="item.State == 8 && item.DataType == 2" type="primary" size="mini" @click="Assign(item)">查看</button>
			</view>
		</view>

		<!-- 无数据 -->
		<view v-if="data.length == 0" class="no_data_available">
			<u-empty text="附近暂无安装任务" mode="data"></u-empty>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			data: [],

			search_data: {
				search: '', //检索项
				begin: '', //开始时间
				end: '', //结束时间
				type: -1
			},

			// 正在加载数据
			loading: true,
			DataBars: 0 //总数据量
		};
	},
	onBackPress() {
		//自定义返回逻辑
		uni.switchTab({
			url: '../home'
		});
		return true;
	},
	created() {
		this.start();
	},

	methods: {
		start(res) {
			this.apix('WO/GetEquInstallOrdersForapp', this.search_data).then((res) => {
				console.log(res);
				this.data = res.Data.Dtos;
				for (var index = 0; index < this.data.length; index++) {
					this.data[index].CreateDate = this.time_filtering(this.data[index].CreateDate);
				}
			});
		},

		view_history() {
			uni.navigateTo({
				url: './woke6/woke6'
			});
		},

		//时间过滤
		time_filtering: function (res) {
			if (res == null || res == '') {
				return ' - - ';
			} else {
				return res.split('T')[0];
			}
		},
		// 点击指派按钮
		Assign: function (item) {
			console.log(item);
			this.$store.state.InstallationTaskres = item.ID;
			this.$store.state.InstallationTaskresIndex = item.DataType;
			uni.navigateTo({
				url: '/pages/home/works/InstallationTask/InstallationTask'
			});
		}
	}
};
</script>

<style scoped lang="scss">
.installation_list {
	width: 100%;

	.no_data_available {
		position: fixed;
		width: 100%;
		height: 100%;
	}

	.item {
		width: 100%;
		height: 100px;
		border-top: 1px solid #e3e3e3;
		border-radius: 5px;
		box-sizing: border-box;
		background-color: #fdfdfd;

		.title {
			width: 100%;
			height: 40px;
			font-weight: bolder;
			color: #000000;
			padding-left: 20px;
			padding-top: 10px;
			box-sizing: border-box;
		}

		.bottom {
			width: 100%;
			height: 30px;
			padding-left: 20px;
			padding-right: 20px;
			box-sizing: border-box;

			text {
				color: #b8b8b8;
				line-height: 30px;
			}
			.OrderCode {
				margin-right: 10px;
				color: #555555;
			}

			button {
				float: right;
			}
		}
	}
}
</style>
