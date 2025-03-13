import { createRouter, createWebHistory } from 'vue-router'
import MyDayView from '../views/MyDayView.vue'
import CompletedView from '../views/CompletedView.vue'
import ImportantView from '../views/ImportantView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/my-day'
    },
    {
      path: '/my-day',
      name: 'MyDay',
      component: MyDayView
    },
    {
      path: '/completed',
      name: 'Completed',
      component: CompletedView
    },
    {
      path: '/important',
      name: 'Important',
      component: ImportantView
    }
  ]
})

export default router 