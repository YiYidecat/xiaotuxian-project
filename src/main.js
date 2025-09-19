import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css' // 引入normalize.css进行浏览器样式重置
import './assets/styles/common.less'

// 创建Vue实例
createApp(App).use(store).use(router).mount('#app')
