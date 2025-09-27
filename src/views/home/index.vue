<template>
    <div class="PageHome">
          <div class="home-entry">
            <div class="container">
              <!-- 左侧分类 -->
              <homeCategory></homeCategory>
            </div>
          </div>
    </div>
</template>

<script>
import homeCategory from './components/home-category.vue'

export default {
  name: 'PageHome',
  components: { homeCategory }
}
</script>

<style scoped lang="less">
</style>
