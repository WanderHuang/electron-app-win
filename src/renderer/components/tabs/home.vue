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
      <div class="list-item">
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
      allFiles: [],
      pipe: []
    }
  },
  computed: {
    files () {
      if (this.pipe.length === 0) return []
      else return this.pipe[this.pipe.length - 1].children
    }
  },
  mounted () {
    let $this = this
    this.$http
      .get(_config.host + 'getDirTree')
      .then(function (res) {
        $this.allFiles = res.data
        let item = {
          path: '/',
          name: '/',
          type: 'root',
          children: JSON.parse(JSON.stringify($this.allFiles))
        }
        $this.pipe.push(item)
      })
  },
  methods: {
    folderClicked (file) {
      if (file.type === 'dir') {
        this.pipe.push(file)
      } else {
        this.download(file)
      }
    },
    goBack (e) {
      if (this.pipe.length > 1) {
        this.pipe.pop()
      }
    },
    download (file) {
      let downNode = document.createElement('a')
      downNode.download = file.name
      downNode.href = _config.host + file.path
      downNode.click()
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
</style>
