# APP开发文档

## 配色
<!--  -->
	背景颜色:#FFFFFF
	圆角：border-radius: 5px;
	
<!-- 分页 -->
	pageNum: '1',
	numPerPage: '',
	orderField: '',
	orderDirection: '',
	
<!-- 阴影 -->
	-webkit-box-shadow: 3px 3px 6px #c1c1c1;
	-moz-box-shadow: 3px 3px 6px #c1c1c1;
	box-shadow: 3px 3px 6px #c1c1c1;
			
<!-- 黑框提示 -->
	uni.showToast({
		title: '请输入登录名',
		icon: "none"
	})
	return false
				
<!-- 	判断安卓 Android iOS  -->	
	switch(uni.getSystemInfoSync().platform){
	    case 'android':
	       console.log('运行Android上')
	       break;
	    case 'ios':
	       console.log('运行iOS上')
	       break;
	    default:
	       console.log('运行在开发者工具上')
	       break;
	}
	
	
	
	
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题



---
----
***
*****



