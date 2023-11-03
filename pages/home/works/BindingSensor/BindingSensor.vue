<template>
	<view class="box">
		<!-- {{form.InchwellCode}} -->


		<u-field v-model="form.InchwellCode" label="二维码编号" label-width='150' placeholder="请扫描设备二维码">
			<u-button size="mini" slot="right" type="success" @tap='Scode(1)'>
				<u-icon name="scan" size="40"></u-icon>
			</u-button>
		</u-field>

		<u-field v-model="form.Controller" label="控制器" label-width='150' placeholder="请扫描控制器条形码">
			<u-button size="mini" slot="right" type="success" @tap='Scode(2)'>
				<u-icon name="scan" size="40"></u-icon>
			</u-button>
		</u-field>

		<view class="field">
			<view class="field_li field_li1">
				开关方式
			</view>
			<view class="field_li">
				<u-radio-group v-model="form.SensorStr">
					<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</view>
		</view>




		<view style="width: 100%;padding: 20px 20px 0 0;box-sizing: border-box;">
			<u-button size='medium' type="primary" style='float: right;' @tap='BindCusEquSensor()'>确认绑定</u-button>
		</view>


		<u-popup v-model="show" mode="bottom" border-radius="14">
			<view class="PopupBottom">
				<h4>解绑控制器</h4>
				<u-field v-model="Controller" label="控制器" label-width='150' placeholder="请扫描控制器条形码">
					<u-button size="mini" slot="right" type="success" @tap='CRMController()'>
						<u-icon name="scan" size="40"></u-icon>
					</u-button>
				</u-field>

				<view style="width: 100%;padding: 20px 20px 0 0;box-sizing: border-box;">
					<u-button size='medium' type="primary" style='float: right;' @tap='RelieveBindCusEquSensor()'>确认解绑
					</u-button>
				</view>
			</view>
		</u-popup>



		<text @click="show = true"
			style='position: fixed;bottom: 30px;right: 30px;line-height: 30px;color: #007AFF;font-size: 14px;'>点击这里解绑控制器</text>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 解绑弹窗
				show: false,
				// 解绑参数
				Controller: '',
				radioList: [{
						name: 'NO常开',
						checked: false,
						disabled: false
					},
					{
						name: 'NC常闭',
						checked: false,
						disabled: false
					},
				],
				form: {
					InchwellCode: '',
					Controller: '',
					SensorStr: '',
					Sensor: '',
				},



			};
		},
		created() {},
		methods: {
			// CRMController
			CRMController: function(code) {
				var that = this
				uni.scanCode({
					success: function(res) {
						that.Controller = res.result
					}
				});
			},
			// 确认解绑
			RelieveBindCusEquSensor: function() {
				if (this.Controller == '') {
					uni.showToast({
						title: "请输入控制器条形码",
						icon: "none"
					})
					return false
				}

				var obj = {
					url: this.$store.state.url + 'CRM/RelieveBindCusEquSensor',
					method: 'POST',
					data: {
						Controller: this.Controller
					}
				}
				this.$http(obj).then((res) => {
					uni.showToast({
						title: "解绑成功！",
						icon: "none"
					})
					this.show = false
					this.Controller = ''
				})
			},
			Scode: function(code) {
				var that = this
				uni.scanCode({
					success: function(res) {
						if (code == 1) {
							if (res.result.split('?')[0] ==
								'http://icms.inchwell.com.cn/web/gotoinchwell.html') {
								that.form.InchwellCode = res.result.split('=')[1]
							} else {
								uni.showToast({
									title: "请扫描英之杰设备二维码",
									icon: "none"
								})
							}
						} else {
							that.form.Controller = res.result
						}
					}
				});
			},
			BindCusEquSensor: function() {




				if (this.form.InchwellCode == '' || this.form.InchwellCode == null) {
					uni.showToast({
						title: "请扫描设备二维码",
						icon: "none"
					})
					return false
				}
				if (this.form.Controller == '' || this.form.Controller == null) {
					uni.showToast({
						title: "请扫描控制器条形码",
						icon: "none"
					})
					return false
				}


				if (this.form.SensorStr == '' || this.form.SensorStr == null) {
					uni.showToast({
						title: "请选择开关方式",
						icon: "none"
					})
					return false
				}
				if (this.form.SensorStr == 'NC常闭') {
					this.form.Sensor = 'NC'
				} else {
					this.form.Sensor = 'NO'
				}
				console.log(this.form.Sensor)





				var obj = {
					url: this.$store.state.url + 'CRM/BindCusEquSensor',
					method: 'POST',
					data: this.form
				}
				this.$http(obj).then((res) => {
					uni.showToast({
						title: "绑定成功！",
						icon: "none"
					})
					uni.navigateTo({
						url: '../work.8',
					});
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.field {
		width: 100%;
		height: 45px;
		border-bottom: 1px solid #e4e7ed;
		font-size: 14px;
		padding: 10px 14px;
		text-align: left;
		position: relative;
		color: #303133;

		.field_li {
			float: left;
		}

		.field_li1 {
			width: 80px;
		}
	}

	.PopupBottom {
		width: 100%;
		height: 300px;
		padding: 10px;
		box-sizing: border-box;

	}
</style>
