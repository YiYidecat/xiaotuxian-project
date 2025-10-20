<template>
    <div class="PageHome">
          <div class="home-entry">
            <div class="container">
              <!-- 左侧分类 -->
              <homeCategory/>
              <!-- 轮播图 -->
              <home-banner/>
            </div>
          </div>
    </div>
</template>

<script>
import homeCategory from './components/home-category.vue'
import homeBanner from './components/home-banner.vue'

export default {
  name: 'PageHome',
  components: { homeCategory, homeBanner }
}
</script>

<style scoped lang="less">
</style>
