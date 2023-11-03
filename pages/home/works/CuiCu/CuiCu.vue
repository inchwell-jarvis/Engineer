<template>
	<view class="box">
		
		<view class="card" v-for="(item,index) in Data" >
			<h4>{{item.CusName}}</h4>
			<br>
			<u-section :bold='false'	 line-color='#fff' :arrow='false'  title="区域"  :sub-title="item.Area"></u-section>
			<u-section :bold='false'	 line-color='#fff' :arrow='false'  title="任务类型"  :sub-title="item.OrderType"></u-section>
			<u-section :bold='false'	 line-color='#fff' :arrow='false'  title="任务单号"  :sub-title="item.OrderCode"></u-section>
			<u-section :bold='false'	 line-color='#fff' :arrow='false'  title="接受日期"  :sub-title="item.AcceptDate.split('T')[0]"></u-section>
			<u-section :bold='false'	 line-color='#fff' :arrow='false'  title="历时天数"  :sub-title="item.Duration"></u-section>
			<u-section :bold='false'	 line-color='#fff' :arrow='false'  title="预警阈值"  :sub-title="item.Warn"></u-section>
			<u-section :bold='false'	 line-color='#fff' :arrow='false'  title="工程师"  :sub-title="item.Engineer"></u-section>
			<u-section :bold='false'	 line-color='#fff' :arrow='false'  title="区域经理"  :sub-title="item.Manager"></u-section>
			<u-section :bold='false'	 line-color='#fff' :arrow='false'  title="区域经理电话"  :sub-title="item.ManagerMobile"></u-section>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
Data:[]
			};
		},
		created() {
			this.init()
		},
		methods: {
			init: function() {
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'System/UrgeWorkOrder',
					header: this.$store.state.token,
					data: {
						area: ''
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data)
					this.Data = res.Data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.card{
	
	width: 90%;
	background-color: #ffffff;
	margin: auto;
	border-radius: 7px;
	overflow: hidden;
	margin-top: 10px;
	padding: 10px;
	border: 0.3px solid #d9e7f1;
	box-sizing: border-box;
	-webkit-box-shadow: 9px 9px 6px #d9e7f1;
	-moz-box-shadow: 9px 9px 6px #d9e7f1;
	box-shadow: 3px 3px 6px #d9e7f1;
	position: relative;
	
}
</style>
