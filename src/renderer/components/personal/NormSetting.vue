<template>
  <div class="ehome-norm-setting">
    <el-form label-width="80px" :model="info">
      <el-form-item label="用户昵称">
        <el-input v-model="info.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <img width="64" height="64" :src="info.avatar"/>
        <el-button type="primary" round @click="openAvatarList">选择</el-button>
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
import config from '&/static/config'
import {getAvatarsUrl} from '@/api/index'
export default {
  name: 'NormSetting',
  props: {
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      info: {
        name: 'WANDER HUANG',
        avatar: '',
        address: ''
      },
      showAvatars: false,
      sysConfig: config,
      urls: []
    }
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
      this.$store.commit('SET_USER_INFO', this.info)
    }
  }
}
</script>
<style lang="less">
.ehome-norm-setting {
  width: 100%;
  height: 100%;
  .el-form-item__content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
