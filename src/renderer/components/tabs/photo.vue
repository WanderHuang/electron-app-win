<template>
  <div class="ehome-photo-page">
    <div class="toolbar">
      <el-button :icon="icons[plugin]" @click="toggleImage" :title="buttonInfos[plugin]"></el-button>
    </div>
    <div class="images">
      <keep-alive>
        <component :is="plugin" :images="images" class="photo-head"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import config from '&/static/config'
import {getStaticImagesUrl} from '@/api/index'
import scrollImage from '@/components/common/scrollImage'
import MasonryImage from '@/components/common/MasonryImage/index.vue'
export default {
  name: 'ehome-photo',
  components: { scrollImage, MasonryImage },
  data () {
    return {
      images: [],
      icons: {
        'scrollImage': 'el-icon-menu',
        'MasonryImage': 'el-icon-d-caret'
      },
      buttonInfos: {
        'scrollImage': '切换到平铺视图',
        'MasonryImage': '切换到滚动视图'
      },
      plugin: 'MasonryImage'
    }
  },
  watch: {
    plugin () {
      this.setWrapperHeight()
    }
  },
  created () {
    this.loadPhotos()
    window.addEventListener('resize', (e) => {
      this.setWrapperHeight()
    })
    this.setWrapperHeight()
  },
  methods: {
    loadPhotos () {
      this.$http.get(getStaticImagesUrl).then(res => {
        this.urls = res.data
        if (res && res.data) {
          this.images = res.data.map(item => {
            item.url = config.host + item.url
            return item
          })
        }
      })
    },
    toggleImage () {
      this.plugin = this.plugin === 'scrollImage' ? 'MasonryImage' : 'scrollImage'
    },
    setWrapperHeight () {
      let wrap = document.querySelector('.ehome-photo-page')
      if (wrap) {
        let images = wrap.querySelector('.images')
        images && (images.style.height = wrap.clientHeight - 30 + 'px')
      }
    }
  }
}
</script>
<style lang="less">
.ehome-photo-page {
  height: 100%;
  .toolbar {
    height: 40px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .images {
    overflow-y: scroll;
  }
}
</style>

