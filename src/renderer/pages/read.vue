<template>
  <div class="elife-read-page markdown-body">
    <div class="read-toolbar">
      <md-button class="md-icon-button md-raised" @click="goBack">
        <md-icon>keyboard_arrow_left</md-icon>
      </md-button>
    </div>
    <div v-html="msg"></div>
  </div>
</template>
<script>
import {readArticleUrl} from '@/api/index'
// TODO 支持MD PDF WORD EXCEL TXT等文本、支持图像、支持视频
export default {
  name: 'elife-news',
  data: () => {
    return {
      msg: 'Read Your Article By Enter One Path'
    }
  },
  created () {
    console.log(`News created! ${this.$route.params.path}`)
    this.$route.params.path && this.readArticle(this.$route.params.path)
  },
  methods: {
    readArticle (path) {
      let $this = this
      this.$http.get(readArticleUrl, {params: {path}})
        .then(response => {
          $this.msg = $this.$marked(response.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    goBack () {
      this.$router.go(-1) // 后退一页
    }
  }
}
</script>
<style>
.elife-read-page {
  height: 100%;
}
.read-toolbar {
  display: flex;
  flex-direction: row-reverse;
}
</style>

