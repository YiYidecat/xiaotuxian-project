<template>
    <div class="home-new">
        <homePanel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
         <!-- 具名插槽 -->
          <template #right><XtxMore path="/"/></template>
            <Transition name="fade">
              <!-- 默认插槽 - 面板内容 -->
             <ul v-if="list.length" ref="pannel" class="goods-list">
                <li v-for="item in list" :key="item.id">
                  <RouterLink to="/">
                  <img :src="item.picture" alt="" />
                  <p class="name ellipsis">{{ item.name }}</p>
                  <p class="price">&yen;{{ item.price }}</p>
                  </RouterLink>
                </li>
             </ul>
             <home-skeleton v-else/>
            </Transition>
        </homePanel>
    </div>
</template>

<script>
import homePanel from './home-panel.vue'
import { findNew } from '@/apis/home.js'
import XtxMore from '@/components/library/xtx-more.vue'
// import { ref } from 'vue'
import HomeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hooks'

export default {
  components: { homePanel, XtxMore, HomeSkeleton },
  name: 'HomeNew',
  setup () {
    const { target, list } = useLazyData(findNew)
    // findNew().then(({ result }) => {
    //   list.value = result
    // })
    // console.log('新鲜好物的商品信息是', list)
    return { target, list }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
