<template>
  <!-- 品牌数据需要请求后台，再汇总到所有数据当中，然后渲染，然后激活当前的分类（class="{active:categoryId === item.id}"） -->
  <div class="home-category" @mouseleave="categoryId = null">
    <ul class="menu">
      <!-- 定义一个数据记录当前鼠标经过分类的ID，使用计算属性得到当前的分类推荐商品数据 -->
      <li :class="{active:categoryId === item.id}" v-for="item in menuList" :key="item.id" @mouseenter="categoryId=item.id">
        <RouterLink :to="`/category/${item.id}`">{{item.name}}</RouterLink>
        <template v-if="item.children">
          <RouterLink
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`">
            {{sub.name}}
          </RouterLink>
        </template>
        <template v-if="!item.children">
          <XtxSkeleton width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" />
          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </template>
      </li>
    </ul>

    <!-- <ul class="menu">
      定义一个数据记录当前鼠标经过分类的ID，使用计算属性得到当前的分类推荐商品数据
      <li :class="{active:categoryId === item.id}" v-for="item in menuList" :key="item.id" @mouseenter="categoryId=item.id">
          <RouterLink to="/">居家</RouterLink>
          <RouterLink to="/">洗漱</RouterLink>
          <RouterLink to="/">清洁</RouterLink>
      </li>
    </ul> -->

    <!-- 弹层 -->
    <div class="layer">
      <h4 v-if="currCategory">{{currCategory.id==='brand'?'品牌':'分类'}}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="currCategory && currCategory.children && currCategory.children.length">
        <li v-for="item in currCategory.children" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="desc ellipsis">{{item.desc}}</p>
              <p class="price"><i>¥</i>{{item.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 处理品牌布局渲染 -->
      <ul v-if="currCategory && currCategory.brands && currCategory.brands.length">
        <li class="brand" v-for="item in currCategory.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{ item.place }}</p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, computed, ref } from 'vue'
import { findBrand } from '@/apis/home.js'
import XtxSkeleton from '@/components/library/xtx-skeleton.vue'

export default {
  name: 'HomeCategory',

  setup () {
    // 获取vuex的一级分类，并且只需要两个二级分类
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-children', name: '品牌推荐' }],
      brands: []
    })

    // 需要在组件内部定义一个品牌数据
    // 根据vuex的分类数据和组件中定义品牌数据，得到左侧分类完整数据（9分类+1品牌）数组
    const store = useStore()
    const menuList = computed(() => {
      const arr = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          // 防止初始化没有children的时候调用slice函数报错
          children: item.children && item.children.slice(0, 2)
        }
      })
      arr.push(brand)
      return arr
    })
    // 获取当前分类逻辑
    const categoryId = ref(null)
    const currCategory = computed(() => {
      return menuList.value.find(item => item.id === categoryId.value)
    })

    console.log('menuList是', menuList)
    console.log('currCategory是', currCategory)

    findBrand().then(data => {
      brand.brands = data.result
    })
    console.log('brand是', brand)
    return { menuList, categoryId, currCategory, XtxSkeleton }
  }
}
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover, &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 18px;
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255,255,255,0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
       li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
              width: 95px;
              height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
