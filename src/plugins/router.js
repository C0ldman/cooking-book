import Vue from 'vue'
import Router from 'vue-router'
import mainPage from '@/pages/mainPage'
import newReciept from "@/pages/newReciept";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: mainPage
    },
    {
      path: '/new',
      name: 'new',
      component: newReciept
    }
  ]
})
