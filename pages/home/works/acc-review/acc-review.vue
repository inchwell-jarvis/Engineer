<template>
	<view class="box">
		<div class="task" v-for="(item, index) in data" :key="index" @click="edit(item)">
			<div class="header">
				<div class="cusname">{{ item.CusName }}</div>
				<div class="time">{{ item.CreateDateStr }}</div>
			</div>
			<div class="character">
				<div class="engineer">工程师：{{ item.BelongEnginners }}</div>
				<div class="engineer">销售：{{ item.Sales }}</div>
			</div>
			<u-button type="primary" size="mini" @click="edit(item)">去审批</u-button>
		</div>
		
		<u-empty v-if="data.length === 0" text="暂无任务" mode="data"></u-empty>

	</view>
</template>

<script>
export default {
	data() {
		return {
			data: []
		};
	},
	created() {
		this.start();
	},
	onBackPress() {
		uni.switchTab({
			url: '../../../home/home'
		});
		return true;
	},
	methods: {
		start() {
			let data = {
				pageNum: 1,
				numPerPage: 9999,
				orderField: '',
				orderDirection: '',
				search: '',
				enginner: '',
				area: this.$store.state.EnginnerStateArea,
				state: 9,
				cusType: '',
				sale: '',
				province: ''
			};
			this.API_GET('SO/GetSOForPCs', data).then((rv) => {
				console.log(rv.Data.Dtos);
				this.data = rv.Data.Dtos;
			});
		},
		edit(item) {
			uni.navigateTo({
				url: './acc-review-edit?soid=' + item.SOId
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.box {
	width: 100%;
	height: 100%;
	background-color: $uni-bg-color-grey;
	padding: 0 10px;
	box-sizing: border-box;
	.task {
		width: 100%;
		margin-bottom: 10px;
		background-color: #fff;
		padding: 4px;
		box-sizing: border-box;
		border-bottom: 1px solid #ccc;
		position: relative;
		.header {
			width: 100%;
			height: 40px;
			line-height: 40px;

			.time {
				width: 100px;
				height: 100%;
				float: right;
				font-size: 12px;
				color: #909399;
				text-align: right;
				padding-right: 10px;
				box-sizing: border-box;
			}
			.cusname {
				width: calc(100% - 100px);
				height: 100%;
				float: left;
				font-weight: bold;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.character {
			width: 100%;
			height: 40px;
			.engineer {
				width: 100%;
				height: 20px;
				text-align: left;
				font-size: 10px;
				line-height: 20px;
				font-weight: bold;
				color: #606266;
			}
		}
		button {
			position: absolute;
			right: 10px;
			bottom: 10px;
		}
	}
}
</style>
