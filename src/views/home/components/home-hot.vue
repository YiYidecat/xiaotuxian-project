<template>
  <homePanel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">
    <Transition name="fade">
      <ul v-if="list.length" ref="pannel" class="goods-list">
      <li v-for="item in list" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="">
          <p class="name">{{item.title}}</p>
          <p class="desc">{{item.alt}}</p>
        </RouterLink>
      </li>
    </ul>
    <home-skeleton v-else/>
    </Transition>
  </homePanel>
</template>

<script>
import homePanel from './home-panel.vue'
import { RecommendHot } from '@/apis/home.js'
// import { ref } from 'vue'
import HomeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hooks'

export default {
  components: { homePanel, HomeSkeleton },
  name: 'HomeHot',
  setup () {
    // 使用懒加载函数来实现，target是目标响应式函数
    const { target, list } = useLazyData(RecommendHot)
    // RecommendHot().then(({ result }) => {
    //   list.value = result
    // })
    // console.log('人气推荐', list)
    return { target, list }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
