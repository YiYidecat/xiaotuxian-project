<template>
    <!-- 轮播图基础布局 -->
    <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
        <ul class="carousel-body">
            <li class="carousel-item" v-for="(item,index) in sliders" :key="index" :class="{fade:activeIndex===index}">
              <RouterLink :to="item.hrefUrl">
                 <img :src="item.imgUrl" alt="">
              </RouterLink>
                <!-- <RouterLink to="/">
                    <img src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/1ba86bcc-ae71-42a3-bc3e-37b662f7f07e.jpg" alt=""/>
                </RouterLink> -->
            </li>
        </ul>
        <!-- 上一张 -->
        <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev">
            <i class="iconfont icon-angle-left"></i>
        </a>
        <!-- 下一张 -->
        <a @click="toggle(1)" href="javascript:;" class="carousel-btn next">
            <i class="iconfont icon-angle-right"></i>
        </a>
        <!-- 轮播图下面的指示原点的点击切换功能 -->
        <div class="carousel-indicator">
            <span v-for="(item,index) in sliders" :key="index" :class="{active:activeIndex===index}" @click = "activeIndex =index"></span>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    // 针对自动轮播功能实现
    duration: {
      type: Number,
      default: 5000
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  setup (props) { // 在这里将props作为参数传进来
    // 默认显示的图片的索引
    const activeIndex = ref(0)
    // 自动播放
    let timer = null
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        activeIndex.value++
        if (activeIndex.value > props.sliders.length - 1) {
          activeIndex.value = 0
        }
      }, props.duration)
    }
    // 使用watch的监视功能
    watch(() => props.sliders, (newVal) => {
      // 有数据&开启自动播放，才开始调用自动播放函数
      if (newVal.length > 1 && props.autoPlay) {
        autoPlayFn()
      }
    }, { immediate: true })
    // 轮播图的指示器切换.step=1代表切换下一张，step=-1代表切换到上一张
    const toggle = (step) => {
      const temp = activeIndex.value + step
      if (temp < 0) {
        activeIndex.value = props.sliders.length - 1
      } else if (temp > props.sliders.length - 1) {
        activeIndex.value = 0
      } else {
        activeIndex.value = temp
      }
    }
    // 如果有自动播放，鼠标进入离开，暂停，开启
    const stop = () => {
      if (timer) {
        clearInterval(timer)// 直接将停留该页面的计数器清零即可实现在该页面暂停
      }
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    return { activeIndex, toggle, stop, start }
  }
}
</script>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
