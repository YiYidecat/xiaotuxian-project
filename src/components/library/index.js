// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意点：Vue3没有全局过滤器。
import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'

// Vue2 全局注册组件
// Vue.component('组件名', 组件)

// Vue3 全局注册组件
// app.component('组件名', 组件)

export default {
  // install 这种写法以后是提供给 app.use() 安装组件库用的
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
  }
}
