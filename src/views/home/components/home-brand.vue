<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template #right>
      <a @click="activeIndex = 0" :class="{ disabled: activeIndex === 0  }" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="activeIndex = 1" :class="{ disabled: activeIndex === 1  }" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="box">
        <Transition name="fade">
           <ul v-if="list.length" class="list" :style="`transform: translateX(${ activeIndex ? '-50%' : 0 });`">
            <li v-for="item in list" :key="item.id">
             <RouterLink to="/">
              <img :src="item.picture" alt="">
             </RouterLink>
            </li>
           </ul>
             <div v-else class="skeleton">
               <xtxSkeleton class="item" v-for="i in 5" :key="i" width="240px" height="305px"  bg="#e4e4e4"></xtxSkeleton>
             </div>
        </Transition>
    </div>
  </HomePanel>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './home-panel'
import { findHotBrand } from '@/apis/home.js'
// import { useLazyData } from '@/hooks'
import xtxSkeleton from '@/components/library/xtx-skeleton.vue'

export default {
  name: 'HomeBrand',
  components: { HomePanel, xtxSkeleton },
  setup () {
    // 获取数据
    const list = ref([])
    findHotBrand(10).then(data => {
      list.value = data.result
    })

    // 切换效果，前提只有 0 1 两页
    const activeIndex = ref(0)

    // // 调用懒加载函数
    // const { brands, target } = useLazyData(findHotBrand)
    // // 用于切换的下标
    // const activeIndex = ref(0)

    // const { target, list } = useLazyData(findHotBrand)

    // // 切换效果，前提只有 0 1 两页
    // const activeIndex = ref(0)
    console.log('Vue获取到的数据是', list)

    return { list, activeIndex }
  }
}
</script>

<style scoped lang="less">
.skeleton {
  width: 100%;
  display: flex;
}
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  // 小箭头禁用状态
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    // 盒子位移的时候有过渡效果
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
