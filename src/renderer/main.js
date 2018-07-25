import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// vendors
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-dark.css' // must default css
// import '&/static/style/custom-material.css'
import marked from 'marked'

Vue.use(VueMaterial)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

// extensions
Vue.prototype.$marked = marked
Vue.http = Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
