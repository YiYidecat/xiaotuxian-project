import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入自己封装的组件库
import XtxUI from './components/library'

import 'normalize.css' // 引入normalize.css进行浏览器样式重置
import './assets/styles/common.less'

// 创建Vue实例
// createApp(App).use(store).use(router).mount('#app')

// 创建Vue应用
const app = createApp(App)
// 使用Vuex
app.use(store)
// 使用路由
app.use(router)

// 安装自己封装的组件库
app.use(XtxUI)

// 挂载到#app中
app.mount('#app')
