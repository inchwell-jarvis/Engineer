<template>
	<view class="box">
		<u-top-tips ref="uTips"></u-top-tips>
		<div class="header">
			<u-search placeholder="输入检索文档,点击查看文档" v-model="keyword" :show-action='false' shape="square"></u-search>
		</div>
		<div class="content">
			<div class="li" v-for="(item,index) in dataShow" @tap='item.display = !item.display'>
				<span class='head'>{{item.Name}}</span>
				<div class="interpretation"
					:style="{height:(item.display ? '150px':'0px'),padding:(item.display ? '10px':'0px')}">
					<p>创建者<span>{{item.Creater}}</span></p>
					<p>文档分类<span>{{item.Type}}</span></p>
					<p>下载次数<span>{{item.Download}}</span></p>
					<br>
					<u-button type="primary" size="medium" style='float: right;' @tap='download(item)'>下载</u-button>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				data: [],
				dataShow: []
			}
		},
		created() {
			this.start()
		},
		watch: {
			keyword(newkeyword) {
				console.log(newkeyword)
				let str = newkeyword.trim()
				this.dataShow = []
				if (str == '') {
					this.dataShow = this.data
				} else {
					this.data.forEach(rv => {
						if (rv.Name.includes(str)) {
							this.dataShow.push(rv)
						}
					})
				}
			}
		},
		methods: {
			download(data) {
				this.$refs.uTips.show({
					title: '正在下载请稍等！',
					type: 'warning',
					duration: '2300'
				})
				uni.downloadFile({
					url: 'http://icms.inchwell.com.cn/File/Document/' + data.Url,
					success: (data) => {
						console.log(data.tempFilePath)
						console.log(JSON.stringify(data))
						if (data.statusCode === 200) {
							uni.saveFile({ //文件保存到本地
								tempFilePath: data.tempFilePath, //临时路径
								success: function(res) {
									console.log("下载成功" + res.savedFilePath)
									console.log(JSON.stringify(res))
									uni.showToast({
										icon: 'none',
										mask: true,
										title: '文件已保存!',
										duration: 3000,
									});
									uni.openDocument({
										fileType: 'docx',
										filePath: res.savedFilePath,
										success: function(res) {
											console.log('打开文档成功');
										}
									});
								}
							});
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '失败请重新下载',
						});
					},
				});
			},
			start: function() {
				var obj = {
					url: this.$store.state.url + 'System/GetDocuments',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						pageNum: '1',
						numPerPage: '999999',
						orderField: '',
						orderDirection: '',
						search: '',
						type: -1,
					}
				}
				this.$http(obj).then((res) => {

					for (let i = 0; i < res.Data.Dtos.length; i++) {
						let element = res.Data.Dtos[i]
						if (element.Type == 1) element.Type = '公共模板'
						if (element.Type == 2) element.Type = '售后服务部文档'
						if (element.Type == 3) element.Type = '培训部文档'
						if (element.Type == 4) element.Type = '其它'
						this.$set(element, 'display', false)
					}

					this.data = res.Data.Dtos
					this.dataShow = res.Data.Dtos
					console.log(this.data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		height: 50px;
		padding: 5px;
		box-sizing: border-box;
	}

	.content {
		width: 100%;
		height: calc(100% - 50px);
		overflow: auto;

		.li {
			width: 95%;
			min-height: 30px;
			padding: 10px 5px;
			background: #EBEEF5;
			box-sizing: border-box;
			margin: 5px auto;
			border-radius: 5px;

			.head {
				font-weight: bold;
			}

			.interpretation {
				width: 100%;
				height: 0px;
				transition: 0.5s;
				background: #FFFFFF;
				box-sizing: border-box;
				border-radius: 5px;
				margin-top: 10px;
				color: #606266;
				overflow: hidden;

				p {
					span {
						float: right;
						font-weight: none;
					}
				}
			}
		}
	}
</style>
