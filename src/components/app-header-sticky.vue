<!-- 此部分是为了实现首页的头部分类导航交互功能 -->
<template>
    <div class="app-header-sticky" :class="{show:isShow}">
        <!-- v-show使用，为了吸顶头部展开的内容不遮住头部导航 -->
        <div class="container" v-show="isShow">
            <RouterLink class="logo" to="/"/>
            <AppHeaderNav/>
            <div class="right">
                <RouterLink to="/">品牌</RouterLink>
                <RouterLink to="/">专题</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeaderNav from './app-header-nav.vue'
import { ref } from 'vue'

export default ({
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  setup () {
    const isShow = ref(false)
    // 浏览器绑定滚动事件
    window.onscroll = () => {
    // 获取当前文档滚动出去了多少
      const scrollTop = document.documentElement.scrollTop
      // 页面滚动到了78px以上，显示吸顶组件，否则隐藏
      if (scrollTop >= 78) {
        isShow.value = true
      } else {
        isShow.value = false
      }
    }
    return { isShow }
  }
})
</script>

<style scoped lang="less">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform:translateY(-100%);
  opacity:0;
  &.show{
    transition:all 0.3s linear;
    transform:translateY(0);
    opacity:1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(~@/assets/images/logo.png) no-repeat  right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
