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
		<view class="cu-form-group">
			<view class="title">供应商</view>
			<picker @change="bindPickerChange" :range="DtoOne">
				<view class="uni-input"> {{One}} </view>
			</picker>
		</view>

		<view class="cu-form-group">
			<view class="title">设备类型</view>
			<picker @change="bindPickerChangeTwo" :range="DtoTwo">
				<view class="uni-input"> {{Two}}</view>
			</picker>
		</view>

		<view class="cu-form-group">
			<view class="title">品牌</view>
			<picker @change="bindPickerChangeThere" :range="DtoThere">
				<view class="uni-input"> {{There}}</view>
			</picker>
		</view>

		<view class="cu-form-group">
			<view class="title">设备</view>
			<picker @change="bindPickerChangeSB" :range="DtoSB">
				<view class="uni-input"> {{Dtosb}}</view>
			</picker>
		</view>
		
		<view class="cu-form-group">
			<view class="title">序列号</view>
			
			<view class="uni-input">
				<text>{{Code1 || '- - ' }}</text>
				<text>{{Code2 || '- - ' }}</text>
				<text>{{Code3 || '- - ' }}</text>
				<text>{{equipment}}</text>
			</view>
		</view>
		
		<view class="cu-form-group">
			<view class="title">服务日期</view>
			<picker mode="date" :value="Time" start="2015-09-01" end="2090-09-01" @change="DateChange">
				<view class="picker">
					{{Time}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group">
			<textarea v-model="Remark" placeholder="请输入备注" />
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				equipment: this.$store.state.equipments,
				Codes: this.Code1 + this.Code2 + this.Code3 + this.equipment  ,
				data: {},
				GetProductType33: [],
				Sb: [],

				DtoOne: [],
				One: '选择',

				DtoTwo: [],
				Two: '选择',

				DtoThere: [],
				There: '选择',

				DtoSB: [],
				Dtosb: '选择',
				DtosId:'',


				OneId: '',
				TwoId: '',
				ThereId: '',

				Time: '', //初始位今天日期
				Remark:'',//备注
				
				
				Code1:'',
				Code2:'',
				Code3:'',
				
				text: false, //输入提示框
				texts: [], //输入提示词
				client:'',//联系人姓名
				clientId:'',//联系人Id



			};
		},
		mounted() {
			this.equipment = this.$store.state.equipments
			//获取当前时间
			var curDate = new Date()
			var curYear = curDate.getFullYear(); //获取完整的年份(4位,1970-????)
			var curMonth = curDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
			var curDay = curDate.getDate(); //获取当前日(1-31)
			this.Time = curYear + '-' + curMonth + '-' + curDay
			var obj = {
				url: this.$store.state.url + 'Product/GetProductType12',
				method: 'GET',
				header: this.$store.state.token,
			}
			this.$http(obj).then((res) => {
				this.data = res.Data
				for (var i = 0; i < res.Data.DtoOne.length; i++) {
					this.DtoOne.push(res.Data.DtoOne[i].Value)
				}
				for (var i = 0; i < res.Data.DtoTwo.length; i++) {
					this.DtoTwo.push(res.Data.DtoTwo[i].Value)
				}
			})
			console.log(this.clientId )
		},
		onNavigationBarButtonTap() {
			if(this.clientId == ''){
				    uni.showToast({title: "请选择客户",icon: "none"})
					return false
			}
			
			if(this.DtosId == ''){
				    uni.showToast({title: "请选择设备",icon: "none"})
					return false
			}			
			var SerialNumber = this.Code1+this.Code2+this.Code3+this.equipment
			var obj = {
				url: this.$store.state.url + 'CRM/AddCusDevice',
				method: 'POST',
				header: this.$store.state.token,
				data: {
					CustomerId :this.clientId,				//  客户id     this.clientId
					DeviceName:'-',							//  自定义名称  DeviceName  固定传“-”
					ProductId:this.DtosId,					//  设备iD     ProductId 
					SerialNumber: SerialNumber ,							/// 序列号     SerialNumber { get; set; }
					InstallationDate:this.Time,				/// 安装日期     { get; set; }
					Remark:this.Remark,						/// 备注  Remark { get; set; }
					IsInchwell:true,						/// 是否为英之杰编码 
				}
			}
			this.$http(obj).then((res) => {
				uni.navigateTo({
					url: "../work.8",
				});
			})
		},
		methods: {
			DateChange(e) {
				this.Time = e.detail.value
			}, //选择时间
			//选择联系人
			clicktext:function(item){
				console.log(item)
				this.client = item.FullName
				this.clientId = item.CusId
				this.text = false
			},
			//获取客户
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
			bindPickerChange: function(e) {
				this.OneId = this.data.DtoOne[e.target.value].Id //获取id
				this.One = this.data.DtoOne[e.target.value].Value //显示内容
				this.Code1 = this.data.DtoOne[e.target.value].Key
				this.GetProductType3() //检测是否可以调用接口
			},
			bindPickerChangeTwo: function(e) {
				this.TwoId = this.data.DtoTwo[e.target.value].Id //获取id
				this.Two = this.data.DtoTwo[e.target.value].Value //显示内容
				this.Code2 = this.data.DtoTwo[e.target.value].Key
				this.GetProductType3()
			},
			bindPickerChangeThere: function(e) {
				this.ThereId = this.GetProductType33[e.target.value].Id //获取id
				this.There = this.GetProductType33[e.target.value].Value //显示内容
				this.Code3 = this.GetProductType33[e.target.value].Key
				this.bindPickerChangeSBs()
			},
			bindPickerChangeSB: function(e) {
				console.log(this.Sb)
				this.Dtosb = this.Sb[e.target.value].Desc //显示内容
				this.DtosId = this.Sb[e.target.value].Id
				console.log(this.DtosId)
			},
			bindPickerChangeSBs: function(e) {
				this.DtoSB = []
				this.Dtosb = '选择'
				var obj = {
					url: this.$store.state.url + 'Product/GetProductType4',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						gradeOne: this.OneId,
						gradeTwo: this.TwoId,
						gradeThree: this.ThereId
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data)
					this.Sb = res.Data
					for (var i = 0; i < res.Data.length; i++) {
						this.DtoSB.push(res.Data[i].Desc.replace(/[\r\n]/g,""))
					}

				})
			},
			GetProductType3: function() {
				this.DtoThere = []
				this.There = '选择'
				this.ThereId = ''
				if (this.TwoId == '' || this.OneId == '') {
					return false
				}
				var obj = {
					url: this.$store.state.url + 'Product/GetProductType3',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						gradeOne: this.OneId,
						gradeTwo: this.TwoId
					}
				}
				this.$http(obj).then((res) => {
					if (res.Data.length == 0) {
						uni.showToast({
							title: "没有此类产品",
							icon: "none"
						})
						return false
					}
					this.GetProductType33 = res.Data
					for (var i = 0; i < res.Data.length; i++) {
						this.DtoThere.push(res.Data[i].Value)
					}
				})
			},


		}
	}
</script>

<style scoped lang="scss">
	.box {
		background-color: #FFFFFF;
		
		.uni-picker-container .uni-picker-item{
			text-align: left;
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
			
			textarea{
				width: 100%;
			}
			.title {
				width: 100px;
				display: block;
				float: left;
				color: #333333;

			}

			input {
				font-size: 14px;
				overflow: hidden;
			}

			.uni-input {
				overflow: hidden;
				text-align: left;
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

			.kuangadd {
				width: 80px;
				height: 150px;

				.view {
					text-align: center;

				}
			}
		}

		// 以上为底部弹窗样式
	}
</style>
