<template>
  <div>
    <md-app md-waterfall md-mode="fixed">
      <md-app-drawer md-permanent="card" class="main-menu">
        <md-toolbar class="md-transparent" md-elevation="0">家庭社交网络</md-toolbar>
        <md-list>
          <md-list-item v-for="menu in menus" :to="menu.path">
            <md-icon>{{menu.icon}}</md-icon>
            <span class="md-list-item-text">{{menu.text}}</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content class="main-content">
        <router-view></router-view>
      </md-app-content>
    </md-app>
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
.main-menu {
  width: 150px;
}
.main-content {
  height: 600px;
}
</style>
