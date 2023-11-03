<template>
	<view class="box">
		<u-form :model="form" ref="uForm"  >
				<u-form-item label-width='130rpx'  label="姓名 *"><u-input  v-model="form.Name" /></u-form-item>
				<u-form-item label-width='130rpx'  label="英文名 *"><u-input  v-model="form.NameEn" /></u-form-item>
				<u-form-item label-width='130rpx'  label="职位 *"><u-input  v-model="form.Position" /></u-form-item>
				<u-form-item label-width='130rpx'  label="手机号 *"><u-input  v-model="form.Mobile" /></u-form-item>
				<u-form-item label-width='130rpx'  label="电话"><u-input   v-model="form.Tel" /></u-form-item>
				<u-form-item label-width='130rpx'  label="邮箱 *"><u-input  v-model="form.Email" /></u-form-item>
			</u-form>
			
			<view class="clattab" >
				<u-button  size='default' @click='CreateCusLinkMan()' type="primary">完成</u-button>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					Name: '',
					NameEn:'',
					Position:'',
					Mobile:'',
					Tel:'',
					Email:'',
				},
			};
		},
		methods:{
			CreateCusLinkMan:function(){
				
					
				
				
				if(this.form.Name.split('').length == 0){
					uni.showToast({
						title: '请输入姓名！',
						icon: "none"
					})
					return false
				}
				if(this.form.NameEn.split('').length == 0){
					uni.showToast({
						title: '请输入英文名！',
						icon: "none"
					})
					return false
				}
				if(this.form.Position.split('').length == 0){
					uni.showToast({
						title: '请输入职位！',
						icon: "none"
					})
					return false
				}
				
				var reg = reg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (reg.test(this.form.Mobile) == false) {
					uni.showToast({
						title: '手机号无效！',
						icon: "none"
					})
					return false;
				}
				
				var szReg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/; 
				let checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (szReg.test(this.form.Email) == false) {
					uni.showToast({
						title: '邮箱无效！',
						icon: "none"
					})
					return false;
				}
				
				var obj = {
					url: this.$store.state.url + 'CRM/CreateCusLinkMan',
					method: 'POST',
					header: this.$store.state.token,
					data:{
						CusId :this.$store.state.CreateCusLinkMan,
						Name: this.form.Name,
						NameEn:this.form.NameEn,
						Position:this.form.Position,
						Mobile:this.form.Mobile,
						Tel:this.form.Tel,
						Email:this.form.Email,
					}
				}
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: '/pages/home/works/Firstvisit/magFirstvisit',
					})
				})	
			}
		}
	}
</script>

<style lang="scss" scoped>
.box{
	background-color: #FFFFFF;
	padding-left: 10px;
	box-sizing: border-box;
	.clattab{
		width: 100%;
		text-align: center;
		margin-top: 60px;
		button{
			margin: 20px;
		}
	}
}
</style>
