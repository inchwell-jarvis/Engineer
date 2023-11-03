<template>
	<view class="box">

		<!-- 客户信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				客户信息
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">
					客户名称
				</view>
				<view class="Mini_list_right">
					{{this.WorkDailyDetailDto.CustomerName}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					联系人
				</view>
				<view class="Mini_list_right">
					{{this.WorkDailyDetailDto.LinkMan}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					手机号
				</view>
				<view class="Mini_list_right">
					{{this.WorkDailyDetailDto.LinkTel}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					邮箱
				</view>
				<view class="Mini_list_right">
					{{this.WorkDailyDetailDto.LinkEmail}}
				</view>
			</view>
		</view>



		<!-- 基础信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				基础信息
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">
					工程师
				</view>
				<view class="Mini_list_right">
					{{this.WorkDailyDetailDto.Engineer}}
				</view>
			</view>
			
			<view class="Mini_list">
				<view class="Mini_list_left">
					型号
				</view>
				<view class="Mini_list_right">
					{{this.WorkDailyDetailDto.ModelNumber}}
				</view>
			</view>
			
			<view class="Mini_list">
				<view class="Mini_list_left">
					序列号
				</view>
				<view class="Mini_list_right">
					{{this.WorkDailyDetailDto.SerialNumber}}
				</view>
			</view>
			
			<view class="Mini_list">
				<view class="Mini_list_left">
					服务日期
				</view>
				<view class="Mini_list_right">
					{{this.WorkDailyDetailDto.ServiceDate}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					服务类型
				</view>
				<view class="Mini_list_right">
					{{this.WorkDailyDetailDto.ServiceType}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					状态
				</view>
				<view class="Mini_list_right">
					已上传
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					是否完结
				</view>
				<view class="Mini_list_right">
					{{this.WorkDailyDetailDto.IsOver}}
				</view>
			</view>
		</view>



		<view class="Customer">
			<view class="Customer_Top">
				备注
			</view>
			<view class="textarea">
				{{Memo}}
				<!-- <textarea class="textarea"  :value="Memo" placeholder="" auto-height /> -->
			</view>
		</view>

		<view class="Customer">
			<view class="Customer_Top">
				说明
			</view>
			<view class="textarea" v-for="(item,index) in Descriptions" :key="index + 1">
				{{index+1}}. {{item.Content}}
			</view>
		</view>


		<view class="Customer">
			<view class="Customer_Top">
				计划
			</view>
			<view class="textarea" v-for="(item,index) in Plans" :key=" 'item' + index">
				{{index+1}}. {{item.Content}}
			</view>
		</view>


		<view class="Customer">
			<view class="Customer_Top">
				附图
			</view>
			<view class="thisphotos">
				<image v-for="(item,index) in photos" :key="index" :src="item.Url" mode=""></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id //打印出上个页面传递的参数。
			console.log(option.id)
		},
		data() {
			return {
				name: "查看详情页",
				id: '',
				WorkDailyDetailDto: '',
				photos: '',
				Descriptions: '',
				Plans: '', //计划
				Memo: '',
			}
		},
		mounted() {
			var obj = {
				url: this.$store.state.url + '/PCenter/GetWorlDaily',
				method: 'GET',
				header: this.$store.state.token,
				data: {
					workdailyId: this.id
				}
			}
			this.$http(obj).then((res) => {
				this.WorkDailyDetailDto = res.Data.WorkDailyDetailDto
				this.WorkDailyDetailDto.CustomerName = this.WorkDailyDetailDto.CustomerName.substring(0, 20)
				this.Plans = res.Data.Plans
				this.photos = res.Data.Photos
				this.Descriptions = res.Data.Descriptions
				console.log(res.Data)
				this.Memo = res.Data.WorkDailyDetailDto.Memo
			})
		}
	}
</script>

<style scoped lang="scss">
	.box {
		height: 100%;
		font-size: 14px;
		box-sizing: border-box;
		// 搬运客户APP详情页

		.Customer {
			width: 100%;
			background-color: #FFFFFF;
			margin-top: 20px;

			.thisphotos {
				//图片外框
				width: 100%;
				background-color: #FFFFFF;

				image {
					width: 80%;
					display: block;
					margin: auto;
					margin-top: 10px;
				}
			}

			.Customer_Top {
				width: 100%;
				height: 40px;
				border-bottom: 1px solid #c3c3c3;
				line-height: 40px;
				padding-left: 20px;
				font-weight: bold;
				box-sizing: border-box;
			}

			.textarea {
				width: 90%;
				margin: auto;
				margin: 10px;

				.textarea {
					text-indent: 10px;
					font-size: 14px;
					color: #555555;
				}

				.Quote {
					width: 100%;
					// background-color: #dddddd;
					border-radius: 10px;
					margin-bottom: 10px;
					height: 100px;
					padding-top: 10px;
					box-sizing: border-box;

					button {
						float: right;
					}

					.Quote_Top {
						width: 100%;
						height: 25px;

						text {
							float: right;
						}
					}
				}

				.Customer_Top_Code {
					width: 100%;
					height: 20px;
					border-bottom: 1px solid #C8C7CC;

					.Customer_Top_Code_left {
						width: 50%;
						float: left;
						line-height: 20px;
						color: #999999;
					}

					.Customer_Top_Code_right {
						text-align: right;
						line-height: 20px;
					}
				}

				image {
					width: 100px;
					height: 100px;
					margin-left: 10px;
				}
			}

			.Mini_list {
				width: 100%;
				height: 30px;
				line-height: 30px;
				padding-left: 20px;
				box-sizing: border-box;

				.Mini_list_left {
					width: 25%;
					height: 100%;
					font-weight: bold;
					float: left;
					font-size: 12px;
					color: #555555;
				}

				.Mini_list_right {
					width: 75%;
					height: 100%;
					color: #808080;
					float: left;
					overflow: hidden;
					font-size: 12px;
				}
			}
		}
	}

	// 1431  2405
</style>
