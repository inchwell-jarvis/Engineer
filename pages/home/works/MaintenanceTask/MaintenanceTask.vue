<template>
	<view class="boxKnhXoRn6BN7">
		<!-- 检索项 -->
		<div class="header">
			<div class="left">
				<u-search placeholder="检索项" v-model="retrieval.search" :show-action='false'
					@input='start2()'></u-search>
			</div>
			<div class="right">
				<u-button type="primary" size="mini" @click='but()'>{{butStr}}</u-button>
				<!-- <u-select v-model="retrieval.state" :list="list"></u-select> -->
				<!-- <u-select v-model="show" :list="list"></u-select> -->

		<!-- 		<u-dropdown>
					<u-dropdown-item v-model="retrieval.state" title="状态" :options="States"
						@change='start2()'></u-dropdown-item>
				</u-dropdown> -->
			</div>
		</div>
		
		<u-picker v-model="show" mode="selector" :range="States" @confirm='confirmS' range-key="label"
			:default-selector="[0]"></u-picker>
		<!-- 内容 -->
		<div class="content">


			<u-card v-for="(item,index) in tableData" :key="index" @tap="seedetails(item)" :head-style='headStyle' :body-style='bodyStyle' box-shadow='2px 3px 4px #c1c1c1'  :show-head='false'>
				<view slot="body">
					<view class="textCode">
						<div style="border-bottom: 1px solid #ccc;margin-bottom: 10px;padding-bottom: 5px;color: #000;">
													<h4>{{'【'+ item.Feature +'】' + item.CustomerName}}</h4>
						</div>
						<p> 
						<span :style="{color:item.StateStr != '待保养'? '#00b200' : '#CCC'}">{{item.StateStr}}</span> 
						<span style="float: right;">{{item.EstimatedTime}}</span>
						</p>
						{{item.OrderCode + ' - ' + item.MSSOStateStr}}
						<span style='float: right;'>{{item.ContractCode}}</span>
					</view>
				</view>
			</u-card>


		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 卡片头部样式
				headStyle: {
					'padding': '10px 5px',
					'font-weight': 'bold'
				},
				bodyStyle: {
					'padding': '10px 10px'
				},
				// 检索项集合
				retrieval: {
					search: "",
					state: -1,
					pageNum: 1,
					numPerPage: 30,
					orderField: "",
					orderDirection: "",
				},
				butStr:'全部',
				States: [{
						label: "全部",
						value: -1,
					},
					{
						label: "待保养",
						value: 0,
					},
					{
						label: "已启动保养",
						value: 1,
					},
					{
						label: "已指派工程师",
						value: 2,
					},
					{
						label: "已接受任务",
						value: 3,
					},
					{
						label: "已出发",
						value: 6,
					},
					{
						label: "已到达",
						value: 7,
					},
					{
						label: "保养完毕",
						value: 5,
					},
				],
				show:false,
				// 数据
				tableData: []
			};
		},
		onBackPress() { //自定义返回逻辑
			uni.switchTab({
				url: "../../home"
			});
			return true
		},
		onShow() {
			this.tableData = []
			this.start()
		},
		onReachBottom: function(e) {
			this.retrieval.pageNum += 1
			this.start()
		},
		methods: {
			start: function() {
				var obj = {
					url: this.$store.state.url + 'Maintain/GetMaintainOrders',
					method: 'GET',
					header: this.$store.state.token,
					data: this.retrieval
				}
				this.$http(obj).then((rv) => {
					console.log('---------')
					console.log(rv)
					this.tableData[0] ? this.tableData = this.tableData.concat(rv.Data.Dtos) : this.tableData =
						rv.Data.Dtos
					for (let index = 0; index < this.tableData.length; index++) {
						const element = this.tableData[index];
						element.EstimatedTime = element.EstimatedTime ? element.EstimatedTime.split('T')[0] :
							'-'
						element.ActualTime = element.ActualTime ? element.ActualTime.split('T')[0] : '-'
						element.BeginTime = element.BeginTime ? element.BeginTime.split('T')[0] : '-'
						element.EndTime = element.EndTime ? element.EndTime.split('T')[0] : '-'
					}

				})
			},
			start2: function() {
				this.retrieval.pageNum = 1
				this.tableData = []
				this.start()
			},
			seedetails: function(rv) {
				uni.navigateTo({
					url: './MaintenanceTasksEdit?ID='+ JSON.stringify(rv),
				});
			},
			but: function() {
				this.show = true
			},
			confirmS: function(e) {
				this.retrieval.state = this.States[e[0]].value
				this.butStr = this.States[e[0]].label
				this.start2()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.boxKnhXoRn6BN7 {
		width: 100%;
		background-color: #FFFFFF;
		font-size: 13px;
		overflow: auto;
		box-sizing: border-box;
	}

	.header {
		width: 100%;
		height: 40px;
		position: fixed;
		top: 30;
		left: 0;
		z-index: 100;
		background-color: #f6f6f6;

		.left {
			width: calc(100% - 100px);
			height: 100%;
			padding: 3px 0 0 3px;
			box-sizing: border-box;
			float: left;
		}

		.right {
			width: 100px;
			height: 40px;
			float: left;
			padding: 5px;
			box-sizing: border-box;
			button{
				margin: auto;
			}
		}
	}

	.content {
		width: 100%;
		padding-top: 50px;
		box-sizing: border-box;

		.li {
			width: calc(100% - 10px);
			height: 100px;
			margin: 10px auto;
			box-sizing: border-box;

			.con {
				width: 90%;
				margin: auto;
			}
		}
	}


	.slh {
		width: 100%;
		overflow: hidden; //超出隐藏
		white-space: nowrap; //不折行
		text-overflow: ellipsis; //溢出显示省略号
	}
</style>