<template>
  <div class="ehome-talk-page">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="primary" circle icon="ehome icon-CombinedShape2" @click="generateNews"></el-button>
    <ul class="talk-plane">
      <li v-for="news in newsArray" class="talk-item">
        <span :class="{'talk-left': news.type === 'server', 'talk-right': news.type === 'client'}">{{news.msg}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ehome-talk',
  data: () => {
    return {
      input: '',
      newsArray: []
    }
  },
  created () {
    this.$socket.on('msg', res => {
      this.newsArray.push({
        type: 'server',
        msg: res
      })
    })
  },
  methods: {
    generateNews () {
      if (this.input && this.input.length > 0) {
        this.$socket.emit('msg', this.input)
        this.newsArray.push({
          type: 'client',
          msg: this.input
        })
      } else {
        this.$message({
          message: '请先录入您的消息',
          type: 'warning',
          duration: 2000
        })
      }
    }
  }
}
</script>
<style>
.ehome-news-page {
  height: 100%;
}
.talk-plane {
  margin: 10px 20px;
}
.talk-item {
  width: 100%;
  height: 30px;
  list-style-type: none;
  position: relative;
  display: block;
  border-bottom: 1px solid gray;
}
.talk-left {
  display: inline-block;
  background: #fefefe;
  position: absolute;
  left: 0;
  border: 1px solid black;
}
.talk-right {
  display: inline-block;
  background: lightblue;
  position: absolute;
  right: 0;
  border: 1px solid blue;
}
</style>

