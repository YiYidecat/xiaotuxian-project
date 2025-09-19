
<template>
   <!-- 一级路由 -->
  <RouterView></RouterView>

</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'AppTopNav',
  setup () {
    // 读取vuex中的用户信息
    const store = useStore()
    // profile是一个计算属性
    const profile = computed(() => {
      return store.state.user.profile
    })
    return { profile }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  margin: 0 auto;
  width: 80%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
