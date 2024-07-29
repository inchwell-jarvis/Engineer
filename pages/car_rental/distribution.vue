<template>
	<view class="car_delivery_selection_engineer">
		<u-navbar back-icon-name="close" back-icon-size="30" title="选择工程师" title-color="#181C26" back-icon-color="#181C26"></u-navbar>
		<view class="content">
			<div :class="{ engineer: true, engineer_choice: index_ == index }" v-for="(item, index) in Employees" :key="index" @tap="choice(item, index)">
				<div class="telephone">
					<div class="telephone2" @tap.stop="call_phone(item)"><u-icon name="phone-fill" color="#181C26B2" size="28"></u-icon></div>
				</div>
				<div class="header">
					<u-icon v-if="index_ == index" name="checkmark-circle-fill" color="#4170FC" size="40"></u-icon>
					{{ item.Name }}
				</div>
				<div class="position">目前位置：请注意，这个函数假设日期字符串是有效的，并且遵循ISO 8601格式（YYYY-MM-DDTHH:mm:ss）。此外，这个函数不处理时区差异，所有计算都是基于本地时间。如果你需要处理UTC时间或者不同的时间格式，你可能需要对代码进行相应的调整。</div>
			</div>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			Employees: [],
			index_: 999,
			row: {}
		};
	},
	created() {
		this.GetEmployeeMini();
	},
	onShow() {
		if (this.$store.state.car_delivery_selection_engineer) {
			this.row = this.$store.state.car_delivery_selection_engineer;
			this.$store.state.car_delivery_selection_engineer = null;
		}
	},
	methods: {
		// 获取gcs
		GetEmployeeMini() {
			this.API_GET('System/GetEmployeeMini', { type: '1' }).then((rv) => {
				console.log(rv);
				this.Employees = rv.Data;
				for (var i = 0; i < this.Employees.length; i++) {
					this.$set(this.Employees[i], 'switch', false);
				}
				console.log(this.Employees);
			});
		},
		// call_phone
		call_phone(item) {
			console.log(item);
			// 综合正则表达式，适用于移动电话和固定电话
			const phoneRegex = /^(\+?86)?(0\d{2,3}-)?1[3-9]\d{9}$|^(0\d{2,3}-)?\d{7,8}$/;
			if (!phoneRegex.test(item.Mobile)) {
				uni.showToast({
					title: '电话格式不正确',
					duration: 2000,
					icon: 'error'
				});
				return;
			}

			uni.makePhoneCall({
				phoneNumber: item.Mobile //仅为示例
			});
		},
		choice(item, index) {
			this.index_ = index;

			console.log(this.row);
			console.log(item);

			this.apix('CarRental/UpdateCarSOOrderStateA', { id: this.row.ID, str: item.EmployeeId }, { method: 'post' }).then((rv) => {
				uni.showToast({
					title: '任务分配成功',
					duration: 2000
				});
				uni.navigateBack({
					delta: 1 //返回层数，2则上上页
				});
			});
		}
	}
};
</script>

<style lang="scss">
.car_delivery_selection_engineer {
	width: 100%;
	height: 100%;

	.engineer {
		width: calc(100% - 20px);
		padding: 12px;
		border: 1px solid #ffffff;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 8px;
		margin: 10px auto;
		position: relative;
		.telephone {
			width: 40px;
			height: 100%;
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			.telephone2 {
				width: 28px;
				height: 28px;
				border-radius: 6px;
				background: #f5f6fa;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				text-align: center;
				line-height: 28px;
			}
		}
		.header {
			width: calc(100% - 40px);
			height: 26px;
			line-height: 26px;
			font-size: 18px;
			font-weight: bold;
		}
		.position {
			width: calc(100% - 40px);
			line-height: 20px;
			font-size: 13px;
			color: #181c26b2;
		}
	}
	.engineer_choice {
		border: 1px solid #4170fc;
	}
}
</style>
