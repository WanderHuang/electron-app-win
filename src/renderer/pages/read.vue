<template>
  <div class="ehome-read-page">
    <div class="read-toolbar">
      <el-button type="primary" circle icon="ehome icon-left" @click="goBack"></el-button>
    </div>
    <read-picture v-if="plugin === 'picture'" :path="baseInfo.path"></read-picture>
    <read-words v-else-if="plugin === 'word'" :file-type="baseInfo.type" :file-path="baseInfo.path"></read-words>
  </div>
</template>
<script>
import readPicture from '@/components/common/readPicture'
import readWords from '@/components/common/readWords'
export default {
  name: 'elife-news',
  components: {
    readPicture,
    readWords
  },
  data: () => {
    return {
      baseInfo: {},
      plugin: ''
    }
  },
  created () {
    this.plugin = this.$route.path.replace(/^\/read\//, '')
    this.baseInfo = this.$route.params
  },
  methods: {
    goBack () {
      this.$router.go(-1) // 后退一页
    }
  }
}
</script>
<style>
.ehome-read-page {
  height: 100%;
}
.read-toolbar {
  display: flex;
  flex-direction: row-reverse;
}
</style>

