<template>
  <div class="elife-news-page markdown-body">
    <div v-html="msg"></div>
  </div>
</template>
<script>
  export default {
    name: 'elife-news',
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
.elife-news-page {
  height: 100%;
}
</style>

