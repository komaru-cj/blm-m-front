<template>
  <div class="m-slider">
    <div class="m-panel" ref="slider" :style="`width: ${width}px;`">
      <div
          v-for="(item, index) in imageData"
          :key="index"
          class="m-image">
        <img :src="item.src" :alt="item.title"/>
        <p class="u-img-title" :title="item.title">{{ item.title }}</p>
      </div>
      <div class="m-image">
        <img :src="imageData[0].src" :alt="imageData[0].title"/>
        <p class="u-img-title" :title="imageData[0].title">{{ imageData[0].title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImageSlider',
  props: {
    imageData: { // 图片数组
      type: Array,
      default: () => {
        return []
      }
    },
    interval: { // 滑动轮播间隔
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      visibilityChangeEvent: '',
      timer: null,
      imgWidth: 400, // 图片宽度，用于生成容器宽度
      activeIndex: 0 // 当前展示的图片
    }
  },
  computed: {
    width () {
      return (this.imageData.length + 1) * this.imgWidth
    }
  },
  created () {
    var hiddenProperty = 'hidden' in document ? 'hidden'
        : 'webkitHidden' in document ? 'webkitHidden'
            : 'mozHidden' in document ? 'mozHidden'
                : null
    this.visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
    var onVisibilityChange = () => {
      if (!document[hiddenProperty]) {
        this.onStart()
        console.log('页面激活')
      } else {
        this.onStop()
        console.log('页面非激活')
      }
    }
    document.addEventListener(this.visibilityChangeEvent, onVisibilityChange)
    setTimeout(() => {
      this.timer = setInterval(() => { // 自动切换
        this.onMove()
      }, this.interval)
    }, this.interval)
  },
  methods: {
    // 滑动动画效果
    slideEffect (target) {
      const offsetLeft = this.$refs.slider.offsetLeft // 求出元素的当前偏移位置
      let step = (target - offsetLeft) / 10 // 由快到慢的过渡效果
      step = step > 0 ? Math.ceil(step) : Math.floor(step) // 对每次移动的距离取整，ceil：向上取整，floor：向下取整
      setTimeout(() => {
        if (target !== offsetLeft) {
          this.$refs.slider.style.left = offsetLeft + step + 'px' // 移动
          this.slideEffect(target)
        }
      }, 15) // 每隔15ms执行一次
    },
    onSlider (moveX) {
      const offset = this.$refs.slider.offsetLeft
      const target = offset + moveX // 要移动的目标位置
      this.slideEffect(target)
    },
    onMove () {
      if (this.activeIndex === this.imageData.length - 1) { // 最后一张
        this.activeIndex = 0 // 显示第一张
        this.$refs.slider.style.left = 0
        this.onSlider(-this.imgWidth)
      } else {
        this.activeIndex++ // 显示下一张
        this.onSlider(-this.imgWidth)
      }
    },
    onStop () {
      clearInterval(this.timer)
      this.timer = null
    },
    onStart () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.onMove()
      }, this.interval)
    },
    beforeDestroy () {
      document.removeEventListener(this.visibilityChangeEvent)
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>
<style lang="less" scoped>
@themeColor: #D93844;
.m-slider {
  width: 1600px;
  height: 1200px;
  overflow: hidden;
  position: relative;
  .m-panel {
    position: absolute;
    top: 0;
    left: 0;
    // width: 1600px; // (图片数组长度+1) * 图片宽度
    height: 1200px;
    .m-image {
      float: left;
      width: 1600px;
      height: 1200px;
      img {
        width: 1600px;
        height: 1000px;
        cursor: pointer;
      }
      .u-img-title {
        width: 1600px;
        font-size: 16px;
        color: #333;
        line-height: 30px;
        overflow: hidden;
        text-align: left;
        cursor: pointer;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        &:hover {
          font-size: 16px;
          color: @themeColor;
        }
      }
    }
  }
}
</style>