<template>
	<view class="order_list">
		<u-navbar title="租车任务列表" :border-bottom="false">
			<view class="slot-wrap"><u-icon name="reload" size="40" color="#606060"></u-icon></view>
		</u-navbar>
		<!-- tab -->
		<u-tabs-swiper ref="uTabs" :list="list" :is-scroll="false" @change="tabsChange" :current="current"></u-tabs-swiper>
		<!-- 列表 -->
		<div class="order_list_content">
			<swiper :current="current" @animationfinish="animationfinish" style="width: 100%; height: 100%">
				<swiper-item class="swiper-item" v-for="(list_item, list_index) in list" :key="list_index">
					<scroll-view scroll-y class="scroll_id" @scrolltolower="onreachBottom">
						<!-- 卡片 -->
						<view class="order_item" v-for="(item, index) in list_item.state == 0 ? data : data.filter((item) => item.State === list_item.state)" :key="index" @tap="view_details(item)">
							<!-- 车辆信息 -->
							<div class="vehicle_information">
								<div class="vehicle_information_left">
									<div class="car_title">
										<span class="car_title_type">{{ item.CarType }}</span>
										<span class="car_title_state car_title_state_1" v-if="item.StateStr == '待确认'">{{ item.StateStr }}</span>
										<span class="car_title_state car_title_state_2" v-if="item.StateStr == '待支付'">{{ item.StateStr }}</span>
										<span class="car_title_state car_title_state_3" v-if="item.StateStr == '待取车' || item.StateStr == '待还车'">{{ item.StateStr }}</span>
										<span class="car_title_state car_title_state_4" v-if="item.StateStr == '已完成' || item.StateStr == '已取消' || item.StateStr == '已还车' || item.StateStr == '已退款' || item.StateStr == '退款中'">{{ item.StateStr }}</span>
									</div>
									<div class="car_features">
										<span class="Plate">{{ item.Plate }}</span>
										<span class="features">{{ item.Feature }}</span>
									</div>
								</div>
								<div class="vehicle_information_right">
									<div class="amount_of_money">￥{{ item.TotalFee.toFixed(2) }}</div>
									<div class="state">{{ item.PayStateStr }}</div>
								</div>
							</div>

							<!-- 时间信息 -->
							<div class="time_information">
								<div class="time_information_text">下单时间：{{ item.CreateDate }}</div>
								<!-- 开始时间与结束时间地点 -->
								<div class="time_information_text">
									<div class="left_icon">
										<span class="start"></span>
									</div>
									取车：{{ item.RentalFrom + ' ' + item.PickUpTheCarAddress }}
								</div>
								<div class="time_information_text">
									<div class="left_icon">
										<span class="end"></span>
									</div>
									还车：{{ item.RentalTo + ' ' + item.PickUpTheCarAddress }}
								</div>
							</div>
							<!-- 操作区 -->
							<div class="operation">
								<div class="operation_left">更多</div>
								<div class="operation_right">
									<span class="span_but span_err" @tap.stop="contact_customer_service()">
										<u-icon name="phone-fill" color="#181c26" size="28" style="margin-right: 4px"></u-icon>
										联系客服
									</span>
								</div>
							</div>
						</view>
						<!-- 如果没有卡片 -->
						<view class="no_card" v-if="(list_item.state != 0 || data.length == 0) && data.filter((item) => item.State === list_item.state).length == 0">
							<u-image width="140px" height="140px" src="../../static/car_rental/no_task.png"></u-image>
							<p>暂时没有任务了~</p>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			list: [
				{
					name: '全部',
					state: 0
				},
				{
					name: '待分配',
					state: 1
				},
				{
					name: '待接受',
					state: 2
				},
				{
					name: '待取送',
					state: 3
				}
			],
			data: []
			// 未启动
			// Waiting = 1,

			// 启动送车
			// StartCarDelivery = 2,

			// 接受送车任务
			// AcceptedA = 3,

			// 车辆已送达
			// Deliveried = 4,

			// 启动取车
			// StartPickUpTheCar = 5,

			// 接受取车任务
			// AcceptedB = 6,

			// 车辆已取到
			// Received = 7,

			// 车辆已归位
			// ReturnedToPosition = 8,

			// 已取消
			// Cancelled = 9,
		};
	},
	onShow() {
		this.start();
	},

	methods: {
		// tabs 通知 swiper 切换
		tabsChange(index) {
			this.current = index;
		},
		// swiper 通知 tabs 切换
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		// scroll-view 到底部加载更多
		onreachBottom() {
			console.log('加载更多···');
		},
		//
		start() {
			let data = { pageNum: 1, numPerPage: 999, orderField: '', orderDirection: '', cusName: '', plate: '', waitDo: -1, state: -1, Id: '', cusId: '' };
			this.apix('CarRental/GetCarSOOrders', data).then((rv) => {
				console.log(rv.Data.Dtos);
			});
		},
		// view_details
		view_details(row) {
			// 判断是不是需要确认的订单
			if (row.State == 1) {
				uni.navigateTo({
					url: `./order_confirm?id=${row.ID}`
				});
			} else {
				uni.navigateTo({
					url: `./order_details?id=${row.ID}&str=list`
				});
			}
		},
		// 联系客服
		contact_customer_service() {
			console.log('联系客服！');
		}
	}
};
</script>

