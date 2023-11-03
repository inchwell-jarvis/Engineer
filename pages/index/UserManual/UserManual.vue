<template>
	<view class="box">
		<u-cell-group>
			<u-cell-item :title="item.Describe" v-for="(item, index) in UserManualData" :key="index" @tap="Click_Index(item)"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
export default {
	data() {
		return {
			UserManualData: [
				{ Describe: '安装任务', Id: 'InstallationTasks' },
				{ Describe: '保养管理', Id: 'MaintenanceManagement' },
				{ Describe: '修复定位', Id: 'RepairPositioning' },
				{ Describe: '旧件寄回', Id: 'OldParcelBack' }
			]
		};
	},

	methods: {
		Click_Index: function (item) {
			this.$store.state.DescribeId = item.Id;
			uni.navigateTo({
				url: './Details/Details'
			});
		}
	}
};
</script>

<style lang="scss"></style>
