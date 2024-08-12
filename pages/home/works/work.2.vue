<template>
	<view class="order_list">
		<u-card v-for="(item, index) in data" :key="index" @tap="order(item)" :title="item.SOCode" :sub-title="item.CreateDateStr">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<view class="u-body-item-title u-line-2" style="color: #2979ff">{{ item.CusName }}</view>
				</view>
			</view>
			<view class="" slot="foot">
				<u-icon name="coupon-fill" size="34" color="#fcbd71" :label="item.StateStr"></u-icon>
			</view>
		</u-card>

		<!-- 无数据 -->
		<view v-if="data.length == 0" class="no_data_available">
			<u-empty text="暂无需要购买的配件" mode="data"></u-empty>
		</view>

		<!-- 已加载全部数据 -->
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>
<script>
export default {
	data() {
		return {
			data: [],

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
		//自定义返回逻辑
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
	methods: {
		start() {
			// 加载时设置状态false
			this.loading = false;
			this.status = 'loading';
			var obj = {
				url: this.$store.state.url + '/SO/GetSOs',
				method: 'GET',
				header: this.$store.state.token,
				data: {
					pageNum: '1',
					numPerPage: this.numPerPage,
					orderField: '',
					orderDirection: '',
					search: ''
				}
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
			});
		},
		//
		order(item) {
			this.$store.state.SOId = item.SOId;
			uni.navigateTo({
				url: './Order/Order'
			});
		}
	}
};
</script>

<style scoped lang="scss">
.order_list {
	width: 100%;

	.no_data_available {
		position: fixed;
		width: 100%;
		height: 100%;
	}

	.boxx {
		width: 100%;
		height: 70px;
		border-bottom: 3px solid #c0c0c0;
		padding: 10px;
		box-sizing: border-box;
		background: #ffffff;
		border-radius: 10px;
		margin-top: 5px;

		view {
			height: 50%;
			float: left;
			line-height: 35px;
			box-sizing: border-box;
		}
		.text1,
		.text2 {
			padding-bottom: 10px;
			box-sizing: border-box;
		}
		.text3,
		.text4 {
			padding-top: 5px;
			box-sizing: border-box;
		}
		.text1 {
			width: 80%;
			font-weight: bold;
			overflow: hidden;
		}
		.text2 {
			width: 20%;
		}
		.text2,
		.text4 {
			text {
				float: right;
			}
		}
		.text3 {
			width: 50%;
			display: block;
			float: left;
		}
		.text4 {
			width: 50%;
		}
	}
}
</style>