<style lang="scss">
.order_list {
	width: 100%;
	height: 100%;
	box-sizing: border-box;

	.slot-wrap {
		width: 100%;
		height: 100%;
		// background: #ccc;
		text-align: right;
		padding-right: 40rpx;
		box-sizing: border-box;
	}

	.order_list_content {
		width: 100%;
		height: calc(100% - 240rpx);

		.scroll_id {
			width: 100%;
			height: 100%;

			.no_card {
				width: 100%;
				height: 500px;
				display: flex;
				flex-direction: column; /* 设置主轴方向为垂直方向 */
				justify-content: center; /* 垂直居中对齐 */
				align-items: center; /* 水平居中对齐 */
			}

			.order_item {
				width: calc(100% - 40rpx);
				min-height: 100px;
				border-radius: 12px;
				margin: 20rpx auto;
				background-color: #fff;
				padding: 0 15px;
				box-sizing: border-box;
				.vehicle_information {
					width: 100%;
					height: 70px;
					// background: #55ff7f;
					padding: 12px 0 0 0px;
					box-sizing: border-box;
					.vehicle_information_left {
						width: 75%;
						height: 100%;
						// background-color: #aae2ff;
						float: left;
						.car_title {
							width: 100%;
							height: 26px;
							.car_title_type {
								font-size: 18px;
								font-weight: bold;
								line-height: 26px;
								color: #181c26;
								line-height: 26px;
							}
							.car_title_state {
								min-width: 10px;
								height: 18px;
								border-radius: 2px;
								text-align: center;
								line-height: 18px;
								font-size: 12px;
								display: inline-block; /* 更改为 inline-block */
								padding: 0 4px; /* 可选：添加内边距使内容有一定的间距 */
								margin: 2px 10px;
							}

							.car_title_state_1 {
								color: #1f61d0;
								background: #2e7bfd1a;
							}

							.car_title_state_2 {
								color: #dd1f12;
								background: #f041351a;
							}

							.car_title_state_3 {
								color: #cd6700;
								background: #f1a22b1a;
							}

							.car_title_state_4 {
								color: #181c2673;
								background: #f5f6fa;
							}
						}
						.car_features {
							width: 100%;
							height: 22px;
							margin-top: 4px;
							white-space: nowrap; /* 文本不换行 */
							overflow: hidden; /* 超出部分隐藏 */
							text-overflow: ellipsis; /* 超出部分显示为省略号 */

							.Plate {
								min-width: 10px;
								height: 20px;
								background: #2e7bfd;
								border-radius: 3px;
								text-align: center;
								line-height: 20px;
								font-size: 11px;
								display: inline-block; /* 更改为 inline-block */
								padding: 0 4px; /* 可选：添加内边距使内容有一定的间距 */
								color: #ffffff;
								margin-right: 10px;
							}
							.features {
								color: #181c26b2;
								line-height: 20px;
								font-size: 14px;
							}
						}
					}
					.vehicle_information_right {
						width: 25%;
						height: 100%;
						// background-color: #aae2ff;
						float: left;
						.amount_of_money {
							width: 100%;
							height: 24px;
							font-size: 14px;
							font-weight: bold;
							text-align: right;
							line-height: 24px;
							color: #181c26;
						}
						.state {
							width: 100%;
							height: 20px;
							font-size: 12px;
							line-height: 20px;
							text-align: right;
							color: #181c26b2;
						}
					}
				}
				.time_information {
					width: 100%;
					height: 70px;
					// background: #ff557f;
					overflow: hidden;
					.time_information_text {
						width: 100%;
						height: 20px;
						background-color: #fff;
						font-size: 13px;
						color: #181c2673;
						line-height: 20px;
						margin-top: 2px;
						// border: 1px solid #ccc;
						box-sizing: border-box;
						white-space: nowrap; /* 文本不换行 */
						overflow: hidden; /* 超出部分隐藏 */
						text-overflow: ellipsis; /* 超出部分显示为省略号 */
						.left_icon {
							width: 15px;
							height: 20px;
							float: left;
							color: #181c26;
							span {
								display: block;
								width: 6px;
								height: 6px;
								border-radius: 50%;
								margin-top: 7px;
							}
							.start {
								background-color: #34b3c5;
							}
							.end {
								background-color: #f1a22b;
							}
						}
					}
				}
				.operation {
					width: 100%;
					height: 50px;
					border-top: 0.5px solid #090f2014;
					box-sizing: border-box;
					// background: #ccc;

					.operation_left {
						width: 25%;
						height: 100%;
						background-color: #fff;
						float: left;
						font-size: 13px;
						color: #181c2673;
						line-height: 50px;
					}
					.operation_right {
						width: 75%;
						height: 100%;
						// background-color: #aae2ff;
						float: left;
						padding: 9px 0;
						box-sizing: border-box;
						display: flex; /* 添加 flexbox 布局 */
						flex-direction: row-reverse; /* 从右向左排列内容 */

						.span_but {
							min-width: 10px;
							height: 100%;
							// background-color: #F041351A;
							border-radius: 4px;
							text-align: center;
							line-height: 32px;
							font-size: 14px;
							display: inline-block; /* 更改为 inline-block */
							padding: 0 10px; /* 可选：添加内边距使内容有一定的间距 */
							margin-left: 10px;
						}
						.uimg {
							display: inline-block;
							float: left;
						}
						.span_err {
							border: 1px solid #090f2029;
							color: #181c26;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
}
</style>
