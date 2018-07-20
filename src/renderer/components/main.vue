<template>
  <div>
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">家用社交网络</span>
          </div>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>
        </div>
        <div class="md-toolbar-row">
          <md-tabs class="md-primary" md-sync-route @md-changed="tabChange($event)">
            <md-tab id="tab-home" md-label="主页" to="/home"></md-tab>
            <md-tab id="tab-news" md-label="新闻" to="/news"></md-tab>
            <md-tab id="tab-video" md-label="视频" to="/video"></md-tab>
            <md-tab id="tab-photo" md-label="相册" to="/photo" ></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">个人设置</md-toolbar>
        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>
          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>
          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>
          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'elife',
    data: () => ({
      menuVisible: false,
      id: ''
    }),
    created () {
      this.$router.push('/home')
    },
    methods: {
      tabChange (id) {
        this.id = id
      }
    }
  }
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
