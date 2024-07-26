<template>
	<view class="content">
		<view class="inputArea assd">
			<input v-model="loginPhone" placeholder="请输入账号" maxlength="20" class="inputClass" />
		</view>
		<view>
			<button @click="inter(1)">活体检测</button>
			<button @click="inter(2)">人脸图像采集</button>
		</view>
		<view class="asd">
			<textarea v-model="Base64" />

			</view>
		

		<!-- <view>
			默认静音(仅Android有效)
			<switch :checked="!isSound" @change="(e)=>{isSound=!e.target.value}" />
		</view>
		<view style="margin-top: 20rpx;">
			bestImage0默认截取脸部区域
			<switch :checked="AutoClip" @change="(e)=>{AutoClip=e.target.value}" />
		</view>
		<view style="margin-top: 20rpx;">
			后置摄像头
			<switch :checked="backCamera" @change="(e)=>{backCamera=e.target.value}" />

		</view> -->
		<!-- 预览 -->
		<scroll-view scroll-y="true">
			<view class="msg" v-html="logoSrcs">
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		pathToBase64
	} from '../../components/an-uploadImg/js_sdk/gsq-image-tools/image-tools/index.js'

	export default {
		data() {
			return {
				msg: '',
				isSound: true,
				AutoClip: true,
				backCamera: false,
				loginPhone:'',
				data: [],
				Base64: '',
			}
		},
		onLoad() {

		},
		methods: {
			inter(inx) {
				const _self = this;
				if(_self.loginPhone == ''){
					uni.showToast({
						title: '请输入登录名',
						icon: "none"
					})
					return false
				}
				
				_self.Base64 = '';
				const PPFace = uni.requireNativePlugin('PP-BaiduFace');
				let config = {
					licenseName: 'idl-license',
					licenseSuffix: 'face-android',
					licenseId: 'com-gcs-yzj-face-android',
					liveActionArray: ["Eye", "HeadLeft", "HeadLeftOrRight"],
					bgColor: "#56445D",
					textColor: "#C5E99B",
					isSound: _self.isSound, //默认是否开启语音提示（仅Android有效）默认值：false
					AutoClip: _self.AutoClip, //自动裁剪用户脸部区域 默认：false
					isBackCamera: _self.backCamera //启用后置摄像头
				}

				if (plus.os.name == 'iOS') {
					config.licenseSuffix = 'face-ios';
					config.licenseId = 'com-gcs-yzj-face-ios';
				}

				if (inx == 1) {
					PPFace.faceliveness(config, result => {
						_self.msg = new Date().getHours() + ':' + new Date().getMinutes() + '  ' + JSON.stringify(result) + '<br/>' +
							_self.msg;
						if (result.FaceStatusEnum == '"OK"') {
							_self.saveImgs(result.base64ImageMap);
						}
					});

				} else if (inx == 2) {
					PPFace.recycler(config, result => {
						_self.msg = new Date().getHours() + ':' + new Date().getMinutes() + '  ' + JSON.stringify(result) + '<br/>' +
							_self.msg;
						if (result.FaceStatusEnum == '"OK"') {
							_self.saveImgs(result.base64ImageMap);
						}
					});
				}

			},
			saveImgs(imgsobj) {
				let _self = this;
				_self.logoSrcs = [];


				for (let key in imgsobj) {
					var base64data = imgsobj[key];
					_self.bitmapsave(base64data);
					_self.Base64 = base64data   //头部需添加data:image/jpg;base64,    然后base64倒转
		
				}
				var obj = {
					url: _self.$store.state.url + 'Account/FaceLogin',
					method: 'POST',
					data: {
						UserName :_self.loginPhone,
						FileStr : _self.Base64
					}
				}
				_self.$http(obj).then((res) => {
					_self.$store.state.username = _self.loginPhone
					_self.$store.state.token = res.Data //数据中心在线存储
					uni.setStorage({ //将token存储在本地
						key: 'Token',
						data: res.Data,
						success: function() {
							uni.setStorage({ //将用户存储在本地
								key: 'admin',
								data: _self.loginPhone,
								success: function() {
									uni.switchTab({ //跳转至主页
										url: '/pages/home/home'
									})
								}
							});
						}
					});
				})
			},
			bitmapsave(basedata) {
				let _self = this;
				var bitmap = new plus.nativeObj.Bitmap("test");
				bitmap.loadBase64Data(basedata, function(e) {
					bitmap.save('_doc/_tmp/head' + new Date().getTime() + '.png', {}, function(e) {
						_self.logoSrcs.push(e.target);
					});

				}, function() {
					console.log('加载Base64图片数据失败：' + JSON.stringify(e));
				});
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.asd {
		width: 100%;
		height: 200px;
		overflow: auto;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 50upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.msg {
		text-align: left;
		padding: 40rpx;
		font-size: 25rpx;
		color: #F0AD4E;
	}
	
	.inputArea {
		padding: 20upx 10%;
		.right{
			float: right;
		}
	}
	.assd {
		margin-top: 30px;
		box-sizing: border-box;
	}
	.inputClass {
		border: 2px solid #ccc;
		border-radius: 22px;
		outline: 0;
		padding: 8px 15px;
		font-weight: bold;
	}
</style>
