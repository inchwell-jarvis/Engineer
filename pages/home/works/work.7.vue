<template>
	<view class="box">
		<view class="top">
			<input type="text" v-model="input" placeholder="请输入客户" @input="onKeyInput" :focus='true'	 />
		</view>
		<view class="lainxinag" v-if="shuju">
			<view class="text" v-for="(item,index) in asd" @tap="que(item)" :key="index">{{item.FullName}}</view>
		</view>
		<view class="buttonm">
			<button type="primary" @tap="clicck" size="mini">确认</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				name: '赵鸿飞',
				value: '',
				asd: '',
				shuju: false,
				input: '', //输入框内容
				code: '',
			}
		},
		onBackPress() { //自定义返回逻辑
			uni.switchTab({
				url: "../home"
			});
			return true
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			//       console.log(option.item); //打印出上个家伙传递的参数。
			// this.name = option.item
		},
		methods: {
			onKeyInput: function(event) {
				var that = this
				if (event.target.value != '') {
					var obj = {
						url: this.$store.state.url + '/CRM/GetCustomerMini',
						method: 'GET',
						header: this.$store.state.token,
						data: {
							'search': event.target.value
						}
					}
					this.$http(obj).then((res) => {
						that.asd = res.Data.Dtos
						this.shuju = true
					})

				}
			},
			que(item) {
				this.shuju = false
				this.input = item.FullName
				this.code = item.CusId
			},
			clicck: function() { //确认
				if (this.code != '') {
					this.$store.state.Customercode = this.code
					uni.navigateTo({
						url: "./Spareparts/classification?state=init",
					});
				} else {
					uni.showToast({
						title: "请输入客户",
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		font-size: 13px;

		.top {
			width: 100%;
			height: 70px;
			display: flex;
			justify-content: center;
			padding-top: 30px;
			box-sizing: border-box;

			input {
				padding-left: 10px;
				width: 70%;
				height: 30px;
				background-color: #FFFFFF;
				border-radius: 5px;
				display: block;
				border: 1px solid #C0C0C0;
				font-size: 14px;
			}
		}

		.lainxinag {
			width: 70%;
			height: 400px;
			margin: auto;
			overflow: auto;

			.text {
				width: 100%;
				height: 40px;
				border: #999999;

			}
		}
	}

	.buttonm {
		width: 100%;
		margin-top: 40px;
		display: flex;
		justify-content: center;

		button {
			width: 40%;
			height: 35px;
			line-height: 35px;
			font-size: 20px;
		}
	}
</style>
