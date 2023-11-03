<template>
	<view class="box">
		<!-- 下拉菜单 -->
		<u-dropdown>
			<u-dropdown-item v-model="type" :title="typeLabel" :options="options1" @change='dropdownClick'>
			</u-dropdown-item>
			<u-dropdown-item v-model="time" :title="time" :options="options2" @change='yearsFun'>
			</u-dropdown-item>
			<u-dropdown-item v-model="month" :title="monthTit" :options="options3" @change='monthFun'>
			</u-dropdown-item>
		</u-dropdown>

		<br>
		
		<div class='uni-B3'>{{typeLabel}}  <span style='margin-left: 20px;'> {{ typeLabel == '个人销售额'? Zhao.PersonalSoSales:Zhao.SoSales }}</span>  </div>
		<br>
		<view class="Card" v-for="(item,index) in Data" :key='index' @tap="PO(item)">
			<h4>{{item.CusFullName}}</h4>
			<br>
			<view>
				<span>{{(item.DiscountAmount-item.ReturnedPurchaseAmount-item.RebateAmount)}}</span>
				<span>{{parseInt(100 / item.OtherInt) +'%'}}</span>
				<span>{{item.Sales}}</span>
			</view>
		</view>



		<u-popup v-model="show" mode="bottom" height="600px" border-radius='10'>
			<view class="Po">

				<h3>{{typeLabel}}</h3>
				<br>

				<view class="div">
					<span class='sapn1'>客户名称</span>
					<span>{{saxo.CusFullName}}</span>
				</view>
				<view class="div">
					<span class='sapn1'>报价单号</span>
					<span>{{saxo.ContractCode}}</span>
				</view>
				<view class="div">
					<span class='sapn1'>优惠总金额</span>
					<span>{{saxo.DiscountAmount}}</span>
				</view>
				<view class="div">
					<span class='sapn1'>退货金额</span>
					<span>{{saxo.ReturnedPurchaseAmount}}</span>
				</view>
				<view class="div" v-if="Zhao.ShowSOFandian">
					<span class='sapn1'>返点金额</span>
					<span>{{saxo.RebateAmount}}</span>
				</view>
				<view class="div">
					<span class='sapn1'>销售</span>
					<span>{{saxo.Sales}}</span>
				</view>

				<view class="div">
					<span class='sapn1'>区域</span>
					<span>{{saxo.Area}}</span>
				</view>
				<view class="div">
					<span class='sapn1'>占比</span>
					<span> {{parseInt(100 / saxo.OtherInt) +'%'}}</span>
				</view>



			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Zhao:{},
				// 展示
				Data: [],
				//区域销售额
				SOSalesDtos: [],
				//个人销售额
				PersonalSOSalesDtos: [],

				type: 1,
				typeLabel: '个人销售额',

				options1: [{
						label: '个人销售额',
						value: 1,
					},
					{
						label: '区域销售额',
						value: 2,
					}
				],

				time: '',
				options2: [{
					label: '2018',
					value: 2018,
				}, {
					label: '2019',
					value: 2019,
				}, {
					label: '2020',
					value: 2020,
				}, {
					label: '2021',
					value: 2021,
				}, {
					label: '2022',
					value: 2022,
				}, {
					label: '2023',
					value: 2023,
				},  {
					label: '2024',
					value: 2023,
				}, {
					label: '2025',
					value: 2023,
				},],


				month: '',
				monthTit: '',
				options3: [{
					label: '第一季度',
					value: 1,
				}, {
					label: '第二季度',
					value: 2,
				}, {
					label: '第三季度',
					value: 3,
				}, {
					label: '第四季度',
					value: 4,
				}],


				show: false,
				saxo: {}
			};
		},
		created() {
			// 获取当前年份
			var Year = new Date().getFullYear();
			this.time = Year
			// 获取当前季度
			var tMonth = new Date().getMonth() + 1;
			var oMonth = Math.ceil(tMonth / 3)
			console.log(tMonth)
			console.log(oMonth)
			this.monthTit = this.options3[oMonth-1].label
			this.month = '0' + oMonth
			// 获取数据
			this.start()
		},
		methods: {
			start: function() {
				this.Data = []
				this.SOSalesDtos = []
				this.PersonalSOSalesDtos = []
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'Finance/EngineerSOQuarterBonus',
					header: this.$store.state.token,
					data: {
						username: '',
						quarter: this.time + '-' + String(this.month),
					}
				}
				this.$httpnone(obj).then((res) => {
					console.log(res.Data)
					this.Zhao = res.Data.Bonus
					this.Data = res.Data.PersonalSOSalesDtos
					this.SOSalesDtos = res.Data.SOSalesDtos
					this.PersonalSOSalesDtos = res.Data.PersonalSOSalesDtos
				})
			},
			// 修改个人或者区域
			dropdownClick: function(e) {
				console.log(e)
				if (e == 1) {
					this.typeLabel = '个人销售额'
					this.Data = this.PersonalSOSalesDtos
				} else {
					this.typeLabel = '区域销售额'
					this.Data = this.SOSalesDtos
				}
			},
			yearsFun(e) {
				console.log(e)
				this.time = e
				this.timetypeLabel = e
				this.start()
			},
			monthFun(oMonth) {
				console.log(oMonth)
				this.monthTit = this.options3[oMonth-1].label
				this.month = '0' + oMonth

				this.start()
			},
			PO: function(saxo) {
				console.log(saxo)
				this.show = true
				this.saxo = saxo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Card {
		width: 90%;
		min-height: 20px;
		border-radius: 5px;
		background-color: #f8f8f8;
		margin: 10px auto;
		padding: 5px;
		box-sizing: border-box;

		view {
			width: 100%;
			height: 30px;

			span {
				display: block;
				width: 33%;
				float: left;
			}
		}
	}

	.Po {
		padding: 10px;
		box-sizing: border-box;
		font-size: 12px;

		.div {
			width: 100%;
			height: 30px;
			line-height: 30px;
			padding-left: 20px;
			box-sizing: border-box;

			.sapn1 {
				font-weight: bold;
				width: 100px;
				float: left;
				display: block;
			}
		}
	}
</style>
