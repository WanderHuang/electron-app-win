<template>
  <div class="elife-home-page">
    <div class="home-toolbar">
      <md-button class="md-icon-button md-raised">
        <md-icon>keyboard_arrow_right</md-icon>
      </md-button>
      <md-button class="md-icon-button md-raised" @click="goBack">
        <md-icon>keyboard_arrow_left</md-icon>
      </md-button>
    </div>
    <div class="home-page-list">
      <div v-for="file in files" :key="file.path" class="list-item" @click="folderClicked(file)">
        <md-icon class="md-size-4x md-primary" v-if="file.type === 'dir'">folder</md-icon>
        <md-icon class="md-size-4x md-primary" v-else>event_note</md-icon>
        <span class="list-item-text">{{file.name}}</span>
      </div>
      <div ref="uploadEl" :class="uploadEventStatus === 'off' ? 'list-item file-add-box': 'list-item file-add-box file-hover'">
        <md-icon class="md-size-4x md-primary">note_add</md-icon>
        <span class="list-item-text">新增</span>
      </div>
    </div>
  </div>
</template>
<script>
import _config from '&/static/config.json'
export default {
  name: 'elife-home',
  data: () => {
    return {
      uploadEventStatus: 'off',
      pipe: [],
      uploadEl: {}
    }
  },
  computed: {
    files () {
      if (this.pipe.length === 0) return []
      else return this.pipe[this.pipe.length - 1].children
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
      $this.$http.get(_config.host + 'getDirTree')
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

        this.$http.post(_config.host + 'upload', formData) // upload
          .then(res => {
            this.loadDirTrees(this.current) // reload trees
          })
      }
    },
    folderClicked (file) { // item clicked
      if (file.type === 'dir') {
        this.pipe.push(file) // next
      } else {
        this.download(file) // download or redirect
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
    },
    goBack (e) {
      if (this.pipe.length > 1) {
        this.pipe.pop()
      }
    },
    download (file) { // TODO 文件下载
      console.log(file.path)
      this.$http.post(_config.host + 'docs/get', {
        path: file.path,
        name: file.name
      }, {
        responseType: 'blob'
      })
        .then(res => {
          debugger
          let url = window.URL.createObjectURL(new Blob(res.data))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          document.body.appendChild(link)
          link.click()
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
.list-item .list-item-text {
  align-content: center;
}
.file-hover {
  border: 10px dashed #0c0;
}
</style>
