<template>
	<view>
		<div class="ShangChuan" @tap='UpImgBase()'>
			<u-icon :name="iconC_" size='40'></u-icon>
			<p>{{textC_ || '上传图片'}}</p>
		</div>
	</view>
</template>

<script>
	import {
		pathToBase64
	} from '../Base64/index.js'
	export default {
		name: "UploadPictures",
		data() {
			return {
				sourceTypeC_: ['camera', 'album'],
				countC_:9,
				sizeTypeC_:['compressed'],
				
				Upindex:0,
				// 上传还剩多少张
				Data:[],
				// base64位编码集合
				iconC_:'plus',
				// 传输信息
				newsC_:'default',
				// 展示文字
				textC_:'上传图片'
			};
		},
		props: {
			sourceType: Array,
			count:Number,
			icon:String,
			news:String,
			text:String
		},
		mounted() {
			this.sourceTypeC_ = this.sourceType
			// sourceType album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
			this.countC_ = this.count
			// 最多可以选择的图片张数，默认9	
			this.sizeTypeC_ = this.sizeType
			// original 原图，compressed 压缩图，默认压缩图
			this.iconC_ = this.icon
			// 传输过来的信息
			this.newsC_ = this.news
			// 展示文字
			this.textC_ = this.text
		},
		methods: {
			UpImgBase: function() {
				var me = this
				uni.chooseImage({
					count: me.countC_, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: me.sourceTypeC_, //从相册选择
					success: function(res) {
						
						var Image = res.tempFilePaths
						me.Upindex = Image.length
						
						for(var i = 0; i < Image.length; i ++){
							me.ImageBase(Image[i])
						}
				
					}
				});
			},
			// 轮询解码
			ImageBase:function(row){
				var me = this
				pathToBase64(row)
					.then(base64 => {
						me.Data.push(base64)
						me.Upindex -= 1
						if(me.Upindex == 0){
							console.log('图片全部编码完成!')
							me.$emit('ReturnBase64', {
								news:me.newsC_,
								Data:me.Data
							})
						}
					})
					.catch(error => {
						console.error(error)
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ShangChuan {
		width: 100px;
		height: 100px;
		border-radius: 10px;
		background-color: rgb(244, 245, 246);
		margin: 10px;
		box-sizing: border-box;
		text-align: center;
		line-height: 30px;
		padding-top: 20px;
		color: #5f5f5f;
		float: left;
	}
</style>
