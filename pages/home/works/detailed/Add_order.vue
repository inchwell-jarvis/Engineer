<template>
	<view class="box">
		<!-- 客户名称 -->
		<view class="cu-form-group">
			<view class="title">客户名称</view>
			<input type="text" :v-model="client" :value="client" @input="onKeyInputs" />
			<view class="kuang" v-show="text">
				<view @tap="clicktext(item)" v-for="(item,index) in texts" :key="index">{{item.FullName}}</view>
			</view>
		</view>
		<!-- 服务类型 -->
		<view class="cu-form-group">
			<view class="title">服务类型</view>
			<picker @change="bindPickerChange" :value="index" :range="array">
				<view class="uni-input">{{array[index]}}</view>
			</picker>
		</view>
		<!-- 型号      服务类型-维修    -->
		<view v-if="xinghwei" class="cu-form-group">
			<view class="title">型号</view>
			<input type="text" value="" v-model="Model" />
		</view>
		<!-- 序列号     服务类型-维修   -->
		<view v-if="xinghwei" class="cu-form-group">
			<view class="title">序列号</view>
			<input type="text" value="" v-model="SerialNumber" />
		</view>
		<!-- 日期选择 -->
		<view class="cu-form-group">
			<view class="title">服务日期</view>
			<picker mode="date" :value="Time" start="2015-09-01" end="2090-09-01" @change="DateChange">
				<view class="picker">
					{{Time}}
				</view>
			</picker>
		</view>
		<!-- 联系人 -->
		<view class="cu-form-group">
			<view class="title">联系人</view>
			<input type="text" :v-model="lianxi" :value="lianxi"   @tap="onKeyInputsLipro" />
			<view class="kuang kuangadd" v-show="lianxibuttom">
				<u-button type="error" size="mini" @click='lianxibuttom = !lianxibuttom' style='width:100%'>关闭</u-button>
				<view v-for="(itemd,indexd) in lianxis" :key="indexd" @tap="clicklixnaix(itemd)" >{{itemd.Name}} </view>
			</view>
		</view>
		<!-- 手机号码 -->
		<view class="cu-form-group">
			<view class="title">手机号码</view>
			<input type="text" value="" v-model="mobilephonenumber" />
		</view>
		
		<!-- 邮箱 -->
		<view class="cu-form-group">
			<view class="title">邮箱</view>
			<input type="text" value="" style="font-size: 10px;" v-model="mailbox" />
		</view>
		
		<!-- 备注 -->
		<view class="cu-form-group">
			<textarea v-model="Memo" placeholder="备注" />
		</view>
		<button type="primary" class="but" @tap="path" :loading="load"  size="mini">新建</button>
	</view>
</template>

