<template>
  <!-- 首页入口 -->
    <div class="PageHome">
          <div class="home-entry">
            <div class="container">
              <!-- 左侧分类 -->
              <homeCategory/>
              <!-- 轮播图 -->
              <home-banner/>
            </div>
          </div>
          <!-- 新鲜好物 -->
          <homeNew/>
          <!-- 人气推荐 -->
          <homeHot/>
          <!-- 热门品牌 -->
          <homeBrand/>
          <!-- 商品区域 -->
          <home-product/>
    </div>
</template>

<script>
import homeCategory from './components/home-category.vue'
import homeBanner from './components/home-banner.vue'
import homeNew from './components/home-new.vue'
import homeHot from './components/home-hot.vue'
import homeBrand from './components/home-brand.vue'
import homeProduct from './components/home-product.vue'

export default {
  name: 'PageHome',
  components: { homeCategory, homeBanner, homeNew, homeHot, homeBrand, homeProduct }
}
</script>

<style scoped lang="less">
</style>
