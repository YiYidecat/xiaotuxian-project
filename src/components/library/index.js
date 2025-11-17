// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意点：Vue3没有全局过滤器。
import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
// 下面是为了实现图片懒加载进行的配置实现
import defaultImg from '@/assets/images/logo.png'
import { useIntersectionObserver } from '@vueuse/core'

// Vue2 全局注册组件
// Vue.component('组件名', 组件)

// Vue3 全局注册组件
// app.component('组件名', 组件)

// 实现图片懒加载
const defineDirective = (app) => {
  app.directive('lazy', {
    // 标签或组件挂载到页面中（就是 Vue2 insert 插入节点）,el就是挂载图片的组件位置
    mounted (el, { value }) {
      // stop是一个函数，用于停止检测元素可见性
      const { stop } = useIntersectionObserver(
        el,
        // isIntersecting 布尔值，元素可见为 true，元素不可见为 false
        ([{ isintersecting }], observerElement) => {
          // 图片标签是否可见
          if (isintersecting) {
            // 如果目标可见，替换图片地址，自动加载图片
            el.src = value
            // 如果不可见，无法加载图片，显示占位图
            el.onerror = () => {
              el.src = defaultImg
            }
            // 主动停止检测元素可见性
            stop()
          }
        }
      )
    }
  })
}
export default {
  // install 这种写法以后是提供给 app.use() 安装组件库用的
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    defineDirective(app)
  }
}
