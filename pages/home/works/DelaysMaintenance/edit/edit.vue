<template>
	<view class="box">
		<div class="palisade">
			<div class="palisade_li">{{Data.CustomerFullName}}</div>
			<div class="palisade_li">
				<span>区域</span>
				<span class="s2">{{Data.Area}}</span>
			</div>
			<div class="palisade_li">
				<span>任务编号</span>
				<span class="s2">{{Data.TaskCode}}</span>
			</div>
			<div class="palisade_li">
				<span>合同编号</span>
				<span class="s2">{{Data.ContractCode}}</span>
			</div>
			<div class="palisade_li">
				<span>预估时间</span>
				<span class="s2">{{Data.EstimateDate.split('T')[0]}}</span>
			</div>
			<div class="palisade_li" @tap='show = true'>
				<span>新预估时间</span>
				<span class="s2" style="color:blue">{{newTime}}</span>
			</div>
			<div class="palisade_li">
				<span>超时天数</span>
				<span class="s2">{{Data.Overtime}}</span>
			</div>
		</div>
		<br>
		<u-button type="primary" size="medium" style="float: right;"  @tap='UpdateMCOEstimatedTime()'>保存</u-button>
		<u-picker v-model="show" mode="time" :default-time='newTime' @confirm='confirm'></u-picker>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: {},
				// 新预估时间
				newTime: '',
				show: false,
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(JSON.parse(option.ID)); //打印出上个页面传递的参数。
			this.Data = JSON.parse(option.ID)
			this.newTime = this.Data.EstimateDate.split('T')[0]
		},
		methods: {
			confirm: function(time) {
				console.log(time)
				this.newTime = time.year + '-' + time.month + '-' + time.day
			},
			UpdateMCOEstimatedTime: function() {
				var obj = {
					url: this.$store.state.url + 'Maintain/UpdateMCOEstimatedTime',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Id: this.Data.TaskId,
						Str: this.newTime,
					}
				}
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: '../DelaysMaintenance',
					});
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		padding: 10px;
		box-sizing: border-box;

		.palisade {
			width: 100%;
			min-height: 40px;
			border-radius: 5px;
			border: 1px solid #ccc;
			overflow: hidden;

			.palisade_li {
				width: 100%;
				line-height: 40px;
				border-top: 1px solid #ccc;
				padding: 0 5px;
				box-sizing: border-box;

				span {
					font-weight: bold;
				}

				.s2 {
					display: block;
					float: right;
					font-weight: normal;
				}
			}

			.palisade_li:nth-child(1) {
				border: none;
				font-weight: bold;
			}
		}
	}
</style>