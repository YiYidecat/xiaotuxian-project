<!-- 首页广告组件基础结构 -->
<template>
    <div class="home-banner">
        <XtxCarousel/>
    </div>
</template>

<script>
import XtxCarousel from '@/components/library/xtx-carousel.vue'

export default {
  components: { XtxCarousel },
  name: 'HomeBanner'
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
