<template>
	<view class="view1_content">
		<!-- <hx-navbar :config="config" @clickBtn="rightCion"></hx-navbar> -->
		<u-navbar title="工单管理">
			<view class="slot-wrap" style="width: 100%; height: 100%; text-align: right; padding-right: 20rpx; box-sizing: border-box; color: #5b5b5b; font-size: 22px">
				<u-icon name="clock" @tap="view_history()"></u-icon>
			</view>
		</u-navbar>

		<!--  -->
		<u-card v-for="(item, index) in data" :key="index" :title="item.CustomerName" @tap="asdurl(item)" :head-style="headStyle" :body-style="{ padding: '10px 10px' }" box-shadow="2px 3px 4px #c1c1c1" :sub-title="item.TextState" sub-title-color="#5b8eff" class="ZTstate">
			<view class="" slot="body">
				<view class="textCode">
					<p>{{ item.StatusStr + ' - ' + item.WorkOrderCode }}</p>
					<p style="line-height: 30px; text-align: right">{{ item.CreateDate }}</p>
				</view>
			</view>
		</u-card>

		<!-- 已加载全部数据 -->
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />

		<!-- 无数据 -->
		<view v-if="data.length == 0" class="no_data_available">
			<u-empty text="暂无维修任务" mode="data"></u-empty>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			data: [],

			// 卡片头部样式
			headStyle: {
				padding: '10px 5px',
				'font-weight': 'bold'
			},

			// 检索信息
			search_data: {
				pageNum: 1,
				numPerPage: 20,
				orderField: '',
				orderDirection: '',
				search: ''
			},

			// 正在加载数据
			loading: true,
			DataBars: 0, //总数据量

			// 上拉加载提示
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '已加载全部数据'
			}
		};
	},
	onBackPress() {
		uni.switchTab({
			url: '../home'
		});
		return true;
	},
	created() {
		this.start();
	},
	onReachBottom() {
		console.log('加载更多');
		if (this.loading) {
			if (this.data.length < this.DataBars) {
				this.search_data.pageNum += 1;
				this.start();
			} else {
				console.log('已加载全部数据！');
			}
		}
	},
	mounted() {},
	methods: {
		// 判断是否加载完了

		start() {
			// 加载时设置状态false
			this.loading = false;
			this.status = 'loading';
			var obj = {
				url: this.$store.state.url + 'WO/GetWOsFE',
				method: 'GET',
				header: this.$store.state.token,
				data: this.search_data
			};
			this.$http(obj).then((res) => {
				console.log(res);
				this.data = this.data.concat(res.Data.Dtos);
				this.loading = true;
				this.DataBars = res.Data.DataBars;
				this.status = 'loadmore';

				if (this.data.length >= this.DataBars) {
					this.status = 'nomore';
				}
				for (var i = 0; i < this.data.length; i++) {
					var item = this.data[i];
					if (item.Status == 6) {
						item.TextState = '指派';
					}
					if (item.Status == 7 || item.Status == 25) {
						item.TextState = '接受';
					}
					if (item.Status == 8) {
						item.TextState = '出发';
					}
					if (item.Status == 47) {
						item.TextState = '到达';
					}
					if (item.Status == 48 || item.Status == 26) {
						item.TextState = '处理';
					}
				}
			});
		},
		// 查看历史记录
		view_history: function () {
			uni.navigateTo({
				url: '/pages/home/works/one/OneListLS'
			});
		},
		// 操作当前工单
		asdurl(item) {
			this.$store.state.codeurlid = item;
			if (item.Status == 6) {
				this.$store.state.codeurlids = 1;
			}
			if (item.Status == 7 || item.Status == 25) {
				this.$store.state.codeurlids = 2;
			}
			if (item.Status == 8) {
				this.$store.state.codeurlids = 3;
			}
			if (item.Status == 47) {
				this.$store.state.codeurlids = 4;
			}
			if (item.Status == 48 || item.Status == 26) {
				this.$store.state.codeurlids = 5;
			}
			uni.navigateTo({
				url: '/pages/home/works/one/one'
			});
		}
	}
};
</script>

<style scoped lang="scss">
.view1_content {
	width: 100%;

	.no_data_available {
		position: fixed;
		width: 100%;
		height: 100%;
	}

	.navigation_bar {
		width: 100%;
		height: 100%;
		background: #000;
	}

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
