<template>
	<view class="box">
		<view class="left">
			<view @tap="hanic(index)" :class="{ 'butss': index == bgindex }" class="buts" v-for="(item,index) in Data" :key="index">{{item.sparePartsTypeName}}</view>
		</view>
		<view class="right">
			<view class="img" v-for="(item,index) in rightData" :key='index'>
				<!-- <image :src=" 'http://121.40.27.240:6001' + item.goods[0].goodsIcon" mode=""></image> -->
				<image @tap="cadd(items)" v-for="(items,indexs) in item.goods" :key="indexs" :src=" Url + items.goodsIcon"></image>
				<text>{{item.threeReclassifyName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: [],
				rightData: [],
				Url: this.$store.state.httpimgs,
				bgindex: 0,
			};
		},
		onBackPress() {
			uni.navigateTo({
				url: "./classification",
			});
			return true
		},
		mounted() {
			this.Data = this.$store.state.Ninedetails
			this.rightData = this.Data[0].reclassifysContent
		},
		methods: {
			hanic(index) { //切换rightData
				this.rightData = this.Data[index].reclassifysContent
				this.bgindex = index
			},
			cadd(item) {
				this.$store.state.NinedetailsHTML = item.goodHtmlUrl
				uni.navigateTo({
					url: "./drawings"
				});
			}
		}
	}
</script>

<style lang="scss">
	.left {
		width: 30%;
		height: 100%;
		float: left;
	}

	.right {
		width: 70%;
		height: 100%;
		float: left;
		overflow: auto;
		background-color: #e3e2e7;
	}

	.buts {
		width: 100%;
		height: 30px;
		line-height: 30px;
		padding-left: 5px;
		box-sizing: border-box;
	}

	.butss {
		width: 100%;
		height: 30px;
		line-height: 30px;
		padding-left: 5px;
		box-sizing: border-box;
		background-color: #e3e2e7;
	}

	.img {
		width: 70%;
		margin: auto;
		margin-top: 10px;
		font-weight: bold;

		image {
			width: 100%;
			height: 140px;
		}
	}
</style>
