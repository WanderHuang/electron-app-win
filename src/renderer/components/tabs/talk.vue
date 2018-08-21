<template>
  <div class="ehome-talk-page" @keyup.enter="sendMessage">
    <el-form ref="talk" :model="valideForm" :rules="rules" label-width="80px">
      <el-row>
        <el-form-item label="群内名称" prop="name">
          <el-input v-model="valideForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
      </el-row>
      <div class="talk-plane">
        <ul class="talk-item-list">
          <li v-for="msg in messages" class="talk-item">
            <span v-if="msg.type === 'server'" class="talk-other-name" :title="msg.name">{{msg.name}}</span>
            <span :class="{'talk-left': msg.type === 'server', 'talk-right': msg.type === 'client'}">{{msg.content}}</span>
            <span v-if="msg.type === 'client'" class="talk-self-name" :title="msg.name">{{msg.name}}</span>
          </li>
        </ul>
      </div>
      <el-row :gutter="2">
        <el-col :span="18">
          <el-form-item label="" prop="content">
            <el-input v-model="valideForm.content" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" circle icon="ehome icon-CombinedShape2" @click="sendMessage"></el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import config from '&/static/config'
import io from 'socket.io-client'
export default {
  name: 'ehome-talk',
  data: () => {
    return {
      socket: {},
      valideForm: {
        name: null,
        content: null
      },
      rules: {
        name: [
          { required: true, message: '请输入群聊名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '消息不能为空', trigger: 'blur' },
          { min: 2, message: '最少输入两个字符', trigger: 'blur' }
        ]
      },
      messages: [],
      cache: []
    }
  },
  created () {
    this.initSocket()
  },
  beforeDestroy () {
    this.socket.emit('destroy', this.socket.id)
    this.socket.close()
  },
  methods: {
    initSocket () { // socket初始化
      this.socket = io(config.socketUrl)
      this.socket.on('connect', () => {
        console.log(`connected to backend`)
        this.$store.commit('SET_MY_ID', this.socket.id)
      })
      this.socket.on('msg', res => { // 拿到消息
        console.log(res)
        if (res.id !== this.socket.id) {
          if (this.messages.length === 20) {
            this.cache.push(JSON.stringify(this.messages))
            this.messages = []
          }
          this.messages.push({
            type: 'server',
            name: res.name,
            content: res.content
          })
        }
      })
    },
    sendMessage () { // 发送消息
      this.$refs.talk.validate(res => {
        if (res) {
          this.socket.emit('msg', this.socket.id, this.valideForm)
          this.messages.push({
            type: 'client',
            name: this.valideForm.name,
            content: this.valideForm.content
          })
          this.valideForm.content = null
        }
      })
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
  background: gray;
  height: 400px;
  overflow-y: scroll;
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
  left: 86px;
  border: 1px solid black;
}
.talk-right {
  display: inline-block;
  background: lightblue;
  position: absolute;
  right: 86px;
  border: 1px solid blue;
}
.talk-other-name {
  background: lightblue;
  display: inline-block;
  border-radius: 4px;
  position: absolute;
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  left: 0;
  cursor: pointer;
}
.talk-self-name {
  background: lightseagreen;
  display: inline-block;
  border-radius: 4px;
  position: absolute;
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  right: 0;
  cursor: pointer;
}
</style>

