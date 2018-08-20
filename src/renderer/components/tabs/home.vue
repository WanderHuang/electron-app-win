<template>
  <div class="elife-home-page">
    <div class="home-toolbar">
      <md-button class="md-icon-button md-raised" @click="refresh">
        <md-icon>cached</md-icon>
      </md-button>
      <md-button class="md-icon-button md-raised" @click="readFile">
        <md-icon>remove_red_eye</md-icon>
      </md-button>
      <md-button class="md-icon-button md-raised" @click="downloadFile">
        <md-icon>save_alt</md-icon>
      </md-button>
      <md-button class="md-icon-button md-raised" @click="deleteFile">
        <md-icon>delete</md-icon>
      </md-button>
      <md-button class="md-icon-button md-raised" @click="goBack">
        <md-icon>keyboard_arrow_left</md-icon>
      </md-button>
    </div>
    <div class="home-page-list">
      <div v-for="file in files" :key="file.path" :class="{'list-item': true, 'list-item-checked': file._index === selected._index}" @click="fileChoose(file)" @dblclick="fileChoose(file, true)">
        <md-icon class="md-size-4x md-primary" v-if="file.type === 'dir'">folder</md-icon>
        <md-icon class="md-size-4x md-primary" v-else>event_note</md-icon>
        <span class="list-item-text" :title="file.name">{{file.name.length > 8 ? file.name.substring(0, 5) + '...': file.name}}</span>
      </div>
      <div ref="uploadEl" :class="uploadEventStatus === 'off' ? 'list-item file-add-box': 'list-item file-add-box file-hover'">
        <md-icon class="md-size-4x md-primary">note_add</md-icon>
        <span class="list-item-text">新增</span>
      </div>
    </div>
  </div>
</template>
<script>
import {getDirTreeUrl, uploadUrl, downloadUrl, deleteUrl} from '@/api/index'
export default {
  name: 'elife-home',
  data: () => {
    return {
      uploadEventStatus: 'off',
      pipe: [],
      uploadEl: {},
      selected: {},
      filePath: ''
    }
  },
  computed: {
    files () {
      if (this.pipe.length === 0) return []
      else {
        let children = this.pipe[this.pipe.length - 1].children
        return children.map((item, index) => {
          item._index = index
          return item
        })
      }
    },
    current () {
      return this.pipe[this.pipe.length - 1].path
    }
  },
  mounted () {
    this.uploadEl = this.$refs.uploadEl
    this.loadDirTrees()
    this.uploadEventRegist()
  },
  methods: {
    loadDirTrees (current) { // load trees
      let $this = this
      $this.clearDirTree()
      $this.$http.get(getDirTreeUrl)
        .then(res => {
          let item = {
            path: '/',
            name: '/',
            type: 'root',
            children: res.data
          }
          this.pipe.push(item)
          current && this.loadCurrentPage(current)
        })
    },
    uploadEventRegist () { // file upload
      this.uploadEl.ondragover = () => {
        this.uploadEventStatus = 'on'
        return false
      }
      this.uploadEl.ondragleave = () => {
        this.uploadEventStatus = 'off'
        return false
      }
      this.uploadEl.ondrop = (event) => { // drop files
        event.preventDefault()
        event.stopPropagation()
        this.uploadEventStatus = 'off'

        let files = event.dataTransfer.files
        let formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          formData.append(files[i].name, files[i])
        }
        formData.append('current', this.current)

        this.$http.post(uploadUrl, formData) // upload
          .then(res => {
            this.loadDirTrees(this.current) // reload trees
          })
      }
    },
    fileChoose (file, isDbl) { // item clicked
      if (file.type === 'dir') {
        this.pipe.push(file) // next
      } else {
        this.selected = file
        isDbl && this.readFile()
      }
    },
    loadCurrentPage (current) { // recovery
      for (let i = 0; i < this.files.length; i++) {
        let path = this.files[i].path
        if (current.startsWith(path)) {
          this.pipe.push(this.files[i])
          this.loadCurrentPage(current)
          break
        }
      }
    },
    clearDirTree () {
      this.pipe = []
      this.selected = {}
    },
    goBack (e) {
      if (this.pipe.length > 1) {
        this.pipe.pop()
      }
    },
    downloadFile () {
      this.download(this.selected)
    },
    readFile () { // 跳转到浏览文件
      console.log(`You will read "${this.selected.path}"`)
      this.$router.push({name: 'readFile', params: {path: this.selected.path, type: this.selected.type}})
    },
    refresh () { // 刷新页面
      this.loadDirTrees()
    },
    deleteFile () {
      this.delete(this.selected)
    },
    download (file) { // TODO 文件下载
      let formData = new FormData()
      formData.append('path', file.path)
      this.$http.post(downloadUrl, formData, {
        responseType: 'blob'
      })
        .then((res) => {
          // 利用返回的blob对象进行下载
          let url = window.URL.createObjectURL(res.data)
          let link = document.createElement('a')
          link.href = url
          link.download = file.name
          link.style.display = 'none'
          document.body.appendChild(link)
          link.click()
          this.loadDirTrees(this.current)
        })
    },
    delete (file) {
      let formData = new FormData()
      formData.append('path', file.path)
      this.$http.post(deleteUrl, formData)
        .then(res => {
          if (res.data.code === 0) {
            this.loadDirTrees(this.current)
          }
        })
    }
  }
}
</script>
<style scoped>
.elife-home-page {
  height: 100%;
}
.home-toolbar{
  display: flex;
  flex-direction: row-reverse;
}
.home-page-list {
  display: flex;
  flex-wrap: wrap;
}
.list-item {
  width: 120px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list-item:hover {
  cursor: pointer;
  background-color: rgba(150, 202, 247, 0.5)
}
.list-item-checked {
  background-color: rgba(150, 202, 247, 0.5)
}
.list-item-checked {
  background-color: rgba(150, 202, 247, 0.5)
}
.list-item .list-item-text {
  align-content: center;
}
.file-hover {
  border: 10px dashed #0c0;
}
</style>
