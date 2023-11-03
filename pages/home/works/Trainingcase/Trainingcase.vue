<template>
	<view class="box">
			<uni-collapse accordion="true" v-for="(item,index) in Data" :key="index" class="collapse1">
				<uni-collapse-item :title="item.Value">
			
					<uni-collapse accordion="true" v-for="(items,indexs) in item.TrainingCaseTwo" :key="items+indexs" class="collapse2">
						<uni-collapse-item :title="items.Value">
			
							<uni-collapse accordion="true" v-for="(itemss,indexss) in items.TrainingCaseThree" :key="itemss+indexss" class="collapse3">
								<view style="padding: 30rpx;" @tap="Det(itemss)">
									{{itemss.Value}}
								</view>
							</uni-collapse>
			
						</uni-collapse-item>
					</uni-collapse>
				</uni-collapse-item>
			</uni-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: []
			};
		},
		created() {
			this.init()
		},
		methods:{
			init:function(){
				var obj = {
					url: this.$store.state.url + 'System/GetTrainingCases',
					method: 'GET',
					header: this.$store.state.token,
				}
				this.$http(obj).then((res) => {
					console.log(res.Data)      //  数据Data
					this.Data = res.Data
				})
			},
			Det:function(res){
				this.$store.state.Trainingcaselists = res.Id
				uni.navigateTo({
					url: "./Trainingcaselist",
				});
			}
		}
	}
</script>

<style lang="scss">
.box{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
	font-size: 14px;
	.collapse1 {
		font-weight: bold;
	
		.collapse2 {
			padding-left: 50px;
			box-sizing: border-box;
			color: #009688;
	
			.collapse3 {
				padding-left: 50px;
				box-sizing: border-box;
				color: #0000FF;
			}
		}
	}
}
</style>
