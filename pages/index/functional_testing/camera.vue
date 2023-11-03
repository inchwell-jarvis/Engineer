<template>
	<view class="box">
		<div class="camera">
			<u-image :src="src || 'xxx'" mode="aspectFit" height="300px">
				<view slot="error" style="font-size: 24rpx">等待操作</view>
			</u-image>
		</div>

		<u-cell-group>
			<u-cell-item icon="share-fill" title="路径" :value="src" :arrow="false" :value-style="valueStyle"></u-cell-item>
			<u-cell-item icon="photo-fill" title="格式" :value="src.split('.')[src.split('.').length - 1]" :arrow="false"></u-cell-item>
			<u-cell-item icon="file-text-fill" title="Base64" :value="base64" :arrow="false" :value-style="valueStyle"></u-cell-item>
		</u-cell-group>
		
		<view class="title">二维码信息：</view>
		<text >{{scanstr}}</text>
		 
		<u-button type="primary" @click="camera" style="margin-top: 100px">拍照</u-button>
		<u-button type="primary" @click="scan" style="margin-top: 10px">扫码</u-button>
	</view>
</template>

<script>
import { pathToBase64 } from '../../../components/Base64/index.js';
export default {
	data() {
		return {
			src: '',
			imgArr: [],
			valueStyle: {
				paddingLeft: '10px',
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis'
			},
			base64: '',
			scanstr: '',
		};
	},
	methods: {
		camera() {
			let that = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: function (res) {
					// tempFilePath可以作为img标签的src属性显示图片
					const tempFilePaths = res.tempFilePaths;
					that.imgArr = res.tempFilePaths;
					that.src = tempFilePaths[0];
					// 转为 base64
					pathToBase64(that.src)
						.then((base64) => {
							console.log(base64);
							that.base64 = base64;
						})
						.catch((error) => {
							console.error(error);
						});

					console.log(that.src);
				}
			});
		},
		scan() {
			let that = this;
			uni.scanCode({
				success: (res) => {
					that.scanstr = res.result; //这里可以打印或者处理扫描到的结果
					console.log(a);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.box {
	padding: 0 20px;
	box-sizing: border-box;

	.camera {
		width: 100%;
		min-height: 300px;
		background-color: #ffffff;
		border-radius: 10px;
		overflow: hidden;
	}
	
	.title {
		margin-top: 50rpx;
		margin-bottom: 8rpx;
		margin-left: 12rpx;
		font-size: 30rpx;
		color: #999999;
	}
}
</style>
