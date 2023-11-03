<template>
	<view class="box">
		<view class="Top10" @tap="enter(99)" ></view>
		<view class="img" v-for="(item,index) in imgurl" :key="index" @tap="enter(item.index)">
			<image :src="item.url" mode=""></image>
			<text>{{item.text}}</text>
		</view>
		
		
		<text @click="RouverView()"
			style='position: fixed;bottom: 30px;right: 30px;line-height: 30px;color: #007AFF;font-size: 14px;'>找不到设备，点击这里 <u-icon name="search"></u-icon>
			</text>
		
		
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imgurl: [{
						url: "/static/image/1.jpg",
						text: '举升机',
						index: 1
					},
					{
						url: "/static/image/2.jpg",
						text: '轮胎维修设备',
						index: 2
					},
					{
						url: "/static/image/7.jpg",
						text: '清洁设备',
						index: 7
					},
					{
						url: "/static/image/3.jpg",
						text: '悬架调整设备',
						index: 3
					},
					{
						url: "/static/image/4.jpg",
						text: '制动系统维修设备',
						index: 4
					},
					{
						url: "/static/image/5.jpg",
						text: '空调设备',
						index: 5
					},
					{
						url: "/static/image/6.jpg",
						text: '车灯调整设备',
						index: 6
					},
					
					{
						url: "/static/image/8.jpg",
						text: '钣金设备',
						index: 8
					},
					{
						url: "/static/image/9.jpg",
						text: '喷漆设备',
						index: 9
					},
					{
						url: "/static/image/2.jpg",
						text: '一般设备',
						index: 10
					},
					
				]
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			if (option.state == 'init') {
				this.$store.state.initstates = true
			}
			if (option.state == 'Finishcreating') {
				this.$store.state.initstates = false
			}
		},
		onBackPress() {
			uni.navigateTo({
				url: "../work.7",
			});
			return true
		},
		created() {
			
		},
		methods: {
			RouverView:function(){
				uni.navigateTo({
					url: "./Spareparts",
				});
			},
			enter:function(index) {
				var that = this
				
				if(index == 99){
					uni.navigateTo({
						url: "./ReXiaoShangPin",
					});
					return false
					
				}				
				var obj = {
					url: this.$store.state.url + 'System/GetPartDrawing',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						sparePartsType: index
					}
				}
				this.$http(obj).then((res) => {
					console.log(res)
					that.$store.state.Ninedetails = res.Data.sparePartsReclassifys
					uni.navigateTo({
						url: "./Navigationindetail",
					});
				})


			}
		}
	}
</script>

<style lang="scss">
	.img {
		width: calc(100% / 3);
		height: 160px;
		text-align: center;
		float: left;
		border: 5px solid #FFFFFF;
		overflow: hidden;
		box-sizing: border-box;
		line-height: 30px;
		font-weight: bold;
		image {
			width: 100%;
			height: 125px;
			display: block;
			border-radius: 30px 5px;
			-webkit-box-shadow:0px 3px 3px #c8c8c8 ;
			-moz-box-shadow:0px 3px 3px #c8c8c8 ;
			box-shadow:0px 3px 3px #c8c8c8 ;
		}
	}
	.Top10{
		width: 100%;
		height: 100px;
		float: left;
		background-image: url(../../../../static/image/Top10.png);
		background-size: 100%;
	}
</style>
