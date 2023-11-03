<template>
	<view class="box">
		<view class="cu-form-group">
			<view class="title">设备</view>
			<input  v-model="code" disabled="true" name="input"></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">日期选择</view>
			<picker mode="date" :value="date" start="2015-09-01" end="2090-09-01" @change="DateChange">
				<view class="picker">
					{{date}}
				</view>
			</picker>
		</view>
		<view class="yichun">
			<button type="primary" size="mini" @tap="sao" class="luru">继续扫描</button>
			<button type="primary" size="mini" @tap="lu" class="luru">完成</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: "xxx",
				date: '2018-12-25',
				textareaAValue:'',
			};
		},
		mounted() {
			this.code = this.$store.state.gsQRcode.split('=')[1]
			var curDate = new Date()
			var curYear  = curDate.getFullYear();  //获取完整的年份(4位,1970-????)                  获取当前时间
			var curMonth = curDate.getMonth()+1;  //获取当前月份(0-11,0代表1月)
			var curDay   = curDate.getDate();       //获取当前日(1-31)
			this.date = curYear + '-' + curMonth + '-'+ curDay 
		},
		methods: {
			DateChange(e) {
				this.date = e.detail.value
			},
			textareaBInput(e) {
				this.textareaAValue = e.detail.value
			},
			lu(){
				console.log(this.code)
				
				
				var obj = {
									url: this.$store.state.url + 'System/SupplementCusEqu',
									method: 'POST',
									header: this.$store.state.token,
									data: {
									    InchwellCode :this.code,
										BeginRunDate :this.date
									},
								}
								this.$http(obj).then((res) => {
									uni.showToast({
									    title: "录入成功",
									    icon: "none"
									})
								})
			},
			sao(){
				uni.scanCode({
				    success: function (res) {
						this.code = res.result.split('=')[0]
				    }
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.box{
		width: 100%;
		height: 100%;	
		display: flex;
		flex-direction: column;
		font-size: 14px;
		background-color: #FFFFFF;
		text{
			width: 100%;
		}
	}
	.cu-form-group{
		width: 100%;
		background: #FFFFFF;
		border: 1px solid #ccc;
		box-sizing: border-box;
		padding: 10px;
		color: #999999;
		.title{
			width: 100px;
			display: block;
			float: left;
			color: #333333;
			
		}
		input{
			font-size: 14px;
		}
	}
	.align-start{
		.title{
			font-weight: bold;
		}
		uni-textarea{
			margin-top: 20px;
		}
	}
	.luru{
		width: 120px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-size: 17px;
		margin-top: 100px;
	}
	.yichun{
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
