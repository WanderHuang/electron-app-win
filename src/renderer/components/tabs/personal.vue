<template>
  <el-container>
    <el-aside class="ehome-personal-page">
      <el-menu class="personal-menu" :default-active="index" @select="menuChange">
        <el-menu-item index="NormSetting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
        <el-menu-item index="LogOut">
          <i class="el-icon-remove"></i>
          <span slot="title">退出登录</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <keep-alive>
        <component :is="index"></component>
      </keep-alive>
    </el-main>
  </el-container>
</template>
<script>
import NormSetting from '@/components/personal/NormSetting'
import LogOut from '@/components/personal/LogOut'
export default {
  name: 'personal',
  components: { NormSetting, LogOut },
  data () {
    return {
      index: 'NormSetting'
    }
  },
  methods: {
    menuChange (index, indexPath) {
      this.index = index
    }
  }
}
</script>
<style lang="less" scoped>
.ehome-personal-page {
  width: 160px !important;
  height: 400px;
  .personal-menu {
    background: transparent;
    border: transparent;
    .is-active, .el-menu-item:hover {
      background: rgb(79, 187, 235);
    }
    .el-menu-item, .ehome {
      font-size: 18px;
      color: aliceblue;
    }
  }
}
</style>
