<template>
  <div class="ehome-photo-page">
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="url in urls" :key="url">
        <img :src="sysConfig.host + url" class="img"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import config from '&/static/config'
import {getStaticImagesUrl} from '@/api/index'
export default {
  name: 'ehome-photo',
  data () {
    return {
      sysConfig: config,
      urls: []
    }
  },
  created () {
    this.loadPhotos()
  },
  methods: {
    loadPhotos () {
      this.$http.get(getStaticImagesUrl).then(res => {
        this.urls = res.data
        console.log(this.urls)
      })
    }
  }
}
</script>
<style lang="less">
.ehome-photo-page {
  height: 100%;
  .el-carousel__item {
    .img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

