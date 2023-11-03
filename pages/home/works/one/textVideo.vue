<template>
	<view class="box">
		<video v-for="(upload,index)  in this.$store.state.textVideo" :key="index" v-if="upload.Type == 'video'" :src="upload.Path"
		 style="width: 100%;"></video>
	</view>
</template>
