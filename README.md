# Dali-Backend
Dali-Platform 专案后台管理系统
## 環境安裝
```sh
npm i
# or
yarn
```
## 執行使用
開發環境 `node v8.9.3`
```sh
npm run dev
# or
yarn dev
```
## 佈署方式
直接佈署
```sh
npm run build
npm run start
# or
yarn build
yarn start
```

## 佈署環境變數
| 變數         | 預設值                             | 說明            |
| ------------ | ---------------------------------- | --------------- |
| HOST         | localhost                          | web服務綁定host |
| PORT         | 80                                 | web服務綁定port |
| K_TOKEN      | LeedianPlatformToken               | API TOKEN       |
| API_PWD_KEY  | 769E18DAFE373A2F8A17B415           | 密码加密用      |
| AUTH_API_URL | http://192.168.2.215:17000/api/v1/ | API 位置        |

## 專案架構說明
架構說明
```
├─assets                需编译的素材(less, img)
├─components            vue 组件
├─lang                  多语设定挡
├─layout                页面布局共用挡
├─middleware            中间件，用于权限验证及多语系
│
├─mixins                vue组件、页面共用函式
│  ├─currRoute.js           取得目前route名称
│  ├─errCodeMsg.js          错误码转为错误信息
│  ├─routerPush.js          执行跳页
│  └─vendorFilters.js       过厂商资料
│
├─pages                 个页面
├─plugins               插件设定
├─server                服务器设定
├─static                静态挡
│
├─store                 vuex状态管理
│  ├─auth.js                权限管理模组
│  └─vendor.js              厂商资料管理模组
│
├─tools                 一般js共用函式
│  └─encrypt.js             加密工具
│
│.editorconfig          editor config
│.eslintrc.js           eslint setting
│.gitignore             git setting
│nuxt.config.js         Nuxt.js 设定挡
│package.json           node package.json
│README.md              README
│yarn.lock              yarn lock
└─
```

## 重要第三方掛件
| 掛件名稱                                                   | 說明             |
| ---------------------------------------------------------- | ---------------- |
| [@nuxt/axios](https://axios.nuxtjs.org/)                   | nuxt axios 模组  |
| [iview](https://www.iviewui.com/)                          | vue组件库        |
| [js-cookie](https://github.com/js-cookie/js-cookie)        | cookie功能       |
| [md5](https://github.com/pvorb/node-md5)                   | md5杂凑          |
| [nuxt-i18n](https://nuxt-community.github.io/nuxt-i18n/)   | nuxt多语系模组   |
| [vue-qriously](https://github.com/theomessin/vue-qriously) | vue qr code 套件 |


## 其他參考資料
* [vue官網](https://vuejs.org/)
* [nuxt.js官網](https://nuxtjs.org/)

## 联系

leedian B Team
