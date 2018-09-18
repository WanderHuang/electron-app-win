<template>
  <div class="ehome-home-page">
    <div class="home-toolbar">
      <el-button type="primary" circle icon="ehome icon-left" @click="goBack"></el-button>
      <el-button type="primary" circle icon="ehome icon-delete" @click="deleteFile"></el-button>
      <el-button type="primary" circle icon="ehome icon-download" @click="downloadFile"></el-button>
      <el-button type="primary" circle icon="ehome icon-read" @click="readFile"></el-button>
      <el-button type="primary" circle icon="ehome icon-Shape2" @click="refresh"></el-button>
    </div>
    <div class="home-page-list">
      <div v-for="file in files" :key="file.path" :class="{'list-item': true, 'list-item-checked': file._index === selected._index}" @click="fileChoose(file)" @dblclick="fileChoose(file, true)">
        <i class="ehome icon-foldericon list-item-icon" v-if="file.type === 'dir'"></i>
        <i class="ehome icon-file list-item-icon" v-else></i>
        <span class="list-item-text" :title="file.name">{{file.name.length > 8 ? file.name.substring(0, 5) + '...': file.name}}</span>
      </div>
      <div ref="uploadEl" :class="{'list-item file-add-box': true, 'file-hover': uploadEventStatus !== 'off'}" @click="visible = true">
        <i class="ehome icon-add list-item-icon"></i>
        <span class="list-item-text-add">新增</span>
      </div>
    </div>
    <el-dialog :visible.sync="visible" title="请输入新文件名称" :close-on-click-modal="false" :show-close="false">
      <el-form :model="formObj" :rules="formRules">
        <el-form-item prop="newDirName">
          <el-input v-model="formObj.newDirName"/>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" round @click="addNewDir">确定</el-button>
        <el-button round @click="visible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getDirTreeUrl, uploadUrl, downloadUrl, deleteUrl, addNewDirUrl} from '@/api/index'
import mediaType from '&/static/data/home.media-type'
export default {
  name: 'ehome-home',
  data: () => {
    return {
      uploadEventStatus: 'off',
      pipe: [],
      uploadEl: {},
      selected: {},
      filePath: '',
      visible: false, // 是否弹窗
      formObj: {
        newDirName: null
      },
      formRules: {
        newDirName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: this.dirNameCheck, trigger: 'blur' }
        ]
      }
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
      let route = {
        name: 'read',
        params: {
          mediaType: mediaType[this.selected.type],
          path: this.selected.path,
          type: this.selected.type
        }
      }
      this.$router.push(route)
    },
    refresh () { // 刷新页面
      this.loadDirTrees()
    },
    deleteFile () {
      this.delete(this.selected)
    },
    download (file) {
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
    },
    addNewDir () {
      this.$http.post(addNewDirUrl, {current: this.current, name: this.formObj.newDirName}).then(res => {
        if (res.data) {
          this.formObj.newDirName = null
          this.visible = false
          this.loadDirTrees(this.current)
        } else {
          console.log('名称重复了')
        }
      })
    },
    dirNameCheck (rule, value, callback) {
      let reg = /^[0-9a-zA-Z_]*$/
      if (!reg.test(value)) {
        callback(new Error('只能是数字、字母、下划线'))
      } else {
        callback()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ehome-home-page {
  height: 100%;
  .home-toolbar{
    display: flex;
    justify-content: flex-end;
  }
  .home-page-list {
    display: flex;
    flex-wrap: wrap;
    .list-item {
      display: flex;
      padding: 5px 10px;
      margin: 2px 5px;
      flex-direction: column;
      align-items: center;
      .list-item-icon {
        font-size: 60px;
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
      .list-item-text-add {
        display: inline-block;
        text-align: justify;
        width: 60px;
      }
      .list-item-text-add::after {
        content: "";
        display: inline-block;
        width: 100%;
      }
    }
    .list-item:hover {
      cursor: pointer;
      border-radius: 5px;
      background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
    }
    .file-hover {
      border: 10px dashed #0c0;
    }
  }
}
</style>
