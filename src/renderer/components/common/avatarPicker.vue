<template>
  <el-dialog :visible.sync="visible" title="头像选择">
    <div class="avatar-wrapper">
      <img v-for="url in urls" :src="sysConfig.host + url" width="64" height="64" @click="chooseAvatar(sysConfig.host + url)"/>
    </div>
  </el-dialog>
</template>
<script>
import config from '&/static/config'
import { getAvatarsUrl } from '@/api/index'
export default {
  name: 'avatarPicker',
  props: {
    visible: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    visible (val) {
      if (val && !this.urls.length) {
        this.$http.get(getAvatarsUrl).then(res => {
          this.urls = res.data
        })
      }
    }
  },
  data () {
    return {
      sysConfig: config,
      urls: []
    }
  },
  methods: {
    chooseAvatar (url) {
      this.$emit('avatarChosen', url)
    }
  }
}
</script>
<style lang="less">
.avatar-wrapper {
  height: 300px;
  overflow: scroll;
}
</style>
