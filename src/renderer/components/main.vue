<template>
  <el-container class="ehome-main">
    <el-aside width="200px" class="ehome-aside">
      <el-menu router class="ehome-menu">
        <el-menu-item :index="menu.path" v-for="(menu, index) in menus">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.text}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import menus from '&/static/data/main.menu.json' // 菜单栏
export default {
  name: 'elife',
  data: () => ({
    menus: menus
  }),
  created () {
    this.$router.push('/home')
  }
}
</script>

<style lang="less" scoped>
.ehome-main {
  height: 100%;
}
</style>
