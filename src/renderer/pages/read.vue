<template>
  <div class="elife-read-page markdown-body">
    <div class="read-toolbar">
      <md-button class="md-icon-button md-raised" @click="goBack">
        <md-icon>keyboard_arrow_left</md-icon>
      </md-button>
    </div>
    <div class="read-content">
      <div v-if="msg" v-html="msg"></div>
      <div v-if="fileType === 'md' || fileType === 'txt'" v-html="fileContent"></div>
      <div v-if="fileType === 'pdf'" id="pdf"></div>
    </div>
  </div>
</template>
<script>
import {readArticleUrl} from '@/api/index'
// TODO 支持MD PDF WORD EXCEL TXT等文本、支持图像、支持视频
// TODO 文件缩放比例查看
export default {
  name: 'elife-news',
  data: () => {
    return {
      typesArray: ['md', 'pdf', 'txt'], // 支持类型
      fileType: 'md',
      msg: null,
      fileContent: '',
      pdfs: []
    }
  },
  created () {
    console.log(`News created! ${this.$route.params.path}`)
    this.fileType = this.$route.params.type
    if (this.typesArray.includes(this.fileType)) {
      this.readArticle(this.$route.params.path, this.fileType)
    } else {
      this.msg = this.$marked('**This type is not supported to read online, please download it**')
    }
  },
  destroyed () {
    this.msg = ''
    this.pdfPages = []
    this.fileType = 'md'
  },
  methods: {
    readArticle (path, fileType) {
      if (fileType === 'pdf') {
        this.loadPdfFile(path)
      }
      if (fileType === 'md' || fileType === 'txt') {
        this.loadTextFile(path)
      }
    },
    loadTextFile (path) { // 加载文本格式文件 md txt
      this.$http.get(readArticleUrl + path.replace(/.*docs./, ''))
        .then(response => {
          this.fileContent = this.$marked(response.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    loadPdfFile (path) { // 加载pdf格式文件
      let loadingTask = this.$pdf.getDocument(readArticleUrl + path.replace(/.*docs./, ''))
      loadingTask.promise
        .then(pdfDocument => {
          let numPages = pdfDocument.numPages
          let promises = []
          for (let i = 1; i <= numPages; i++) {
            let promise = pdfDocument.getPage(i)
              .then(pdfPage => {
                let viewport = pdfPage.getViewport(1.0)
                let canvas = document.createElement('canvas')
                canvas.width = viewport.width
                canvas.height = viewport.height
                let ctx = canvas.getContext('2d')
                let renderTask = pdfPage.render({
                  canvasContext: ctx,
                  viewport: viewport
                })
                this.pdfs.push(canvas)
                return renderTask.promise
              })
            promises.push(promise)
          }
          Promise.all(promises)
            .then(res => {
              for (let i = 0; i < this.pdfs.length; i++) {
                document.getElementById('pdf').appendChild(this.pdfs[i])
              }
            })
        })
        .catch(function (reason) {
          console.error('Error: ' + reason)
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

