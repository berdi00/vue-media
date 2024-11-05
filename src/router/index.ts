import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MovieView from '@/views/MovieView.vue'
import MoviesByCategory from '@/views/MoviesByCategory.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: MovieView,
    },
    {
      path: '/movies/category/:id',
      name: 'movie-category',
      component: MoviesByCategory,
    },
  ],
})

export default router
