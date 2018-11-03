<template>
  <div class="image-slider">
    <img v-for="(img, index) in images" :src="img.url" v-show="imageIndex === index" :width="img.width" :height="img.height" class="image-slider-img-box"/>
    <div class="image-slider-wrapper">
      <el-slider v-model="percent" vertical :height="slideHeight" :min="0" :max="max" @change="change"></el-slider>
    </div>
  </div>  
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    },
    index: {
      type: Number,
      default () {
        return 0
      }
    },
    max: {
      type: Number,
      default () {
        return 0
      }
    },
    slideHeight: {
      type: String,
      default () {
        return '100px'
      }
    }
  },
  data () {
    return {
      percent: 0,
      imageIndex: 0
    }
  },
  watch: {
    index (val) {
      this.imageIndex = val
      this.percent = val
    }
  },
  methods: {
    change (val) {
      this.imageIndex = val
    }
  }
}
</script>
<style lang="less">
.image-slider {
  position: relative;
  width: 100%;
  height: 100%;
  .image-slider-img-box {
    max-width: 1080px;
    max-height: 786px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
  .image-slider-wrapper {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
