<template>
	<view class="box">
		<u-grid :col="3" @click="onchangeGrid">
			
			<u-grid-item index="map">
				<u-icon name="map" :size="46"></u-icon>
				<view class="grid-text">定位</view>
			</u-grid-item>

			<u-grid-item index="camera">
				<u-icon name="camera" :size="46"></u-icon>
				<view class="grid-text">拍摄</view>
			</u-grid-item>

			<u-grid-item index="permission">
				<u-icon name="grid" :size="46"></u-icon>
				<view class="grid-text">全部</view>
			</u-grid-item>
			
		</u-grid>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 定位 地图 拍摄
		};
	},
	methods: {
		onchangeGrid(e) {
			console.log(e);
			uni.navigateTo({
				url: '/pages/index/functional_testing/' + e
			});
		}
	}
};
</script>

<style></style>
