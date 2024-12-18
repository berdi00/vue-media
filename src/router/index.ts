import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import Movie from '@/views/movie/MovieView.vue'
import Book from '@/views/book/BookView.vue'
import Login from '@/views/login/LoginView.vue'
import MoviesByCategory from '@/views/movie/MoviesByCategory.vue'
import SearchView from '@/views/search/SearchView.vue'
import SearchM from '@/views/search/SearchMovie.vue'
import Music from '@/views/music/MusicView.vue'
import MusicItemView from '@/views/music/MusicItemView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: HomeView,
    },
    {
      path: '/music',
      name: 'music',
      component: Music,
      children: [
        {
          path: ':id',
          name: 'music-id',
          component: MusicItemView,
        },
      ],
    },
    {
      path: '/books',
      name: 'books',
      component: Book,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: Movie,
    },
    {
      path: '/movies/category/:id',
      name: 'movie-category',
      component: MoviesByCategory,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      children: [
        {
          path: 'movies/:search',
          name: 'search-movie',
          component: SearchM,
        },
      ],
    },
  ],
})

router.beforeEach(async to => {
  if (
    // make sure the user is authenticated
    !localStorage.getItem('token') &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
