<template>
	<view class="boxyl9m6g0t8ls8aetn">
		<hx-navbar :config="config" @clickBtn='rightCion' ></hx-navbar>
		<u-search  class='search' placeholder="客户名称" v-model="keyword" @change='searchFun()'    ></u-search>
		<view style="width: 100%;height: 30px;"></view>
		<u-card v-for="(item,index) in Data" :key="index" :title="item.CustomerName" @tap="seedetails(item)" :head-style='headStyle'
		 :body-style='bodyStyle' box-shadow='2px 3px 4px #c1c1c1' :sub-title="item.State == true? '已完成' : '未完成'"
		 :sub-title-color="item.State == true? '#00b200' : '#5b8eff'" class='ZTstate'>
			<view class="" slot="body">
				<view class="textCode">
					{{item.Engineer + ' - ' + item.ServiceType}}
					<span style='float: right;'>{{item.ServiceDate}}</span>
				</view>
			</view>
		</u-card>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				config: {
					title: '工作日报',
					color: '#000000',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,'#f6f6f6'],
					// 状态栏 ，数组则为滑动变色
					statusBarBackground: ['', '#ffffff'],
					font: 'xff001',
					rightButton: [{
						key: '001',
						icon: '&#xe601;',
						position: 'right'
					}],
				},
				
				// 卡片头部样式
				headStyle: {
					'padding': '10px 5px',
					'font-weight': 'bold'
				},
				bodyStyle: {
					'padding': '10px 10px'
				},
				name: '赵鸿飞',
				path: './detailed/Add_order',
				url: this.$store.state.url,
				Data: [],
				numPerPage: 20, //每条展示多少，触底后增加
				pageNum: 1,
				keyword:'',// 检索项
			}
		},
		onBackPress() { //自定义返回逻辑
			uni.switchTab({
				url: "../home"
			});
			return true
		},
		mounted() {
			this.add()
		},
		onReachBottom: function(e) {
			this.pageNum += 1
			this.add()
		},
		methods: {
			rightCion:function(er){
				uni.navigateTo({
					url: "./detailed/Add_order",
				});
			},
			// 检索  由于检索需要每次清楚Data 所以不能和init使用同一fun
			searchFun:function(){
				var obj = {
					url: this.$store.state.url + 'PCenter/GetWorkDailiys',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						pageNum: this.pageNum,
						numPerPage: this.numPerPage,
						orderField: '',
						orderDirection: '',
						fullname: this.keyword,
						enginner: '',
						begin: '',
						end: '',
					}
				}
				this.$http(obj).then((res) => {
					this.Data = res.Data.WorkDailyDtos
				})
			},
			//初始化
			add: function() {
				var obj = {
					url: this.$store.state.url + 'PCenter/GetWorkDailiys',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						pageNum: this.pageNum,
						numPerPage: this.numPerPage,
						orderField: '',
						orderDirection: '',
						fullname: '',
						enginner: '',
						begin: '',
						end: '',
					}
				}
				this.$http(obj).then((res) => {
					this.Data[0] ? this.Data = this.Data.concat(res.Data.WorkDailyDtos) : this.Data = res.Data.WorkDailyDtos
					for (var i = 0; i < this.Data.length; i++) {
						this.Data[i].ServiceDate = this.Data[i].ServiceDate.split('T')[0]
					}
				})
			},
			//查看详情
			seedetails(i) {
				if (i.State) {
					console.log(i.WorkdailyId)
					uni.navigateTo({
						url: './detailed/details?id=' + i.WorkdailyId
					});
				} else {
					this.edit(i)
				}
			},
			//编辑
			edit(item) {
				console.log(item)
				this.$store.state.WorkdailyId = item.WorkdailyId
				uni.navigateTo({
					url: 'detailed/Editfile'
				});
			}
		},

	}
</script>

<style lang="scss">
	
	.boxyl9m6g0t8ls8aetn {
		width: 100%;
		background-color: #FFFFFF;
		font-size: 13px;
		overflow: auto;
		box-sizing: border-box;
		
		.search{
			width: 100%;
			position: fixed;
			top: 30;
			left: 0;
			z-index: 100;
			background-color: #f6f6f6;
		}

		.textCode {
			width: 100%;
			line-height: 20px;
		}


		.pro {
			width: 95%;
			height: 80px;
			background-color: #FFFFFF;
			border-bottom: 0.5px solid #C0C0C0;
			margin: auto;
			border-radius: 5px;

			.top {
				width: 100%;
				height: 50%;
				padding: 0 10px;
				box-sizing: border-box;
				margin-top: 10px;
				line-height: 40px;

				.text1 {
					width: 85%;
					float: left;
					height: 100%;
					font-weight: bold;
					overflow: hidden;
				}

				.text2,
				.text22 {
					width: 15%;
					float: right;
					height: 100%;
					color: #ff0000;
				}

				.text22 {
					float: right;
					color: #C0C0C0;
				}

				.text3 {
					float: left;
					margin-right: 10px;
				}

				button {
					width: 100rpx;
					height: 40rpx;
					font-size: 10px;
					text-align: center;
					line-height: 40rpx;
					float: right;
					margin-top: 20rpx;
					background-color: #2196F3;
					color: #FFFFFF;
					padding-left: 0;
					padding-right: 0;
				}
			}
		}
	}
</style>
