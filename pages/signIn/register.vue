<template>
	<view class="box">
		<view  id="kungone" v-for="(item,index) in Data" :key='index' :class="{'bom' : item.bom}"  >
			<view class="left">
				{{item.Title}}
			</view>
			<view class="right">
				<input type="text" v-model="item.value" :placeholder="item.placeholder" />
			</view>
		</view>
		<view class="HeZ">
			<view class="TopTitle">
				工作经历
			</view>
			<view class="Bottom">
				<textarea  v-model="WorkExperience"   maxlength='-1' placeholder="请输入工作经历" />
			</view>
		</view>
		
		<view class="but">
			<button v-if="!this.httpTi" type="primary"  @tap="Ti()">提交</button>
			<view v-if="this.httpTi" class="butsss">
				您的注册已受理,稍后会与您联系
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data:[
					{Title:'姓名',value:'',placeholder:'请输入姓名',bom:false},
					{Title:'年龄',value:'',placeholder:'请输入年龄',bom:true},
					{Title:'手机号码',value:'',placeholder:'请输入手机号码',bom:false},
					{Title:'电子邮箱',value:'',placeholder:'请输入电子邮箱',bom:true},
					{Title:'详细地址',value:'',placeholder:'请输入详细地址',bom:true}
				],
				WorkExperience :'',
				httpTi : false,
			};
		},
		methods:{
			
			Ti:function(){
				var obj = {
					method:'POST',
					url:this.$store.state.url + 'Account/GcsRegister',
					data:{
						Name : this.Data[0].value,
						Age : this.Data[1].value,
						Mobile  : this.Data[2].value,
						Email  : this.Data[3].value,
						Address  : this.Data[4].value,
						WorkExperience   : this.WorkExperience,
					}
				}
				if (!obj.data.Name) {
					uni.showToast({title: "请输入姓名",icon: "none"})
					return false
				}
				if (!obj.data.Age) {
					uni.showToast({title: "请输入年龄",icon: "none"})
					return false
				}
				if (!(/^[0-9]{11}$/.test(obj.data.Mobile))) {
					uni.showToast({title: "手机号格式不正确",icon: "none"})
					return false
				}
				if (!(/^[a-zA-Z0-9_\-]{2,}@[a-zA-Z0-9_\-]{2,}(\.[a-zA-Z0-9_\-]+){1,2}$/.test(obj.data.Email))) {
					uni.showToast({title: "输入邮箱或检查邮箱格式",icon: "none"})
					return false
				}
				if (!obj.data.Address) {
					uni.showToast({title: "请输入详细地址",icon: "none"})
					return false
				}
				if (!obj.data.WorkExperience) {
					uni.showToast({title: "请输入工作经历",icon: "none"})
					return false
				}
				this.$http(obj).then((res)=>{
					this.httpTi = true
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.box{
	background-color: #f4f1f1;
	padding-top: 10px;
	box-sizing: border-box;
	.bom{
		margin-bottom: 10px;
	}
	#kungone{
		width: 100%;
		height: 40px;
		background-color: #FFFFFF;
		border-bottom: 1px solid #dedada;
		line-height: 40px;
		border-radius: 8px;
		box-sizing: border-box;
		.left{
			width: 30%;
			height: 100%;
			float: left;
			padding-left: 15px;
			box-sizing: border-box;
			font-weight: bold;
			font-size: 13px;
		}
		.right{
			width: 70%;
			height: 100%;
			float: left;
			input{
				width: 100%;
				height: 30px;
				margin-top: 5px;
				font-size: 13px;
			}
		}
	}
	
	.HeZ{
		width: 100%;
		height: 150px;
		background-color: #FFFFFF;
		border-radius: 8px;
		.TopTitle{
			width: 100%;
			height: 30px;
			line-height: 30px;
			padding-left: 15px;
			box-sizing: border-box;
			font-size: 13px;
			font-weight: bold;
		}
		span{
			color: #999999;
		}
		.Bottom{
			width: 100%;
			height: calc(100% - 30px);
			padding: 10px;
			box-sizing: border-box;
			textarea{
				width: 100%;
				height: 100%;
				border-radius: 10px;
				padding: 5px;
				box-sizing: border-box;
				border: 1px solid #d4d4d4;
				font-size: 13px;
			}
		}
	}
	
	.but{
		width: 100%;
		height: calc(100% - 380px);
		padding: 50px 30px;
		box-sizing: border-box;
		background-color: #FFFFFF;
			.butsss{
				width: 100%;
				height: 30px;
				background-color: #007AFF;
				text-align: center;
				line-height: 30px;
				border-radius: 5px;
				color: #FFFFFF;
			}
	}
}
</style>
