<template>
	<view class="box">
		<view class="head">
			<!-- <span></span> -->
			<view class="left" @tap="returnView()">
				<u-icon name="arrow-left" color="##ffffff" size="40" style='float:left;margin-top: 17px;margin-left: 20px;'  ></u-icon>
			</view>
			<view class="Con">
				{{Tit}}
			</view>

			
		</view>
		
		
		
		
		<u-parse :html="Con"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Id: '',
				Con: ``,
				Tit:'',
			};
		},
		onLoad(e) {
			this.Con = e.Con
			this.Tit = e.Tit
			this.Id = e.Id
			console.log(this.Con)
			console.log(this.Tit)
			this.ReadJournalism()
			
			
			
			
			
			
			
			
			
			
			
		},
		methods:{
			returnView:function(){
				// uni.switchTab({
				//     url: '/pages/news/news'
				// });
				uni.navigateBack()
			},
			ReadJournalism:function(){
				var obj = {
					method: 'POST',
					url: this.$store.state.url + 'System/ReadJournalism',
					header: this.$store.state.token,
					data: {
						Id:this.Id,
					}
				}
				this.$httpnone(obj).then((res) => {
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.box{
	padding: 0 10px;
	box-sizing: border-box;
	background-color: #FFFFFF;
	position: relative;
	padding-top: 80px;
	box-sizing: border-box;
	
	.head {
		position: fixed;
		top: 0px;
		left: 0;
		width: 100%;
		height: 80px;
		background-color: #44b4f7;
		padding-top: 30px;
		box-sizing: border-box;
		text-align: center;
		line-height: 50px;
		font-weight: bolder;
		font-size: 18px;
		color: #ececec;
		z-index: 99;
	
		.left{
			width: 15%;
			height: 100%;
			float: left;
			text-align: center;
			
		}
		.Con{
			width: 70%;
			height: 100%;
			float: left;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}


</style>
