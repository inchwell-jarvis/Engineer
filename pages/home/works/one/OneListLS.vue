<template>
	<view class="work_order_history">
		<u-search class="search" placeholder="客户名称、单号" v-model="search" @change="init()"></u-search>
		<view style="width: 100%; height: 40px"></view>

		<view class="hezi" v-for="(item, index) in data" :key="index" @tap="ClickGongDan(item)">
			<view class="left">
				<view class="text1">{{ item.CustomerName }}</view>
				<view class="text3">{{ item.WorkOrderCode }}</view>
				<view class="text4">{{ item.OrderTypeStr }}</view>
				<view class="text3">{{ item.CreateDate }}</view>
				<view class="text4">{{ item.StatusStr }}</view>
			</view>
			<view class="right"></view>
		</view>

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
			search: '',
			data: [],

			search_data: {
				pageNum: 1,
				numPerPage: '',
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
		uni.navigateTo({
			url: '../work.1'
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
	methods: {
		// 初始化
		start: function () {
			// 加载时设置状态false
			this.loading = false;
			this.status = 'loading';
			var obj = {
				url: this.$store.state.url + 'WO/GetWOsFArea',
				method: 'GET',
				header: this.$store.state.token,
				data: this.search_data
			};
			this.$http(obj).then((res) => {
				this.data = this.data.concat(res.Data.Dtos);

				this.loading = true;
				this.DataBars = res.Data.DataBars;
				this.status = 'loadmore';

				if (this.data.length >= this.DataBars) {
					this.status = 'nomore';
				}

				console.log(this.data);
			});
		},
		// 前往  增派工程师页面
		ClickGongDan: function (item) {
			this.$store.state.codeurlid = item;
			uni.navigateTo({
				url: './OneAddGcs'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.work_order_history {
	width: 100%;

	.no_data_available {
		position: fixed;
		width: 100%;
		height: 100%;
	}

	.search {
		width: 100%;
		position: fixed;
		top: 30;
		left: 0;
		z-index: 100;
		background-color: #f6f6f6;
	}
	.hezi {
		width: 97%;
		height: 80px;
		background: #ffffff;
		margin: auto;
		border-radius: 10px;
		margin-top: 5px;
		padding: 5px;
		box-sizing: border-box;

		-webkit-box-shadow: 3px 3px 6px #c1c1c1;
		-moz-box-shadow: 3px 3px 6px #c1c1c1;
		box-shadow: 3px 3px 6px #c1c1c1;

		.left {
			width: 75%;
			height: 100%;
			float: left;
			padding-right: 20px;
			box-sizing: border-box;

			text {
				display: block;
			}

			.text1 {
				width: 100%;
				height: 30px;
				line-height: 30px;
				font-weight: bold;
				overflow: hidden;
			}

			.text2 {
				font-size: 12px;
				height: 20px;
				line-height: 20px;
			}

			.text3 {
				float: left;
			}

			.text4 {
				float: right;
			}
		}

		.right {
			width: 25%;
			height: 100%;
			float: left;

			button {
				width: 50px;
				display: block;
				margin: auto;
				margin-top: 20px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				padding: 0;
			}
		}
	}
}
</style>
