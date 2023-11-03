<template>
	<view class="box">
		<view class="topValue">
			<input type="text" v-model="search" class="input">
			<button type="primary" size="mini" @click="init()">检索</button>
		</view>
		<div class="buttom">
			<view class="PDF" v-for="(item,index) in Data" :key="index" @click="urlPDF(item)">
				{{item.Key}}
			</view>
		</div>
		<!--  -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				search: '',
				Data: [],
			};
		},
		created() {
			console.log(this.$store.state.Trainingcaselists)
			this.init()
		},
		methods: {
			init: function() {
				var obj = {
					url: this.$store.state.url + 'System/GetTrainingCaseDetail',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						caseId: this.$store.state.Trainingcaselists,
						search: this.search, // 检索项
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data) //  数据Data
					this.Data = res.Data
				})
			},
			urlPDF: function(PDF) {
				this.$store.state.webviewurl = PDF.Value
				uni.navigateTo({
					url: "../../../../components/webview/webview",
				});
			}
		}
	}
</script>

<style lang="scss">
	.box {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		font-size: 14px;

		.topValue {
			width: 100%;
			height: 50px;
			background-color: #FFFFFF;
			padding-top: 10px;
			box-sizing: border-box;

			.input {
				float: left;
				border: 1px solid #ccc;
				height: 28px;
				margin-left: 60px;
				border-radius: 5px;
			}
		}

		.buttom {
			width: 100%;
			height: calc(100% - 50px);
			overflow: auto;

			.PDF {
				width: 98%;
				// height: 60px;
				background-color: #e4f1ff;
				border-radius: 10px;
				margin: auto;
				margin-top: 10px;
				padding: 10px 10px;
				line-height: 25px;
				box-sizing: border-box;
				overflow: hidden;
			}
		}

	}
</style>
