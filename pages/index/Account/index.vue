<template>
	<view>
		<u-cell-group>
			<u-cell-item icon="info-circle-fill" title="注销账户" value="点击注销" :arrow="false" @click="show = true"></u-cell-item>
		</u-cell-group>
		<!-- 注销弹窗 -->
		<u-modal v-model="show" :content="content" :show-cancel-button="true" @confirm="confirm" @cancel="show = false" :async-close="true"></u-modal>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			content: '此操作将永久注销您的账户，且无法恢复。请慎重考虑后再进行操作。',
			username: ''
			// Account/LogOff     Str[当前登录的账户名]   增加二次弹框确认：xxxx
		};
	},

	created() {
		let that = this;
		uni.getStorage({
			key: 'admin',
			success: function (res) {
				that.username = res.data;
			}
		});
	},

	methods: {
		confirm() {
			console.log(this.username);
			var obj = {
				url: this.$store.state.url + 'Account/LogOff',
				method: 'POST',
				data: {
					Str: this.username
				}
			};
			let _self = this;
			_self.$http(obj).then((res) => {
				console.log(res);
				_self.$store.state.token = '';
				_self.$store.state.FormalService = false;
				uni.setStorage({
					//清空本地Token
					key: 'Token',
					data: '',
					success: function () {
						uni.setStorage({
							//清空本地admin
							key: 'admin',
							data: '',
							success: function () {
								uni.navigateTo({
									url: '../../Logo/Logo'
								});
							}
						});
					}
				});
			});
		},
	}
};
</script>

<style lang="scss"></style>
