<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu router>
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
    
  </div>
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

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
