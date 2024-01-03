<template>
	<view class="box_home">
		<!-- 标题 -->
		<p class="tit">
			主页
			<!-- <span>{{ this.$store.state.app_version }}</span> -->
		</p>

		<!-- 弹窗 -->
		<uni-popup ref="popup" type="dialog" style="z-index: 999">
			<uni-popup-dialog type="input" :title="Title" :content="Content" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>

		<!-- 播放视频 -->
		<view class="ZindexVideo" v-if="OPVideo">
			<video style="width: 100%" :src="Video" :poster="posterhttp" :autoplay="true"></video>
			<button @click="DelVideo()">关闭视频</button>
		</view>

		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :circular="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(itemed, indexed) in imgData" :key="indexed">
				<view class="swiper-item" style="position: relative">
					<image style="height: 50px" class="start" v-show="itemed.Video != null" src="../../static/icon/icon/start.png" @click="CliOPVideo(itemed)" mode=""></image>
					<image class="images" :src="'http://icms.inchwell.com.cn/file/IndexBanner/' + itemed.Image" @click="CliOPVideo(itemed)"></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 通知 -->
		<u-notice-bar v-if="$store.state.FormalService" mode="horizontal" class="notice_bar" type="warning" :list="Scroll_text_at_bottom"></u-notice-bar>

		<!-- 一级图标 -->
		<view class="content">
			<view android:gravity="center" class="list" v-for="(item, index) in $store.state.FormalService ? icon : icon_apple" :key="index" @tap="clickpath(index)">
				<view v-if="index == 4 && Data.ReturnVisit != ''" class="degmdg">{{ Data.ReturnVisit }}</view>
				<view v-if="index == 7 && Data.MCDelay != ''" class="degmdg">
					{{ Data.MCDelay }}
				</view>
				<image mode="" :class="item.AmierIMG"></image>
				<text>{{ item.text }}</text>
			</view>
		</view>

		<!-- 当前状态 -->
		<view class="card" @click="worksfun()" v-if="$store.state.FormalService">
			<h3>当前状态</h3>

			<p v-if="Data.EnginnerState" :style="{ color: Data.EnginnerState.Detail == 'WaitStatus' ? 'red' : '#5b8eff' }">
				{{ Data.EnginnerState.Detail == 'WaitStatus' ? '空闲 - - 检索到有未完成的任务，请及时校准' : Data.EnginnerState.Detail }}
			</p>

			<span>点击校准</span>
		</view>

		<!-- 二级图标 -->
		<view class="content" v-if="$store.state.FormalService">
			<view android:gravity="center" class="list" v-for="(item, index) in botLidt" :key="index" @tap="BotClick(index)">
				<view v-if="index == 2 && Data.UrgeWorkOrder != ''" class="degmdg">
					{{ Data.UrgeWorkOrder }}
				</view>
				<image mode="" :class="item.AmierIMG"></image>
				<text>{{ item.text }}</text>
			</view>
		</view>

		<view style="width: 100%; height: 70px; float: left"></view>

		<!-- 通知 -->
		<u-modal v-model="show" :show-title="true" title="打卡成功!" :content="content"></u-modal>

		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list" bg-color="#ffffff" style="border-radius: 10px" active-color="#486eff" icon-size="60"></u-tabbar>
	</view>
</template>

<script>
import API_POST from '../../utils/API_POST';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';

