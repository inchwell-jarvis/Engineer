<template>
	<view class="box">
		<view class="topone">
			<input type="text" v-model="add" value="" />
			<button @tap="init" type="primary">搜索</button>
		</view>
		<div class="buttomone">
			<view class="one" v-for="(item,index) in Data" :key="index" >
				<text class="text1">{{item.Describe}}</text>
				<text class="text2">{{item.Brand}}</text>
				<text class="text3">{{item.ProductCode}}</text>
				<text class="text4">剩余数量：{{item.Number}}</text>
			</view>
		</div>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numPerPage:20,
				Data:[],
				add:''
			}
		},
		created() {
			this.init()
			uni.showLoading({
			    title: '加载中'
			});
		},
		onReachBottom: function (){
			console.log('触底了')
			this.numPerPage+=20
			console.log(this.numPerPage)
			this.init()
		},
		methods: {
			init(){
				var obj = {
					url: this.$store.state.url +  '/System/GetBacklog',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						pageNum: '1',
						numPerPage: this.numPerPage,
						orderField: '',
						orderDirection: '',
						search :this.add,
					}
				}
				this.$http(obj).then((res) => {
					var asd = res.Data
					this.Data = asd.BacklogDtos
					console.log(this.Data)
					for(var i = 0; i < this.Data.length; i ++){
						if(this.Data[i].Describe.length>25){
							this.Data[i].Describe = this.Data[i].Describe.slice(0,25)+'....'
						}
					}
					uni.showLoading({
					    title: '加载中'
					});
					setTimeout(function () {
					    uni.hideLoading();
					}, 100);
				})
				
				
				
				
				
				
				
				// uni. request({
				// 				url: this.$store.state.url + '/System/GetBacklog',
				// 				method: 'GET',
				// 				data: {
				// 					pageNum: '1',
				// 					numPerPage: this.numPerPage,
				// 					orderField: '',
				// 					orderDirection: '',
				// 					search :this.add,
				// 				},
				// 				header: {
				// 					'Token': this.$store.state.token
				// 				},
				// 				success: (res) => {
				// 					var asd = JSON.parse(res.data).Data
				// 					this.Data = asd.BacklogDtos
				// 					console.log(this.Data)
				// 					for(var i = 0; i < this.Data.length; i ++){
				// 						if(this.Data[i].Describe.length>25){
				// 							this.Data[i].Describe = this.Data[i].Describe.slice(0,25)+'....'
				// 						}
				// 					}
				// 					uni.showLoading({
				// 					    title: '加载中'
				// 					});
				// 					setTimeout(function () {
				// 					    uni.hideLoading();
				// 					}, 100);
				// 				}
				// 		});

			},
		}
	}
</script>

<style scoped lang="scss">
.box{
	width: 100%;
	background-color: #FFFFFF;
	font-size: 14px;
	.topone {
		width: 100%;
		height: 50px;
		padding-left: 20px;
		padding-top: 10px;
		box-sizing: border-box;
		background: #f8f8f8;
	
		input {
			width: 60%;
			height: 25px;
			border: 1px solid #C0C0C0;
			border-radius: 5px;
			float: left;
			padding-left: 10px;
			box-sizing: border-box;
			font-size: 12px;
		}
	
		button {
			width: 60px;
			height: 25px;
			line-height: 25px;
			text-align: 60px;
			font-size: 13px;
		}
	}
	.buttomone{
		width: 100%;
		height: calc(100% - 50px);
		overflow: auto;
	.one{
		width: 100%;
		height: 100px;
		border-bottom: 1px solid  #e2e2e2;
		padding: 10px;
		box-sizing: border-box;
		text{
			display: block;
		}
		.text1{
			font-weight: bold;
		}
		.text2{
			float: left;
			color: #4D98B7;
			line-height: 50px;
			margin-right: 30px;
		}
		.text3{
			
			margin-left: 30px;
			color: #4D98B7;	
			line-height: 50px;
		}
		.text4{
			width: 100%;
			// line-height: 50px;
			color: #808080;
		}
	}
	}
}
</style>
