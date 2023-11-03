<template>
	<view class="box cla">
		<u-notice-bar mode="horizontal" class='bar' type='error' :list="list"></u-notice-bar>


		<u-cell-group>
			<u-cell-item v-for="(bxhsas,index) in data" :key="index" :title="bxhsas.label" @tap='itemDP(bxhsas)' value='调配'
			 :value-style='StyleVL' :arrow='false'></u-cell-item>
		</u-cell-group>


		<!-- 	<view class="cell" v-for="(item,index) in data" :key="index"  @tap='itemDP(item)' >
			<text>{{item.label}}
			<span>调配</span>
			</text>
		</view> -->


		<u-select v-model="show" :list="GetAreaS" @confirm='TrueFhz'></u-select>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					'只有区域经理可以调配工程师',
					'区域经理只能调配本区域的工程师',
				],
				data: [],
				GetAreaS: [],
				StyleVL: {
					'color': '#2979ff'
				},
				show: false,
				gcs: {},
				quyu: {},
			};
		},
		onBackPress() { //自定义返回逻辑
			uni.switchTab({
				url: "../../home"
			});
			return true
		},
		created() {
			// this.init()
			this.initgcs()
			this.GetArea()
		},
		methods: {

			// 获取工程师
			initgcs: function() {
				var that = this
				var obj = {
					url: that.$store.state.url + 'System/GetEmployeeMini',
					method: 'GET',
					header: that.$store.state.token,
					data: {
						type: '1'
					},
				}
				that.$http(obj).then((res) => {
					console.log(res)
					var data = []
					var Data = res.Data
					for (var i = 0; i < Data.length; i++) {
						var Obj = {
							value: Data[i].EmployeeId,
							label: Data[i].Name
						}
						data.push(Obj)
					}
					that.data = data
					console.log(that.data)
				})
			},

			// 区域
			GetArea: function() {
				var that = this
				var obj = {
					url: that.$store.state.url + 'System/GetArea',
					method: 'GET',
					header: that.$store.state.token,
				}
				that.$http(obj).then((res) => {
					console.log(res)
					this.GetAreaS = []
					for (var i = 0; i < res.Data.length; i++) {
						var Obj = {
							label: res.Data[i].Value,
							value: res.Data[i].Id
						}
						this.GetAreaS.push(Obj)
					}
					console.log(this.GetAreaS)
				})
			},
			itemDP: function(item) {
				console.log(item)
				this.gcs = item
				this.show = true
			},
			TrueFhz: function(res) {
				var that = this
				that.quyu = res[0]
				console.log(res[0])
				uni.showModal({
					title: '人员调配',
					content: '将 (' + (that.gcs.label) + ') 调配到' + res[0].label,
					success: function(resTwo) {
						if (resTwo.confirm) {
							that.PersonnelDeployment()
						} else if (resTwo.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			PersonnelDeployment: function() {
				var obj = {
					url: this.$store.state.url + 'PCenter/PersonnelDeployment',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.quyu.value,
						Str: String(this.gcs.value)
					}
				}
				this.$http(obj).then((res) => {
					this.initgcs()
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.cla{
		padding-top: 35px;
	}
	.bar {
		width: 100%;
		position: absolute;
		top: 0;
		z-index: 999;
	}

	.cell {
		width: 100%;
		height: 50px;
		line-height: 50px;
		padding: 0px 30px;
		color: #5e5e5e;
		border-bottom: 1px solid #f3f4f7;
		box-sizing: border-box;

		span {
			float: right;
			color: #2979ff
		}
	}
</style>
