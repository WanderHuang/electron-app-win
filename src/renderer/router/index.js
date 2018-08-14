import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/components/main').default,
      children: [
        {
          path: '/home',
          name: 'main',
          component: require('@/components/tabs/home').default
        },
        {
          path: '/news',
          name: 'news',
          component: require('@/components/tabs/news').default
        },
        {
          path: 'readArticle',
          name: 'readFile',
          component: require('@/pages/read').default
        },
        {
          path: '/video',
          name: 'video',
          component: require('@/components/tabs/video').default
        },
        {
          path: '/photo',
          name: 'photo',
          component: require('@/components/tabs/photo').default
        },
        {
          path: '/talk',
          name: 'talk',
          component: require('@/components/tabs/talk').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
