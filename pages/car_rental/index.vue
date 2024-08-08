<template>
	<view class="order_list">
		<u-navbar title="租车任务列表" :border-bottom="false">
			<view class="slot-wrap"><u-icon name="reload" size="40" color="#606060" @tap="start('刷新')"></u-icon></view>
		</u-navbar>
		<!-- tab -->
		<u-tabs-swiper ref="uTabs" :list="list" :is-scroll="false" @change="tabsChange" :current="current"></u-tabs-swiper>
		<!-- 列表 -->
		<div class="order_list_content">
			<swiper :current="current" @animationfinish="animationfinish" style="width: 100%; height: 100%">
				<swiper-item class="swiper-item" v-for="(list_item, list_index) in list" :key="list_index">
					<scroll-view scroll-y class="scroll_id" @scrolltolower="onreachBottom">
						<!-- 卡片 -->
						<view class="order_item" v-for="(item, index) in filter_data(list_item, list_index)" :key="index" @tap="view_details(item)">
							<!-- header -->
							<div class="header_text">
								<div class="header_cp">{{ item.Plate }}</div>
								<div class="header_edit">
									<span style="margin-right: 4px" v-if="item.State == 1">{{ item.StateStr2 }}</span>
									<span style="margin-right: 4px; color: #e54337" v-else-if="item.State == 2 || item.State == 5">{{ item.StateStr2 }}</span>
									<span style="margin-right: 4px; color: #df8316" v-else-if="item.State == 3 || item.State == 6">{{ item.StateStr2 }}</span>
									<span style="margin-right: 4px; color: #35b250" v-else-if="item.State == 7">{{ item.StateStr2 }}</span>
									<span style="margin-right: 4px; color: #181c2673" v-else>{{ item.StateStr2 }}</span>
									<u-icon name="arrow-right" color="#181C2673"></u-icon>
								</div>
							</div>
							<!-- content -->
							<div class="item_content">
								<div class="item_content_biao">
									<div class="biao_s" :style="{ background: [4, 8, 9].indexOf(item.State) != -1 ? '#E5433752' : '#e54337' }" v-if="item.Direction == '送车'">送车</div>
									<div class="biao_q" :style="{ background: [4, 8, 9].indexOf(item.State) != -1 ? '#4170FC52' : '#e54337' }" v-if="item.Direction == '取车'">取车</div>
								</div>
								<div class="item_content_text">
									<div class="TargetDate">{{ item.web_time }}</div>
									<p class="TargetAddress">{{ item.TargetAddress }}</p>
								</div>
							</div>
							<!-- 分配 -->
							<div class="but" v-if="item.State == 1">
								<div class="button" @tap.stop="distribution(item)">分配</div>
							</div>
							<!-- 接受 / 拒绝 -->
							<div class="but" v-if="item.State == 2 || item.State == 5">
								<div class="refuse" @tap.stop="(reallocate_pop_ups2 = true), (reallocate_pop_data2 = item)">拒绝</div>
								<div class="accept" @tap.stop="operation_task(item, 1)">接受</div>
							</div>
							<!-- 送车 / 取车 -->
							<div class="but" v-if="item.State == 3 || item.State == 6">
								<div class="reassignment" @tap.stop="reallocate_pop_ups_fun(item)">申请重分配</div>
								<div class="contact_customers" @tap.stop="contact_customers(item)">
									<u-icon name="phone-fill" color="#181c26" size="28"></u-icon>
									联系客户
								</div>
								<div class="edit" v-if="item.State == 3" @tap.stop="operation_service(item)">{{ '我已送达' }}</div>
								<div class="edit" v-if="item.State == 6" @tap.stop="operation_get(item)">{{ '我已取车' }}</div>
							</div>
							<!-- 归位 -->
							<div class="but" v-if="item.State == 7">
								<div class="button" @tap.stop="(the_car_has_returned_pop = true), (reallocate_pop_data3 = item)">车已归位</div>
							</div>
						</view>
						<!-- 如果没有卡片 -->
						<view class="no_card" v-if="(list_item.state.length != 0 || data.length == 0) && data.filter((item) => list_item.state.indexOf(item.State) != -1).length == 0">
							<u-image width="140px" height="140px" src="../../static/car_rental/no_task.png"></u-image>
							<p>暂时没有任务了~</p>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</div>
		<!-- 取车码弹窗 -->
		<u-popup v-model="show" mode="bottom" border-radius="20">
			<view class="popclass">
				<div class="popclass_head">
					<div class="popclass_head_img">
						<u-image width="55px" height="55px" src="../../static/car_rental/key_picture.png"></u-image>
					</div>
					<div class="popclass_head_h1">
						请输入
						<span>取车码</span>
					</div>
					<div class="popclass_head_h2">需要客户出示取车码才能够将车辆交接给客户</div>
				</div>
				<div class="popclass_number">
					<u-message-input mode="box" @change="input_y_change" v-model="input_y"></u-message-input>
				</div>
				<div class="popclass_but">
					<div class="popclass_buttton">
						<div class="edit_quxiao" @tap="show = false">取消</div>
						<div class="edit_queren" @tap="confirm_password()">确认</div>
					</div>
				</div>
			</view>
		</u-popup>

		<!--  -->

		<u-popup v-model="show2" mode="center" width="500rpx" height="150px" border-radius="20">
			<view class="return_the_car">
				<p class="p1">取车成功</p>
				<p class="p2">请将车辆开往指定的办事处，或者送到下一个客户的预定送车地点。</p>
				<div class="but" @tap="show2 = false">我知道了</div>
			</view>
		</u-popup>

		<u-popup v-model="reallocate_pop_ups" mode="center" width="500rpx" height="150px" border-radius="20">
			<view class="return_the_car">
				<p class="p1">申请重分配</p>
				<p class="p2">您确定要申请重分配 {{ reallocate_pop_data.web_time }} 任务吗？</p>
				<div class="but2">
					<div class="but2_1" @tap.stop="reallocate_pop_ups = false">再想想</div>
					<div class="but2_1" @tap.stop="operation_task(reallocate_pop_data, 0)">确定</div>
				</div>
			</view>
		</u-popup>

		<u-popup v-model="reallocate_pop_ups2" mode="center" width="500rpx" height="150px" border-radius="20">
			<view class="return_the_car">
				<p class="p1">申请拒绝</p>
				<p class="p2">您确定要拒绝 {{ reallocate_pop_data2.web_time }} 任务吗？</p>
				<div class="but2">
					<div class="but2_1" @tap.stop="reallocate_pop_ups2 = false">再想想</div>
					<div class="but2_1" @tap.stop="operation_task(reallocate_pop_data2, 0)">确定</div>
				</div>
			</view>
		</u-popup>

		<u-popup v-model="the_car_has_returned_pop" mode="center" width="500rpx" height="150px" border-radius="20">
			<view class="return_the_car">
				<p class="p3">车辆是否已经送到指定办事处？</p>
				<div class="but2">
					<div class="but2_2" @tap.stop="the_car_has_returned_pop = false">还没有</div>
					<div class="but2_2" @tap.stop="the_car_has_returned(reallocate_pop_data3)">是</div>
				</div>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			waitDo: -1,
			current: 0,
			list: [
				{
					name: '全部',
					state: []
				},
				{
					name: '待分配',
					state: [1]
				},
				{
					name: '待接受',
					state: [2, 5]
				},
				{
					name: '待取送',
					state: [3, 6, 7]
				}
			],
			data: [],
			pick_up_code: '',
			show: false, // 送车验证码弹窗
			show_item: {}, // 送车信息
			input_y: '',
			show2: false,
			reallocate_pop_ups: false, // 确认重新分配弹窗
			reallocate_pop_data: {},
			reallocate_pop_ups2: false, // 确认拒绝分配弹窗
			reallocate_pop_data2: {},
			the_car_has_returned_pop: false, // 车归位弹窗
			reallocate_pop_data3: {}

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
		// 重新分配弹窗
		reallocate_pop_ups_fun(data) {
			this.reallocate_pop_data = data;
			this.reallocate_pop_ups = true;
		},

		filter_data(list_item, index) {
			if (index == 0) {
				return this.data;
			}
			if (index == 1) {
				return this.data.filter((item) => list_item.state.indexOf(item.State) != -1);
			}
			if (index == 2 || index == 3) {
				let data = this.data.filter((item) => list_item.state.indexOf(item.State) != -1);
				data = data.filter((item) => item.EngineerId == this.$store.state.engineer_id);
				return data;
			}
		},
		// tabs 通知 swiper 切换
		tabsChange(index) {
			this.current = index;
			// this.waitDo = index == 0 ? -1 : index;
			// this.start();
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
		start(str) {
			let data = { pageNum: 1, numPerPage: 999, orderField: '', orderDirection: '', cusName: '', plate: '', waitDo: -1, state: -1, Id: '', cusId: '' };
			this.apix('CarRental/GetCarSOOrders', data).then((rv) => {
				console.log(rv.Data.Dtos);
				this.data = rv.Data.Dtos;
				this.data.forEach((rv) => {
					rv.web_time = this.date_conversion(rv.TargetDate) + ' ' + (rv.Direction == '送车' ? '送车上门' : '上门取车');
					// 给最上面加上角标
				});
				if (str) {
					uni.showToast({
						title: '刷新成功',
						duration: 2000,
						icon: 'success'
					});
				}
			});
		},
		// view_details
		view_details(row) {
			uni.navigateTo({
				url: `./order_details?id=${row.ID}&str=list`
			});
		},
		// 联系客服
		contact_customer_service() {
			console.log('联系客服！');
		},
		// 日期转换
		date_conversion(dateStr) {
			const now = new Date();
			const targetDate = new Date(dateStr);
			const diffInMs = now - targetDate;
			const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

			let dayPart = '';
			let timePart = '';

			if (diffInDays === 0) {
				dayPart = '今天';
			} else if (diffInDays === 1) {
				dayPart = '昨天';
			} else if (diffInDays === 2) {
				dayPart = '前天';
			} else if (diffInDays > 2) {
				dayPart = `${diffInDays}天前`;
			} else {
				// 如果日期是未来的
				if (diffInDays < 0) {
					if (diffInDays === -1) {
						dayPart = '明天';
					} else if (diffInDays === -2) {
						dayPart = '后天';
					} else {
						dayPart = `${-diffInDays}天后`;
					}
				}
			}

			// 获取月份和日期部分
			const month = targetDate.getMonth() + 1; // getMonth() 返回的月份是从0开始的
			const day = targetDate.getDate();

			// 格式化时间
			const hours = targetDate.getHours();
			const minutes = targetDate.getMinutes().toString().padStart(2, '0');
			timePart = `${hours > 11 ? hours - 12 : hours}:${minutes}`;

			// 组合日期和时间字符串
			return `${month}月${day}日 ${dayPart} ${timePart}`;
		},
		distribution(row) {
			this.$store.state.car_delivery_selection_engineer = row;
			uni.navigateTo({
				url: './distribution'
			});
		},

		operation_task(item, num) {
			this.apix('CarRental/UpdateCarSOOrderStateB', { id: item.ID, str: num }, { method: 'post' }).then((rv) => {
				this.reallocate_pop_ups = false;
				this.reallocate_pop_ups2 = false;
				uni.showToast({
					title: num ? '已接受' : '已拒绝',
					duration: 2000,
					icon: num ? 'success' : 'error'
				});
				this.start();
			});
		},

		// 归位
		the_car_has_returned(item) {
			this.apix('CarRental/UpdateCarSOOrderStateE', { ID: item.ID }, { method: 'post' }).then((rv) => {
				this.the_car_has_returned_pop = false;
				uni.showToast({
					title: '归位成功',
					duration: 2000,
					icon: 'success'
				});
				this.start();
			});
		},

		//	送达  送达需要验证客户的取车码
		operation_service(item) {
			this.show = true;
			this.show_item = item;
		},
		// 取车  回当地的办事处
		operation_get(item) {
			this.apix('CarRental/UpdateCarSOOrderStateD', { ID: item.ID }, { method: 'post' }).then((rv) => {
				this.show2 = true;
				this.start();
			});
		},
		// 联系客户
		contact_customers(item) {
			console.log(item);
			// 综合正则表达式，适用于移动电话和固定电话
			const phoneRegex = /^(\+?86)?(0\d{2,3}-)?1[3-9]\d{9}$|^(0\d{2,3}-)?\d{7,8}$/;
			if (!phoneRegex.test(item.LinkMan.MobilePhone)) {
				uni.showToast({
					title: '电话格式不正确',
					duration: 2000,
					icon: 'error'
				});
				return;
			}

			uni.makePhoneCall({
				phoneNumber: item.LinkMan.MobilePhone //仅为示例
			});
		},
		input_y_change(e) {
			this.input_y = e;
		},
		// confirm_password
		confirm_password() {
			this.apix('CarRental/UpdateCarSOOrderStateC', { ID: this.show_item.ID, str: this.input_y }, { method: 'post' }).then((rv) => {
				uni.showToast({
					title: '送车成功',
					duration: 2000,
					icon: 'success'
				});
				this.show = false;
				this.start();
			});
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
				min-height: 10px;
				border-radius: 12px;
				margin: 20rpx auto;
				background-color: #fff;
				padding: 12px 0;
				box-sizing: border-box;
				.header_text {
					width: 100%;
					height: 22px;
					padding: 0 10px;
					box-sizing: border-box;

					.header_cp {
						min-width: 10px;
						border: 1px solid #090f2029;
						background: linear-gradient(180deg, #f8f9fe 0%, #f5f8ff 100%);
						border-radius: 2px;
						text-align: center;
						line-height: 20px;
						padding: 0 4px;
						font-size: 14px;
						float: left;
						box-sizing: border-box;
					}
					.header_edit {
						min-width: 10px;
						text-align: right;
						line-height: 22px;
						padding: 0 4px;
						font-size: 12px;
						float: right;
						box-sizing: border-box;
						color: #e54337;
					}
				}

				.item_content {
					width: 100%;
					min-height: 50px;
					padding: 10px 10px 20px 10px;
					box-sizing: border-box;
					display: flex; /* 启用Flexbox布局 */
					justify-content: center; /* 水平居中对齐子元素 */
					.item_content_biao {
						width: 40px;
						min-height: 10px;
						padding: 5px 0;
						box-sizing: border-box;
						.biao_s {
							width: 32px;
							height: 20px;
							box-sizing: border-box;
							border-radius: 2px;
							background: #e54337;
							color: #ffffff;
							font-size: 12px;
							text-align: center;
							line-height: 20px;
						}
						.biao_q {
							width: 32px;
							height: 20px;
							box-sizing: border-box;
							border-radius: 2px;
							background: #4170fc;
							color: #ffffff;
							font-size: 12px;
							text-align: center;
							line-height: 20px;
						}
					}
					.item_content_text {
						width: calc(100% - 40px);
						min-height: 10px;
						box-sizing: border-box;
						.TargetDate {
							width: 100%;
							height: 26px;
							font-size: 20px;
							color: #181c26;
							font-weight: bold;
							line-height: 26px;
						}
						.TargetAddress {
							line-height: 22px;
							font-size: 14px;
							color: #181c26b2;
							font-weight: 500;
						}
					}
				}
				.but {
					width: 100%;
					height: 40px;
					padding: 0 10px;
					box-sizing: border-box;
					display: flex; /* 启用Flexbox布局 */
					justify-content: space-around;

					.button {
						width: 100%;
						height: 100%;
						background: #4170fc;
						border-radius: 6px;
						font-size: 16px;
						font-weight: bold;
						text-align: center;
						line-height: 40px;
						color: #ffffff;
					}

					.refuse {
						width: 18%;
						height: 100%;
						margin: auto;
						background: #e543371a;
						border-radius: 6px;
						font-size: 16px;
						font-weight: bold;
						text-align: center;
						line-height: 40px;
						color: #e54337;
					}

					.accept {
						width: 80%;
						height: 100%;
						margin: auto;
						background: #4170fc;
						border-radius: 6px;
						font-size: 16px;
						font-weight: bold;
						text-align: center;
						line-height: 40px;
						color: #ffffff;
					}

					.reassignment {
						width: 20%;
						height: 100%;
						margin: auto;
						border-radius: 6px;
						font-size: 12px;
						text-align: center;
						line-height: 40px;
						color: #181c26b2;
					}
					.contact_customers {
						width: 30%;
						height: 100%;
						margin: auto;
						background: #f5f6fa;
						border-radius: 6px;
						font-size: 16px;
						font-weight: bold;
						text-align: center;
						line-height: 40px;
						color: #181c26;
					}
					.edit {
						width: 40%;
						height: 100%;
						margin: auto;
						background: #4170fc;
						border-radius: 6px;
						font-size: 16px;
						font-weight: bold;
						text-align: center;
						line-height: 40px;
						color: #ffffff;
					}
				}
			}
		}
	}

	.popclass {
		width: 100%;
		min-height: 10px;
		padding: 30px 20px 20px;
		box-sizing: border-box;
		.popclass_head {
			width: 100%;
			height: 120px;
			box-sizing: border-box;
			.popclass_head_img {
				width: 100%;
				height: 55px;
				display: flex;
				justify-content: center;
			}
			.popclass_head_h1 {
				width: 100%;
				height: 40px;
				line-height: 40px;
				font-size: 24px;
				color: #181c26;
				text-align: center;
				font-weight: bold;
				span {
					color: #e54337;
				}
			}
			.popclass_head_h2 {
				width: 100%;
				height: 20px;
				line-height: 20px;
				font-size: 14px;
				color: #181c26b2;
				text-align: center;
			}
		}
		.popclass_number {
			width: 100%;
			height: 80px;
			padding: 10px 0;
			box-sizing: border-box;
		}
		.popclass_but {
			width: 100%;
			height: 100px;
			padding: 30px 0px 20px;
			box-sizing: border-box;
			.popclass_buttton {
				width: 100%;
				height: 50px;
				box-sizing: border-box;
				display: flex; /* 启用Flexbox布局 */
				justify-content: space-around;
				.edit_quxiao {
					width: 20%;
					height: 100%;
					border-radius: 8px;
					background: #f5f6fa;
					text-align: center;
					line-height: 50px;
					font-size: 16px;
					font-weight: bold;
				}
				.edit_queren {
					width: 76%;
					height: 100%;
					border-radius: 8px;
					background: #4170fc;
					text-align: center;
					line-height: 50px;
					font-size: 16px;
					font-weight: bold;
					color: #ffffff;
				}
			}
		}
	}

	.return_the_car {
		width: 100%;
		height: 100%;
		padding: 15px;
		box-sizing: border-box;
		position: relative;
		.p1 {
			line-height: 26px;
			font-size: 18px;
			font-weight: bold;
			text-align: center;
		}
		.p2 {
			font-size: 13px;
			color: #181c26b2;
			line-height: 22px;
			text-align: center;
		}
		.p3 {
			font-family: PingFang SC;
			font-size: 16px;
			font-weight: bold;
			line-height: 26px;
			text-align: center;
		}
		.but {
			width: calc(100% - 30px);
			height: 40px;
			border-radius: 8px;
			background-color: #2e7bfd;
			font-family: PingFang SC;
			font-size: 16px;
			font-weight: bold;
			line-height: 40px;
			text-align: center;
			color: #ffffff;
			position: absolute;
			bottom: 15px;
			left: 15px;
			right: 15px;
		}

		.but2 {
			width: calc(100% - 30px);
			height: 40px;
			border-radius: 8px;
			font-family: PingFang SC;
			font-size: 16px;
			font-weight: bold;
			line-height: 40px;
			text-align: center;
			color: #ffffff;
			position: absolute;
			bottom: 15px;
			left: 15px;
			right: 15px;
			display: flex; /* 启用flex布局 */
			justify-content: space-between; /* 子级元素平均分布，两端对齐 */

			.but2_1 {
				width: 44%;
				height: 100%;
				border-radius: 4px;
				background: #f5f6fa;
				color: #000;
				font-size: 14px;
				line-height: 40px;
				text-align: center;
			}
			.but2_1:nth-child(2) {
				background: #e543371a;
				color: #e54337;
			}

			.but2_2 {
				width: 44%;
				height: 100%;
				border-radius: 4px;
				background: #f5f6fa;
				color: #000;
				font-size: 14px;
				line-height: 40px;
				text-align: center;
			}
			.but2_2:nth-child(2) {
				background: #2e7bfd;
				color: #ffffff;
			}
		}
	}
}
</style>
