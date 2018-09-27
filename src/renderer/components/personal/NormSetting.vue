<template>
  <div class="ehome-norm-setting">
    <el-form label-width="80px" :model="info" class="setting-form">
      <el-form-item label="用户昵称">
        <el-input disabled v-model="info.username"></el-input>
      </el-form-item>
      <el-form-item label="用户头像" class="setting-avatar">
        <img :src="info.avatar"/>
        <el-button type="primary" round @click="openAvatarList" class="button-select">选择</el-button>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="info.address"></el-input>
      </el-form-item>
    </el-form>
    <div class="button-wrapper">
      <el-button type="primary" round @click="saveUserInfo">保存</el-button>
    </div>
    <el-dialog :visible.sync="showAvatars" title="头像选择">
      <div class="avatar-wrapper">
        <img v-for="url in urls" :src="sysConfig.host + url" width="64" height="64" @click="chooseAvatar(url)"/>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import config from '&/static/config'
import {getAvatarsUrl, updateUserUrl} from '@/api/index'
export default {
  name: 'NormSetting',
  data () {
    return {
      info: {
        username: 'WANDER HUANG',
        avatar: '',
        address: ''
      },
      showAvatars: false,
      sysConfig: config,
      urls: []
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  mounted () {
    this.info = JSON.parse(JSON.stringify(this.userInfo))
  },
  methods: {
    loadAvatars () {
      this.$http.get(getAvatarsUrl).then(res => {
        this.urls = res.data
      })
    },
    openAvatarList () { // 打开头像列表
      this.showAvatars = true
      this.loadAvatars()
    },
    chooseAvatar (url) { // 选中某头像
      this.info.avatar = this.sysConfig.host + url
      this.showAvatars = false
    },
    saveUserInfo () { // 提交用户信息到vuex
      this.$h.post(updateUserUrl, this.info, {
        success: (res) => {
          if (res.code === 0) {
            this.$store.commit('SET_USER_INFO', this.info)
          }
        },
        fail: (err) => {
          console.log(err)
        }
      })
    }
  }
}
</script>
<style lang="less">
.ehome-norm-setting {
  width: 100%;
  height: 100%;
  .setting-form {
    .setting-avatar {
      .el-form-item__content{
        display: flex;
        height: 40px;
        justify-content: space-around;
      }
    }
  }
  .button-wrapper {
    display: flex;
    justify-content: flex-end
  }
  .avatar-wrapper {
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    img {
      cursor: pointer;
      margin: 5px;
    }
  }
}
</style>
