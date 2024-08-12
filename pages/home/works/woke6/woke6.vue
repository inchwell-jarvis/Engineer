<template>
	<view class="boxxxxx">
		<u-search style="width: 80%" class="search" placeholder="客户,工程师" @change="init(1)" :show-action="false" v-model="search"></u-search>
		<u-button size="mini" style="float: right" class="but" @click="show = true" type="primary">选择状态</u-button>
		<u-picker mode="selector" :range="State" v-model="show" :default-selector="[0]" @confirm="Echenr"></u-picker>

		<view style="width: 100%; height: 30px; background-color: #f7f7f7"></view>
		<view v-for="(item, index) in Data" class="item" :key="index" @click="Assign(item)" :style="[{ background: item.DataType == 2 ? '#fbffb5' : '#fff' }]">
			<view class="title">
				{{ item.CusFullName }}
			</view>
			<view class="bottom">
				<text class="OrderCode">{{ item.OrderCode }}</text>
				<text>{{ item.CreateDate }}</text>
			</view>
			<view class="bottom">
				<text class="OrderCode">{{ item.TypeStr }}</text>

				<text style="color: #333333; font-size: 13px; margin-left: 5px">{{ item.StateStr }}</text>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			Data: [],
			search: '',
			states: -1,
			State: ['全部', '已派送', '已指派', '已接受', '已出发', '已到达', '已结单', '已拒绝'],
			StateTr: [-1, 2, 3, 4, 6, 7, 8, 5],
			show: false,
			pageNum: 1
		};
	},
	onBackPress() {
		//自定义返回逻辑
		uni.navigateTo({
			url: '../work.6'
		});
		return true;
	},
	created() {
		this.start();
	},
	onReachBottom: function (e) {
		this.pageNum += 1;
		this.start();
	},

	methods: {
		Echenr: function (e) {
			this.pageNum = 1;
			this.Data = [];
			this.states = this.StateTr[e[0]];
			this.start();
		},

		start: function (eds) {
			if (eds == 1) {
				this.Data = [];
			}
			var obj = {
				url: this.$store.state.url + 'WO/GetEquInstallOrders',
				method: 'GET',
				data: {
					pageNum: this.pageNum,
					numPerPage: 10,
					orderField: '',
					orderDirection: '',
					search: this.search, //检索项
					state: this.states, // 状态
					begin: '', //开始时间
					end: '', //结束时间
					type: -1
				},
				header: this.$store.state.token
			};
			this.$httpnone(obj).then((res) => {
				this.Data[0] ? (this.Data = this.Data.concat(res.Data.Dtos)) : (this.Data = res.Data.Dtos);
				for (var index = 0; index < this.Data.length; index++) {
					this.Data[index].CreateDate = this.timeLv(this.Data[index].CreateDate);
				}
			});
		},
		//时间过滤
		timeLv: function (res) {
			if (res == null || res == '') {
				return ' - - ';
			} else {
				return res.split('T')[0];
			}
		},
		// 点击指派按钮
		Assign: function (item) {
			console.log(item);
			this.$store.state.InstallationTaskres = item.ID;
			this.$store.state.InstallationTaskresIndex = item.DataType;
			uni.navigateTo({
				url: './BJwork6'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.boxxxxx {
	width: 100%;
	background-color: #eaeaea;

	.search {
		width: 100%;
		padding-left: 20px;
		box-sizing: border-box;
		position: fixed;
		background-color: #f7f7f7;
	}

	.but {
		position: fixed;
		right: 0;
	}

	.item {
		width: 100%;
		height: 100px;
		border-top: 1px solid #e3e3e3;
		border-radius: 5px;
		box-sizing: border-box;
		background-color: #fdfdfd;

		.title {
			width: 100%;
			height: 40px;
			font-weight: bolder;
			color: #000000;
			padding-left: 20px;
			padding-top: 10px;
			box-sizing: border-box;
		}

		.bottom {
			width: 100%;
			height: 30px;
			padding-left: 20px;
			padding-right: 20px;
			box-sizing: border-box;

			text {
				color: #b8b8b8;
				line-height: 30px;
			}

			.OrderCode {
				margin-right: 10px;
				color: #555555;
			}

			button {
				float: right;
			}
		}
	}
}
</style>
