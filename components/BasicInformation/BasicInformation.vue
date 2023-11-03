<template>
	<view class="Bas">
		<!-- <slot name="title"></slot> -->
		<!-- <span slot="title">1111</span> -->
		<view class="header">
			<slot name="title"></slot>
		</view>


		<view class="Mini_list" slot="xxxx">
			<view class="Mini_list_left">
				<slot name="TL"></slot>
			</view>
			
			<view class="Mini_list_right">
				<slot name="TR"></slot>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "BasicInformation",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.Bas {
		width: 100%;

		.header {
			width: 100%;
			height: 40px;
			border-bottom: 1px solid #c3c3c3;
			line-height: 40px;
			padding-left: 20px;
			font-weight: bold;
			box-sizing: border-box;
		}

		.Mini_list {
			width: 100%;
			height: 30px;
			line-height: 30px;
			padding-left: 20px;
			box-sizing: border-box;

			.Mini_list_left {
				width: 50%;
				height: 100%;
				font-weight: bold;
				float: left;
				font-size: 12px;
				color: #555555;
			}

			.Mini_list_right {
				width: 50%;
				height: 100%;
				color: #808080;
				float: left;
				overflow: hidden;
				font-size: 12px;
			}
		}
	}
</style>
