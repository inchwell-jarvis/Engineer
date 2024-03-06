<template>
	<view class="box">
		<div class="task">
			<div class="title">基础信息</div>
			<div class="content">
				<div class="li">
					<span>客户</span>
					<span>{{ data.CusName }}</span>
				</div>

				<div class="li">
					<span>订单单号</span>
					<span>{{ data.SOCode || ' - - ' }}</span>
				</div>

				<div class="li">
					<span>报价单号</span>
					<span>{{ data.QuoteCode }}</span>
				</div>

				<div class="li">
					<span>状态</span>
					<span>{{ data.StateStr }}</span>
				</div>

				<div class="li">
					<span>是否需要安装</span>
					<span>{{ data.IsNeedInstall ? '是' : '否' }}</span>
				</div>

				<div class="li">
					<span>工程师是否完成任务</span>
					<span>{{ data.CompleteTheTask ? '是' : '否' }}</span>
				</div>

				<div class="li">
					<span>工程师完成任务时间</span>
					<span v-if="data.CompleteTheTaskDt">{{ data.CompleteTheTaskDt.split('T')[0] }}</span>
					<span v-if="!data.CompleteTheTaskDt">- -</span>
				</div>

				<div class="li">
					<span>付款时间</span>
					<span v-if="data.PayDate">{{ data.PayDate.split('T')[0] }}</span>
					<span v-if="!data.PayDate">- -</span>
				</div>

				<div class="li">
					<span>报价类型</span>
					<span>{{ data.SoQuoteType }}</span>
				</div>

				<div class="li">
					<span>隶属公司</span>
					<span>{{ data.BelongCompany }}</span>
				</div>

				<div class="li">
					<span>工程师备注</span>
					<span>{{ data.EngineerMemo || '无' }}</span>
				</div>
			</div>
		</div>
		<br />
		<div class="task">
			<div class="title">设备信息</div>
			<div class="content">
				<div class="quipment" v-for="(item,index) in data.SOEquipmentList" :key='index'>
					<div class="li">
						<span>产品编号</span>
						<span>{{ item.ProcodeCode }}</span>
					</div>
					<div class="li">
						<span>品牌</span>
						<span>{{ item.Brand }}</span>
					</div>
					<div class="li">
						<span>数量</span>
						<span>{{ item.Number }}</span>
					</div>
					<div class="li">
						<span>库存</span>
						<span>{{ item.NetInventory }}</span>
					</div>
					<div class="li">
						<span>采购单价</span>
						<span>{{ item.PurchaseUnitPrice }}</span>
					</div>
					<div class="li">
						<span>销售单价</span>
						<span>{{ item.UnitPrice }}</span>
					</div>
					<div class="li">
						<span>安装费单价</span>
						<span>{{ item.AssemblyPeice }}</span>
					</div>
					<div class="li">
						<span>甲方安装</span>
						<span>{{ item.IsAssembly ? '是' : '否' }}</span>
					</div>
				</div>
			</div>
		</div>
		<br />
		<div class="button">
			<div @tap="AMApprovalEqus(0)">驳回</div>
			<div @tap="AMApprovalEqus(1)">批准</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			soid: '',
			data: {}
		};
	},
	onLoad(options) {
		this.soid = options.soid;
		this.start();
	},
	methods: {
		start() {
			this.API_GET('SO/GetSo', { soid: this.soid }).then((rv) => {
				console.log(rv);
				this.data = rv.Data;
			});
		},
		AMApprovalEqus(num) {
			this.API_POST('SO/AMApprovalEqus', { Id: this.soid, str: num }, true).then((rv) => {
				console.log(rv);
				uni.navigateTo({
					url: './acc-review'
				});
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
		padding: 4px;
		box-sizing: border-box;
		background-color: #fff;
		.title {
			width: 100%;
			height: 30px;
			line-height: 30px;
			font-weight: bold;
			border-bottom: 1px solid #c0c4cc;
			box-sizing: border-box;
		}
		.content {
			width: 100%;
			.quipment {
				width: calc(100% - 40px);
				border: 1px solid #ccc;
				margin: 10px auto;
				border-radius: 5px;
				padding-left: 10px;
				box-sizing: border-box;
			}
			.li {
				width: 100%;
				min-height: 30px;
				line-height: 30px;
				font-size: 12px;
				overflow: hidden;
				span:nth-child(1) {
					display: block;
					float: left;
					width: 150px;
					font-weight: bold;
					color: #606266;
				}
				span:nth-child(2) {
					display: block;
					float: left;
					width: calc(100% - 150px);
					color: #606266;
					word-wrap: break-word;
					word-break: break-all;
				}
			}
		}
	}
	.button {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		margin-bottom: 50px;
		div {
			width: 100px;
			height: 100%;
			border-radius: 5px;
			text-align: center;
			line-height: 40px;
			color: #fff;
		}
		div:nth-child(1) {
			background-color: #fa3534;
		}
		div:nth-child(2) {
			background-color: #2979ff;
		}
	}
}
</style>
