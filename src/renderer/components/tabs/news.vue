<template>
  <div class="elife-news-page markdown-body">
    <div v-html="msg"></div>
  </div>
</template>
<script>
import {readArticleUrl} from '@/api/index'
// TODO 改为文章列表
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
    }
  }
}
</script>
<style>
.elife-news-page {
  height: 100%;
}
</style>

