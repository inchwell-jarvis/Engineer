<template>
	<view class="box">
		<u-top-tips ref="uTips"></u-top-tips>

		<u-cell-group>
			<u-cell-item icon="camera-fill" title="摄像头" :value="camera" :arrow="false"></u-cell-item>
			<u-cell-item icon="map-fill" title="定位" :value="location" :arrow="false"></u-cell-item>
		</u-cell-group>

		<u-button type="primary" @click="getpermission" style="margin-top: 100px">
			检查权限
			<u-loading v-if="get" mode="flower" size="30"></u-loading>
		</u-button>

		<view class="title">申请权限：</view>
		<view class="test_flex_row_between">
			<text class="btn bg_red" @click="requestPermission()">前往系统授权页面</text>
		</view>
	</view>
</template>

<script>
// App权限判断和提示
// https://ext.dcloud.net.cn/plugin?id=594
import permision from './permission.js';
export default {
	data() {
		return {
			camera: '',
			location: '',
			get: false
		};
	},
	created() {
		this.getpermission();
	},
	methods: {
		// 检查 Android 权限
		async requestAndroidPermission(permisionID) {
			var result = await permision.requestAndroidPermission(permisionID);
			var strStatus;
			if (result == 1) {
				strStatus = '已获得授权';
			} else if (result == 0) {
				strStatus = '未获得授权';
			} else {
				strStatus = '被永久拒绝权限';
			}
			return strStatus;
		},
		// IOS 权限检查
		judgeIosPermission(name) {
			let bool = permision.judgeIosPermission(name);
			return bool ? '已获得授权' : '被永久拒绝权限';
		},
		// 权限申请
		requestPermission() {
			permision.gotoAppPermissionSetting();
		},
		// 检查权限
		async getpermission() {
			// 清空权限
			this.camera = '未知';
			this.location = '未知';
			this.get = true;

			// 获取操作系统信息
			const platform = uni.getSystemInfoSync().platform;
			console.log(platform);

			// 判断操作系统类型并执行相应操作
			if (platform === 'android') {
				// 安卓操作系统上的操作
				this.camera = await this.requestAndroidPermission('android.permission.CAMERA');
				this.location = await this.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION');
			} else if (platform === 'ios') {
				// iOS操作系统上的操作
				this.camera = this.judgeIosPermission('camera');
				this.location = this.judgeIosPermission('location');
			} else {
				// 其他操作系统上的操作
				console.log('运行在其他操作系统上');
			}
			this.get = false;
			this.$refs.uTips.show({
				title: '获取权限授权详情成功！',
				type: 'success',
				duration: '2300'
			});
		}
	}
};
</script>

<style>
.box {
	padding: 0 20px;
	padding-top: 50px;	
	box-sizing: border-box;
}
.test_flex_row_between {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.btn {
	font-size: 30rpx;
	font-weight: bold;
	padding-top: 10rpx;
	padding-bottom: 10rpx;
	text-align: center;
	color: #ffffff;
	margin-left: 10rpx;
	margin-right: 10rpx;
	border-radius: 12rpx;
	padding: 10rpx 20rpx;
}

.bg_red {
	background-color: #ff9900;
}
.title {
	margin-top: 50rpx;
	margin-bottom: 8rpx;
	margin-left: 12rpx;
	font-size: 30rpx;
	color: #999999;
}
</style>
