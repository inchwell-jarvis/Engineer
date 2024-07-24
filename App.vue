<script>
export default {
	onLaunch: function () {
		const me = this;

		uni.getStorage({
			key: 'Token',
			success: function (res) {
				if (res.data) {
					me.$store.state.token = res.data;
				}
			}
		});
	},
	onShow() {
		var _self = this;
		uni.getStorage({
			key: 'admin',
			success: function (res) {
				console.log('获取登录名称:' + res.data);
				if (res.data == 'gcs_ios' || res.data == '') {
					_self.$store.state.FormalService = false;
				} else {
					console.log('获取版本信息！');
					_self.$store.state.FormalService = true;
				}
			}
		});
	},
	methods: {}
};
</script>
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
@import '@/components/hx-navbar/iconfont.css';
/*每个页面公共css */
html,
body,
uni-page-body,
uni-page-refresh {
	width: 100%;
	height: 100%;
	background: #f5f6fa;
	font-size: 14px;
	font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif !important;
}

.box {
	width: 100%;
	height: 100%;
	background: #ffffff;
	overflow: auto;
}

/* 暂无数据 */
.Nodata {
	width: 100%;
	height: 100%;
	font-size: 30px;
	font-weight: bolder;
	text-align: center;
	padding-top: 300px;
	box-sizing: border-box;
	background: linear-gradient(to right, red, blue);
	-webkit-background-clip: text;
	color: transparent;
}
</style>
