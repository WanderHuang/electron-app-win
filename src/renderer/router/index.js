import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
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
          path: '/read/:mediaType',
          name: 'read',
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
        },
        {
          path: '/personal',
          name: 'personal',
          component: require('@/components/tabs/personal').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(`FROM ${from.path} TO ${to.path}`)
  next()
})
export {router}
