<template>
	<view class="box">
		<hx-navbar :config="config" @clickBtn='rightCion' ></hx-navbar>
		
		
		<u-card  v-for="(item,index) in data" :key="index"  :title="item.CustomerName"   @tap="asdurl(item)"
		 :head-style='headStyle' :body-style='bodyStyle' box-shadow='2px 3px 4px #c1c1c1'
		  :sub-title="item.TextState" 
		  sub-title-color="#5b8eff" 
		 class='ZTstate'>
			<view class="" slot="body">
				<view class="textCode">
					<p>{{item.StatusStr + ' - ' + item.WorkOrderCode}}</p>
					<p style='line-height: 30px;text-align: right;'>{{item.CreateDate}}</p>
				</view>
				
			</view>
		</u-card>
		<u-empty v-if="!data[0]"  text="附近暂无维修任务" mode="message"></u-empty>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				config: {
					title: '工单管理',
					color: '#000000',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,'#efefef'],
					// 状态栏 ，数组则为滑动变色
					statusBarBackground: ['', '#ffffff'],
					font: 'xff001',
					rightButton: [{
						key: '001',
						icon: '&#xe602;',
						position: 'right'
					}],
				},
				name: '赵鸿飞',
				data: [],
				search: '', //检索内容，临时为空
				
				// 卡片头部样式
				headStyle: {
					'padding': '10px 5px',
					'font-weight': 'bold'
				},
				bodyStyle: {
					'padding': '10px 10px'
				},
			}
		},
		onBackPress() {
			uni.switchTab({
				url: "../home"
			});
			return true
		},
		mounted() {
			var obj = {
				url: this.$store.state.url + 'WO/GetWOsFE',
				method: 'GET',
				header: this.$store.state.token,
				data: {
					pageNum: '1',
					numPerPage: '',
					orderField: '',
					orderDirection: '',
					search: this.search
				}
			}
			this.$http(obj).then((res) => {
				this.data = res.Data.Dtos
				for(var i  = 0 ;i < this.data.length; i ++ ){
					var item = this.data[i]
					if (item.Status == 6) {
						item.TextState = '指派'
					}
					if (item.Status == 7 || item.Status == 25) {
						item.TextState = '接受'
					}
					if (item.Status == 8) {
						item.TextState = '出发'
					}
					if (item.Status == 47) {
						item.TextState = '到达'
					}
					if (item.Status == 48 || item.Status == 26) {
						item.TextState = '处理'
					}
				}
			})
		},
		methods: {
			// 点击时间记录图标
			rightCion:function(){
				uni.navigateTo({
					url: '/pages/home/works/one/OneListLS'
				});
			},
			// 操作当前工单
			asdurl(item) {
				this.$store.state.codeurlid = item
				if (item.Status == 6) {
					this.$store.state.codeurlids = 1
				}
				if (item.Status == 7 || item.Status == 25) {
					this.$store.state.codeurlids = 2
				}
				if (item.Status == 8) {
					this.$store.state.codeurlids = 3
				}
				if (item.Status == 47) {
					this.$store.state.codeurlids = 4   
				}
				if (item.Status == 48 || item.Status == 26) {
					this.$store.state.codeurlids = 5
				}
				uni.navigateTo({
					url: '/pages/home/works/one/one'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		width: 100%;
		background: #FFFFFF;

		.div {
			width: 95%;
			height: 90px;
			margin-left: 5%;
			padding: 10px;
			display: block;
			border-bottom: 1px solid #d4d4d4;
			box-sizing: border-box;
			
			
			text {
				display: block;
				font-size: 15px;
			}

			.text1 {
				
				font-weight: bold;
				height: 30px;
				line-height: 30px;
				overflow: hidden;
			}

			.text2 {
				font-size: 15px;
				line-height: 25px;
			}

			.text3 {
				font-size: 13px;
				line-height: 20px;
			}

			button {
				float: right;
			}
		}
	}
</style>
