<!-- 配置路由组件支持分类跳转
鼠标进入一级分类展示对应的二级分类弹窗
点击一级分类，二级分类，隐藏二级分类弹窗
离开一级分类，二级分类，隐藏二级分类弹窗 -->
<!-- 该部分作为分类组件 -->
<template>
  <div class="top-category" v-if="cate">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ cate.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in cate.children" :key="item.id">
            <RouterLink :to="'/category/sub/${item.id}'">
              <img :src="item.picture" >
              <p>{{ item.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in cate.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.desc }}</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="item2 in item.goods" :key="item2.id" :goods="item2" />
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { findBanner } from '@/apis/home.js'
import { ref, watch } from 'vue'
import xtxCarousel from '@/components/library/xtx-carousel.vue'
import xtxBread from '@/components/library/xtx-bread.vue'
import xtxBreadItem from '@/components/library/xtx-bread-item.vue'
import { findTopCategory } from '@/apis/category.js'
import { useRoute } from 'vue-router'
import GoodsItem from './components/goods-item.vue'
import xtxMore from '@/components/library/xtx-more.vue'

export default ({
  name: 'TopCategory',
  components: { GoodsItem },
  setup () {
    // 轮播图
    const sliders = ref([])
    findBanner(2).then(data => {
      sliders.value = data.result
    })
    // 对获取到的一级类目的数据进行渲染
    // 导入路由获取分类 id，根据分类id获取分类数据进行渲染
    const route = useRoute()
    const cate = ref(null)
    findTopCategory(route.params.id).then(({ result }) => {
      cate.value = result
    })

    // 推荐商品
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }
    watch(() => route.params.id, (newVal) => {
      newVal && getSubList()
    }, { immediate: true })

    return { sliders, cate, subList, xtxCarousel, xtxBread, xtxBreadItem, GoodsItem, xtxMore }
  }
})
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
</style>
