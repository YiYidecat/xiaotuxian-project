// hooks(钩子)封装逻辑，提供响应式数据
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// 数据懒加载函数
export const useLazyData = (apiFn) => {
  // 1.被观察的对象
  const target = ref(null)
  // 2.用于存放后台数据的变量
  const list = ref([])
  // stop用于停止检测函数
  // target 被检测的元素
  // isIntersecting （注意不要拼写错误）布尔值，元素是否可见true/false
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      // 如果元素可以，发送请求获取数据，并停止检测避免重复发送请求
      if (isIntersecting) {
        console.log(target.value, '元素可以发送请求了.....')
        // 调用API获取数据
        apiFn().then(({ result }) => {
          list.value = result
          console.log('接口获取到的数据是', list)
        })
        stop()
      }
    }
  )
  // 钩子函数返回---> 响应式数据（目标元素、后台元素）
  return { list, target }
}
