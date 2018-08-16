<template>
  <div class="elife-read-page markdown-body">
    <div class="read-toolbar">
      <md-button class="md-icon-button md-raised" @click="goBack">
        <md-icon>keyboard_arrow_left</md-icon>
      </md-button>
    </div>
    <div class="read-content">
      <div v-if="msg" v-html="msg"></div>
      <div v-if="fileType === 'md'" v-html="fileContent"></div>
      <div v-if="fileType === 'pdf'">
        <iframe v-for="pdfPage in pdfPages" :src="pdfPage"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import {readArticleUrl, readPdfUrl} from '@/api/index'
// TODO 支持MD PDF WORD EXCEL TXT等文本、支持图像、支持视频
export default {
  name: 'elife-news',
  data: () => {
    return {
      typesArray: ['md', 'pdf'], // 支持类型
      fileType: 'md',
      msg: null,
      fileContent: '',
      pdfPages: []
    }
  },
  created () {
    console.log(`News created! ${this.$route.params.path}`)
    this.fileType = this.$route.params.type
    if (this.typesArray.includes(this.fileType)) {
      this.readArticle(this.$route.params.path, this.fileType)
    } else {
      this.msg = '**This type is not supported to read online, please download it**'
    }
  },
  destroyed () {
    this.msg = ''
    this.pdfPages = []
    this.fileType = 'md'
  },
  methods: {
    readArticle (path, fileType) {
      switch (fileType) {
        case 'md':
          this.readMarkdown(path)
          break
        case 'pdf':
          this.readPdf(path)
          break
        default:
          this.msg = 'Nothing'
          break
      }
    },
    readMarkdown (path) {
      let $this = this
      this.$http.get(readArticleUrl, {params: {path}})
        .then(response => {
          $this.fileContent = $this.$marked(response.data) // markdown files
        })
        .catch(err => {
          console.error(err)
        })
    },
    readPdf (path) {
      this.$http.get(readPdfUrl, {params: {path}})
        .then(response => {
          this.pdfPages.push(response.data)
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