export default {
	components: {
		uniPopup,
		uniPopupMessage,
		uniPopupDialog
	},
	data: function () {
		return {
			show: false,
			content: '',
			Scroll_text_at_bottom: ['即日起保养任务前后对比照片只允许现场拍摄上传', '不再支持从手机相册中选择，请知晓。'],
			// 卡片头部样式
			headStyle: {
				padding: '10px 5px',
				'font-weight': 'bold'
			},
			bodyStyle: {
				padding: '10px 10px'
			},
			//轮播图资源
			imgList: [
				require('../../static/img/banners/006.jpg'),
				require('../../static/img/banners/007.jpg'),
				require('../../static/img/banners/008.jpg'),
				require('../../static/img/banners/009.jpg')
			],
			// 底部加的图标
			botLidt: [
				{
					name: 1,
					icon: require('../../static/img/icon/IP.png'),
					text: '定位坐标',
					AmierIMG: 'icon0IP'
				},
				{
					name: 1,
					icon: require('../../static/img/icon/KPI.png'),
					text: '每日打卡',
					AmierIMG: 'icon0KPI'
				},
				{
					name: 1,
					icon: require('../../static/img/icon/CC.png'),
					text: '工单催促',
					AmierIMG: 'icon0CC'
				},
				{
					name: 1,
					icon: require('../../static/img/icon/JJ.png'),
					text: '奖金明细',
					AmierIMG: 'icon0JJ'
				}
			],
			//功能区图标加文字
			icon: [
				{
					name: 1,
					icon: require('../../static/img/icon/1-1.png'),
					text: '工单管理',
					AmierIMG: 'icon01'
				},
				{
					name: 2,
					icon: require('../../static/img/icon/2-1.png'),
					text: '订单管理',
					AmierIMG: 'icon02'
				},
				{
					name: 6,
					icon: require('../../static/img/icon/6.png'),
					text: '安装管理',
					AmierIMG: 'icon03'
				},
				{
					name: 3,
					icon: require('../../static/img/icon/3.png'),
					text: '保养管理',
					AmierIMG: 'icon04'
				},
				{
					name: 5,
					icon: require('../../static/img/icon/5.png'),
					text: 'VIP回访',
					AmierIMG: 'icon05'
				},
				{
					name: 4,
					icon: require('../../static/img/icon/4.png'),
					text: '工作日报',
					AmierIMG: 'icon06'
				},
				{
					name: 7,
					icon: require('../../static/img/icon/7.png'),
					text: '零配件',
					AmierIMG: 'icon07'
				},
				{
					name: 8,
					icon: require('../../static/img/icon/0.png'),
					text: '全部',
					AmierIMG: 'icon08'
				}
			],
			icon_apple: [
				{
					name: 1,
					icon: require('../../static/img/icon/1-1.png'),
					text: '工单任务',
					AmierIMG: 'icon01'
				},
				{
					name: 2,
					icon: require('../../static/img/icon/2-1.png'),
					text: '订单任务',
					AmierIMG: 'icon02'
				},
				{
					name: 6,
					icon: require('../../static/img/icon/6.png'),
					text: '安装任务',
					AmierIMG: 'icon03'
				},
				{
					name: 3,
					icon: require('../../static/img/icon/3.png'),
					text: '保养任务',
					AmierIMG: 'icon04'
				},
			],
			//点击跳转页面路径
			path: [
				'/pages/home/works/work.1',
				'/pages/home/works/work.2',
				'/pages/home/works/work.6',
				'/pages/home/works/work.3',
				'/pages/home/works/work.5',
				'/pages/home/works/work.4',
				'/pages/home/works/work.7',
				'/pages/home/works/work.8'
			],
			Data: {},
			imgData: [],
			Video: '',
			OPVideo: false,

			list: [
				{
					iconPath: '/static/tabBar/home_no.png',
					selectedIconPath: '/static/tabBar/home.png',
					pagePath: '/pages/home/home'
				},
				{
					iconPath: '/static/tabBar/news_no.png',
					selectedIconPath: '/static/tabBar/news.png',
					pagePath: '/pages/news/news'
				},
				{
					iconPath: '/static/tabBar/user_no.png',
					selectedIconPath: '/static/tabBar/user.png',
					pagePath: '/pages/index/index'
				}
			],
			current: 1,
			Title: '',
			Content: ''
		};
	},
	onShow() {
		//初次登录状态
		var that = this;
		that.Data.ReturnVisit = '';
		that.Data.MCDelay = '';
		that.GetGCSHome();
		this.GetIndexBanners();

		//  初次会验证版本   如果需要更新则会提示    不需要更新则会进行下一步
		uni.getStorage({
			key: 'admin',
			success: function (res) {
				if (res.data == 'gcs_ios' || res.data == '') {
					return false;
				} else {
					console.log('获取版本信息！');
					that.getappversion();
				}
			},
			fail: function () {
				return false;
			}
		});
	},
	methods: {
		BotClick: function (index) {
			var row = index + 1;
			// 1 是定位坐标
			if (row == 1) {
				uni.navigateTo({
					url: '/pages/home/works/gcsmap/gcsmap'
				});
			}

			// 2 是打卡
			if (row == 2) this.clock_in_fun();

			// 3 是催促
			if (row == 3) {
				uni.navigateTo({
					url: '/pages/home/works/CuiCu/CuiCu'
				});
			}

			// 4 是奖金明细
			if (row == 4) {
				uni.navigateTo({
					url: '/pages/home/works/bonus/bonus'
				});
			}
		},
		// 工程师打卡
		async clock_in_fun() {
			let me = this;
			// 获取定位
			let IP = await this.getLocation();
			console.log(IP);

			API_POST('system/UploadMapCoordinate', { Longitude: String(IP.longitude), Latitude: String(IP.latitude) }).then((res) => {
				console.log(res);
				var text = '经度：' + IP.longitude + ' - ' + '纬度：' + IP.latitude;
				// 判断平台
				switch (uni.getSystemInfoSync().platform) {
					// 安卓使用 UNI UI
					case 'android':
						me.content = text;
						me.show = true;
						break;
					// 苹果 使用原生
					case 'ios':
						uni.showModal({
							title: '打卡成功！',
							content: text
						});
						break;
				}
			});
		},

		GetIndexBanners: function () {
			var obj = {
				method: 'GET',
				url: this.$store.state.url + 'System/GetIndexBanners',
				header: this.$store.state.token,
				data: {
					to: 2
				}
			};
			this.$httpnone(obj).then((res) => {
				console.log(res.Data.Dtos);
				this.imgData = res.Data.Dtos;
			});
		},
		DelVideo: function () {
			this.Video = '';
			this.OPVideo = false;
		},
		GetGCSHome: function () {
			var obj = {
				url: this.$store.state.url + 'System/GetGCSHome',
				method: 'GET'
			};
			this.$httpnone(obj).then((res) => {
				console.log(res.Data);
				(this.Data = res.Data), console.log(res.Data);
				// 判断是否有未读消息
				var NoMasgindex = res.Data.NoReadJournalism;
				if (NoMasgindex != 0) {
					uni.setTabBarBadge({
						index: 1,
						text: String(NoMasgindex)
					});
				}
				// 当状态为空闲时  判断是否存在其他任务
				if (this.Data.EnginnerState.Detail == '空闲' && this.Data.EnginnerWorking.length != 0) this.Data.EnginnerState.Detail = 'WaitStatus';
				this.$store.state.MCDelay = this.Data.MCDelay;
				// 判断是否弹出信息窗口
				if (res.Data.EjectMessage != null) {
					uni.showModal({
						title: res.Data.EjectMessage.Title,
						content: res.Data.EjectMessage.Content,
						success: function (resTwo) {
							if (resTwo.confirm) {
								console.log('用户点击确定');
							} else if (resTwo.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			});
		},

		// 切换目标状态
		worksfun: function () {
			uni.navigateTo({
				url: '/pages/home/works/works/works'
			});
		},
		//跳转 功能
		clickpath(i) {
			uni.navigateTo({
				url: this.path[i]
			});
		},
		CliOPVideo: function (Row) {
			if (Row.Video != null) {
				(this.posterhttp = 'http://icms.inchwell.com.cn/file/IndexBanner/' + Row.Image),
					(this.Video = 'http://icms.inchwell.com.cn/file/IndexBanner/' + Row.Video),
					console.log(this.Video);
				this.OPVideo = true;
			}
		},
		DelVideo: function () {
			this.Video = '';
			this.OPVideo = false;
		},

		// 获取当前版本号
		getappversion: function () {
			// #ifdef APP-PLUS
			const me = this;
			plus.runtime.getProperty(plus.runtime.appid, function (inf) {
				me.$store.state.currentVersion = inf.version;
				me.initUpdata(inf.version);
			});
			// #endif
		},
		// 分析版本差异
		initUpdata: function (version) {
			var obj = {
				url: this.$store.state.url + 'System/GetSysVersion',
				data: {
					mobile: 1,
					type: 2,
					clientVersion: version
				}
			};
			this.$httpnone(obj).then((res) => {
				// this.$store.state.Updata = false;
				// 判断是否需要更新  Update  True/false
				if (res.Data.Update) {
					// PkgUrl 有值为大更新
					if (res.Data.PkgUrl != null) {
						this.Title = '更新！';
						this.Content = res.Data.Description;
						this.Dupdata = true;
						this.PkgUrl = res.Data.PkgUrl;
						this.$refs.popup.open();
						// WgtUrl 有值为小更新
					} else {
						// 小更新
						plus.nativeUI.toast('下载更新文件...');
						this.downWgt(res.Data.WgtUrl); //下载wgt文件的方法
					}
				}
				console.log('不需要更新！');
				this.load = false;
				this.Msg = '检查完成';
			});
		},
		//下载安装包
		downWgt(WgtUrl) {
			const me = this;
			plus.downloader
				.createDownload(
					WgtUrl,
					{
						filename: '_doc/update/'
					},
					function (d, status) {
						if (status == 200) {
							//plus.nativeUI.toast("下载wgt成功："+d.filename);
							plus.nativeUI.toast('下载更新文件成功，安装中');
							me.installWgt(d.filename); // 安装wgt包
						} else {
							plus.nativeUI.toast('下载更新失败！');
						}
						plus.nativeUI.closeWaiting();
					}
				)
				.start();
		},
		//更新资源包
		installWgt(path) {
			plus.runtime.install(
				path,
				{},
				function () {
					plus.nativeUI.toast('应用资源更新完成！请重启App！', function () {
						plus.runtime.restart();
					});
					uni.showModal({
						title: '更新完成！',
						content: '热更新完成，请重启手机app',
						success: function (resTwo) {
							if (resTwo.confirm) {
								console.log('用户点击确定');
								plus.runtime.restart();
							} else if (resTwo.cancel) {
								console.log('用户点击取消');
								plus.runtime.restart();
							}
						}
					});
				},
				function (e) {
					plus.nativeUI.toast('安装wgt文件失败[' + e.code + ']：' + e.message);
				}
			);
		},
		close(done) {
			// ...				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
			done();
		},
		/**
		 * 点击确认按钮触发
		 * @param {Object} done
		 * @param {Object} value
		 */
		confirm(done, value) {
			// 输入框的值
			if (this.Dupdata) {
				plus.runtime.openURL(this.PkgUrl);
			}
			// ...// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
			done();
		}
	}
};
</script>

<style lang="scss" scoped>
.box_home {
	width: 100%;
	height: 100%;
	background-color: #f7f7f7;
	position: relative;
	top: 0;
	left: 0;
	padding-top: var(--status-bar-height);
	box-sizing: border-box;

	// 标题
	.tit {
		width: 100%;
		font-weight: bolder;
		font-size: 25px;
		text-align: left;
		line-height: 50px;
		font-family: 'Georgia';
		padding-left: 20px;
		box-sizing: border-box;
		span {
			font-size: 10px;
			color: #c9c9c9;
			font-family: serif;
			padding-left: 10px;
		}
	}

	// 轮播图
	swiper {
		height: 240px;

		.start {
			width: 50px;
			height: 50px;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			z-index: 99;
		}

		.uni-image > img {
			opacity: 1;
		}

		.swiper-item {
			background-color: #ffffff;

			.images {
				width: 100%;

				image {
					opacity: 1;
				}
			}
		}
	}

	// 播放视频
	.ZindexVideo {
		width: 100%;
		height: 100%;
		z-index: 99;
		position: absolute;
		top: 0;
		bottom: 0;
		padding: 40% 0 0 0;
		box-sizing: border-box;
		transition: 2s;
		background-color: #ffffff;
	}

	// 图标
	.content {
		width: 100%;

		.list {
			width: 23%;
			height: 100px;
			float: left;
			padding-top: 10px;
			margin: 1%;
			box-sizing: border-box;
			position: relative;
			border-radius: 10px;

			image {
				width: 45px;
				height: 45px;
				display: block;
				margin: auto;
			}

			.degmdg {
				width: 25px;
				height: 25px;
				border-radius: 50%;
				color: #ffffff;
				font-weight: bold;
				font-size: 10px;
				text-align: center;
				line-height: 25px;
				background-color: #ff0000;
				position: absolute;
				top: 0;
				right: 0;
				z-index: 100;
				box-sizing: border-box;
				transition: all 2s ease-out;
			}

			//1
			.icon01 {
				background-image: url(../../static/img/icon/1-1.png);
				background-size: 100% 100%;
			}

			//2
			.icon02 {
				background-image: url(../../static/img/icon/2-1.png);
				background-size: 100% 100%;
			}

			//6
			.icon03 {
				background-image: url(../../static/img/icon/3.png);
				background-size: 100% 100%;
			}

			//3
			.icon04 {
				background-image: url(../../static/img/icon/4.png);
				background-size: 100% 100%;
			}

			// 5
			.icon05 {
				background-image: url(../../static/img/icon/5.png);
				background-size: 100% 100%;
			}

			// 4
			.icon06 {
				background-image: url(../../static/img/icon/6.png);
				background-size: 100% 100%;
			}

			// 7
			.icon07 {
				background-image: url(../../static/img/icon/7.png);
				background-size: 100% 100%;
			}

			// 8
			.icon08 {
				background-image: url(../../static/img/icon/0.png);
				background-size: 100% 100%;
			}

			// 8
			.icon0IP {
				background-image: url(../../static/img/icon/IP.png);
				background-size: 100% 100%;
			}

			// 8
			.icon0KPI {
				background-image: url(../../static/img/icon/KPI.png);
				background-size: 100% 100%;
			}

			// 8
			.icon0CC {
				background-image: url(../../static/img/icon/CC.png);
				background-size: 100% 100%;
			}
			// 8
			.icon0JJ {
				background-image: url(../../static/img/icon/JJ.png);
				background-size: 100% 100%;
			}

			text {
				display: block;
				text-align: center;
				line-height: 40px;
				font-size: 15px;
			}
		}
	}

	// 当前状态
	.card {
		width: 90%;
		height: 80px;
		background-color: #ffffff;
		float: left;
		margin-left: 5%;
		padding: 0 10px;
		line-height: 40px;
		box-sizing: border-box;
		border-radius: 5px;
		position: relative;
		overflow: hidden;
		span {
			display: block;
			position: absolute;
			right: 10px;
			top: 0;
			bottom: 0;
			margin: auto;
			color: #5b8eff;
			font-weight: bold;
		}
	}

	// 通知
	.notice_bar {
		width: 100%;
		z-index: 88;
		background-color: #fef0f0;
		color: #fb4948;
	}
}
</style>
