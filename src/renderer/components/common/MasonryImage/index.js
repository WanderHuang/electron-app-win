export default {
  name: 'masonryLayout',
  data () {
    return {
      infoStyles: {}
    }
  },
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    images (vals) {
      vals && vals.map(item => {
        this.infoStyles[item.url] = 0
      })
    }
  },
  methods: {
    imageBoxStyle (img) {
      return {'width': img.width * 200 / img.height + 'px', 'flex-grow': img.width * 200 / img.height}
    },
    imageInnerBoxStyle (img) {
      return {'padding-bottom': img.height / img.width / 100 + '%'}
    },
    showImageInfo (img) {
      this.infoStyles[img.url] = 1
      this.$forceUpdate()
    },
    hiddenImageInfo (img) {
      this.infoStyles[img.url] = 0
      this.$forceUpdate()
    }
  }
}