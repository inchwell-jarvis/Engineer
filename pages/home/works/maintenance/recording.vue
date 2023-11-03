<template>
	<view class="boxxxxx" >
		<!-- 检索 -->
		
		<u-search style='width: 80%;' class='search' placeholder="客户,任务单号" @change='init(1)' :show-action='false'		  v-model="search">
			
		</u-search>
		<u-button size="mini" style='float: right;' class='but' @click='show = true' type="primary">选择状态</u-button>
		<u-picker mode="selector" :range="State" v-model="show"  :default-selector='[0]' @confirm='Echenr'></u-picker>

		<view style="width: 100%;height: 30px; background-color: #f7f7f7;"></view>
		<view class="hezi" v-for="(item,index) in Data" :key="index" @tap='heURl(item)'>
			<view class="left">
				<view class="text1">{{item.CustomerName}}</view>
				<view class="text2">{{item.Code}}</view>
				<view class="text3">{{item.BeginTime}}</view>
				<view class="text4">{{item.StateStr}}</view>
			</view>
			<view class="right">
			</view>
		</view>
			<!-- 加载中 -->
		  <view v-if="loadshow" class="loading">{{loadingText}}</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'',//检索内容
				state:-1,//检索状态
				pickeritemShow:false,   //父集现选择框
				pickeritem:'',
				numPerPage: 10, //每条展示多少，触底后增加
				pageNum: 1,
				Data: [],
				show:false,
				loadingText:'加载中...',
				State:[
					'全部',
					'待保养'
					,'已指派工程师'
					,'已启动保养'
					,'已接受任务'
					,'已出发'
					,'已到达'
					,'保养完毕'
				],
				array:[
					{name:'全部',value:'-1'},
					{name:'待保养',value:'0'},
					{name:'已指派工程师',value:'2'},
					{name:'已启动保养',value:'1'},
					{name:'已接受任务',value:'3'},
					{name:'已出发',value:'6'},
					{name:'已到达',value:'7'},
					{name:'保养完毕',value:'5'},
					],
					loadshow:false,//条数较少时，不显示加载中
			};
		},
		created() {
			this.init(0)
		},

		onReachBottom: function(e) {
			this.pageNum += 1
			this.init(0)
			console.log('0000')
		},

		onBackPress() { //自定义返回逻辑
			uni.navigateTo({
				url: "../work.3"
			});
			return true
		},

		onPullDownRefresh() { // 下拉监听事件	
		uni.stopPullDownRefresh();
		this.enginesDropDownOpen()	
		},
		
		// 右上角
		onNavigationBarButtonTap() {
				this.enginesDropDownOpen()	
		},

		methods: {
			// 选择状态回调参数
			Echenr:function(e){
				this.state = this.array[e[0]].value
				this.init(1)
			},
			init: function(res) {
				//  in   判断是不是点击检索
				if(res == 1){
					this.pageNum = 1
					this.Data = []
				}
				var obj = {
					url: this.$store.state.url + 'Maintain/GetMaintains',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						pageNum: this.pageNum,
						numPerPage: this.numPerPage,
						orderField: '',
						orderDirection: '',
						search: this.search,
						state:  this.state ,
					}

				}
				this.$http(obj).then((res) => {
					console.log(res.Data)
					this.Data[0] ? this.Data = this.Data.concat(res.Data.Dtos) : this.Data = res.Data.Dtos
					
					if(this.Data.length > 9){
						this.loadshow = true
					}else{
						this.loadshow = false
					}
				})
			},
			inits: function() {
				this.pageNum = 1
				
				var obj = {
					url: this.$store.state.url + 'Maintain/GetMaintains',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						pageNum: this.pageNum,
						numPerPage: this.numPerPage,
						orderField: '',
						orderDirection: '',
						search: this.search,
						state: this.state,
					}
			
				}
				this.$http(obj).then((res) => {
					console.log(res.Data)
					 this.Data = res.Data.Dtos
					 if(this.Data.length > 9){
					 	this.loadshow = true
					 }else{
					 	this.loadshow = false
					 }
				})
			},
			// 跳转详细页
			heURl: function(res) {
				console.log(res.Goto)
				this.$store.state.MaintenancestatusGoto = res.Goto
				this.$store.state.Maintenancestatus = res.State
				this.$store.state.MaintenancestatusID = res.MaintainId
				uni.navigateTo({
					url: "./Recorddetails",
				});
			},
			// 下拉搜索
			enginesDropDownOpen:function(){
				this.loadstyle1.top == 0 ? this.loadstyle1.top = '-140px'  : this.loadstyle1.top = '0',
				this.loadstyle2.paddingTop == '0px' ? this.loadstyle2.paddingTop = '140px' : this.loadstyle2.paddingTop = '0px'	
			},
			// 勾选框
			radiosd:function(e){
				console.log(e)
				this.state = e
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	// .newslist{padding:10px; line-height:60px; font-size:28px;}
	.loading{text-align:center; line-height:80px;}
	.boxxxxx {
		width: 100%;
		background: #FFFFFF;
		
		.search{
			width: 100%;
			padding-left: 20px;
			box-sizing: border-box;
			position: fixed;
			background-color: #f7f7f7;
		}
		.but{
			position: fixed;
			right: 0;
		}
		
		// 检索
		.ecsd{
			width: 100%;
			height: 140px;
			background: #FFFFFF;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 900;
			transform: 1s;
			transition: 0.3s;
			padding: 5px;
			box-sizing: border-box;
			// 输入框
			input{
				width: 70%;
				border: 1px solid #CCCCCC;
				border-radius: 10px;
				padding: 3px 5px;
				margin:  0 5px 2%;
				float: left;
			}
			.bottom{
				width: 100%;
				height: 40px;
			}
		}





		.hezi {
			width: 97%;
			height: 80px;
			background: #FFFFFF;
			margin: auto;
			border-radius: 10px;
			margin-top: 5px;
			padding: 5px;
			box-sizing: border-box;
			
			-webkit-box-shadow: 3px 3px 6px #c1c1c1;
			-moz-box-shadow: 3px 3px 6px #c1c1c1; 
			box-shadow: 3px 3px 6px #c1c1c1; 

			.left {
				width: 75%;
				height: 100%;
				float: left;
				padding-right: 20px;
				box-sizing: border-box;

				text {
					display: block;
				}

				.text1 {
					width: 100%;
					height: 30px;
					line-height: 30px;
					font-weight: bold;
					overflow: hidden;
				}

				.text2 {
					font-size: 12px;
					height: 20px;
					line-height: 20px;
				}

				.text3 {
					float: left;
				}

				.text4 {
					float: right;
				}
			}

			.right {
				width: 25%;
				height: 100%;
				float: left;

				button {
					width: 50px;
					display: block;
					margin: auto;
					margin-top: 20px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					padding: 0;
				}
			}
		}
	}
</style>
