<template>
	<view class="box">
		<u-form :model="form" style='background:#FFFFFF' > 
			<u-form-item label-width='240rpx' label="经销商CKD：">
				<u-input v-model="CusCKD"  />
			</u-form-item>
			<u-form-item label-width='240rpx' label="经销商名称：">
				<u-input v-model="CusFullName" />
			</u-form-item>
			<u-form-item label-width='240rpx' label="经销商联系信息：">
				<u-input v-model="CusLinkInfo" />
			</u-form-item>
			<u-form-item label-width='240rpx' label="设备类型：">
				<u-input v-model="EquType" />
			</u-form-item>
			<u-form-item label-width='240rpx' label="设备品牌：">
				<u-input v-model="Brand" />
			</u-form-item>
			<u-form-item label-width='240rpx' label="设备型号：">
				<u-input v-model="EquModel" />
			</u-form-item>
			<u-form-item label-width='240rpx' label="序列号：">
				<u-input v-model="EquSN" />
			</u-form-item>
			<u-form-item label-width='240rpx' label="安装方式：">
				<u-input v-model="InstallType" />
			</u-form-item>
			<u-form-item label-width='240rpx'  label="安装年份：">
				<u-input v-model="InstallYear" type='number' />
			</u-form-item>
			<u-form-item label-width='240rpx' label="累积使用年数：">
				<u-input v-model="CumulativeUse" type='number'  />
			</u-form-item>
		</u-form>

		<u-divider>设备相关</u-divider>
		<u-card v-for="(item, index) in DataTab" :key="index" :title="item.name" style='border: 1px solid #F0AD4E;' >
			<view class="" slot="body">
				<u-radio-group v-model="item.itemcheckbox">
					<u-radio v-for="(items, indexs) in item.checkbox" :key="indexs" :name="items.name" v-model='items.checked' >
						{{items.name}}
					</u-radio>
				</u-radio-group>
			</view>
			<view class="" slot="body">
				<u-input type='textarea' maxlength="99999" auto-height v-model="item.MEno" placeholder="备注"  />
			</view>
		</u-card>
		
		<u-divider>设备评估建议</u-divider>
		<u-card title="设备评估建议" style='border:1px solid #007AFF' >
				<view class="" slot="body">
					<u-radio-group v-model="checkboxListstrue">
						<u-radio v-for="(item, index) in checkboxLists" :key="index" :name="item.name" :disabled="item.checked">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
		</u-card>
		
		<u-divider>备注</u-divider>
		<u-card title="备注" style='border:1px solid #007AFF' >
				<view class="" slot="body">
					
					<u-input type='textarea' maxlength="99999" auto-height v-model="OtherInfo" placeholder="备注"  />
				</view>
		</u-card>
		
		<view class="clattab" style="border: none;">
			<u-button @click="EvaluateCusEqu()" size='mini' type="primary">完成</u-button>
		</view>
				

	</view>
</template>

