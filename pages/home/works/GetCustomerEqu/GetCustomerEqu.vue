<template>
	<view class="box">

		<u-field v-model="form.InchwellCode" label="二维码编号" label-width='150' placeholder="请扫描设备二维码">
			<u-button size="mini" slot="right" type="success" @tap='Scode(1)'>
				<u-icon name="scan" size="40"></u-icon>
			</u-button>
		</u-field>

		<view style="width: 100%;padding: 20px 20px 0 0;box-sizing: border-box;">
			<u-button size='medium' type="primary" style='float: right;' @tap='BindCusEquSensor()'>确认</u-button>
		</view>
		
		
		
		<u-popup v-model="show" mode="bottom"   border-radius="14" length='auto'>
				<view class="TopTit">
					<u-image  width="100%" height="300rpx" mode='aspectFit' :src=" 'http://icms.inchwell.com.cn/file/product/' +  boxData.Photo ">
						<u-loading slot="loading">正在加载图片！</u-loading>
						<view slot="error" style="font-size: 24rpx;">{{boxData.Photo == null ? '此设备暂无相关图片！' :''}}！</view>
					</u-image>
						
						<br>
			
					   <div class="text">
					              <div class="dt">编号</div>
					              <div class="dd">{{boxData.ProdcutCode }}</div>
					            </div>
					
					            <div class="text">
					              <div class="dt">品牌</div>
					              <div class="dd">{{boxData.Brand }}</div>
					            </div>
					
					            <div class="text">
					              <div class="dt">序列号</div>
					              <div class="dd">{{boxData.SN }}</div>
					            </div>
					
					            <div class="text">
					              <div class="dt">控制器</div>
					              <div class="dd">{{boxData.Controller }}</div>
					            </div>
					
					            <div class="text">
					              <div class="dt">类别</div>
					              <div class="dd">{{boxData.Type2  }}</div>
					            </div>
					
					            <div class="text">
					              <div class="dt">总使用</div>
					              <div class="dd">{{boxData.TotalMinute  }}</div>
					            </div>
					
					            <div class="text">
					              <div class="dt">当前状态</div>
					              <div class="dd">{{boxData.CurrentState  }}</div>
					            </div>
					
					            <div class="text">
					              <div class="dt">描述</div>
					              <div class="dd">{{boxData.Desc}}</div>
					            </div>

					
				
				
				
					<br><br>
		
				</view>
			</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					InchwellCode: '',
				},
				show:false,
				boxData:{}
			};
		},
		created() {},
		methods: {
	
			Scode: function(code) {
				var that = this
				uni.scanCode({
					success: function(res) {
						if (code == 1) {
							if (res.result.split('?')[0] ==
								'http://icms.inchwell.com.cn/web/gotoinchwell.html') {
								that.form.InchwellCode = res.result.split('=')[1]
							} else {
								uni.showToast({
									title: "请扫描英之杰设备二维码",
									icon: "none"
								})
							}
						} else {
							that.form.Controller = res.result
						}
					}
				});
			},
			BindCusEquSensor: function() {
				if (this.form.InchwellCode == '' || this.form.InchwellCode == null) {
					uni.showToast({
						title: "请扫描设备二维码",
						icon: "none"
					})
					return false
				}
			
				var obj = {
					url: this.$store.state.url + 'CRM/GetCustomerEqu',
					method: 'GET',
					data: this.form
				}
				console.log(obj)
				this.$http(obj).then((res) => {
					console.log(res.Data.Dto)
					this.boxData = res.Data.Dto
					this.show = true
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.field {
		width: 100%;
		height: 45px;
		border-bottom: 1px solid #e4e7ed;
		font-size: 14px;
		padding: 10px 14px;
		text-align: left;
		position: relative;
		color: #303133;

		.field_li {
			float: left;
		}

		.field_li1 {
			width: 80px;
		}
	}

	.PopupBottom {
		width: 100%;
		height: 300px;
		padding: 10px;
		box-sizing: border-box;

	}
	.TopTit{
		padding: 10px;
		box-sizing: border-box;
		.text {
		        margin-top: 10px;
		        .dt {
		          float: left;
		          padding-left: 10px;
		          font-family: simsun;
		          color: #999;
		          font-size: 13px;
		          font: 12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB,
		            "\u5b8b\u4f53", sans-serif;
		          -webkit-font-smoothing: antialiased;
		        }
		        .dd {
		          margin-left: 100px;
		          color: #666;
		          line-height: 18px;
		          font-size: 14px;
		        }
		      }

	}
</style>
