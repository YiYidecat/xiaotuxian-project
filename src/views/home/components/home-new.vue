<template>
    <div class="home-new">
        <homePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
         <!-- 具名插槽 -->
          <template #right><XtxMore path="/"/></template>
         <!-- 默认插槽 - 面板内容 -->
             <ul class="goods-list">
                <li v-for="item in list" :key="item.id">
                  <RouterLink to="/">
                  <img :src="item.picture" alt="" />
                  <p class="name ellipsis">{{ item.name }}</p>
                  <p class="price">&yen;{{ item.price }}</p>
                  </RouterLink>
                </li>
             </ul>
        </homePanel>
    </div>
</template>

<script>
import homePanel from './home-panel.vue'
import { findNew } from '@/apis/home.js'
import XtxMore from '@/components/library/xtx-more.vue'
import { ref } from 'vue'

export default {
  components: { homePanel, XtxMore },
  name: 'HomeNew',
  setup () {
    const list = ref([])
    findNew().then(({ result }) => {
      list.value = result
    })
    // console.log('新鲜好物的商品信息是', list)
    return { list }
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
