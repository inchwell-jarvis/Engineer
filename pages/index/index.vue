<template>
	<view class="box">

		<p class="tit">我的</p>

		<view class="Me">
			<u-avatar src="xxx" size='large'></u-avatar>
			<view class="Me1Right">
				<h2>{{ username || '请登录'}}</h2>
				<br>
				<p >英之杰天祥</p>
				<!-- <p style='text-indent:2em'>英之杰天祥</p> -->
			</view>
		</view>
		
		<!-- 
		 navigator 需要设置背景全透明，不然在点击的时候会显示灰色背景
		 -->
		<navigator :url="'./functional_testing/functional_testing'" style="background-color: rgba(0, 0, 0, 0);">
			<view class="operate">
				<div class="icon">
					<u-image width="30px" height="30px" src="/static/MePageIcon/folder.png"></u-image>
				</div>
				<div class="txt">
					功能测试
				</div>
			</view>
		</navigator>

		<navigator :url="'./about_company/index'" style="background-color: rgba(0, 0, 0, 0);">
			<view class="operate">
				<div class="icon">
					<u-image width="30px" height="30px" src="/static/MePageIcon/folder.png">></u-image>
				</div>
				<div class="txt">
					关于公司
				</div>
			</view>
		</navigator>

		<navigator :url="'./UserManual/UserManual'" style="background-color: rgba(0, 0, 0, 0);">
			<view class="operate">
				<div class="icon">
					<u-image width="30px" height="30px" src="/static/MePageIcon/folder.png">></u-image>
				</div>
				<div class="txt">
					使用手册
				</div>
			</view>
		</navigator>

		<navigator :url="'./check_updates/index'" style="background-color: rgba(0, 0, 0, 0);">
			<view class="operate">
				<div class="icon">
					<u-image width="30px" height="30px" src="/static/MePageIcon/folder.png">></u-image>
				</div>
				<div class="txt">
					检查更新
				</div>
			</view>
		</navigator>

		<view class="operate" @tap="signOut()">
			<div class="icon">
				<u-image width="30px" height="30px" src="/static/MePageIcon/signOut.png">></u-image>
			</div>
			<div class="txt">
				退出登录
			</div>
		</view>


		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list" bg-color='#ffffff' style='border-radius: 10px;' active-color='#486eff'
			icon-size='60'>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '', //登录用户

				list: [{
						iconPath: "/static/tabBar/home_no.png",
						selectedIconPath: "/static/tabBar/home.png",
						pagePath: '/pages/home/home'
					},
					{
						iconPath: "/static/tabBar/news_no.png",
						selectedIconPath: "/static/tabBar/news.png",
						pagePath: '/pages/news/news'
					},
					{
						iconPath: "/static/tabBar/user_no.png",
						selectedIconPath: "/static/tabBar/user.png",
						pagePath: '/pages/index/index'
					},
				],
				current: 1,
				MeIcon: 'http://82.156.205.133:9527/public/images/2237928292.png',
			}
		},
		onShow() {
			this.initUserName()
		},
		created() {
			this.initUserName()
		},
		methods: {
			initUserName: function() {
				var that = this
				uni.getStorage({
					key: 'admin',
					success: function(res) {
						console.log(res.data)
						that.username = res.data
					}
				});
			},
			Click_Index: function(item) {
				var that = this
				// 判断是否存在页面
				if (item.Lick_url == '') {
					return false
				}
				uni.navigateTo({
					url: item.Lick_url,
				});
			},

			//退出登录
			signOut: function() {
				var that = this
				this.$store.state.token = ''
				uni.setStorage({ //清空本地Token
					key: 'Token',
					data: '',
					success: function() {
						uni.navigateTo({
							url: "../Logo/Logo",
						});
					}
				});
			},


		}
	}
</script>
<style lang="scss" scoped>
	.box {
		padding: 0 20px 0;
		padding-top: var(--status-bar-height);
		box-sizing: border-box;
		background-color: #f7f7f7;

		.tit {
			width: 100%;
			font-weight: bolder;
			font-size: 25px;
			text-align: left;
			line-height: 50px;
			font-family: 'Georgia';
		}

		.Me {
			width: 100%;
			height: 150px;
			background-color: #FFFFFF;
			border-radius: 10px;
			padding: 20px;
			box-sizing: border-box;

			.Me1Right {
				width: 70%;
				height: 100%;
				float: right;

				p {
					font-size: 12px;
				}
			}
		}

		.operate {
			width: 100%;
			height: 50px;
			border-radius: 10px;
			background-color: #FFFFFF;
			padding: 10px;
			margin-top: 10px;
			box-sizing: border-box;
			line-height: 50px;
			transition: 0.2s;

			.icon {
				width: 30px;
				height: 30px;
				float: left
			}

			.txt {
				width: calc(100% - 30px);
				height: 100%;
				float: left;
				line-height: 33px;
				padding-left: 30px;
				box-sizing: border-box;
			}
		}

	}
</style>