import Vue from 'vue'
import Router from 'vue-router'
import mainPage from '@/pages/mainPage'
import newRecipe from "@/pages/newRecipe";
import viewRecipe from "@/pages/viewRecipe";
import notFound from "@/pages/notFound";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: mainPage
    },
    {
      path: '/new',
      name: 'New',
      component: newRecipe,
      props: false
    },
    {
      path: '/view/:id',
      name: 'View',
      component: viewRecipe,
      props: true
    },
    {
      path: '/notFound',
      name: 'Not found',
      component: notFound,
      props: false
    },
    {
      path: '*',
      name: 'Not found',
      component: notFound,
      props: false
    }

  ]
})
