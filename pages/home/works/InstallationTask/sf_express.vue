<template>
	<view class="uni_page">
		<!--  -->
		<page-navigation :border_bottom='true' title="物流进度"></page-navigation>
		<!--  -->
		<div class="uni_content">
			<u-time-line>
				<u-time-line-item v-for="(item,index) in routes" :key="index">
					<!-- 左侧图标 -->
					<template v-slot:node v-if="index == 0">
						<view class="u-node" style="background: #19be6b;">
							<!-- 此处为uView的icon组件 -->
							<u-icon name="pushpin-fill" color="#fff" :size="24"></u-icon>
						</view>
					</template>
					<!-- 信息 与 时间 -->
					<template v-slot:content>
						<view>
							<view v-if="index == 0" class="u-order-title">{{item.firstStatusName}}</view>
							<view v-else class="u-order-title_false">{{item.firstStatusName}}</view>
							<view class="u-order-desc">{{item.remark}}</view>
							<view class="u-order-time" v-if="item.acceptTime">{{ format_date_time(item.acceptTime) }}</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sf_express: '',
				routes: []
			};
		},
		onLoad(data) {
			this.sf_express = data.sf_express
			this.start()
		},
		methods: {
			start() {
				//
				this.API_GET('system/GetSFWuLiu', { logisticsorderNo: this.sf_express }).then((rv) => {
					console.log(rv)

					this.routes = rv.Data[0].routes
					if (this.routes.length) {
						this.routes = this.routes.reverse().map((item, index, array) => {
							if (index > 0 && item.firstStatusName === array[index - 1].firstStatusName) {
								return { ...item, firstStatusName: "" };
							}
							return item;
						});
					}
					console.log(this.routes)
					// 如果没有发货
					if (this.routes.length == 0) {
						this.routes = [{
							firstStatusName: '未发货',
							remark: '未查询相关物流信息！'
						}]
					}
				});
			},

			format_date_time(dateTimeStr) {
				const date = new Date(dateTimeStr);
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				const hours = date.getHours().toString().padStart(2, '0');
				const minutes = date.getMinutes().toString().padStart(2, '0');

				return `${year}-${month}-${day} ${hours}:${minutes}`;
			}

		}
	}
</script>

<style>
	page {
		background: #F5F6FA;
	}
</style>

<style lang="scss" scoped>
	.uni_page {
		width: 100%;
		height: 100%;

		.uni_content {
			width: 100%;
			height: calc(100% - (var(--status-bar-height) + 44px));
			padding: 20px 20px 0;
			box-sizing: border-box;
			background-color: #fff;
			overflow: auto;
		}
	}
</style>

<style lang="scss" scoped>
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.u-order-title_false {
		color: rgb(150, 150, 150);
		font-weight: bold;
		font-size: 32rpx;
	}

	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>