<template>
	<view class="box">
		<u-top-tips ref="uTips"></u-top-tips>

		<u-cell-group>
			<u-cell-item icon="map-fill" title="经度" :value="IP.latitude" :arrow="false"></u-cell-item>
			<u-cell-item icon="map-fill" title="纬度" :value="IP.longitude" :arrow="false"></u-cell-item>
			<u-cell-item icon="hourglass-half-fill" title="耗时" :value="IP.elapsedTime" :arrow="false"></u-cell-item>
			<u-cell-item icon="clock-fill" title="时间" :value="IP.acquisitionTime" :arrow="false"></u-cell-item>
		</u-cell-group>

		<u-button type="primary" @click="getIP" style="margin-top: 100px">
			获取定位 &emsp;
			<u-loading v-if="get" mode="flower" size="30"></u-loading>
		</u-button>
		<view class="title">上传定位：</view>
		<view class="test_flex_row_between">
			<text class="btn bg_red" @click="postip()">上传当前获取到的位置</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			IP: {},
			get: false
		};
	},
	methods: {
		async getIP() {
			this.get = true;
			this.IP = await this.getCoordinates();
			this.get = false;
			console.log(this.IP);
			console.log(this.$store.state.ip);
		},
		postip() {
			if (this.IP.latitude && this.IP.longitude) {
				let data = {
					latitude: String(this.IP.latitude),
					longitude: String(this.IP.longitude),
				};
				this.API_POST('system/UploadMapCoordinate', data).then((rv) => {
					this.$refs.uTips.show({
						title: '定位上传成功！',
						type: 'success',
						duration: '2300'
					});
				});
			} else {
				this.$refs.uTips.show({
					title: '当前定位信息为空！',
					type: 'error',
					duration: '2300'
				});
			}
		}
	}
};
</script>

<style lang="scss">
.box {
	padding: 0 20px;
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
	background-color: #e00300;
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
	background-color: #19be6b;
}
.title {
	margin-top: 50rpx;
	margin-bottom: 8rpx;
	margin-left: 12rpx;
	font-size: 30rpx;
	color: #999999;
}
</style>