<template>
	<view class="box">
		<view class="an-uploadImg-group">
			<view>
				<view class="an-img" v-for="(item, index) in imgList" :key="index" @click="perviewImg(index)">
					<image :src="item" v-if="item" @click="perviewImg(index)" ></image>
					<view class="an-icon-close" @click.stop="handleRemove(index)">
						<uni-icon type="closeempty" size="26" color="#F00"></uni-icon>
					</view>
				</view>
				<view class="an-img-add" @click="chooseImage">
					<uni-icon type="plus" size="36" color="#FFFFFF">
						
					</uni-icon>
					
				</view>
			</view>
		</view>
		<view class="aaddimg-bottom"> 
			
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/ACell/uni-icon/uni-icon.vue'
	import { pathToBase64 } from './js_sdk/gsq-image-tools/image-tools/index.js'
	export default {
		name: 'AnUploadImg',
		components:{
			uniIcon
		},
		data() {
			return {
				imgList: [],
				imgBase64List: []
			};
		},
		methods:{
			chooseImage() {
				uni.chooseImage({
				  success: (res) => {
					for(var i = 0; i < res.tempFilePaths.length; i++){
						pathToBase64(res.tempFilePaths[i])
					  .then(base64 => {
						this.imgList.push(base64)
					  })
					  .catch(error => {
					    console.error(error)
					  })
					}
					this.$store.state.imgList = this.imgList
				  }
				})
			},
			perviewImg(index){
				console.log(index)
				let urls = [];
				if(index != -1){
					urls[0] = this.imgList[index];
				}else{
					urls = this.imgList;
				}
				uni.previewImage({
					urls: urls
				});
			},
			handleRemove(index){
				
			}
		}
	}
</script>

<style>
	.box{
		width: 100%;
	}
	.an-uploadImg-group{
		margin: 5upx 20upx;
	}
	.an-img{
		float: left; 
		margin-right: 10upx;
	}
	.an-img-add{
		float: left; 
		margin-right: 10upx; 
		height: 200upx; 
		width: 200upx; 
		/* background-color: #C8C7CC; */
		background: url(icon/top.png) repeat;
		background-size: 100% 100%;
		text-align: center; 
		line-height: 110upx;
	}
	.an-img>image{
		height: 200upx; 
		width: 200upx;
	}
	.an-icon-close{
		position: relative; 
		right: -50upx; 
		top: -120upx;
	}
</style>
