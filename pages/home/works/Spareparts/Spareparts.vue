<template>
	<view class="box">
		<view class="Search" :style="{'height':Height}">

			<u-button v-if='Height != "350px" ' style='margin-top: 10px;transition: 0.5s;' type="primary"
				@tap=' Height ="350px" '>数据量较多，如果没找到设备请修改检索项</u-button>

			<u-form-item label="产品编码" label-width='200' :label-style='LabelStyle'>
				<u-input v-model="productCode" placeholder='请输入产品编码' />
			</u-form-item>
			<u-form-item label="内部编码" label-width='200' :label-style='LabelStyle'>
				<u-input v-model="barcodeMemo" placeholder='请输入内部编码' />
			</u-form-item>
			<u-form-item label="产品描述" label-width='200' :label-style='LabelStyle'>
				<u-input v-model="desc" placeholder='请输入产品描述' />
			</u-form-item>
			<u-form-item label="产品备注" label-width='200' :label-style='LabelStyle'>
				<u-input v-model="memo" placeholder='请输入产品备注' />
			</u-form-item>
			<u-form-item label="品牌" label-width='200' :label-style='LabelStyle'>
				<view style="width: 100%;height:100%;color: #007AFF;" @tap="brandShow = true">
					{{man || '点击选择品牌'}}
				</view>
			</u-form-item>
			<u-button size='medium' style='float: right;margin-top: 10px;' type="primary" @tap='Search()'>检索</u-button>


		</view>

		<!-- 品牌选择 -->
		<u-picker mode="selector" v-model="brandShow" :default-selector="[0]" :range="brandList" range-key="Name"
			@confirm='SeBrand'></u-picker>
		<!-- 设备 -->
		<view class="card" v-for="(itemrow,index) in Data" :key='index' @tap='primary(itemrow)'>
			<p>
				<sapn>产品编号：</sapn>{{itemrow.ProductCode || '- - - ' }}
			</p>
			<p>
				<sapn>内部编码：</sapn>{{itemrow.BarcodeMemo || '- - - ' }}
			</p>
			<p>
				<sapn>品牌：</sapn>{{itemrow.Manufacturer || '- - - ' }}
			</p>
			<p>
				<sapn>单位：</sapn>{{itemrow.Unit || '- - - ' }}
			</p>
			<p>
				<sapn>产品描述：</sapn>{{itemrow.Characteristics || '- - - ' }}
			</p>
			<p>
				<sapn>更新时间：</sapn>{{itemrow.UpdateDate.split('T')[0] || '- - - ' }}
			</p>
			<p style='text-align: right;color: #007AFF;'>点击选择</p>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 产品编码
				productCode: '',
				// 内部编码
				barcodeMemo: '',
				// 描述
				desc: '',
				//   产品备注
				memo: '',
				// 品牌
				man: '',
				// ----------------------------------------------------------
				name: '',
				LabelStyle: {
					"padding-left": '10px'
				},
				// 品牌的集合
				brandList: [],
				brandShow: false,
				// MinHeight
				Height: '350px',
				// 设备集合
				Data: []
			};
		},
		onBackPress() {
			uni.navigateTo({
				url: "./classification",
			});
			return true
		},
		created() {
			this.Getbrand()
		},
		methods: {
			Search: function() {
				this.Height = '50px'
				var obj = {
					url: this.$store.state.url + 'Product/GetProducts2',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						pageNum: 1,
						numPerPage: 10,
						orderField: "",
						orderDirection: "",
						proType: "1",
						/// 产品类型 1：零配件 2：整机 3：耗材 4：通用
						// kitflag: true,
						//   规定参数：bool kitflag   true零配件   false整机
						productCode: this.productCode,
						//   产品编码
						barcodeMemo: this.barcodeMemo,
						//   内部编码
						man: this.man,
						//   品牌
						desc: this.desc,
						//   产品描述
						memo: this.memo,
						//   产品备注
					},
				}
				this.$http(obj).then((res) => {
					console.log(res.Data);
					this.Data = res.Data.Dtos
				})

			},

			// 获取品牌
			Getbrand: function() {
				var obj = {
					url: this.$store.state.url + 'Product/GetManufacturer',
					method: 'GET',
					header: this.$store.state.token,
				}
				this.$http(obj).then((res) => {
					console.log(res.Data)
					this.brandList = res.Data
				})
			},
			// 选择品牌
			SeBrand: function(row) {
				console.log(row[0])

				this.man = this.brandList[row[0]].Name
			},
			primary: function(row) {
				this.$store.state.productCodce = row.BarcodeMemo
				this.$store.state.pageUrl = 2
				uni.navigateTo({
					url: "./ProductDetails",
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
	.box {
		padding-top: 50px;
		box-sizing: border-box;
	}

	.slot-content {
		background-color: #FFFFFF;
	}

	.Search {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		padding-bottom: 10px;
		background-color: #FFFFFF;
		border-radius: 0 0 10px 10px;
		-webkit-box-shadow: 3px 3px 6px #c1c1c1;
		-moz-box-shadow: 3px 3px 6px #c1c1c1;
		box-shadow: 3px 3px 6px #c1c1c1;
		box-sizing: border-box;
		transition: 0.2s;
		overflow: hidden;
		z-index: 10;
	}

	.card {
		width: 90%;
		min-height: 30px;
		border: 1px solid #F0AD4E;
		border-radius: 10px;
		padding: 10px;
		box-sizing: border-box;
		margin: 10px auto;

		sapn {
			display: block;
			width: 100px;
			float: left;
			color: #555555;
			font-weight: bold;
		}
	}
</style>
