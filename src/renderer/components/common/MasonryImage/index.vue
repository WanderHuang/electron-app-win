<template>
  <section class="masonry-image">
    <div v-for="img in images" :style="imageBoxStyle(img)" class="img-wrapper" @mouseover="showImageInfo(img)" @mouseout="hiddenImageInfo(img)">
      <div :style="imageInnerBoxStyle(img)" class="img-wrapper-flex-box">
        <img class="image" :src="img.url"/>
        <div class="info" :style="{opacity: infoStyles[img.url]}">
          <div class="avatar-wrapper">
            <img class="avatar" :src="img.avatar" alt="NONE">
            <div class="name">{{img.username}}</div>
          </div>
          <div class="tools">
            <el-button icon="el-icon-star-off" circle></el-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script src="./index.js"></script>
<style lang="less">
@import 'index.less';
</style>
