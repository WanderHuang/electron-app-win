<template>
  <div class="elife-home-page markdown-body">
    <div v-html="msg"></div>
  </div>
</template>
<script>
export default {
  name: 'elife-home',
  data: () => {
    return {
      msg: ''
    }
  },
  created () {
    let $this = this
    this.$http
      .get('http://localhost:3000/getArticleByName')
      .then(function (response) {
        $this.msg = $this.$marked(response.data)
      })
  }
}
</script>
<style>
.elife-home-page {
  margin-top: 50px;
  height: 500px;
}
</style>
