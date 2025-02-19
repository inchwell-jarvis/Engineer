<template>
	<view>
		<u-navbar :background="{ background: background}" :is-back='false' :border-bottom="border_bottom">
			<div class="navbar_view">
				<!-- 左侧按钮 -->
				<div class="left_side">
					<!-- 黑色返回 -->
					<u-image v-if="left_side == 'return_black'" width="44px" height="44px" src="./icon/return_black.svg" :fade="false" @click="return_page()"></u-image>
					<!-- 白色返回 -->
					<u-image v-if="left_side == 'return_white'" width="44px" height="44px" src="./icon/return_white.svg" :fade="false" @click="return_page()"></u-image>
					<!-- 黑色叉号 -->
					<u-image v-if="left_side == 'cancel_black'" width="44px" height="44px" src="./icon/cancel_black.svg" :fade="false" @click="return_page()"></u-image>
					<!-- 白色叉号 -->
					<u-image v-if="left_side == 'cancel_white'" width="44px" height="44px" src="./icon/cancel_white.svg" :fade="false" @click="return_page()"></u-image>
				</div>

				<!-- 中间文字 -->
				<div class="middle_title">
					{{ title }}
				</div>

				<!-- 右侧按钮 -->
				<div class="right_side">
					<slot name="right_side"></slot>
				</div>
			</div>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		name: "page-navigation",
		props: {
			/**
			 * 标题
			 */
			title: {
				default: '标题',
				type: String
			},
			/**
			 * 控制显示左侧的返回键
			 */
			left_side: {
				default: 'return_black',
				type: String
			},
			/**
			 * 控制整体背景颜色
			 */
			background: {
				default: 'transparent',
				type: String
			},

			border_bottom: {
				default: false,
				type: Boolean
			}
		},
		data() {
			return {

			};
		},
		methods: {
			/**
			 * 点击左侧返回按钮
			 */
			return_page() {
				this.$emit('return_page')
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar_view {
		width: 100%;
		height: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		// 
		.middle_title {
			width: calc(100% - 200px);
			height: 100%;
			text-align: center;
			line-height: 44px;
			font-weight: bold;
			font-size: 16px;
		}

		// 
		.left_side {
			width: 100px;
			height: 100%;
			display: flex;
			align-items: center;
		}

		// 
		.right_side {
			width: 100px;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: right;
			padding-right: 6px;
			box-sizing: border-box;
		}
	}
</style>