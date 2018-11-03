<template>
  <section class="masonry-image">
    <div v-for="img in images" :style="{'width': img.width * 200 / img.height + 'px', 'flex-grow': img.width * 200 / img.height}" class="img-wrapper">
      <div :style="{'padding-bottom': img.height / img.width / 100 + '%'}" class="img-wrapper-flex-box">
        <img :src="img.url"/>
      </div>
    </div>
  </section>
</template>
<script src="./index.js"></script>
<style lang="less">
@import 'index.less';
</style>

