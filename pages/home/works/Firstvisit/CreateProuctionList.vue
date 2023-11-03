<template>
	<view class="box">
		
		<uni-collapse accordion="true" v-for="(item,index) in Data" :key="index" class="collapse1">
			<uni-collapse-item :title="item.One">
				
				<uni-collapse accordion="true" v-for="(items,indexs) in item.child" :key="items+indexs" class="collapse2">
					<uni-collapse-item :title="items.Two">
						
						<uni-collapse accordion="true" v-for="(itemss,indexss) in items.child" :key="itemss+indexss" class="collapse2">
							<view class="uni_collapse" >
								<view>{{ '品牌：' + itemss.Three}}</view>
								<view>{{ '编号：' + itemss.ProeuctCode}}</view>
								
								<view class="header">
									{{'描述：' + itemss.Desc || '暂无描述'}}
								</view>
								<view class="input_Numbers">
									<input size='mini' class="uni-input" type="number"  v-model="itemss.Numbers" placeholder="输入数量" />
								</view>
							</view>
						</uni-collapse>
						
					</uni-collapse-item>
				</uni-collapse>
			</uni-collapse-item>
		</uni-collapse>
		
		
		
		<view class="clattab"  style="border: none;">
			<u-button size='mini' type="primary" @tap='NumberClik()' >添加</u-button>
		</view>
		
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data:[],
			};
		},
		created() {
				this.init()
		},
		methods:{
			init:function(){
				var obj = {
				  method: "get",
				  url: this.$store.state.url + "Product/GetEquType",
				  data: {
				    one: '',
				    two: '',
				    three: '',
				  },
				};
				this.$http(obj).then((res) => {			
					var dataListOne = this.dataforEach(res.Data.Dtos)
					console.log(dataListOne)
				var List = []
				for (var i = 0; i < dataListOne.length; i++) {
					var item = dataListOne[i]
					List[i] = {id: i, One: item.One, child:[]}
					List[i].child = this.dataforEachTwo(item.child)
				}
				console.log(List)
				this.Data = List
				});
			},
			dataforEach:function(data){
				let dataInfo = {};
				data.forEach((item, index) => {
					let { One } = item;
					if (!dataInfo[One]) {
						dataInfo[One] = {
							id: index,
							One,			
							child: []
						}
					}
					dataInfo[One].child.push(item);
				});
				return Object.values(dataInfo); // list 转换成功的数据
			},
			dataforEachTwo:function(data){
				let dataInfo = {};
				data.forEach((item, index) => {
					let { Two } = item;
					if (!dataInfo[Two]) {
						dataInfo[Two] = {
							id: index,
							Two,			
							child: []
						}
					}
					item.Numbers = ''
					dataInfo[Two].child.push(item);
				});
				return Object.values(dataInfo); // list 转换成功的数据
			},
			NumberClik:function(){
				var List = []
				
				for (var i = 0; i < this.Data.length; i++) {
					var item1 = this.Data[i].child
					for (var ii = 0; ii < item1.length; ii++) {
						var item2 = item1[ii].child
						for (var index = 0; index < item2.length; index++) {
							if(item2[index].Numbers != '' && item2[index].Numbers != 0){
								List.push(item2[index])
							}
						}
						
					}
				}
				if(List.length == 0){
					uni.showToast({
						title: "请选择设备！",
						icon: "none"
					})
					return false
				}
				console.log(List)
				
				var textList = ''
				
				for (var i = 0; i < List.length; i++) {
					textList += List[i].Two + List[i].Desc
				}
				console.log(textList)
				
				
				var textSearch = ['举升机','轮胎拆装机','轮胎平衡仪','冷媒加注机','定位仪','大灯检测仪','制动试验台','点焊机','烤漆房','充电机']
				var textSearchNo = []
				var showToastText = ''
				
				for (var i = 0; i < textSearch.length; i++) {
					if(textList.indexOf(textSearch[i]) == -1){
						textSearchNo.push(textSearch[i])
						showToastText += textSearch[i]+ '-'
					}
				}
				console.log(textSearchNo)
				if(textSearchNo.length == 0){
					// 全选 进行添加
					var textClickCardText = ''
					for (var i = 0; i < List.length; i++) {
						var item = List[i]
						textClickCardText += item.One+ '  ' + item.Two + '  ' + item.Three  + '\n' + item.ProeuctCode + ' * ' + item.Numbers
						 + '\n' + item.Desc +  '\n' + ' -----' +  '\n' 
					}
					this.$store.state.ClickCardText = textClickCardText
					uni.navigateTo({
						url: '/pages/home/works/Firstvisit/magFirstvisit',
					})
				}else{
					// 提示未选项
					uni.showToast({
						title: "未选择：" + showToastText,
						icon: "none",
						duration: 2000
					})
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		padding-bottom: 80px;
		box-sizing: border-box;
		background-color: #FFFFFF;
		.clattab{
			width: 100%;
			position: fixed;
			bottom: -10px;
			text-align: center;
			background-color: #FFFFFF;
			z-index: 99;
			margin-bottom: 0px;
			border-radius: 0;
			border-top: 1px solid #ccc;
			button{
				width: 120px;
				height: 40px;
				margin: 20px;
			}
		}
	
		.collapse1 {
			font-weight: bold;
			.collapse2 {
				padding-left: 50px;
				box-sizing: border-box;
				color: #009688;
				.uni_collapse{
					width: 90%;
					border: 1px solid #ccc;
					border-radius: 10px;
					margin-top: 10px;
					padding: 5px;
					box-sizing: border-box;
					color: #000;
					font-size: 12px;
					-webkit-box-shadow: 3px 3px 6px #c1c1c1;
					-moz-box-shadow: 3px 3px 6px #c1c1c1;
					box-shadow: 3px 3px 6px #c1c1c1;
					.header{
						width: 100%;
						line-height: 30px;
						view{
							height: 30px;
						}
					}
					.input_Numbers{
						width: 100%;
						input{
							color: red;
							border: 1px solid #ccc;
							border-radius: 5px;
						}
					}
				}
				
			}
		}
	}
</style>
