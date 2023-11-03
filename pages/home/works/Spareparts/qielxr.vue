<template>
	<view class="box">
		<view class="kuang" v-for="(item,index) in data" :key='index' @tap="qie(item)">
			<view class="view1">
				{{item.Name}}
			</view>
			<view class="">
				联系方式：{{item.Mobile || '暂无' }}
			</view>
			<view class="view3">
				地址：{{item.Address  || '暂无' }}
			</view>
			<!-- <text class="tet1"></text>
			<text class="tet2"></text> -->
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				CustomerId: '',
			};
		},
		mounted() {
			this.init()
		},
		methods: {
			//
			init: function() {
				if (this.$store.state.initstates) {
					this.CustomerId = this.$store.state.Customercode
				} //客户id
				if (!this.$store.state.initstates) {
					this.CustomerId = this.$store.state.CustomerIdid
				} //订单带过来的客户id
				var obj = {
					url: this.$store.state.url + 'CRM/GetCusLinkManMini',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						cusId :this.CustomerId
					}
				}
				this.$http(obj).then((res) => {
					this.data = res.Data.Dtos
				})
			},
			//切换联系人
			qie: function(item) {
				this.$store.state.lianxir = item
				uni.navigateTo({
					url: "./Buy"
				})
			}


		}
	}
</script>

<style lang="scss">
	.box {
		overflow: auto;

		.kuang {
			width: 95%;
			height: 60px;
			background-color: #FFFFFF;
			border-radius: 5px;
			margin: auto;
			margin-top: 10px;
			box-sizing: border-box;
			view{
				padding-left: 10px;
				width: 50%;
				height: 30px;
				float: left;
				line-height: 30px;
				box-sizing: border-box;
			}
			.view1{
				font-weight: bold;
			}
			.view3{
				width: 100%;
			}
		}
	}
</style>
