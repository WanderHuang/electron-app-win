<template>
  <el-container>
    <el-aside class="ehome-personal-page">
      <el-menu class="personal-menu" :default-active="index" @select="menuChange">
        <el-menu-item index="norm">
          <i class="el-icon-setting"></i>
        </el-menu-item>
        <el-menu-item index="service">
          <i class="el-icon-service"></i>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <norm-setting v-if="index === 'norm'" :baseInfo="info"></norm-setting>
    </el-main>
  </el-container>
</template>
<script>
import NormSetting from '@/components/personal/NormSetting'
export default {
  name: 'personal',
  components: { NormSetting },
  data () {
    return {
      index: 'service',
      info: {
        name: 'wander'
      }
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
  width: 100px !important;
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
