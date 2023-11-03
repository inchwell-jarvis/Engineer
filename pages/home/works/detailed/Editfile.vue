<template>
	<view class="box">


		<view class="title">
			<view class="tit">
				是否完结
			</view>

			<view class="radio">
				<radio-group @change="radioChange">
					<label style="margin-right: 15px;" v-for="(item, index) in items" :key="item.value">
						<radio :value="item.value" :checked="index === current" />
						{{item.name}}
					</label>
				</radio-group>
			</view>
		</view>
		<view class="textmini">
			<text> 安装、保养、维修任务已结束的，请选择是
				安装、保养、维修任务未结束的，请选择否</text>
		</view>

		<view class="title" style="border-bottom: 1px solid #ccc;">
			<view class="tit">
				本次日报是否同时进行了回访?
			</view>

			<view class="radio">
				<radio-group v-model="Other" @change="radioChange2">
					<label style="margin-right: 15px;" v-for="(item, index) in items2" :key="item.value">
						<radio :value="item" />
						{{item}}
					</label>
				</radio-group>
			</view>
		</view>

		<view class="content">
			<view class="neir">工作内容
				<image @tap="addinput1" class="iconimg" src="../../../../static/icon/icon/addto.png" mode=""></image>
			</view>
			<view v-for="(item,index) in content" :key="index" class="input">
				<image class="delete" @tap="deletecontent(index)" src="../../../../static/icon/icon/cancel.png" mode="">
				</image>
				<input v-model="item.text" type="text" value="" class="zhi" />
			</view>
		</view>
		<view class="content">
			<view class="neir">工作计划
				<image @tap="addinput" class="iconimg" src="../../../../static/icon/icon/addto.png" mode=""></image>
			</view>
			<view v-for="(item,index) in text" :key="index" class="input">
				<image class="delete" @tap="deletetext(index)" src="../../../../static/icon/icon/cancel.png" mode="">
				</image>
				<input v-model="item.text" type="text" value="" class="zhi" />
			</view>

		</view>
		<view style="padding-left: 15px;">添加图片说明</view>



		<view class="image">
			<an-upload-img></an-upload-img>
		</view>

		<button class="imgadd" @tap="imgVuex" :disabled="load" type="primary">上传</button>
	</view>
</template>

<script>
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg'
	export default {
		data() {
			return {
				content: [ //工作内容
					{
						text: ''
					}
				],
				text: [ //工作计划
					{
						text: ''
					}
				],
				statusCode: true, //上传成功标识
				addimgbase: true, //是否有图片标识
				load: false,
				asd: 0,
				checkbox: 0,


				items2: ['否', '是'],
				Other: '',


				items: [{
						value: 'CHN',
						name: '否',
						checked: 'true'
					},
					{
						value: 'USA',
						name: '是'
					},
				],
				current: 99
			}
		},
		onBackPress() {
			uni.navigateTo({
				url: "../work.4",
			});
			return true
		},
		components: {
			anUploadImg
		},
		created() {
			var obj = {
				url: this.$store.state.url + '/PCenter/GetWorlDaily',
				method: 'GET',
				header: this.$store.state.token,
				data: {
					workdailyId: this.$store.state.WorkdailyId
				}
			}
			this.$http(obj).then((res) => {

			})
		},
		methods: {
			radioChange2(rv) {
				this.Other = rv.target.value
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			//上传按钮
			imgVuex() {
				console.log(this.current)
				if (this.current == 99) {
					uni.showToast({
						title: '请选择是否完结！',
						icon: "none"
					})
					return false
				}
				if (this.Other == '') {
					uni.showToast({
						title: '请选择本次日报是否同时进行了回访！',
						icon: "none"
					})
					return false
				}
				console.log('111')
				if (this.asd == 1) {
					return false
				}
				this.asd = 1
				if (this.load == true) {
					return false
				}
				this.load = true

				if (!this.$store.state.imgList[0]) {
					this.addimgbase = false //如果图片集合没有第一项即为false
				} //是否上传图片
				var Plans = []
				var Contents = [] //待上传的日报 
				for (var i = 0; i < this.text.length; i++) {
					Plans.push(this.text[i].text)
				}
				for (var i = 0; i < this.content.length; i++) {
					Contents.push(this.content[i].text)
				}
				var obj = {
					url: this.$store.state.url + 'PCenter/AddWorkDailyContent',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						WorkDailyId: this.$store.state.WorkdailyId,
						Contents: Contents,
						Plans: Plans,
					}
				}
				this.$http(obj).then((res) => {
					console.log(this.$store.state.imgList)
					this.load = false //过渡
					if (this.addimgbase) {
						console.log(this.upimg())
					} else {
						this.agi()
					}
				})
			},
			//上传图片功能
			upimg: function() {
				for (var i = 0; i < this.$store.state.imgList.length; i++) {
					var obj = {
						url: this.$store.state.url + 'PCenter/UploadWorkDailyPhoto',
						method: 'POST',
						header: this.$store.state.token,

						data: {
							Id: this.$store.state.WorkdailyId,
							FileStr: this.$store.state.imgList[i]
						}
					}
					this.$http(obj).then((res) => {

					})
				}
				this.$store.state.imgList = []
				this.agi()

			},
			//改变当前订单状态
			agi: function() {
				console.log('改变当前订单状态')
				var obj = {
					url: this.$store.state.url + 'PCenter/UploadWorkDaily',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.$store.state.WorkdailyId,
						type: this.current,
						Other: this.Other,
					}
				}
				console.log(obj)
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: '../work.4'
					});
				})
			},
			//添加工作计划
			addinput() {
				var aa = {
					text: ''
				}
				this.text.push(aa)
			},
			//删除工作计划输入框
			deletetext(i) {
				this.text.splice(i, 1)
			},
			//添加工作内容
			addinput1() {
				var aa = {
					text: ''
				}
				this.content.push(aa)
			},
			//删除内容输入框
			deletecontent(i) {
				this.content.splice(i, 1)
			}
		}

	}
</script>

<style scoped lang="scss">
	.box {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		font-size: 14px;

		.textmini {
			width: 100%;
			font-size: 12px;
			color: #565656;
			padding-bottom: 10px;
			padding-left: 15px;
			box-sizing: border-box;
			border-bottom: 1px solid #C0C0C0;

		}

		.title {
			width: 100%;
			height: 40px;
			line-height: 40px;
			padding-left: 15px;
			padding-right: 20px;
			box-sizing: border-box;
			font-weight: bold;

			.tit {
				float: left;
				margin-right: 20px;
			}

		}

		.content {
			width: 100%;

			.neir {
				width: 100%;
				height: 40px;
				line-height: 40px;
				padding-left: 15px;
				padding-right: 20px;
				box-sizing: border-box;
				font-weight: bold;
				border-bottom: 1px solid #C0C0C0;

				.iconimg {
					width: 30px;
					height: 30px;
					display: block;
					float: right;
					margin-top: 5px;
				}
			}

			.input {
				width: 100%;
				height: 40px;
				border-bottom: 0.5px solid #C0C0C0;

				.delete {
					width: 30px;
					height: 30px;
					margin-top: 5px;
					margin-left: 5px;
					display: block;
					float: left;
				}

				.zhi {
					width: 90%;
					height: 40px;
					padding-left: 15px;
					box-sizing: border-box;
				}
			}


		}

		//上传按钮
		.imgadd {
			width: 200px;

		}

		.image {
			width: 100%;

		}

	}
</style>