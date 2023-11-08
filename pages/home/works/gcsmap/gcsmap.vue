<template>
	<view class="con">
		<view class="IPmap" style="width: 100%;height: 60%;">
			<map id="maps" style="width: 100%;height: 100%;" :latitude="latitude" :longitude="longitude"
				:enable-overlooking='true' :markers="markers" :polyline="polylines" :scale="scale"></map>
		</view>


		<!-- 在map标签绑定经纬度和标记点数组 -->
		<view class="BotttomView" @tap='initmapsGCSCS()'>
			<u-loadmore v-if='status != false' :status="status" :load-text="loadText" />
			<view class="GCSBUTBox" v-for="(item,index) in gcsdata">
				<view class="GCSBUT" @tap='TabGCSIP(item,index)'>
					{{item.Enginner}}
					<view class="butIP" :style="{ color: item.types == '空闲' ? 'red': '#00ff00' }">
						{{item.types}}
					</view>
				</view>
				<view class="Cnoter" v-if="item.Conter">
					<text style="font-size: 12px;font-weight: bold;">{{item.Detail}}</text>
					<p style='font-size: 10px;' v-for="text in item.Orders">
						<span>{{text.OrderState + ' - - '}}</span>
						<span>{{(text.WorkType == 1 ?  '保养' : (text.WorkType == 2 ?  '维修' :'安装' ))  + ' - - ' }}</span>
						{{text.CusFullName}}
					</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: '39.519219', //纬度
				longitude: '116.698215', //经度
				markers: [], //标记点数组
				polylines: [], //连续数组
				gcsdata: [],
				gcsdataB: [],
				data: [],
				android_gcs: '../../../../static/img/android_gcs.png',
				android_qyjl: '../../../../static/img/android_qyjl.png',
				ios_gcs: '../../../../static/img/ios_gcs.png',
				ios_qyjl: '../../../../static/img/ios_qyjl.png',
				areaS: [],
				scale: 10,
				itemEnginnerId: '',
				arrowIconPathUrl: '../../../../static/img/traffic_texture_darkred.png',
				status: 'loading',
				stateNumber: 60,

				loadText: {
					loadmore: '轻轻上拉',
					loading: '',
					nomore: '数据为空'
				},
				timer: null
			}
		},
		created() {
			// this.test();
			this.initmapsGCS()
			this.initGetArea()
		},
		onReady() {
			//调用的函数放到onReady里面
			this.getlocal();
		},
		methods: {
			
			// 获取工程师位置记录
			SelectTrajectory: function(Id) {
				var obj = {
					method: "get",
					// url: 'http://webapi.inchwell.com.cn/api/' + "System/SelectTrajectory",
					url: this.$store.state.url + "System/SelectTrajectory",
					data: {
						employeeId: Id,
					},
				};

				this.$httpnone(obj).then((res) => {

					var that = this;
					var List = res.Data.StatDtos;
					console.log(List)
					if (List == null) {
						return false;
					}

					var ListIP = []

					for (var i = 0; i < List.length; i++) {

						// ListIP.push({
						// 	latitude: this.bd_encrypt(
						// 		List[i].Describe,
						// 		List[i].Key,
						// 	)[1],
						// 	longitude: this.bd_encrypt(
						// 		List[i].Describe,
						// 		List[i].Key,
						// 	)[0]
						// })
						
						ListIP.push({
							latitude:List[i].Key,
							longitude:List[i].Describe
						})

					}


					var Wit = 0
					if (uni.getSystemInfoSync().platform == 'ios') {
						Wit = 3
					} else {
						Wit = 10
					}


					this.polylines = [{
						points: ListIP,
						dottedLine: true,
						arrowLine: true,
						arrowIconPath: '../../../../static/img/traffic_texture_darkred.png',
						width: Wit,
						// colorList:['#F0F8FF','#FAEBD7','#7FFFD4','#F0FFFF'],
						color: "#ff5500"
					}];
				});
			},
			// 切换到当前工程师
			TabGCSIP: function(item, index) {
				this.scale = 14
				this.longitude = item.Longitude;
				this.latitude = item.Latitude;
				this.gcsdata[index].Conter = !this.gcsdata[index].Conter
				var Data = this.gcsdata
				this.gcsdata = []
				this.gcsdata = Data
				if (!(this.itemEnginnerId == item.EnginnerId)) {
					this.scale = 16
					// 获取工程师位置记录
					this.SelectTrajectory(item.EnginnerId)
					this.itemEnginnerId = item.EnginnerId
				}
			},
			// 获取区域
			initGetArea: function() {
				var obj = {
					url: this.$store.state.url + "System/GetArea",
					method: "get",
				};
				this.$httpnone(obj).then((res) => {
					this.areaS = res.Data;
					console.log(this.areaS)
					this.selector = []
					for (let index = 0; index < this.areaS.length; index++) {
						this.selector.push(this.areaS[index].Value)
					}
				});
			},
			// 重试定位
			initmapsGCSCS: function() {
				console.log(this.status)
				if (this.status != 'loading' && this.status != false) {
					uni.showToast({
						title: "正在重试 ~~~",
						icon: "none"
					})
					this.initmapsGCS()
				}
			},
			// 获取工程师的定位  修改版    (只拿数据，将区域经理放在上边)
			initmapsGCS: function() {
				console.log('获取了工程师定位！******************************************************')
				var obj = {
					url: this.$store.state.url + "System/SelectMapCoordinate",
					// url: 'http://webapi.inchwell.com.cn/api/' + "System/SelectMapCoordinate",
					method: "GET",
				};
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					this.loadText.loading = ('正在获取定位轨迹 ~ ' + this.stateNumber + '秒后重试！')
					this.stateNumber--
					if (this.stateNumber == 0) {
						clearInterval(this.timer);
						this.initmapsGCS()
						this.stateNumber = 60
					}
				}, 1000);
				this.$httpnone(obj).then((res) => {
						let EngineerPositioning = res.Data.Dtos;
						let LengthState = res.Data.Dtos.length
						// status
						console.log(LengthState)
						if (LengthState == 0) {
							this.status = 'nomore'
						} else {
							clearInterval(this.timer);
							this.status = false
						}
						// this.gcsdata = [];
						//  添加 展示小人图标
						for (let index = 0; index < EngineerPositioning.length; index++) {
							if (uni.getSystemInfoSync().platform == 'ios') {
								if (EngineerPositioning[index].Role == 1) {
									// 区域经理
									EngineerPositioning[index]["Roles"] = this.ios_qyjl;
								} else {
									// gcs
									EngineerPositioning[index]["Roles"] = this.ios_gcs;
								}
							} else {
								if (EngineerPositioning[index].Role == 1) {
									// 区域经理
									EngineerPositioning[index]["Roles"] = this.android_qyjl;
								} else {
									// gcs
									EngineerPositioning[index]["Roles"] = this.android_gcs;
								}
							}
							// 设置点击标注得可用性
							EngineerPositioning[index]["title"] = true;
							// 将 cccccccccccccccccc
							// EngineerPositioning[index].Longitude = this.bd_encrypt(
							// 	EngineerPositioning[index].Longitude,
							// 	EngineerPositioning[index].Latitude
							// )[0];
							// EngineerPositioning[index].Latitude = this.bd_encrypt(
							// 	EngineerPositioning[index].Longitude,
							// 	EngineerPositioning[index].Latitude
							// )[1];
							// 以下是将标志状态转为中文便于展示
							var GCSOT = EngineerPositioning[index].ServingOrderType;
							if (GCSOT == 0) {
								EngineerPositioning[index]["types"] = "空闲";
								EngineerPositioning[index]["color"] = this.stylethe;
							}
							if (GCSOT == 1) {
								EngineerPositioning[index]["types"] = "保养途中";
								EngineerPositioning[index]["color"] = this.styletwe;
							}
							if (GCSOT == 2) {
								EngineerPositioning[index]["types"] = "维修途中";
								EngineerPositioning[index]["color"] = this.styletwe;
							}
							if (GCSOT == 3) {
								EngineerPositioning[index]["types"] = "正在保养";
								EngineerPositioning[index]["color"] = this.styleone;
							}
							if (GCSOT == 4) {
								EngineerPositioning[index]["types"] = "正在维修";
								EngineerPositioning[index]["color"] = this.styleone;
							}
							if (GCSOT == 5) {
								EngineerPositioning[index]["types"] = "打卡";
								EngineerPositioning[index]["color"] = this.stylethe;
							}
							if (GCSOT == 6) {
								EngineerPositioning[index]["types"] = "安装在途";
								EngineerPositioning[index]["color"] = this.styletwe;
							}
							if (GCSOT == 7) {
								EngineerPositioning[index]["types"] = "正在安装";
								EngineerPositioning[index]["color"] = this.styleone;
							}
						}
						this.gcsdata = this.SortGcs(EngineerPositioning);
						for (let index = 0; index < this.gcsdata.length; index++) {
							this.gcsdata[index]['Conter'] = false
						}
						this.gcsdataB = this.SortGcs(EngineerPositioning);
						this.markers = []
						for (let index = 0; index < this.gcsdataB.length; index++) {
							var Obj = {
								id: 'sdfsfsdfsdfsd2',
								latitude: this.gcsdataB[index].Latitude,
								longitude: this.gcsdataB[index].Longitude,
								iconPath: '../../../../static/img/gcs_mini.png',
								width: '10',

								label: { //为标记点旁边增加标签
									content: this.gcsdataB[index].Enginner,
									color: '#F76350', //文本颜色
									anchorX: 0, //label的坐标，原点是 marker 对应的经纬度
									anchorY: -80, //label的坐标，原点是 marker 对应的经纬度 
									bgColor: '#fff', //背景色
									padding: 5, //文本边缘留白
									borderWidth: 1, //边框宽度
									borderColor: '#D84C29', //边框颜色							
									textAlign: 'right' //文本对齐方式。
								},
								callout: { //自定义标记点上方的气泡窗口 点击有效
									content: this.gcsdataB[index].Detail,
									color: '#F76350',
									fontSize: 12,
									borderRadius: 5,
								}
							}
							Obj.iconPath = this.gcsdataB[index].Roles



							this.markers.push(Obj)
						}

						// this.SwitchArea();
					})
					.catch((res) => {
						console.log(res)
						clearInterval(this.timer);
						this.status = 'nomore'
						this.loadText.nomore = '请求失败！点击重试！'
					});
			},
			//定位方法;获取当前的经纬度，也可以通过经纬度来获取当前的地理位置，比如：xx省、xx市、xx镇
			async getlocal() {
				let _this = this;
				var map = uni.createMapContext('maps', this).$getAppMap();
				map.showUserLocation(true);
				
				// 获取定位
				let ip = await this.getLocation();
				console.log(ip)
				_this.longitude = ip.longitude;
				_this.latitude = ip.latitude;
			},


			GetGcsIp: function() {
				var obj = {
					url: this.$store.state.url + 'api/System/SelectMapCoordinate',
					method: 'GET',
					header: this.$store.state.token,
				}
				this.$http(obj).then((res) => {

					console.log(this.Data)
				})
			},




			SortGcs: function(list) {
				let qyjlList = [];
				let gcslist = [];
				for (let index = 0; index < list.length; index++) {
					const gcsli = list[index];
					// 区分经理和工程师
					if (gcsli.Role == 1) {
						qyjlList.push(gcsli);
					} else {
						gcslist.push(gcsli);
					}
				}

				var Kx = [
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[]
				];
				for (let index = 0; index < qyjlList.length; index++) {
					const element = qyjlList[index];
					if (element.Message == "正在安装") {
						Kx[0].push(element);
					}
					if (element.Message == "保养在途") {
						Kx[1].push(element);
					}
					if (element.Message == "维修在途") {
						Kx[2].push(element);
					}
					if (element.Message == "正在保养") {
						Kx[3].push(element);
					}
					if (element.Message == "正在维修") {
						Kx[4].push(element);
					}
					if (element.Message == "打卡") {
						Kx[5].push(element);
					}
					if (element.Message == "安装在途") {
						Kx[6].push(element);
					}
					if (element.Message == "空闲") {
						Kx[7].push(element);
					}
				}
				var KKx = [];
				for (let index = 0; index < Kx.length; index++) {
					const element = Kx[index];
					if (element.length != 0) {
						for (let index = 0; index < element.length; index++) {
							const elementx = element[index];
							KKx.push(elementx);
						}
					}
				}

				var Kxs = [
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[]
				];
				for (let index = 0; index < gcslist.length; index++) {
					const element = gcslist[index];
					if (element.Message == "正在安装") {
						Kxs[0].push(element);
					}
					if (element.Message == "保养在途") {
						Kxs[1].push(element);
					}
					if (element.Message == "维修在途") {
						Kxs[2].push(element);
					}
					if (element.Message == "正在保养") {
						Kxs[3].push(element);
					}
					if (element.Message == "正在维修") {
						Kxs[4].push(element);
					}
					if (element.Message == "打卡") {
						Kxs[5].push(element);
					}
					if (element.Message == "安装在途") {
						Kxs[6].push(element);
					}
					if (element.Message == "空闲") {
						Kxs[7].push(element);
					}
				}
				var KKxs = [];
				for (let index = 0; index < Kxs.length; index++) {
					const element = Kxs[index];
					if (element.length != 0) {
						for (let index = 0; index < element.length; index++) {
							const elementx = element[index];
							KKxs.push(elementx);
						}
					}
				}
				// 将两个数组合并
				var list01 = KKx;
				for (let index = 0; index < KKxs.length; index++) {
					const gcslis = KKxs[index];
					list01.push(gcslis);
				}
				this.data = list01;
				// 返回排序数组
				return list01;
			},
			
			
			
			
			bd_encrypt:function(gg_lng, gg_lat) {
			    var X_PI = Math.PI * 3000.0 / 180.0;
			    var x = gg_lng, y = gg_lat;
			    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
			    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
			    var bd_lng = z * Math.cos(theta) + 0.0065;
			    var bd_lat = z * Math.sin(theta) + 0.006;
			    return [bd_lng,bd_lat]
			      
			},
			
			
			
			
			// WGS84 转换  GCJ 02
			wgs84togcj02: function(lngs, lats) {
				// console.log(lngs, lats);
				var lng = Number(lngs);
				var lat = Number(lats);
				var x_PI = (3.14159265358979324 * 3000.0) / 180.0;
				var a = 6378245.0;
				var ee = 0.00669342162296594323;
				var PI = 3.1415926535897932384626;
				if (this.out_of_china(lng, lat)) {
					return [lng, lat];
				} else {
					var dlat = this.transformlat(lng - 105.0, lat - 35.0);
					var dlng = this.transformlng(lng - 105.0, lat - 35.0);
					var radlat = (lat / 180.0) * PI;
					var magic = Math.sin(radlat);
					magic = 1 - ee * magic * magic;
					var sqrtmagic = Math.sqrt(magic);
					dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
					dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
					var mglat = lat + dlat;
					var mglng = lng + dlng;
					// this.gcj02tobd09(mglng,mglat)

					// console.log(mglng, mglat);
					// ----------------------------------------------------
					var lngee = mglng;
					var latee = mglat;
					var z =
						Math.sqrt(lngee * lngee + latee * latee) +
						0.00002 * Math.sin(latee * x_PI);
					var theta =
						Math.atan2(latee, lngee) + 0.000003 * Math.cos(lngee * x_PI);
					var bd_lng = z * Math.cos(theta) + 0.0065;
					var bd_lat = z * Math.sin(theta) + 0.006;
					// console.log(bd_lng,bd_lat)
					return [bd_lng, bd_lat];
					// return [mglng, mglat];
				}
			},
			//  GCJ 02  转换   BD 09
			gcj02tobd09: function(lngs, lats) {
				var x_PI = (3.14159265358979324 * 3000.0) / 180.0;
				var PI = 3.1415926535897932384626;
				var lng = lngs.split(".")[0] + "." + lngs.split(".")[1];
				var lat = lats.split(".")[0] + "." + lats.split(".")[1];
				var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
				var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
				var bd_lng = z * Math.cos(theta) + 0.0065;
				var bd_lat = z * Math.sin(theta) + 0.006;
				// console.log(bd_lng, bd_lat);
				return [bd_lng, bd_lat];
			},
			//  转换辅助算法 (以下三个，不可删除)
			out_of_china: function(lng, lat) {
				return (
					lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false
				);
			},
			transformlat: function(lngs, lats) {
				var lng = Number(lngs);
				var lat = Number(lats);
				var PI = 3.1415926535897932384626;
				var ret = -100.0 +
					2.0 * lng +
					3.0 * lat +
					0.2 * lat * lat +
					0.1 * lng * lat +
					0.2 * Math.sqrt(Math.abs(lng));
				ret +=
					((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
						2.0) /
					3.0;
				ret +=
					((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) *
						2.0) /
					3.0;
				ret +=
					((160.0 * Math.sin((lat / 12.0) * PI) +
							320 * Math.sin((lat * PI) / 30.0)) *
						2.0) /
					3.0;
				return ret;
			},
			transformlng: function(lngs, lats) {
				var lng = Number(lngs);
				var lat = Number(lats);
				var PI = 3.1415926535897932384626;
				var ret =
					300.0 +
					lng +
					2.0 * lat +
					0.1 * lng * lng +
					0.1 * lng * lat +
					0.1 * Math.sqrt(Math.abs(lng));
				ret +=
					((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
						2.0) /
					3.0;
				ret +=
					((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) *
						2.0) /
					3.0;
				ret +=
					((150.0 * Math.sin((lng / 12.0) * PI) +
							300.0 * Math.sin((lng / 30.0) * PI)) *
						2.0) /
					3.0;
				return ret;
			},
		}
	}
</script>

<style scoped lang="scss">
	.con {
		width: 100%;
		height: 100%;
		// overflow: hidden;
	}

	.BotttomView {
		width: 100%;
		height: 40%;
		overflow: auto;
		padding: 10px;
		border-top: 5px solid #ccc;
		box-sizing: border-box;

		.GCSBUTBox {
			width: 90%;
			border-radius: 12px;
			margin: auto;
			margin-bottom: 3px;

			.GCSBUT {
				height: 40px;
				border-radius: 12px;
				line-height: 40px;
				background-color: #007aff;
				color: #FFFFFF;
				padding-left: 20px;
				overflow: hidden;

				.butIP {
					width: 100px;
					height: 100%;
					float: right;
					background-color: #55aaff;
					text-align: center;
					line-height: 50px;
				}
			}

			.Cnoter {
				width: 100%;
				min-height: 50px;
				padding: 20px;
				box-sizing: border-box;
			}
		}




	}
</style>
