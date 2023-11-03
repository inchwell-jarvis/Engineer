<template>
	<view class="box">
		<!-- 头部 -->
		<p class="header">
			消息
			<span>{{ indexINIT }} 条未读</span>
			<u-image width="26px" height="26px" style="float: right" src="/static/news/empty.png" @tap="OneTabAllRead()"></u-image>
		</p>

		<!-- 消息列表 -->
		<div class="msg_list">
			<view class="operate" v-for="(item, index) in Msg" @tap="seeDetails(item)">
				<div class="icon">
					<u-image v-if="!item.Read" width="30px" height="30px" src="/static/news/news.png"></u-image>
					<u-image v-if="item.Read" width="30px" height="30px" src="/static/news/news_no.png"></u-image>
				</div>
				<div class="txt">
					<div class="Title">
						<div class="T1">
							<h3>{{ item.Title }}!</h3>
						</div>
						<div class="T2">{{ item.BeginTime.split('T')[0] }}</div>
					</div>
					<text>{{ item.Con }}</text>
				</div>
			</view>
			<u-empty v-if="Msg.length == 0" text="消息列表为空" mode="message"></u-empty>
		</div>

		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list" bg-color="#ffffff" style="border-radius: 10px" active-color="#486eff" icon-size="60"></u-tabbar>
	</view>
</template>

<script>
import API_GET from '../../utils/API_GET';
export default {
	data() {
		return {
			Msg: [],
			pageNum: 1,
			pagesize: 50,
			indexINIT: 0,
			index: 0,
			length: 0,
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
			current: 1
		};
	},

	onShow() {
		this.pageNum = 1;
		this.init();
	},
	
	onReachBottom() {
		// this.pagesize += 10
		this.pageNum += 1;
		this.init();
	},

	methods: {
		// 一键已读
		OneTabAllRead: function () {
			this.index = 0;
			if (this.Msg.length != 0) {
				if (this.Msg.length > 10) {
					this.length = 10;
				} else {
					this.length = this.Msg.length;
				}

				for (var index = 0; index < this.length; index++) {
					this.ReadJournalism(this.Msg[index].ID);
				}
			}
		},
		// 标为已读
		ReadJournalism: function (SoId) {
			var obj = {
				method: 'POST',
				url: this.$store.state.url + 'System/ReadJournalism',
				header: this.$store.state.token,
				data: {
					Id: SoId
				}
			};
			this.$httpnone(obj).then((res) => {
				uni.hideTabBarRedDot({
					index: 1
				});
				this.indexINIT = 0;

				this.index += 1;
				console.log(this.index, this.length);
				if (this.index == this.length) {
					this.Msg = [];
					this.init();
				}
			});
		},
		// 打开消息详细页
		seeDetails: function (row) {
			console.log(row);
			uni.navigateTo({
				url: './seeDetails?Con=' + row.Content + '&Tit=' + row.Title + '&Id=' + row.ID
			});
		},
		init: function () {
			let data = {
				search: '',
				pageNum: this.pageNum,
				numPerPage: this.pagesize,
				orderField: '',
				orderDirection: ''
			};
			this.API_GET('System/GetJournalisms', data).then((rv) => {
				console.log(rv);
				if (this.Msg == []) {
					this.Msg = rv.Data.Dtos;
				} else {
					this.Msg = this.Msg.concat(rv.Data.Dtos);
				}
				var regex = /(<([^>]+)>)/gi;
				for (var index = 0; index < this.Msg.length; index++) {
					this.Msg[index]['Con'] = this.Msg[index].Content.replace(regex, '');
					if (index < 10) {
						if (this.Msg[index].Read == false) this.indexINIT += 1;
					}
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.box {
	padding: 0 20px 0;
	padding-top: var(--status-bar-height);
	box-sizing: border-box;
	background-color: #f7f7f7;
	width: 100%;
	height: 100%;

	.header {
		width: 100%;
		height: 50px;
		font-weight: bolder;
		font-size: 25px;
		text-align: left;
		line-height: 50px;
		font-family: 'Georgia';
		box-sizing: border-box;

		span {
			font-size: 12px;
			font-family: 'YouYuan';
			margin-left: 20px;
		}

		.Read {
			float: right;
		}
	}

	.msg_list {
		width: 100%;
		height: calc(100% - 100px);
		overflow: auto;
	}

	.operate {
		width: 100%;
		height: 70px;
		border-radius: 10px;
		background-color: #ffffff;
		padding: 10px;
		margin-top: 10px;
		box-sizing: border-box;
		line-height: 50px;
		transition: 0.2s;

		.icon {
			width: 30px;
			height: 100%;
			float: left;
		}

		.txt {
			width: calc(100% - 30px);
			height: 100%;
			float: left;
			line-height: 27px;
			padding-left: 30px;
			box-sizing: border-box;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			.Title {
				width: 100%;
				height: 30px;

				.T1 {
					width: calc(100% - 80px);
					height: 100%;
					float: left;

					h3 {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding-right: 20px;
						box-sizing: border-box;
					}
				}

				.T2 {
					width: 80px;
					height: 100%;
					float: left;
					color: #cccccc;
				}
			}
		}
	}

	.operate:active {
		background-color: #e4eafa;
	}
}

// .box-hie {
// 	width: 100%;
// 	background-color: #FFFFFF;
// 	position: relative;
// 	padding-top: 80px;
// 	box-sizing: border-box;

// 	.head {
// 		position: fixed;
// 		top: 0px;
// 		left: 0;
// 		width: 100%;
// 		height: 80px;
// 		background-color: #1678ff;
// 		padding-top: 30px;
// 		padding-left: 20px;
// 		box-sizing: border-box;
// 		line-height: 50px;
// 		font-weight: bolder;
// 		font-size: 18px;
// 		color: #ececec;
// 		z-index: 99;

// 		span {
// 			font-size: 14px;

// 		}

// 	}

// 	.card {
// 		width: 90%;
// 		background-color: #ffffff;
// 		margin: auto;
// 		border-radius: 7px;
// 		overflow: hidden;
// 		margin-top: 10px;
// 		padding: 10px;
// 		border: 0.3px solid #d9e7f1;
// 		box-sizing: border-box;
// 		-webkit-box-shadow: 9px 9px 6px #d9e7f1;
// 		-moz-box-shadow: 9px 9px 6px #d9e7f1;
// 		box-shadow: 3px 3px 6px #d9e7f1;
// 		position: relative;

// 		.init {
// 			position: absolute;
// 			right: 3px;
// 			top: 3px;
// 		}

// 		h3 {
// 			color: #545454;
// 			font-size: 15px;

// 			span {
// 				float: right;
// 				color: #adadad;
// 				font-size: 12px;

// 			}
// 		}

// 		p {
// 			text-indent: 2em;
// 			color: #919191;
// 			font-size: 12px;
// 			margin-top: 10px;
// 			overflow: hidden;
// 			white-space: nowrap;
// 			text-overflow: ellipsis;
// 		}

// 	}
// }
</style>
