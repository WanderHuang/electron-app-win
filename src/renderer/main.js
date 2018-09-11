import Vue from 'vue'
import axios from 'axios'

import App from './App'
import {router} from './router'
import store from './store'

// vendors
// import VueMaterial from 'vue-material'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '&/static/style/iconfont/iconfont.css'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/black-green-dark.css' // must default css
// import '&/static/style/custom-material.css'
import marked from 'marked'

import pdf from 'pdfjs-dist'

// local lib
import '&/src/renderer/js-lib/common'
import * as http from '&/src/renderer/js-lib/http'

// Vue.use(VueMaterial)
Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

// extensions
Vue.prototype.$marked = marked
Vue.http = Vue.prototype.$http = axios
Vue.$h = Vue.prototype.$h = http
Vue.prototype.$pdf = pdf

router.beforeEach((to, from, next) => {
  console.log(`FROM ${from.path} TO ${to.path}`)
  let login = '/login'
  if (from.path !== login && to.path === login) {
    next()
  } else if (store.state.token) {
    next()
  } else {
    next({
      path: '/login',
      query: {redirectTo: to.fullPath}
    })
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
