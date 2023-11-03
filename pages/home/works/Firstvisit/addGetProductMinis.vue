<template>
	<view class="boxx">
		<view class="topone">
				<u-search placeholder="请输入检索内容" v-model="search" @search='init'	 @custom='init' ></u-search>
		</view>
		
		
		<view  class="basicinformation" style="background: #f4f4f4;">
				<u-card  v-for="(item,indexs) in Data"  :key='indexs' :title=" item.EqumentType + ' - ' + item.Branch"  >
					<view class="" slot="body">
						<view class="textstylecelo">
							<span class='span1' >编码：</span>
							<span>{{item.ProCode || ' - - '}}</span>
						</view>
						<view class="textstylecelo">
							<span class='span1' >描述：</span>
							<span>{{item.Describe || ' - - '}}</span>
						</view>
						<view class="textstylecelo">
							<input class="uni-input" v-model="item.Numbers" type="number" placeholder="数量" />
							<button size='mini' type="primary" @tap='ClickCardBottom(item)' >添加</button>
						</view>
					</view>
				</u-card>
		</view>
		
	

		
		
		
	
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'',
				Data:[],
				text:'',
				Numbers:'',
				ProCode:'',
			};
		},
		created() {
			// this.init()
		},
		methods:{
			init:function(){
				var obj = {
					url: this.$store.state.url + 'Product/GetProductMinis',
					method: 'GET',
					header: this.$store.state.token,
					data:{
						search : this.search,
						kit :false,
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data.Dtos)
					this.Data =  res.Data.Dtos
					for (var i = 0; i < this.Data.length; i++) {
						this.Data[i]['Numbers'] = ''
					}
				})
			},
			ClickCardBottom:function(item){
				if(item.Numbers == ''){
					uni.showToast({
						title: "请输入数量！",
						icon: "none"
					})
					return false
				}
				this.$store.state.ClickCardText = item.EqumentType  + '\n' +  item.Branch+ '  ' + item.ProCode + ' * ' + item.Numbers  + '\n' + item.Describe
				uni.navigateTo({
					url: '/pages/home/works/Firstvisit/magFirstvisit',
				})
			}			
		}
	}
</script>

<style lang="scss" scoped>
.boxx{
	width: 100%;
	position: relative;
	padding-top: 50px;
	overflow: auto;
	.textstylecelo{
		padding: 5px;
		margin-bottom: 20px;
		input{
			width: 100px;
			border: 1px solid #ccc;
			border-radius: 5px;
			display: block;
			float: left;
		}
		button{
			float: right;
		}
	}
	
	
	
	.show_u_popup{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 80%;
		height: 160px;
		background: #fff;
		z-index: 100;
		border-radius: 10px;
		padding-left: 20px;
		box-sizing: border-box;
		
					border: 1px solid #e3dfdf;
					border-radius: 5px;
					-webkit-box-shadow: 3px 3px 6px #c1c1c1;
					-moz-box-shadow: 3px 3px 6px #c1c1c1;
					box-shadow: 3px 3px 6px #c1c1c1;
		
	}
	.topone {
			width: 100%;
			height: 50px;
			padding: 10px 10px 0 10px;
			box-sizing: border-box;
			background: #f8f8f8;
			position: fixed;
			top: 0px;
			// top: 40px;
			z-index: 99;
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
		
		.basicinformation {
			width: 95%;
		
			background: #FFFFFF;
			margin: auto;
			border-radius: 10px;
			margin-top: 10px;
			margin-left: 2.5%;
			margin-bottom: 10px;
			border: 1px solid #C0C0C0;
			float: left;
		
			.Task1 {
				width: 95%;
				margin: auto;
				box-sizing: border-box;
				background-color: #007AFF;
		
				.head {
					//蓝色标题
					width: 80%;
					height: 25px;
					background-color: #007AFF;
					color: #FFFFFF;
					border-radius: 5px;
					font-weight: bold;
					overflow: hidden;
					line-height: 25px;
					padding-left: 15px;
					box-sizing: border-box;
					font-size: 13px;
					float: left;
				}
		
				.ps {
					width: 25px;
					height: 25px;
					line-height: 25px;
					box-sizing: border-box;
					float: left;
					margin-left: 20px;
		
					image {
						display: block;
						width: 25px;
						height: 25px;
						float: left;
					}
				}
		
				.EquPhotos {
					//照片组
					width: 100%;
					height: 135px;
					background-color: #d8d8d8;
					border-radius: 10px;
					float: left;
					margin-top: 10px;
					margin-bottom: 10px;
					padding: 5px;
					box-sizing: border-box;
		
					.texts {
						width: 100%;
						height: 20px;
						line-height: 20px;
						font-size: 13px;
						font-weight: bold;
		
						image {
							width: 20px;
							height: 20px;
							float: right;
						}
					}
		
					.pushimg {
						width: 100%;
						height: 105px;
		
						.left {
							width: 105px;
							height: 105px;
							float: left;
							margin-left: 20px;
							overflow: hidden;
		
							.images {
								width: 100%;
								height: 100%;
							}
						}
		
						.right {
							margin-left: 60px;
						}
					}
				}
			}
		
			.text {
				width: 95%;
				height: 30px;
				display: block;
				margin: auto;
				line-height: 30px;
		
				.span {
					width: 100px;
					display: block;
					height: 100%;
					float: left;
				}
			}
			.text2 {
				width: 95%;
				display: block;
				margin: auto;
				line-height: 30px;
					
				.span {
					width: 100px;
					display: block;
					height: 100%;
					float: left;
				}
			}
		}
}
</style>
