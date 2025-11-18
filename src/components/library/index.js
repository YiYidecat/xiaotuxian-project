// // 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意点：Vue3没有全局过滤器。
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// // 下面是为了实现图片懒加载进行的配置实现
// import defaultImg from '@/assets/images/logo.png'
// import { useIntersectionObserver } from '@vueuse/core'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'

// // Vue2 全局注册组件
// // Vue.component('组件名', 组件)

// // Vue3 全局注册组件
// // app.component('组件名', 组件)

// // 实现图片懒加载
// const defineDirective = (app) => {
//   app.directive('lazy', {
//     // 标签或组件挂载到页面中（就是 Vue2 insert 插入节点）,el就是挂载图片的组件位置
//     mounted (el, { value }) {
//       // stop是一个函数，用于停止检测元素可见性
//       const { stop } = useIntersectionObserver(
//         el,
//         // isIntersecting 布尔值，元素可见为 true，元素不可见为 false
//         ([{ isintersecting }], observerElement) => {
//           // 图片标签是否可见
//           if (isintersecting) {
//             // 如果目标可见，替换图片地址，自动加载图片
//             el.src = value
//             // 如果不可见，无法加载图片，显示占位图
//             el.onerror = () => {
//               el.src = defaultImg
//             }
//             // 主动停止检测元素可见性
//             stop()
//           }
//         }
//       )
//     }
//   })
// }
// export default {
//   // install 这种写法以后是提供给 app.use() 安装组件库用的
//   install (app) {
//     app.component(XtxSkeleton.name, XtxSkeleton)
//     app.component(XtxCarousel.name, XtxCarousel)
//     app.component(XtxMore.name, XtxMore)
//     defineDirective(app)
//     app.component(XtxBread.name, XtxBread)
//     app.component(XtxBreadItem.name, XtxBreadItem)
//   }
// }

// 实现批量注册组件
// 其实就是vue插件，扩展vue功能，全局组件、指令、函数 （vue.30取消过滤器）
// 当你在mian.js导入，使用Vue.use()  (vue3.0 app)的时候就会执行install函数

// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
// console.dir(importFn.keys()) 文件名称数组

export default {
  install (app) {
    // 批量注册全局组件
    importFn.keys().forEach(key => {
      // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })
  }
}
