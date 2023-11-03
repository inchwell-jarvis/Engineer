<template>
	<view class="box">
		<div class="card" v-for="(item,index) in OrderData" @tap='Router(item)'>
			<div class="head">
				<div>{{item.CusFullName}}</div>
				<div>{{item.StateStr}}</div>
			</div>
			<div class='Time'>
				<span>{{item.Area}}</span>
				<span>{{item.CreateDate.split('T')[0]}}</span>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum: 1,
				pagesize: 999,
				OrderData: []
			}
		},
		onShow() {
			this.start()
		},
		onBackPress() {
			uni.navigateTo({
				url: "../work.8"
			});
			return true
		},
		methods: {
			start: function() {
				var obj = {
					url: this.$store.state.url + 'Bill/GetEquCheckBills',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						fullname: '',
						state: '-1',
						begin: '',
						end: '',
						cusId: "",
						pageNum: this.pageNum,
						numPerPage: this.pagesize,
						orderField: "",
						orderDirection: "",
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data.Dtos)
					this.OrderData = res.Data.Dtos
				})
			},
			Router:function(row){
				console.log(row.ID)
				uni.navigateTo({
				    url: 'EquipmentInventorySheetDetailed?id='+row.ID
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #e4eafa;
	}

	.card {
		width: 95%;
		min-height: 10px;
		margin: 0 auto;
		border-radius: 10px;
		background-color: #FFFFFF;
		margin-top: 10px;
		padding: 5px 10px;
		box-sizing: border-box;

		.head {
			line-height: 30px;
			height: 30px;

			div:nth-child(1) {
				width: 80%;
				height: 100%;
				float: left;
				font-size: 16px;
				font-weight: bold;
				text-overflow: ellipsis;
				/* ellipsis:显示省略符号来代表被修剪的文本  string:使用给定的字符串来代表被修剪的文本*/
				white-space: nowrap;
				/* nowrap:规定段落中的文本不进行换行   */
				overflow: hidden;
				/*超出部分隐藏*/
			}

			div:nth-child(2) {
				width: 20%;
				float: left;
				height: 100%;
				color: #333333;
			}
		}

		.Time {
			width: 100%;
			height: 30px;
			line-height: 30px;

			span:nth-child(1) {
				float: left;
			}

			span:nth-child(2) {
				float: right;
			}
		}
	}
</style>
