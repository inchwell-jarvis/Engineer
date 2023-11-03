<template>
	<view class="a-cell">
		<view v-if="title" class="title">{{title}}</view>
		<view v-if="describe" class="describe">{{describe}}</view>
		<view v-if="content" class="content">{{content}}</view>
		<view v-if="link" class="icon">
			<uni-icon type="arrowright" size="20"></uni-icon>
		</view>
	</view>
</template>

<script>
import uniIcon from "./uni-icon/uni-icon.vue"
	export default {
		components: {uniIcon},
		props:{
			title:{
				type:String,
				default:''
			},
			content:{
				type:String,
				default:''
			},
			describe:{
				type:String,
				default:''
			},
			link:{
				type:Boolean,
				default:false
			}
		}
	}
</script>

<style lang="scss">
	.a-cell{
		display: flex;
		flex-direction: row;
		font-size: $uni-font-size-base;
		color: $uni-text-color;
		padding: $uni-spacing-row-base $uni-spacing-col-base;
		font-size: $uni-font-size-lg;
		.title{
			color:$uni-text-color;
		}
		.content{
			color:$uni-color-error;
			flex: 1;
			text-align: right;
		}
		.describe{
			color:$uni-text-color-placeholder;
			flex: 1;
			text-align: left;
			padding-left: $uni-spacing-row-sm;
		}
		.icon{
			text-align: right;
			flex:1
		}
	}
</style>
