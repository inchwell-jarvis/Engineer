<template>
	<view class="box" style="background-color: #FFFFFF;">
		
		<view class="cu-form-group">
			<view class="title">客户名称</view>
			<input type="text" :v-model="client" :value="client" @input="onKeyInputs" />
			<view class="kuang" v-show="text">
				<view @tap="clicktext(item)" v-for="(item,index) in texts" :key="index">{{item.FullName}}</view>
			</view>
		</view>
		
		
		<button size="mini" style="display: block;margin: auto;width: 100px;margin-top: 50px;" type="primary" @click="sclickmini">确认创建</button>
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:false,
				client:'',
				clientID:'',
				texts:[]
			};
		},
		methods:{
			onKeyInputs: function(event) {
				var  xx  =  event.target.value
				xx == ''? xx = 'i':'' 
					var obj = {
						url: this.$store.state.url + 'CRM/GetCustomerMini',
						method: 'GET',
						header: this.$store.state.token,
						data: {
							'search': xx
						}
					}
					this.$http(obj).then((res) => {
						this.texts = res.Data.Dtos
						this.text = true
					})
				
			},
			clicktext: function(item) {
				this.text = false
				this.client = item.FullName
				this.clientID = item.CusId
			},
			sclickmini:function(){
				if(this.clientID == ''){
					uni.showToast({
						title: '请选择客户！',
						icon: "none"
					})
				}else{
					var obj = {
						url: this.$store.state.url + 'CRM/CreateCusVisit',
						method: 'post',
						header: this.$store.state.token,
						data: {
							'CusId': this.clientID
						}
					}
					this.$http(obj).then((res) => {
						console.log(res.Data)
						this.$store.state.FirstvisitIdindexId = res.Data
						this.$store.state.indexcurrent = 1
						uni.navigateTo({
							url: '/pages/home/works/Firstvisit/Firstvisit',
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
 .cu-form-group {
 	width: 95%;
 	background: #FFFFFF;
 	border: 1px solid #ccc;
 	box-sizing: border-box;
 	padding: 10px;
 	color: #999999;
 	margin: auto;
 	border-radius: 10px;
 	margin-top: 10px;
 	position: relative;
 
 	.title {
 		width: 100px;
 		display: block;
 		float: left;
 		color: #333333;
 
 	}
 
 	input {
 		font-size: 14px;
 	}
 
 	.kuang {
 		position: absolute;
 		width: 200px;
 		height: 199px;
 		overflow: auto;
 		background-color: #cccccc;
 		z-index: 999999;
 		margin-left: 100px;
 		border-radius: 5px;
 		box-sizing: border-box;
 
 		view {
 			width: 100%;
 			height: 30px;
 			text-align: left;
 			line-height: 30px;
 			font-size: 12px;
 			color: #000000;
 			overflow: hidden;
 		}
 	}
 	.kuangadd{
 		width: 80px;
 		height: 150px;
 		.view{
 			text-align: center;
 			
 		}
 	}
 }
</style>
