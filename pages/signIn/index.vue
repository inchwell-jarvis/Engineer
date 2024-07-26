<template>
	<view class="box">
		<!-- 公司LOGO -->
		<image class="img" src="../../static/img/zhi.png" mode=""></image>

		<!-- 用户名 -->
		<view class="inputArea assd">
			<u-input v-model="account" placeholder="请输入账号" type="text" :border="true" />
			<!-- <br /> -->
			<!-- <u-input v-model="password" placeholder="请输入密码" type="password" :border="true" /> -->
		</view>

		<!-- 登陆按钮 -->
		<view class="inputArea">
			<!-- <u-button type="primary" size="medium" @tap="account_fun()" class="logon">登 录</u-button> -->
			<u-button type="primary" size="medium" @tap="inter(2)" class="logon">人脸登录</u-button>
			<br />
			<br />
			<p>
				<!-- <span style="color: #2979ff" @tap="inter(2)">人脸登录</span> -->
				<span style="float: right; color: #19be6b" @click="register_fun()">无账号？申请注册成为英之杰工程师</span>
			</p>
		</view>
		<!-- 测试使用账号 -->
		<view v-if="mode" class="inputArea" style="margin-top: 50px">
			<u-button type="warning" size="medium" @tap="gcs" class="cheat">工程师</u-button>
			<u-button type="warning" size="medium" @tap="qyjl" class="cheat">区域经理</u-button>
			<u-button type="success" size="medium" @tap="del" class="cheat">切回生产</u-button>
		</view>
		<!-- 测试端口展示 -->
		<view v-if="TestPort" class="test">6001</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			account: '', //账号
			password: '', //密码
			mode: false, //false为生产 ， true为测试
			TestPort: false,
			msg: '',
			isSound: false,
			AutoClip: true,
			backCamera: false,
			data: [],
			Base64: ''
		};
	},
	onShow() {
		// 读取储存的用户名，自动填写
		var that = this;
		uni.getStorage({
			key: 'admin',
			success: function (res) {
				console.log(res.data);
				if (that.account == '' || that.account == null) {
					that.account = res.data;
				}
			}
		});
		if (this.$store.state.url == 'http://39.100.116.85:6001/api/') {
			this.TestPort = true;
			this.mode = true;
		} else {
			this.TestPort = false;
			this.mode = false;
		}
	},
	methods: {
		// 注册
		register_fun() {
			uni.navigateTo({
				//跳转至主页
				url: '/pages/signIn/register'
			});
		},
		// 账号密码登录
		account_fun() {
			// 判断是否想要进入测试环境
			if (this.account == 'gototest' || this.account == 'goto test' || this.account == 'Goto test' || this.account == 'Gototest') {
				this.mode = true;
				this.$store.state.url = 'http://39.100.116.85:6001/api/'; //  ·············接口头部
				this.$store.state.httpurl = 'http://39.100.116.85:6001'; //  ··············外部路径
				this.$store.state.httpimgs = 'http://39.100.116.85:6001'; // ··············零配件  九图  链接头部
				uni.showToast({
					title: '进入测试环境',
					icon: 'none'
				});
				this.TestPort = true;
				return false;
			}

			// -----------------------------------
			if (!this.account) {
				return uni.showToast({ title: '请输入账号', icon: 'none' });
			}
			if (!this.password) {
				return uni.showToast({ title: '请输入密码', icon: 'none' });
			}
			//登录
			var obj = {
				url: this.$store.state.url + 'Account/Login',
				method: 'POST',
				data: {
					username: this.account,
					password: this.password
				}
			};
			let _self = this;
			_self.$http(obj).then((res) => {
				console.log(res);
				_self.$store.state.username = _self.account;
				_self.$store.state.token = res.Data; //数据中心在线存储
				if (this.account == 'gcs_ios') {
					_self.$store.state.FormalService = false;
				} else {
					_self.$store.state.FormalService = true;
				}
				uni.setStorage({
					//将token存储在本地
					key: 'Token',
					data: res.Data,
					success: function () {
						uni.setStorage({
							//将用户存储在本地
							key: 'admin',
							data: _self.account,
							success: function () {
								uni.switchTab({
									//跳转至主页
									url: '/pages/home/home'
								});
							}
						});
					}
				});
			});
		},
		// 切换生产
		del: function () {
			this.mode = false;
			(this.$store.state.url = 'http://webapi.inchwell.com.cn/api/'), //  ·············接口头部
				(this.$store.state.httpurl = 'http://webapi.inchwell.com.cn'), //  ··············外部路径
				(this.$store.state.httpimgs = 'http://webapi.inchwell.com.cn'), // ··············零配件  九图  链接头部
				uni.showToast({
					title: '进入生产环境',
					icon: 'none'
				});
			this.TestPort = false;
		},
		gcs() {
			//工程师测试账号
			(this.account = 'gcs'), (this.password = '123456'), this.Logo();
		},
		qyjl() {
			//区域经理测试账号
			(this.account = 'quyujingli'), (this.password = '888888'), this.Logo();
		},
		// 提供测试环境使用
		Logo() {
			var that = this;
			var obj = {
				url: that.$store.state.url + 'Account/Login',
				method: 'POST',
				data: {
					username: that.account,
					password: that.password
				}
			};
			that.$http(obj).then((res) => {
				console.log('登录成功返回值——text：');
				console.log(res);
				that.$store.state.username = that.account;
				that.$store.state.token = res.Data; //数据中心在线存储
				that.$store.state.FormalService = true;
				console.log('新的Token身份：' + res.Data);
				//将token存储在本地
				uni.setStorage({
					key: 'Token',
					data: res.Data,
					success: function () {
						//将用户存储在本地
						uni.setStorage({
							key: 'admin',
							data: that.account,
							success: function () {
								//跳转至主页
								uni.switchTab({
									url: '/pages/home/home'
								});
							}
						});
					}
				});
			});
		},

		inter(inx) {
			// 判断是否想要进入测试环境
			if (this.account == 'gototest' || this.account == 'goto test' || this.account == 'Goto test' || this.account == 'Gototest') {
				this.mode = true;
				this.$store.state.url = 'http://39.100.116.85:6001/api/'; //  ·············接口头部
				this.$store.state.httpurl = 'http://39.100.116.85:6001'; //  ··············外部路径
				this.$store.state.httpimgs = 'http://39.100.116.85:6001'; // ··············零配件  九图  链接头部
				uni.showToast({
					title: '进入测试环境',
					icon: 'none'
				});
				this.TestPort = true;
				return false;
			}

			// 正常登陆
			const _self = this;
			if (_self.account == '') {
				uni.showToast({
					title: '请输入账号',
					icon: 'none'
				});
				return false;
			} else {
				// 将用户名储存在本地
				uni.setStorage({
					key: 'account',
					data: _self.account
				});
			}
			// 使用公司百度云API人脸离线储存
			_self.Base64 = '';
			const PPFace = uni.requireNativePlugin('PP-BaiduFace');
			let config = {
				licenseName: 'idl-license',
				licenseSuffix: 'face-android',
				licenseId: 'yzj-v3-face-android',
				liveActionArray: ['Eye', 'HeadLeft', 'HeadLeftOrRight'],
				bgColor: '#56445D',
				textColor: '#C5E99B',
				isSound: _self.isSound, //默认是否开启语音提示（仅Android有效）默认值：false
				AutoClip: _self.AutoClip, //自动裁剪用户脸部区域 默认：false
				isBackCamera: _self.backCamera //启用后置摄像头
			};
			console.log(plus.os.name);

			if (plus.os.name == 'iOS') {
				config.licenseSuffix = 'face-ios';
				config.licenseId = 'yzj-v3-face-ios';
			}
			console.log(inx);
			if (inx == 1) {
				PPFace.faceliveness(config, (result) => {
					_self.msg = new Date().getHours() + ':' + new Date().getMinutes() + '  ' + JSON.stringify(result) + '<br/>' + _self.msg;
					if (result.FaceStatusEnum == '"OK"') {
						_self.saveImgs(result.base64ImageMap);
					}
				});
			} else if (inx == 2) {
				PPFace.recycler(config, (result) => {
					_self.msg = new Date().getHours() + ':' + new Date().getMinutes() + '  ' + JSON.stringify(result) + '<br/>' + _self.msg;
					if (result.FaceStatusEnum == '"OK"') {
						_self.saveImgs(result.base64ImageMap);
					}
				});
			}
		},
		saveImgs(imgsobj) {
			console.log('正在请求登录！');
			let _self = this;
			_self.logoSrcs = [];
			for (let key in imgsobj) {
				var base64data = imgsobj[key];
				_self.bitmapsave(base64data);
				_self.Base64 = base64data; //头部需添加data:image/jpg;base64,    然后base64倒转
			}
			var obj = {
				url: _self.$store.state.url + 'Account/FaceLogin',
				method: 'POST',
				data: {
					UserName: _self.account,
					FileStr: _self.Base64
				}
			};
			_self
				.$uniweb(obj)
				.then((res) => {
					console.log('登录成功信息：');
					console.log(res);
					_self.$store.state.username = _self.account;
					_self.$store.state.token = res.Data; //数据中心在线存储
					_self.$store.state.FormalService = true;

					uni.setStorage({
						//将token存储在本地
						key: 'Token',
						data: res.Data,
						success: function () {
							uni.setStorage({
								//将用户存储在本地
								key: 'admin',
								data: _self.account,
								success: function () {
									uni.switchTab({
										//跳转至主页
										url: '/pages/home/home'
									});
								}
							});
						}
					});
				})
				.catch((res) => {
					console.log('登录失败！');
				});
		},
		// 获取base64位图片
		bitmapsave(basedata) {
			let _self = this;
			var bitmap = new plus.nativeObj.Bitmap('test');
			bitmap.loadBase64Data(
				basedata,
				function (e) {
					bitmap.save('_doc/_tmp/head' + new Date().getTime() + '.png', {}, function (e) {
						_self.logoSrcs.push(e.target);
					});
				},
				function () {
					console.log('加载Base64图片数据失败：' + JSON.stringify(e));
				}
			);
		}
	}
};
</script>

<style scoped lang="scss">
.box {
	width: 100%;
	height: 100%;
	background-color: #ffffff;
	overflow: hidden;

	.test {
		padding: 10px;
		position: fixed;
		bottom: 0;
		right: 0;
		color: #808080;
	}

	// background-image: url(../../static/img/QQ.jpg) ;
	// background-size: 100% 100%;
	.img {
		width: 100px;
		height: 100px;
		display: block;
		margin: auto;
		margin-top: 80px;
		box-sizing: border-box;
	}

	.assd {
		margin-top: 30px;
		box-sizing: border-box;
	}
}

.inputArea {
	padding: 20upx 10%;

	//登录按钮
	.logon {
		width: 100%;
	}

	.cheat {
		width: 50%;
		margin: auto;
		margin: 10px 25%;
	}
}

.inputClass {
	border: 1px solid #ccc;
	border-radius: 5px;
	outline: 0;
	padding: 8px 15px;
	font-weight: bold;
}
</style>
