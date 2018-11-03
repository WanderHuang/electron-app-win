<template>
  <div class="logout">
    <img :src="userInfo.avatar" alt="">
    <div>{{userInfo.username}}</div>
    <el-button @click="logout" class="button">退出登录</el-button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'log-out',
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  methods: {
    logout () {
      this.$store.commit('setToken', '')
      this.$store.commit('SET_USER_INFO', '')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less">
.logout {
  width: 400px;
  height: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    margin: 20px 0;
  }
  .button {
    height: 30px;
    line-height: 0px;
    width: 116px;
    border-radius: 20px;
    margin: 20px 0;
  }
}
</style>