<script>
	// import mpopup from '@/components/xuan-popup/xuan-popup.vue'
	export default {
		data() {
			return {
				index: 0,
				array: ['保养', '维修', '安装', '培训', 'VIP回访', '钣喷回访', 'VIP与钣喷回访', '回访', '其它', '事假', '年假', '调休', '乘车', '地基勘探'],
				servicess: '保养', //选择的服务类型
				Time: '', //初始位今天日期
				text: false, //输入提示框
				texts: [], //输入提示词
				client: '', //客户名称
				clientID: '', //客户id
				mobilephonenumber: '', //手机号码
				mailbox: '', //邮箱
				xinghwei: false,
				SerialNumber: '', //序列号
				Model: '', //型号
				person:'',//联系人名称
				load:false,
				asd:0,
				lianxi:'',
				lianxis:[],
				lianxibuttom:false,
				Memo:'',
			}
		},
		onBackPress() {
			uni.navigateTo({
				url: "../work.4",
			});
			return true
		},
		mounted() {
			console.log(this.$store.state.vipitem)
			//获取当前时间
			var curDate = new Date()
			var curYear = curDate.getFullYear(); //获取完整的年份(4位,1970-????)
			var curMonth = curDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
			var curDay = curDate.getDate(); //获取当前日(1-31)
			this.Time = curYear + '-' + curMonth + '-' + curDay
			if (this.$store.state.vip) {
				console.log(this.$store.state.vipitem.Characteristics)
				this.client = this.$store.state.vipitem.CusFullName
				this.clientID = this.$store.state.vipitem.CusId
				this.$store.state.vip = false
				for (var i = 0; i < this.array.length; i++) {
					if (this.array[i] == this.$store.state.vipitem.Characteristics) {
						this.index = i
					}
				}
			}
		},
		methods: {

			path() { //跳转至新建页面
				
				if (!this.clientID) {
					uni.showToast({
						title: '客户错误',
						icon: "none"
					})
					return false;
				}
				if (!this.servicess) {
					uni.showToast({
						title: '类型错误',
						icon: "none"
					})
					return false;
				}
				if (!this.lianxi) {
					uni.showToast({
						title: '请输入联系人',
						icon: "none"
					})
					return false;
				}
				if (!(/^1[3456789]\d{9}$/.test(this.mobilephonenumber))) { //验证手机号 
					uni.showToast({
						title: '手机号有误',
						icon: "none"
					})
					return false;
				} //验证邮箱
				// if (!(/^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/.test(this.mailbox))) {
				// 	uni.showToast({
				// 		title: '邮箱有误',
				// 		icon: "none"
				// 	})
				// 	return false;
				// }
				this.load = true 
				if(this.asd == 1){return false}
				this.asd = 1
				var obj = {
					url: this.$store.state.url + '/PCenter/AddWorkDaily',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						CustomerId: this.clientID,
						ServiceDate: this.Time,
						ServiceType: this.array[this.index],
						LinkMan: this.person,
						LinkTel: this.mobilephonenumber,
						LinkEmail: this.mailbox,
						SerialNumber: this.SerialNumber,
						Model: this.Model,
						Abscissa: '',
						Ordinate: '',
						Memo: this.Memo,
					}
				}
				this.$http(obj).then((res) => {
					this.load = false
					this.$store.state.WorkdailyId = res.Data
					uni.navigateTo({
						url: './Editfile'
					});
				})
			},
			//服务类型
			bindPickerChange: function(e) {
				this.index = e.target.value
				this.servicess = this.array[e.target.value]
				this.index == 1 ? this.xinghwei = true : this.xinghwei = false
			},
			//时间
			DateChange(e) {
				this.Time = e.detail.value
			},
			//输入框    获取客户以及ID
			onKeyInputs: function(event) {
				if (event.target.value == '') {
					this.text = false
				} else {
					var obj = {
						url: this.$store.state.url + '/CRM/GetCustomerMini',
						method: 'GET',
						header: this.$store.state.token,
						data: {
							'search': event.target.value
						}
					}
					this.$http(obj).then((res) => {
						this.texts = res.Data.Dtos
						this.text = true
					})
				}
			},
			//点击联系人
			onKeyInputsLipro:function(event){
				// this.lianxibuttom = true
				 if(this.clientID  == ''){
					 uni.showToast({title: "请选择客户",icon: "none"})
					 return false
				 }
				var obj = {
					url: this.$store.state.url + 'CRM/GetCusLinkManMini',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						cusId : this.clientID 
					}
				}
				this.$http(obj).then((res) => {
					this.lianxis = res.Data.Dtos
					this.lianxibuttom = true
				})
			},
			//选择联系人
			clicklixnaix:function(item){
				this.lianxi =''
				this.mobilephonenumber = ''
				this.mailbox = ''
				this.person = ''
				console.log(item)
				this.person = item.Name
				this.lianxi = item.Name
				this.mobilephonenumber   = item.Mobile
				this.mailbox   = item.Email
				this.lianxibuttom = false
			},
			//点击提示词
			clicktext: function(item) {
				this.text = false
				this.client = item.FullName
				this.clientID = item.CusId
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		font-size: 13px;

		.but {
			width: 100px;
			height: 30px;
			border: none;
			float: right;
			color: #FFFFFF;
			margin-right: 20px;
			margin-top: 50px;
			text-align: center;
			line-height: 30px;
			border: none;
		}

		.cu-form-group {
			width: 95%;
			background: #FFFFFF;
			border: 1px solid #ccc;
			box-sizing: border-box;
			padding: 10px;
			color: #999999;
			margin: auto;
			border-radius: 10px;
			margin-top: 10px;
			position: relative;

			.title {
				width: 100px;
				display: block;
				float: left;
				color: #333333;

			}

			input {
				font-size: 14px;
			}

			.kuang {
				position: absolute;
				width: 200px;
				height: 199px;
				overflow: auto;
				background-color: #cccccc;
				z-index: 999999;
				margin-left: 100px;
				border-radius: 5px;
				box-sizing: border-box;

				view {
					width: 100%;
					height: 30px;
					text-align: left;
					line-height: 30px;
					font-size: 12px;
					color: #000000;
					overflow: hidden;
				}
			}
			.kuangadd{
				width: 80px;
				height: 150px;
				.view{
					text-align: center;
					
				}
			}
		}
	}
</style>
