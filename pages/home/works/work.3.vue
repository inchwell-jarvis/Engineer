<template>
	<view class="box">
		<view class="hezi" v-for="(item,index) in data" :key="index">
			<view class="left">
				<view class="text1">{{item.CustomerName}}</view>
				<view class="text2">{{item.Code}}</view>
				<view class="text3">{{item.BeginTime}}</view>
				<view class="text4">{{item.StateStr}}</view>
			</view>
			<view class="right">
				<button v-if="item.State == 1 ||  item.State == 8 || item.State == 9" type="primary" @tap="zhipai(item)" size="mini">指派</button>
				<button v-if="item.State == 2" type="primary" @tap="zhipai(item)" size="mini"> 接受</button>
				<button v-if="item.State == 3" type="primary" @tap="zhipai(item)" size="mini"> 出发</button>
				<button v-if="item.State == 6" type="primary" @tap="zhipai(item)" size="mini"> 到达</button>
				<button v-if="item.State == 7" type="primary" @tap="zhipai(item)" size="mini"> 处理</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				name: '赵鸿飞',
				data: []
			}
		},
		created() {
			this.init()
		},
		onBackPress() { //自定义返回逻辑
			uni.switchTab({
				url: "../home"
			});
			return true
		},
		// 右上角
		onNavigationBarButtonTap() {

			uni.navigateTo({
				url: "./maintenance/recording",
			});
		},
		methods: {
			//点击按钮判断状态
			zhipai: function(item) {
				this.$store.state.MaintenancestatusGoto = item.Goto
				this.$store.state.Maintenancestatus = item.State
				this.$store.state.MaintenancestatusID = item.MaintainId
				console.log(item.Goto)
				uni.navigateTo({
					url: "./maintenance/maintenance"
				})
			},
			init() {
				//初始数据接口
				var obj = {
					url: this.$store.state.url + 'Maintain/GetMaintains',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						search: ''
					}
				}
				this.$http(obj).then((res) => {
					this.data = res.Data
					console.log(this.data)
					for (var i = 0; i < this.data.length; i++) {
						this.data[i].BeginTime = this.data[i].BeginTime.split('T')[0]
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		// background-color: #e7e7e7;

		.hezi {
			width: 97%;
			height: 80px;
			background: #FFFFFF;
			margin: auto;
			border-radius: 10px;
			margin-top: 5px;
			padding: 5px;
			box-sizing: border-box;

			.left {
				width: 75%;
				height: 100%;
				float: left;
				padding-right: 20px;
				box-sizing: border-box;

				text {
					display: block;
				}

				.text1 {
					width: 100%;
					height: 30px;
					line-height: 30px;
					font-weight: bold;
					overflow: hidden;
				}

				.text2 {
					font-size: 12px;
					height: 20px;
					line-height: 20px;
				}

				.text3 {
					float: left;
				}

				.text4 {
					float: right;
				}
			}

			.right {
				width: 25%;
				height: 100%;
				float: left;

				button {
					width: 50px;
					display: block;
					margin: auto;
					margin-top: 20px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					padding: 0;
				}
			}
		}



	}
</style>
