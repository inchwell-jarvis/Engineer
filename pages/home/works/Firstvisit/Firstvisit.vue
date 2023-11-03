<template>
	<view class="boxxxx">
		<view class="head_top_Title">
			<u-icon @tap='BackPress()' name="arrow-left" color="#333" size="50" class='iconLEft'></u-icon>
			<p>客户拜访</p>
			<u-icon @tap='Addorder()' name="plus-circle" color="#2979ff" size="50" class='icon'></u-icon>
		</view>
		
		
		
		
		<view class="topone">
				<u-search placeholder="请输入检索内容" v-model="search" @search='DataDelinit'	 @custom='DataDelinit' ></u-search>
				<u-subsection :list="openis" :current="this.$store.state.indexcurrent"  @change="sectionChange" style="margin:5px 0 5px 0"  ></u-subsection>
				<u-select v-model="GetAreasss" :list="GetAreas" @confirm='confirms'></u-select>
		</view>

		<view class="Data" v-for="(item,index) in Data" :key="index" @tap="Dataitems(item)"   :style="{background: item.State < 3 ? '#eae99d':''}"  >
			<view class="text1"  style="overflow: hidden;line-height: 25px;">{{item.CusFullName}}</view>
			<text class="text2">{{item.Area}}</text>
			<text class="text2">{{item.StateStr}}</text>
			<text class="text2">开始时间：<span>{{item.BeginTime  | Time}}</span></text>
			<text class="text2">结束时间：<span>{{item.EndTime  | Time}}</span></text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				Data:[],
				search:'',// 检索项
				area:'',//选择的区域
				state:'-1',// 选择的状态
				openis:[
				{name:'全部',value:-1},
				{name:'已创建',value:1},
				{name:'正在完善',value:2},
				{name:'已完成',value:3}],
				GetAreas:[],
				GetAreasss:false,
				
				
				showinde:false,
				pageNum:1,
			};
		},
		created() {
			this.init()
			this.GetArea()
		},
	
		filters:{
				Time(res){
					if(res == '' || res == null || res == undefined){
						return ' - - '
					}else{
						return res.split('T')[0]
					}
				}
		},
		onReachBottom: function(e) {
			this.pageNum += 1
			this.init()
		},
		methods:{
			
			Addorder:function(){
				uni.navigateTo({
					url: '/pages/home/works/Firstvisit/AddFirstvisit',
				})
			},
			// 返回
			BackPress:function() { //自定义返回逻辑
				uni.navigateTo({
					url: "../work.8"
				})
				return true
			},
			DataDelinit:function(){
					this.Data = []
					this.init()
			},
			// 初始化
			init:function(){
				var obj = {
					url: this.$store.state.url + 'CRM/GetCusVisits',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						pageNum: this.pageNum,
						numPerPage: '10',
						orderField: '',
						orderDirection: '',
						search: this.search,
						state: this.$store.state.indexcurrent,
						area: this.area,
					}
				}
				this.$http(obj).then((res) => {
					console.log(res)
					this.Data[0] ? this.Data = this.Data.concat(res.Data.Dtos) : this.Data = res.Data.Dtos
				})
			},
			// 选择状态
			sectionChange(index) {
				this.Data = []
				this.pageNum = 1
				this.$store.state.indexcurrent = this.openis[index].value
				this.init()
			},
			// ICMS.获取区域
			GetArea:function(){
				var obj = {
					url: this.$store.state.url + 'System/GetArea',
					method: 'GET',
					header: this.$store.state.token,
				}
				this.$http(obj).then((res) => {
					console.log(res)
					this.GetAreas = res.Data
					for(var i = 0; i < this.GetAreas.length ; i ++){
						var element = this.GetAreas[i]
						element['label'] = element.Value 
						element['value'] = element.Id
					}
					// this.GetAreas.unshift({'label':'全部','value':''})
					console.log(this.GetAreas)
				})
			},
			// 
			confirms:function(e){
				this.area = e[0].label
				this.pageNum = 1
				this.init()
			},
			Dataitems:function(item){
				console.log(item.Id)
				this.$store.state.FirstvisitIdindexId = item.Id
				uni.navigateTo({
					url: '/pages/home/works/Firstvisit/magFirstvisit',
				})
			}
			
			
		}
		
	}
</script>

<style lang="scss" scoped>
	// .boxxxx {
	// 	width: 100%;
	// 	background: #f1f1f1;
	// 	font-size: 13px;
	// 	overflow: auto;
	
	.boxxxx{
		width: 100%;
		position: relative;
		overflow: auto;
		padding-top: 170px;
	
		.head_top_Title {
			width: 100%;
			height: 72px;
			position: fixed;
			top: 10px;
			left: 0;
			right: 0;
			z-index: 999;
			background-color: #FFFFFF;
			padding-top: 30px;
			text-align: center;
			line-height: 40px;
			font-size: 16px;
		
			.icon {
				position: absolute;
				right: 10px;
				bottom: 13px;
			}
			
			.iconLEft {
				position: absolute;
				left: 10px;
				bottom: 13px;
			}
		}
		
		
		
		
		
		
	.topone {
			width: 100%;
			height: 90px;
			padding: 10px 10px 0 10px;
			box-sizing: border-box;
			background: #f8f8f8;
			position: fixed;
			top: 80px;
			// top: 0px;
			input {
				width: 60%;
				height: 25px;
				border: 1px solid #C0C0C0;
				border-radius: 5px;
				float: left;
				padding-left: 10px;
				box-sizing: border-box;
				font-size: 12px;
			}

			button {
				width: 60px;
				height: 25px;
				line-height: 25px;
				text-align: 60px;
				font-size: 13px;
			}
		}
		
		
		
		.Data {
			width: 100%;
			height: 77px;
			background: #FFFFFF;
			border: 1px solid #e6e6e6;
			padding: 5px 15px;
			
			box-sizing: border-box;
			font-size: 15px;
			border-radius: 15px;
			margin-top: 5px;
		
			text {
				display: block;
				color: #808080;
				font-size: 13px;
			}
		
			view {
				height: 25px;
				font-weight: bold;
			}
		
			.text2 {
				width: 50%;
				float: left;
				line-height: 20px;
			}
		
		
		
		}
		}
</style>
