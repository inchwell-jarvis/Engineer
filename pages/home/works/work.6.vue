<template>
	<view class="box">
		<view v-for="(item,index) in Data" class="item" :key="index" @click="Assign(item)"  
		 
		 :style="[{background:(item.DataType == 2?'#fbffb5':'#fff')}]"
		 >
			<view class="title">
				{{item.CusFullName}}
			</view>
			<view class="bottom">
				<text class="OrderCode">{{item.OrderCode}}</text>
				<text>{{item.CreateDate}}</text>
			
				
				
				
			</view>
			<view class="bottom">
				<text class="OrderCode">{{item.TypeStr}}</text>
				
				<text style="color:#333333;font-size: 13px;margin-left: 5px;">{{item.StateStr}}</text>
				<button v-if="item.State == 2 && item.DataType == 1 " type="primary" size="mini" @click="Assign(item)">指派</button>
				
				<button v-if="item.State == 3 && item.DataType == 2" type="primary" size="mini" @click="Assign(item)">接受</button>
				
				<button v-if="item.State == 4 && item.DataType == 2" type="primary" size="mini" @click="Assign(item)">出发</button>
				
				<button v-if="item.State == 5 && item.DataType == 2" type="primary" size="mini" @click="Assign(item)">查看</button>
				
				<button v-if="item.State == 6 && item.DataType == 2" type="primary" size="mini" @click="Assign(item)">到达</button>
				
				<button v-if="item.State == 7 && item.DataType == 2" type="primary" size="mini" @click="Assign(item)">处理</button>
				
				<button v-if="item.State == 8 && item.DataType == 2" type="primary" size="mini" @click="Assign(item)">查看</button>
				
				
				
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				Data: [],
			}
		},
		onBackPress() { //自定义返回逻辑
			uni.switchTab({
				url: "../home"
			});
			return true
		},
		created() {
			this.init()
		},
		onNavigationBarButtonTap() {
		
			uni.navigateTo({
				url: "./woke6/woke6",
			});
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			//       console.log(option.item); //打印出上个家伙传递的参数。
		},
		methods: {
			init: function(res) {
				var obj = {
					url: this.$store.state.url + 'WO/GetEquInstallOrdersForapp',
					method: 'GET',
					data: {
						search: '', //检索项
						begin: '', //开始时间
						end: '' ,//结束时间
					    type:-1,
					},
					header: this.$store.state.token,
				}
				this.$httpnone(obj).then((res) => {
					console.log('%c 安装任务 -- >','color:#007aff;font-size:10px;',res.Data.Dtos)
					this.Data = res.Data.Dtos;
					for(var index = 0; index < this.Data.length ; index ++){
						this.Data[index].CreateDate = this.timeLv(this.Data[index].CreateDate)
					}
				})
			},
			//时间过滤
			timeLv: function(res) {
				if (res == null || res == "") {
					return " - - ";
				} else {
					return res.split("T")[0];
				}
			},
			// 点击指派按钮
			Assign:function(item){
				console.log(item)
				this.$store.state.InstallationTaskres = item.ID
				this.$store.state.InstallationTaskresIndex = item.DataType
				uni.navigateTo({
					url: '/pages/home/works/InstallationTask/InstallationTask'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {

		.item {
			width: 100%;
			height: 100px;
			border-top: 1px solid #e3e3e3;
			border-radius: 5px;
			box-sizing: border-box;
			background-color: #fdfdfd;

			.title {
				width: 100%;
				height: 40px;
				font-weight: bolder;
				color: #000000;
				padding-left: 20px;
				padding-top: 10px;
				box-sizing: border-box;
			}

			.bottom {
				width: 100%;
				height: 30px;
				padding-left: 20px;
				padding-right: 20px;
				box-sizing: border-box;

				text {
					color: #b8b8b8;
					line-height: 30px;
				}
				.OrderCode{
					margin-right: 10px;
					color: #555555;
				}

				button {
					float: right;
				}
			}
		}

		// font-weight: bold;
		// font-size: 25px;
		// padding-top: 200px;
		// background: linear-gradient(to right, red, blue);
		// -webkit-background-clip: text;
		// color: transparent;
		// text-align: center;
	}
</style>