<script>
	export default {
		data() {
			return {
				CusId:'',
				// 客户ID
				CusCKD:'',
				// 客户全称
				CusFullName:'',
				// 客户联系信息
				CusLinkInfo:'',
				// 设备类型
				EquType:'',
				// 设备品牌
				Brand:'',
				// 设备型号
				EquModel:'',
				// 序列号
				EquSN:'',
				// 安装方式
				InstallType :'',
				// 安装年份
				InstallYear :'',
				// 累计使用年
				CumulativeUse:'',
				// 总建议
				Result:'',
				// 总备注
				OtherInfo:'',
				// 项目评定集合
				EvaluateProjectDtos:[],
				DataTab:[],
				form: {
				},
				checkboxList: [{
						name: '正常',
						checked: false,
					},
					{
						name: '异常',
						checked: false,
					},
					{
						name: '故障',
						checked: false,
					}
				],
				//  设备总评估建议
				checkboxLists:[
					{
							name: '工况正常',
							checked: false,
						},
						{
							name: '建议维修',
							checked: false,
						},
						{
							name: '建议更换',
							checked: false,
						}
				],
				//  设备总评估建议
				checkboxListstrue:'',
			};
		},
		created() {
			var Data1 = []
			var EquData =  this.$store.state.TotalEquipmentData
			for (var i = 0; i < EquData.length; i ++){
				var asd = {
					name:EquData[i],
					MEno:'',
					itemcheckbox:'',
					checkbox:this.checkboxList,
				}
				Data1.push(asd)
			} 
			this.DataTab = Data1
			// 获取客户信息
			var obj = {
				url: this.$store.state.url + 'WO/GetRepairInfo',
				method: 'GET',
				header: this.$store.state.token,
				data: {
					inchwellCode : this.$store.state.report,
				}
			}
			this.$http(obj).then((res) => {
				console.log(res.Data)
				this.EquModel = res.Data.CustomerEquDto.ProdcutCode
				this.CusEquId =  res.Data.CustomerEquDto.Id
				this.Brand =  res.Data.CustomerEquDto.Brand
				this.CusId =  res.Data.CusInfo.CusId
				this.CusFullName =  res.Data.CusInfo.FullName
				this.EquType = this.$store.state.TotalEquText
			})
		},
		methods:{
			EvaluateCusEqu:function(){
				var DataEQU = []
				for(var is = 0; is < this.DataTab.length; is ++ ){
					var item = this.DataTab[is]
					DataEQU.push({
						Pos:is,
						Name:item.name,
						Result:item.itemcheckbox,
						Memo:item.MEno,
					})
				}
				console.log(DataEQU)
				var data = {
					        /// 客户Id                  				············
							CusId:this.CusId,
 					        /// 客户设备Id                   		············
					        CusEquId  :this.CusEquId, 
 					        /// 客户CKD号
					        CusCKD  : this.CusCKD, 
 					        /// 客户全称           					············
					         CusFullName :this.CusFullName,  
 					        /// 客户联系信息
					         CusLinkInfo  :this.CusLinkInfo, 
 					        /// 设备类型
					         EquType :this.EquType, 
 					        /// 品牌
					         Brand : this.Brand,                         ///////
 					        /// 设备型号  匹配扫码接口里的ProdcutCode属性
					         EquModel  : this.EquModel,                   ///////////
 					        /// 设备序列号
					         EquSN  : this.EquSN, 
 					        /// 安装方式
					         InstallType  : this.InstallType, 
 					        /// 安装年份
					         InstallYear  : this.InstallYear, 
 					        /// 累计使用(年)
							CumulativeUse  : this.CumulativeUse, 
 					        /// 评定结果
					         Result  : this.checkboxListstrue, 
 					        /// 其它信息
					         OtherInfo  : this.OtherInfo, 
 					        /// 评定项目集合
					        EvaluateProjectDtos  :DataEQU, 
				}
				if(data.CusCKD == '' || data.CusCKD == null){
					uni.showToast({
						title: "请输入经销商CKD！",
						icon: "none"
					})
					return false
				}
				if(data.CusFullName == '' || data.CusFullName == null){
					uni.showToast({
						title: "请输入经销商名称！",
						icon: "none"
					})
					return false
				}
				if(data.CusLinkInfo == '' || data.CusLinkInfo == null){
					uni.showToast({
						title: "请输入经销商联系信息！",
						icon: "none"
					})
					return false
				}
				if(data.EquModel == '' || data.EquModel == null){
					uni.showToast({
						title: "请输入设备型号！",
						icon: "none"
					})
					return false
				}
				if(data.EquType == '' || data.EquType == null){
					uni.showToast({
						title: "请输入设备类型！",
						icon: "none"
					})
					return false
				}
				if(data.Brand == '' || data.Brand == null){
					uni.showToast({
						title: "请输入设备品牌！",
						icon: "none"
					})
					return false
				}
				if(data.EquSN == '' || data.EquSN == null){
					uni.showToast({
						title: "请输入设备序列号！",
						icon: "none"
					})
					return false
				}
				if(data.InstallType == '' || data.InstallType == null){
					uni.showToast({
						title: "请输入安装方式！",
						icon: "none"
					})
					return false
				}
				if(data.InstallYear == '' || data.InstallYear == null){
					uni.showToast({
						title: "请输入安装年份！",
						icon: "none"
					})
					return false
				}
				if(data.CumulativeUse == '' || data.CumulativeUse == null){
					uni.showToast({
						title: "请输入设备累计使用年数！",
						icon: "none"
					})
					return false
				}
				if(data.Result == '' || data.Result == null){
					uni.showToast({
						title: "请选择设备评估建议！",
						icon: "none"
					})
					return false
				}
				
				
				
				
				
				var obj = {
					url: this.$store.state.url + 'CRM/EvaluateCusEqu',
					method: 'post',
					header: this.$store.state.token,
					data: data,
				}
				this.$http(obj).then((res) => {
					console.log(res)
					uni.showToast({
						title: '设备评估完成！',
						icon: "none",
						duration: 2000,
						
					})
					uni.navigateTo({
						url: './EquipmentEvaluation',
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		// background: #f4f4f4;
		background: #FFFFFF;
		padding-left: 5px;
		padding-bottom: 60px ;
		box-sizing: border-box;
		
	}
	.clattab{
		width: 100%;
		position: fixed;
		bottom: -10px;
		text-align: center;
		background-color: #FFFFFF;
		z-index: 99;
		margin-bottom: 0px;
		border-radius: 0;
		button{
			width: 120px;
			height: 40px;
			margin: 20px;
		}
	}
</style>
