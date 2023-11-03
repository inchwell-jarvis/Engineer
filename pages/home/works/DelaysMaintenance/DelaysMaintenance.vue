<template>
	<view class="box">
		<div class="title">
			<div class="left">
				<u-button type="primary" size="mini" @click='but()'>{{butStr}}</u-button>
			</div>
			<div class="right">
				<u-search class='search' placeholder="请输入关键词检索" v-model="search" @change='GetMCDelay()'></u-search>
			</div>
		</div>

		<u-picker v-model="show" mode="selector" :range="selectorObj" @confirm='confirmS' range-key="cateName"
			:default-selector="[4]"></u-picker>


		<view style="width: 100%;height: 30px;"></view>

		<u-card v-for="(item,index) in Data" :key="index + 'fei' " :title="item.CustomerFullName"
			:head-style='headStyle' :body-style='bodyStyle' box-shadow='2px 3px 4px #c1c1c1'
			:sub-title=" '超 ' + String(item.Overtime)" :sub-title-color="item.Overtime > 14 ? 'red' : '#ffaa00'"
			class='ZTstate' @tap='edit(item)'>
			<view class="" slot="body">
				<view class="textCode">
					{{item.Area + ' - ' + item.TaskCode}}
					<span
						style='float: right;'>{{ '预 ' + ( item.EstimateDate == null ? '' : item.EstimateDate.split('T')[0]) }}</span>
				</view>
			</view>
		</u-card>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				search: '',
				ServiceRegionalId: '',
				state: 3,
				show: false,
				selectorObj: [{
						cateName: '全部',
						id: -1
					},
					{
						cateName: '未启动',
						id: 0
					}, {
						cateName: '已启动',
						id: 1
					}, {
						cateName: '已完成',
						id: 2
					},
					{
						cateName: '未完成',
						id: 3
					},
				],
				Data: [],
				headStyle: {
					'padding': '10px 5px',
					'font-weight': 'bold'
				},
				bodyStyle: {
					'padding': '10px 10px'
				},
				butStr: '未完成'
			};
		},
		onShow(){ 
			// this.init()
			var that = this
			uni.getStorage({
				key: 'Token',
				success: function(res) {
					console.log(res.data)
					that.init(res.data)
				}
			})
		},
		onBackPress() { //自定义返回逻辑
			uni.switchTab({
				url: "../../home"
			});
			return true
		},
		methods: {
			//在起始页面跳转到test.vue页面并传递参数
			// uni.navigateTo({
			// 	url: 'test?id=1&name=uniapp'
			// });

			// // 在test.vue页面接受参数
			// export default {
			// 	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			// 		console.log(option.id); //打印出上个页面传递的参数。
			// 		console.log(option.name); //打印出上个页面传递的参数。
			// 	}
			// }

			// 前往编辑页
			edit: function(row) {
				console.log(row)
				uni.navigateTo({
					url: "./edit/edit?ID=" + JSON.stringify(row),
				});
			},
			init: function(tokenStr) {
				var obj = {
					url: this.$store.state.url + 'Account/GetUserByToken',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						token: tokenStr,
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data.ServiceRegionalId)
					this.ServiceRegionalId = res.Data.ServiceRegionalId
					this.GetMCDelay()
				})
			},
			// 获取保养延迟
			GetMCDelay: function() {
				var obj = {
					url: this.$store.state.url + 'Statistic/GetMCDelay',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						search: this.search,
						area: '',
						areaId: this.ServiceRegionalId,
						state: this.state,
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data.Dtos)
					this.Data = res.Data.Dtos
				})

			},
			but: function() {
				this.show = true
			},
			confirmS: function(e) {
				this.state = this.selectorObj[e[0]].id
				this.butStr = this.selectorObj[e[0]].cateName
				this.GetMCDelay()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		width: 100%;
		position: fixed;
		top: 30;
		left: 0;
		z-index: 100;
		background-color: #f6f6f6;

		.left {
			width: 60px;
			height: 100%;
			float: left;
			padding: 4px 0;
			box-sizing: border-box;
		}

		.right {
			width: calc(100% - 70px);
			height: 100%;
			float: right;
		}
	}
</style>