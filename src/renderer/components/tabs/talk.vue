<template>
  <div class="elife-talk-page">
    <md-button class="md-icon-button md-accent" @click="generateNews">
      <md-icon>add</md-icon>
    </md-button>
    <ul>
      <li v-for="news in newsArray">{{news}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'elife-talk',
  data: () => {
    return {
      newsArray: []
    }
  },
  created () {
    this.$socket.on('msg', res => {
      this.newsArray.push(res)
    })
  },
  methods: {
    generateNews () {
      this.$socket.emit('msg', Math.random().toString(23))
    }
  }
}
</script>
<style>
.elife-news-page {
  height: 100%;
}
</style>

