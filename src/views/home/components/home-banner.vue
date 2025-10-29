<!-- 首页广告组件基础结构 -->
<template>
    <div class="home-banner">
        <XtxCarousel :sliders="list"/>
    </div>
</template>

<script>
import XtxCarousel from '@/components/library/xtx-carousel.vue'
import { ref } from 'vue'
import { findBanner } from '@/apis/home.js'

export default {
  components: { XtxCarousel },
  name: 'HomeBanner',
  setup () {
    const list = ref([])
    findBanner().then(data => {
      list.value = data.result
    })
    // console.log('得到的轮播图的信息有', list)
    return { list }
  }
}
</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
</style>
