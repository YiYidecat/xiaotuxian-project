import { createRouter, createWebHashHistory } from 'vue-router'

// 定义路由
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/home/index.vue')
      }
    ]
  }
]

// 创建路由实例
const router = createRouter({
  // 使用hash模式实现路由
  history: createWebHashHistory(),
  routes
})

export default router
