import { createRouter, createWebHistory } from 'vue-router'
import WatchlistView from '../views/WatchlistView.vue'
import MyShowsView from '../views/MyShowsView.vue'
import DiscoverView from '../views/DiscoverView.vue'
import StatisticsView from '../views/StatisticsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WatchlistView
    },
    {
      path: '/my_shows',
      name: 'my_shows',
      component: MyShowsView
    },
    {
      path: '/discover',
      name: 'discover',
      component: DiscoverView
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView
    }
    /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
  ]
})

export default router
