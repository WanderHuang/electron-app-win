<!-- 查看图像 操作并保存图像 -->
<template>
  <div>
    <img :src="img.path" alt="[图像加载失败]"/>
  </div>
</template>
<script>
import {readStaticsUrl} from '@/api/index'
export default {
  name: 'readPicturePlugin',
  props: {
    path: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      img: {
        width: '100px',
        height: '100px'
      }
    }
  },
  created () {
    this.loadImage()
  },
  methods: {
    loadImage () {
      this.img.path = readStaticsUrl + this.path.replace(/.*docs./, '')
    }
  }
}
</script>
<style>

</style>
