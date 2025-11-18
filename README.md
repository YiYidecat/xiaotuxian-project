# xiaotuxian-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

1. 首先是创建请求网络接口的方式：request.js文件，
主要是实现以下几步：
// 1. 创建一个新的axios实例（instance实例）
// 2. 请求拦截器，如果有token进行头部携带（instance.interceptors.request.use）
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效（instance.interceptors.response.use）
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise（export default (url, method, submitData)）

2. 然后是在apis文件夹当中创建接口请求数据

3. 针对store文件夹里的js文件，比如category.js文件：
// 1. 主要是调用封装好的apis里面的接口然后使用state-mutations-actions来封装好数据的格式、获取方式、修改方式。
// 2. 在store->index.js文件里对js文件进行注册使用

4. 封装好store里的js文件之后，为了在Vue页面当中进行功能调用，比如在Layout.vue文件当中进行页面当中的数据展示：
   // 使用import { useStore } from 'vuex'来引进,
   然后使用setup () {
    store.dispatch('category/getList')
  }来调用刚刚在category.js文件当中封装好的获取数据的getList函数

5. 总的对以上store来说，就是先是在request.js当中创建网络接口方式 -> 然后在apis当中封装请求数据接口 -> 然后在store文件夹下面完成某一类（比如商品类型category）数据的格式、获取方式、修改方式
   的设置并使用import { createStore } from 'vuex'完成注册 -> 然后在需要用到这个store下的数据请求的Vue页面下使用import { useStore } from 'vuex'完成对store的调用

6. 其他的Vue页面的展示都是通过（1）路由配置（2）组件嵌套的方式，来进行展示的
   
7. src -> components 文件夹里存放的都是一些静态资源
