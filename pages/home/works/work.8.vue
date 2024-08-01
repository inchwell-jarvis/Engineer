<template>
	<view class="box">
		<view class="boa" v-for="(item, index) in imgsss" :key="index">
			<text class="headerText">{{ item.text }}</text>

			<view v-for="(itemm, indexs) of item.icon" :key="indexs" class="div" @tap="Url(item, indexs)">
				<view v-if="itemm.text == '保养延迟' && byhcStr != 0" class="degmdg">{{ byhcStr }}</view>
				<view v-if="itemm.text == '取送车任务' && COstr != 0" class="degmdg">{{ COstr }}</view>
				<view class="icons">
					<image class="icon" :src="itemm.icon" @click="con(itemm)" alt />
				</view>
				<text>{{ itemm.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			byhcStr: this.$store.state.MCDelay,
			COstr: this.$store.state.CO,
			name: '全部',
			imgsss: [
				{
					text: '报修相关',
					icon: [
						{
							icon: '/static/img/icon/1-1.png',
							text: '工单管理',
							url: '/pages/home/works/work.1'
						},
						{
							icon: '/static/img/icon/1-2.png',
							text: '报修管理',
							url: '/pages/home/works/work.6'
						}
					]
				},
				{
					text: '租车相关',
					icon: [
						{
							icon: '/static/img/icon/car_rental.png',
							text: '取送车任务',
							url: '/pages/car_rental/index'
						}
					]
				},
				{
					text: '订单相关',
					icon: [
						{
							icon: '/static/img/icon/2-1.png',
							text: '订单管理',
							url: '/pages/home/works/work.2'
						},
						{
							icon: '/static/img/icon/7.png',
							text: '零配件',
							url: '/pages/home/works/work.7'
						},
						{
							icon: '/static/img/icon/2-3.png',
							text: '设备清点',
							url: '/pages/home/works/EquipmentInventorySheet/EquipmentInventorySheet'
						}
					]
				},
				{
					text: '保养相关',
					icon: [
						{
							icon: '/static/img/icon/4.png',
							text: '保养管理',
							url: '/pages/home/works/work.3'
						},
						{
							icon: '/static/img/icon/4-2.png',
							text: '保养延迟',
							url: '/pages/home/works/DelaysMaintenance/DelaysMaintenance'
						},
						{
							icon: '/static/img/icon/4-3.png',
							text: '保养任务',
							url: '/pages/home/works/MaintenanceTask/MaintenanceTask'
						}
					]
				},
				{
					text: '人员相关',
					icon: [
						{
							icon: '/static/img/icon/4-1.png',
							text: '人员调配',
							url: '/pages/home/works/Allocate/Allocate'
						},
						{
							icon: '/static/img/icon/6.png',
							text: '工作日报',
							url: '/pages/home/works/work.4'
						},
						{
							icon: '/static/img/icon/JJ.png',
							text: '奖金明细',
							url: '/pages/home/works/bonus/bonus'
						},
						{
							icon: '/static/img/icon/meeting.png',
							text: '员工见面会',
							url: '/pages/home/works/meeting/index'
						}
					]
				},
				{
					text: '客户相关',
					icon: [
						{
							icon: '/static/img/icon/baifang.png',
							text: '客户拜访',
							url: '/pages/home/works/Firstvisit/Firstvisit'
						},
						{
							icon: '/static/img/icon/5.png',
							text: 'VIP回访',
							url: '/pages/home/works/work.5'
						},
						{
							icon: '/static/img/icon/5-3.png',
							text: '扫码录设备',
							url: ''
						},
						{
							icon: '/static/img/icon/5-4.png',
							text: '查看设备',
							url: '/pages/home/works/GetCustomerEqu/GetCustomerEqu'
						},
						{
							icon: '/static/img/icon/5-5.png',
							text: '录安装日期',
							url: ''
						},
						{
							icon: '/static/img/icon/5-6.png',
							text: '设备评定',
							url: '/pages/home/works/EquipmentEvaluation/EquipmentEvaluation'
						},
						{
							icon: '/static/img/icon/5-7.png',
							text: '绑定传感器',
							url: '/pages/home/works/BindingSensor/BindingSensor'
						}
					]
				},
				{
					text: '文档相关',
					icon: [
						{
							icon: '/static/img/icon/6-1.png',
							text: '设备说明书',
							url: './TEXT/Manual/Manual'
						},
						{
							icon: '/static/img/icon/6-2.png',
							text: '培训案例',
							url: './Trainingcase/Trainingcase'
						},

						{
							icon: '/static/img/icon/6-3.png',
							text: '规章制度',
							url: './Regulations/Regulations'
						},
						{
							icon: '/static/img/icon/6-4.png',
							text: '积压库存',
							url: './TEXT/stock/stock'
						},
						{
							icon: '/static/img/icon/6-5.png',
							text: '文档中心',
							url: './Document/index'
						}
					]
				}
			]
		};
	},
	onBackPress() {
		//自定义返回逻辑
		uni.switchTab({
			url: '../home'
		});
		return true;
	},
	methods: {
		con(i) {
			// console.log(i)
		},
		Url(item, indexs) {
			console.log(item.icon[indexs].url);
			var that = this;
			if (item.icon[indexs].text == '录安装日期') {
				uni.scanCode({
					success: function (res) {
						that.$store.state.gsQRcode = res.result;
						that.$store.state.weburl = res.result;
						if (res.result.split('?')[0] == 'http://icms.inchwell.com.cn/web/gotoinchwell.html') {
							uni.navigateTo({
								url: './QRcode/code'
							});
						}
					}
				});
				return false;
			}
			if (item.icon[indexs].text == '扫码录设备') {
				console.log('开始扫码');
				uni.scanCode({
					success: function (res) {
						console.log(res);
						if (res.result.split('?')[0] == 'http://icms.inchwell.com.cn/web/gotoinchwell.html') {
							that.$store.state.equipments = res.result.split('=')[1];
							that.$nextTick();
							setTimeout(() => {
								uni.navigateTo({
									url: './equipment/equipment'
								});
							}, 800);
						}
					}
				});
				return false;
			}
			if (item.icon[indexs].url == '') {
				uni.showToast({
					title: '当前功能正在研发',
					icon: 'none'
				});
			} else {
				uni.navigateTo({
					url: item.icon[indexs].url
				});
			}
		}
	}
};
</script>

<style lang="scss">
.box {
	width: 100%;
	height: 100%;
	background-color: #ffffff;
}

.boa {
	width: 100%;
	background: #ffffff;
	box-sizing: border-box;

	.headerText {
		width: 100%;
		display: block;
		font-weight: bolder;
		font-size: 18px;
		float: left;
		padding-left: 20px;
		margin: 10px 0;
	}

	.div {
		width: calc(100% / 4);
		height: 100px;
		float: left;
		border-radius: 10px;
		box-sizing: border-box;
		text-align: center;
		font-size: 12px;
		line-height: 20px;
		position: relative;
		color: #606266;

		.degmdg {
			width: 25px;
			height: 25px;
			border-radius: 50%;
			color: #ffffff;
			font-weight: bold;
			font-size: 10px;
			text-align: center;
			line-height: 25px;
			background-color: #ff0000;
			position: absolute;
			top: 0;
			right: 0;
			box-sizing: border-box;
			transition: all 2s ease-out;
		}

		.icons {
			width: 100%;
			height: 80px;
			display: block;
			padding: 15px;
			box-sizing: border-box;

			.icon {
				width: 45px;
				height: 45px;
				display: block;
				margin: auto;
			}
		}
	}
}
</style>
