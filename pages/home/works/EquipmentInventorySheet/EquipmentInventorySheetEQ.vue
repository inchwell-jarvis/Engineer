<template>
	<view class="box">

		<div class="search">
			<u-search placeholder="请输入检索项" v-model="keyword" @change='Search'></u-search>
		</div>
		<u-subsection :list="list" :current="0" class='subsection' @change='currentIndex'></u-subsection>

		<!-- 未清点 -->
		<div class="item" v-for="(item,index1) in data" :key='index1' v-if='current == 0 && !item.GcsConfirm && !item.CusConfirm '>
			<!-- 标题 -->
			<div class='T1'>
				<span class='T'>{{item.Desc}}</span>
			</div>
			<!-- 数量 -->
			<div class='T1 T2'>
				<span class='bianma'>产品编码:{{item.ProductCode}}</span>
				<span class='Time' v-if='item.CusConfirmDt'>{{item.CusConfirmDt.split('T')[0]}}</span>
			</div>
			<!-- 数量 -->
			<div class='T1 T2'>
				<span class='number'>合同数量:{{item.Quantity}}</span>
				<span class='number'>发货数量:{{item.DeliverQuantity}}</span>
			</div>
			<!-- 客户已确认 -->
			<div class='T1 T2' v-if='item.CusConfirm'>
				<span v-if='item.CusConfirm' style='color: #007AFF;'>客户已确认</span>
			</div>
			<!-- 按钮 -->
			<div class='T1 T2 T3'>
				<u-number-box @change='numberBox' style='margin-top: 5px;' :input-width="100" :input-height="60"
					v-model="item.QD"></u-number-box>
				<u-button type="primary" size="medium" @tap='CheckEqu(item,1)'>确认</u-button>
			</div>
		</div>

		<!-- 待确认 -->
		<div class="item" v-for="(item,index2) in data" :key='index2'
			v-if='current == 1 && item.CusConfirm && !item.GcsConfirm'>
			<!-- 标题 -->
			<div class='T1'>
				<span class='T'>{{item.Desc}}</span>
			</div>
			<!-- 数量 -->
			<div class='T1 T2'>
				<span class='bianma'>产品编码:{{item.ProductCode}}</span>
				<span class='Time' v-if='item.CusConfirmDt'>{{item.CusConfirmDt.split('T')[0]}}</span>
			</div>
			<!--  -->
			<div class='T1 T2'  :style="{color:(item.DeliverQuantity!=item.CheckQuantity?'#E6A23C':'')}">
				<span class='number'>合同数量:{{item.Quantity}}</span>
				<span class='number'>发货数量:{{item.DeliverQuantity}}</span>
				<span class='number'>客户清点数量:{{item.CheckQuantity}}</span>
			</div>
			<!-- 客户已确认 -->
			<div class='T1 T2' v-if='item.CusConfirm'>
				<span v-if='item.CusConfirm' style='color: #007AFF;'>客户已确认</span>
			</div>
			<!-- 按钮 -->
			<div class='T1 T2 T3'>
				<u-button type="error" size="medium" @tap='CheckEqu(item,2)'>撤回</u-button>
				<u-button type="primary" size="medium" @tap='CheckEqu(item,1,"待确认")'>确认</u-button>
			</div>
		</div>




		<!-- 已清点 -->
		<div class="item" v-for="(item,index3) in data" :key='index3' v-if='current == 2 && item.GcsConfirm'>
			<!-- 标题 -->
			<div class='T1'>
				<span class='T'>{{item.Desc}}</span>
			</div>
			<!-- 数量 -->
			<div class='T1 T2'>
				<span class='bianma'>产品编码:{{item.ProductCode}}</span>
				<span class='Time' v-if='item.CusConfirmDt'>{{item.CusConfirmDt.split('T')[0]}}</span>
			</div>
			<!--  -->
			<div class='T1 T2'>
				<span class='number'>合同数量:{{item.Quantity}}</span>
				<span class='number'>发货数量:{{item.DeliverQuantity}}</span>
			</div>
			<!-- 客户已确认 -->
			<div class='T1 T2'  :style="{color:((item.DeliverQuantity!=item.CheckQuantity || item.DeliverQuantity!=item.Quantity||item.Quantity!=item.CheckQuantity)  ?'#E6A23C':'')}">
				<span class='number'>工程师清点数量:{{item.CheckQuantityGcs}}</span>
				<span  v-if='!item.CusConfirm' class='number'>客户清点数量: - </span>
				<span  v-if='item.CusConfirm' class='number'>客户清点数量:{{item.CheckQuantity}}</span>
			</div>
			<!-- 按钮 -->
			<div class='T1 T2 T3'>
				<u-button type="error" size="medium" @tap='CheckEqu(item,2)'>撤回</u-button>
			</div>
		</div>


		<u-top-tips ref="uTips"></u-top-tips>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				Data: [],
				list: [{
						name: '未清点'
					},
					{
						name: '待确认'
					},
					{
						name: '已清点'
					}
				],
				current: 0,
				id: '',
				keyword: '',
				timer: null,
				// 刷新index
				SXindex:true,
				
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id
			this.start()
		},
		created() {
			this.timer = setInterval(() => {
				if(this.SXindex){
					this.start()
				}else{
					this.SXindex = true
					console.log('正在计数不可刷新')
				}
			}, 10000)
		},
		onUnload() {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
		},
		onShow() {
			this.start()
		},
		methods: {
			numberBox:function(value){
				console.log(value)
				this.SXindex = false
			},
			start: function(Id) {
				var obj = {
					url: this.$store.state.url + 'Bill/GetEquCheckBill',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						ecId: this.id,
						search: '',
						state: '-1',
					}
				}
				this.$httpnone(obj).then((res) => {
					this.data = res.Data.Dto.EquDtos
					this.Data = res.Data.Dto.EquDtos	
					for (var i = 0; i < this.data.length; i++) {
						 this.data[i]['QD'] = this.data[i].DeliverQuantity
					}
					this.Search()
				})
			},
			currentIndex: function(index) {
				this.current = index
				this.start()
			},
			CheckEqu: function(item, index,t) {
				if(t == '待确认'){
					item.QD = item.CheckQuantity
				}
				var obj = {
					url: this.$store.state.url + 'Bill/CheckEqu',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: item.ID,
						Type: index,
						Str: item.QD,
					}
				}
				console.log(obj)
				this.$http(obj).then((res) => {
					if (index == 1) {
						this.$refs.uTips.show({
							title: '清点成功！',
							type: 'success',
							duration: '2300'
						})
					} else {
						this.$refs.uTips.show({
							title: '已撤回！',
							type: 'success',
							duration: '2300'
						})
					}
					this.start()
				})
			},
			Search: function(Search) {
				// 被检索数组   Data2
				// 检索项      Search
				if(!this.keyword) return false
				this.SXindex = false
				// 被检索值不能为 数值   需要转为字符串 String()
				var Data2 = this.Data
				var DataInit = []
				for (let index = 0; index < Data2.length; index++) {
					const element = Data2[index];
					for (var ins in element) {
						if (String(element[ins]).indexOf(this.keyword) != -1) {
							DataInit.push(element)
							break;
						}
					}
				}
				this.data = DataInit

			}
		}

	}
</script>

<style lang="scss">
	.box {
		width: 100%;
		padding-top: 70px;
		box-sizing: border-box;
		background-color: #e4eafa;
		

		.search {
			width: 100%;
			height: 40px;
			position: fixed;
			top: 0;
			left: 0;
			margin: auto;
			z-index: 100;
			background-color: #e4eafa;
			padding-top: 3px;
			box-sizing: border-box;
		}

		.subsection {
			width: 100%;
			position: fixed;
			top: 40px;
			left: 0;
			margin: auto;
			z-index: 100;
		}

		.item {
			width: 90%;
			min-height: 100px;
			border-radius: 10px;
			margin: 10px auto 0;
			background-color: #FFFFFF;
			padding: 10px;
			box-sizing: border-box;

			.T1 {
				width: 100%;
				background-color: #dddddd;
				border-radius: 5px;
				padding: 5px;
				box-sizing: border-box;
				word-wrap: break-word;

				.T {
					font-weight: bold;
				}

				.Time {
					float: right;
				}

				.number {
					margin-right: 20px;
				}
			}

			.T2 {
				background-color: #FFFFFF;
			}

			.T3 {
				height: 50px;

				button {
					float: right;
				}
			}
		}
	}
</style>
