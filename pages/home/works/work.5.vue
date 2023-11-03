<template>
	<view class="Trans">
		<view class="topone">
			<u-search placeholder="请输入检索项" @change='sou()' v-model="add"></u-search>
		</view>
		<view class="Data" v-for="(item,index) in Data" :key="index" @tap="VIP(item)">
			<view class="text1">{{item.CusFullName}}</view>
			<text class="text3">{{item.EarlyWarning}}</text>
			<text class="text2">回访周期：<span>{{item.Cycle}}</span></text>
			<text class="text4">上次回访周期：<span>{{item.LastVisit}}</span></text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				name: '赵鸿飞',
				Data: [],
				add: '',
				load:false,
			}
		},
		onBackPress() { //自定义返回逻辑
			uni.switchTab({
				url: "../home"
			});
			return true
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			//       console.log(option.item); //打印出上个家伙传递的参数。
			// this.name = option.item
		},
		created() {
			var obj = {
				url: this.$store.state.url + 'System/GetReturnVisit',
				method: 'GET',
				header: this.$store.state.token,
				data: {
					search: ''
				}
			}
			this.$http(obj).then((res) => {
				this.Data = res.Data
			})
		},
		methods: {
			sou() {//搜索
				this.load = true
				var obj = {
					url: this.$store.state.url + '/System/GetReturnVisit',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						search: this.add
					}
				}
				this.$http(obj).then((res) => {
					this.load = false
					this.Data = res.Data
				})
			},
			VIP(item) {//vip跳转创建订单
				this.$store.state.vipitem = item
				this.$store.state.vip = true
				uni.navigateTo({
					url: "/pages/home/works/detailed/Add_order",
				});

			}
		}
	}
</script>

<style scoped lang="scss">
	.Trans {
		width: 100%;
		height: 100%;
		background: #efefef;

		.topone {
			width: 100%;
			height: 50px;
			padding-left: 20px;
			padding-top: 10px;
			box-sizing: border-box;
			background: #f8f8f8;

			input {
				width: 60%;
				height: 25px;
				border: 1px solid #C0C0C0;
				border-radius: 5px;
				float: left;
				padding-left: 10px;
				box-sizing: border-box;
				font-size: 12px;
			}

			button {
				width: 60px;
				height: 25px;
				line-height: 25px;
				text-align: 60px;
				font-size: 13px;
			}
		}

		.Data {
			width: 100%;

			background: #FFFFFF;
			border: 1px solid #e6e6e6;
			padding: 5px 15px;
			box-sizing: border-box;
			font-size: 15px;

			text {
				display: block;
				color: #808080;
				font-size: 13px;
			}

			view {
				height: 35px;
				font-weight: bold;
			}

			.text2 {
				line-height: 35px;
			}

			.text3 {
				float: right;
				font-size: 40px;
				font-weight: bolder;
				color: #D42B2E;
			}

		}
	}
</style>
