import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// config
import config from '&/static/config'

// vendors
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-dark.css' // must default css
// import '&/static/style/custom-material.css'
import marked from 'marked'
import io from 'socket.io-client'
import pdf from 'pdfjs-dist'

// local lib
import '&/src/renderer/js-lib/common'

Vue.use(VueMaterial)
Vue.prototype.$socket = io(config.socketUrl)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

// extensions
Vue.prototype.$marked = marked
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$pdf = pdf

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
