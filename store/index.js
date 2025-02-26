import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		FormalService: false, // 是否是正式服

		AppID: 'com.gcs.yzj',
		token: '', //············································					身份信息
		username: "", //·········································					用户姓名
		currentVersion: '', // --------------------------------------------             初次加载自动修改
		ClientUpdateAddress: 'http://icms.inchwell.com.cn/web/downloadgcsApp.html', //客户端更新地址

		// 测试接口
		url: 'http://39.100.116.85:6001/api/', //  ·············				接口头部
		httpurl: 'http://39.100.116.85:6001', //  ··············				外部路径
		httpimgs: 'http://39.100.116.85:6001', // ··············				零配件  九图  链接头部

		// 生产环境
		// url: 'http://webapi.inchwell.com.cn/api/', //  ·············					接口头部
		// httpurl: 'http://webapi.inchwell.com.cn', //  ··············					外部路径
		// httpimgs: 'http://webapi.inchwell.com.cn', // ··············					零配件  九图  链接头部


		Updata: true,



		WorkdailyId: '', //······································上传日报id
		SOId: '', //·············································订单详情ID
		vip: false,
		vipitem: {}, //··········································vip页面调到新建页面的数据
		codeurlid: {}, //········································跳转页面后
		codeurlids: '', //·······································判断是什么状态
		weburl: '', //···········································打开外部网址
		gsQRcode: '', //········································录安装二维码
		Customercode: '', //·····································零配件客户编码   ---进入零配件的客户
		Ninedetails: [], //·····································零配件的详细信息
		NinedetailsHTML: '', //··································零件超级图
		buyids: '', //···········································选择的商品id
		lianxir: {}, //··········································选择切换的联系人
		Buy: [{ //···············································立即购id买
			ProductId: '', //···········································商品id
			Number: '', //··············································数量
			IsAssembly: '', //`·········································甲方安装
		}, ],
		ShoppingCartasd: [], //··································由购物车前往结单页面的数据
		Maintenancestatus: 0, //·································保养管理的状态
		MaintenancestatusID: '', //······························任务的ID
		imgList: [],
		imgListXAIBIAO0: '',
		productCodce: '', //······································超级零件图返回值
		initstates: true, //······································完成任务%%完成任务并创建订单

		WorkOrderIdid: '', //·····································完成并创建工单id
		CustomerIdid: '', //······································完成并创建订单客户
		addimg: '', //···········································上传保养照片的base64
		addimgbaoidandlr: '', //··································拼接的id的前后照片位置 ， 以 %% 分割
		iphonesinit: false,
		equipments: '', //````````````````````````````````````````扫码录设备
		InstallationTaskresIndex: '', //--------区分指派装填
		Trainingcaselists: '',
		webviewurl: '', // 打开pdf文件地址

		InstallationTaskres: '', //安装任务id


		MaintenancestatusGoto: '', //保养任务的状态

		img: [],
		FirstvisitIdindexId: '', // 创建完成后或点击列表页跳转至编辑也所需Id
		CreateCusLinkMan: '', //添加客户联系人    客户Cusid
		indexcurrent: 0, //表格状态
		ClickCardText: '', // 拜访客户添加设备  暂存

		report: '', // 设备评估  的当前设备
		TotalEquipmentData: [], // 设备评分项  



		// 查看使用手册,此Id代表当前查看的项目
		DescribeId: '',



		MCDelay: 0,
		// 保养延迟 预警数据数量

		// 当前手机的地理坐标
		ip: {

		}
	},
	mutations: {},
	actions: {},

})
export default store