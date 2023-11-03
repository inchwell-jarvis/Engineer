<template>
	<view class="box">

		<div class="heaner">
			<div class="left">
				共 {{ Data2.length }} 条
			</div>
			<div class="right">
				<u-search placeholder="输入设备相关信息" v-model="keyword"></u-search>
			</div>
		</div>
		
		<u-empty v-if="!Data2.length" text="未查询到设备" mode="list"></u-empty>

		<u-card v-if="Data2[0]" v-for="(item,index) in Data2" @tap="click(item)" :key="index" :title="item.Brand"
			:sub-title="item.SN" class='card'>
			<view style="margin: -5px;" slot="body">

				<view>
					{{ item.Desc }}
				</view>

			</view>
			<view class="" slot="foot">
				<u-icon name="chat-fill" size="34" color="" :label="item.ProdcutCode"></u-icon>
			</view>
		</u-card>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CusId: '',
				Data: [],
				Data2: [],
				keyword: '',
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.CusId); //打印出上个页面传递的参数。
			this.CusId = option.CusId
		},
		watch: {
			keyword(newValue, oldValue) {
				this.Data2 = []
				if (newValue.trim() == '') {
					this.Data2 = this.Data
				} else {
					// 遍历 Data 数组
					for (const item of this.Data) {
						console.log(item)
						 if (
						          item.Brand && item.Brand.includes(newValue) ||
						          item.ProductCode && item.ProductCode.includes(newValue) ||
						          item.Desc && item.Desc.includes(newValue) ||
						          item.SN && item.SN.includes(newValue)
						        ) {
							// 如果对象属性包含 keyword 的值，则将该对象添加到 Data2 数组中
							this.Data2.push(item)
						}
					}
					// 查找 this.Data 的 Brand  ProdcutCode  Desc  SN 的这四个对象属性是否包含 newValue ，如果包含就把这个对象放到 this.Data2 中
				}
			},
		},
		created() {
			this.start()
		},
		methods: {
			start() {
				var obj = {
					url: this.$store.state.url + 'CRM/GetCustomerEqus',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						pageNum: 1,
						numPerPage: 99999,
						orderField: "",
						orderDirection: "",
						search: '',
						CusId: this.CusId,
						onlyhavesn: 2,
						sourceId: '',
						otherType: '',
					}
				}
				this.$http(obj).then((res) => {
					console.log(res)
					this.Data = res.Data.Dtos
					this.Data2 = res.Data.Dtos
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		box-sizing: border-box;
		background-color: #e7e7e7;
		padding-top: 40px;

		.heaner {
			width: 100%;
			height: 40px;
			background-color: #fff;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
			padding-top: 5px;

			.left {
				width: 80px;
				height: 100%;
				float: left;
				line-height: 35px;
				text-align: center;
			}

			.right {
				width: calc(100% - 80px);
				height: 100%;
				float: left;
			}
		}
	}
</style>