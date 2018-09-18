<template>
  <div class="ehome-photo-page">
    <scroll-image :images="images" width="500" height="400" class="photo-head"></scroll-image>
  </div>
</template>
<script>
import config from '&/static/config'
import {getStaticImagesUrl} from '@/api/index'
import scrollImage from '@/components/common/scrollImage'
export default {
  name: 'ehome-photo',
  components: { scrollImage },
  data () {
    return {
      images: []
    }
  },
  created () {
    this.loadPhotos()
  },
  methods: {
    loadPhotos () {
      this.$http.get(getStaticImagesUrl).then(res => {
        this.urls = res.data
        if (res && res.data) {
          this.images = res.data.map(url => {
            return {
              url: config.host + url
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
.ehome-photo-page {
  height: 100%;
  .photo-head {
    margin: 0 auto;
  }
}
</style>

