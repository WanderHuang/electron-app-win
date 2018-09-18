<template>
  <div class="scroll-image" :style="{width: scrollWidth, height: scrollHeight}">
    <image-slider @wheel.native="wheel" :images="images" :index="index" :max="max"></image-slider>
  </div>
</template>
<script>
import imageSlider from '@/components/widget/imageSlider'
export default {
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    },
    width: {
      type: String,
      default () {
        return '400'
      }
    },
    height: {
      type: String,
      default () {
        return '400'
      }
    }
  },
  components: { imageSlider },
  computed: {
    max () {
      return this.images.length > 0 ? this.images.length - 1 : 0
    },
    scrollWidth () {
      if (!this.width) return '100%'
      return parseInt(this.width) + 'px'
    },
    scrollHeight () {
      if (!this.height) return '100%'
      return parseInt(this.height) + 'px'
    }
  },
  data () {
    return {
      index: 0
    }
  },
  methods: {
    wheel (e) {
      let index = this.index
      index = e.wheelDelta > 0 ? index + 1 : index - 1
      index = index > this.max ? 0 : index
      index = index < 0 ? this.max : index
      this.index = index
    }
  }
}
</script>
<style lang="less">
.scroll-image {
  position: relative;
}
</style>
