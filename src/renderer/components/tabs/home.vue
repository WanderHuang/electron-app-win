<template>
  <div class="elife-home-page">
    <div class="home-page-list">
      <div v-for="x in 100" class="list-item" @click="folderClicked(x)">
        <md-icon class="md-size-4x list-item-icon">folder</md-icon>
        <span class="list-item-text">{{msg}}.{{x}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'elife-home',
  data: () => {
    return {
      msg: 'file'
    }
  },
  methods: {
    folderClicked (index) {
      this.msg = index
    }
  }
}
</script>
<style scoped>
.elife-home-page {
  margin-top: 50px;
  height: 500px;
}
.home-page-list {
  display: flex;
  flex-wrap: wrap;
}
.list-item {
  width: 120px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list-item:hover {
  cursor: pointer;
  background-color: rgba(123, 123, 123, 0.5)
}
.list-item .list-item-icon {
  color:rgba(249, 236, 137, 0.9);
}
.list-item .list-item-text {
  align-content: center;
}
</style>
