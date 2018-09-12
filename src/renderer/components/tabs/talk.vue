<template>
  <div class="ehome-talk-page" @keyup.enter="sendMessage">
    <el-form ref="talk" :model="valideForm" :rules="rules">
      <div class="talk-plane">
        <ul class="talk-item-list">
          <li v-for="msg in messages" class="talk-item">
            <div v-if="msg.type === 'client'" class="talk-self-name">
              <div class="self-words">{{msg.content}}</div>
              <img class="self-avatar" :src="userInfo.avatar" :title="msg.name"/>
            </div>
            <div v-else class="talk-other-name">
              <div class="other-words">{{msg.content}}</div>
              <img class="other-avatar" :src="userInfo.avatar" :title="msg.name"/>
            </div>
          </li>
        </ul>
      </div>
      <div class="talk-action">
        <el-form-item prop="content" class="content">
          <el-input v-model="valideForm.content" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-button type="primary" circle icon="ehome icon-CombinedShape2" @click="sendMessage"></el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import config from '&/static/config'
import io from 'socket.io-client'
import {mapGetters} from 'Vuex'
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
        content: [
          { required: true, message: '消息不能为空', trigger: 'blur' },
          { min: 2, message: '最少输入两个字符', trigger: 'blur' }
        ]
      },
      messages: [],
      cache: []
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  watch: {
    messages (val) {
      this.$nextTick(() => {
        let panel = document.querySelector('.talk-plane')
        panel.scrollTop = panel.scrollHeight
      })
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
      this.valideForm.name = this.userInfo.username
      this.socket.emit('msg', this.socket.id, this.valideForm)
      this.messages.push({
        type: 'client',
        name: this.valideForm.name,
        avatar: this.userInfo.avatar,
        content: this.valideForm.content
      })
      this.valideForm.content = null
    }
  }
}
</script>
<style lang="less">
.ehome-talk-page {
  padding: 10px 20px;
  .talk-plane {
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    height: 460px;
    overflow-y: scroll;
    .talk-item {
      width: 100%;
      list-style-type: none;
      margin: 5px 0;
      .talk-other-name {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: flex-end;
        padding-left: 10px;
        .other-words {
          max-width: 300px;
          min-width: 40px;
          min-height: 30px;
          line-height: 30px;
          border-radius: 5px;
          word-wrap: break-word;
          margin-left: 10px;
          padding: 2px;
          box-shadow: 0 0 3px 1px;
          background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
        }
        .other-avatar {
          border-radius: 50%;
        }

      }
      .talk-self-name {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
        .self-words {
          max-width: 300px;
          min-width: 40px;
          min-height: 30px;
          line-height: 30px;
          border-radius: 5px;
          word-wrap: break-word;
          margin-right: 10px;
          padding: 2px;
          box-shadow: 0 0 3px 1px;
          background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
        }
        .self-avatar{
          border-radius: 50%;
        }
      }
    }
  }
  .talk-action {
    margin: 10px 0;
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
    .content {
      width: 500px;
      margin-right: 40px;
      margin-bottom: 0;
    }
  }
}
</style>

