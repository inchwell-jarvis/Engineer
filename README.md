<br/>
<p align="center"><img width="150" src="./static/img/yzj.png" alt="InchwellLogo"></p>
<br/>
<p align="center">
  <a href="https://nodejs.org/en"><img src="https://img.shields.io/badge/node-16.0.0-brightgreen"></a>
  <a href="https://www.npmjs.com"><img src="https://img.shields.io/badge/npm-7.10.0-blue"></a>
  <a href="https://v2.cn.vuejs.org"><img src="https://img.shields.io/badge/vue-2.9.6-brightgreen"></a>
  <a href="https://v1.uviewui.com"><img src="https://img.shields.io/badge/uView%20UI-2.15.6-orange"></a>
</p>


# Engineer
工程师App
切换 GitHub 管理

## GitHub
在HbuilderX 中使用 GitHub 管理项目时，请遵循以下步骤：

1. 将更改提交到本地仓库：
右击项目名称，选择  `Git 提交` ，将变更提交到本地仓库，切记不可直接推送
2. 推送更改到 GitHub 远程仓库：
然后再次右击项目名称，选择  `Git` 然后选择子级   `推送 - push` ，在弹出的页面中点击   `push` ，编辑器左下角会显示推送结果


**注意：** 不要直接使用 `Git 提交 - 提交并推送` 推送到远程仓库。

## 打包
如果你需要打包工程师App，请使用以下配置信息：

### Android 包名
- 包名: com.gcs.yzj


| 配置项       		 	| 信息           										|
| ---------------------	| ------------------------------------------------------|
| Android证书别名      	| test2           										|
| Android私钥密码      	| 123456         										|
| Android证书文件路径  	| build/test.keystore 									|
| IOS私钥证书      		| build/b76d51841bac4be2aca03251417731ab.p12           	|
| IOS私钥密码      		| IPGB123456         									|
| IOS证书profile文件  	| build/for_gcs_dev.mobileprovision 					|
