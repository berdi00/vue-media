<script setup lang="ts">
import { useMovieStore } from '@/store/movie'
import type { TLang } from '@/types/common'
import { watch } from 'vue'
import MovieItem from '@/components/movie/MovieItem.vue'
import { useRoute } from 'vue-router'
import AppLoading from '@/components/app/AppLoading.vue'
const route = useRoute()
const store = useMovieStore()
const data = {
  id: 1,
  title: {
    tk: 'Gözleg sözüňiz',
    ru: 'Результаты поиска',
  } as TLang,
}

watch(
  () => route.params.search,
  newVal => {
    store.movieNotFound = false
    store.getMoviesBySearch(newVal as string)
  },
  { immediate: true },
)
</script>
<template>
  <AppLoading v-if="store.loadingSearched"></AppLoading>
  <div v-if="store.moviesBySearch.length > 0" class="container">
    <h1>
      {{ data.title[$i18n.locale as keyof TLang] }} "{{ $route.params.search }}"
    </h1>
    <div class="movies_by_search">
      <MovieItem
        v-for="movie in store.moviesBySearch"
        :key="movie.id"
        :movie="movie"
        class="movie-item"
      />
    </div>
  </div>
  <div v-if="store.movieNotFound">
    <h1 class="not_found">{{ $t('movie_not_found') }}</h1>
  </div>
</template>

<style scoped>
.container {
  width: 90%;
  margin-inline: auto;
  overflow-x: scroll;
}
.movies_by_search {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
}

h1 {
  color: var(--slate-300);
  padding-block: 1rem;
  font-size: 1.2rem;
}
.not_found {
  text-align: center;
}

@media screen and (min-width: 1120px) and (max-width: 1680px) {
  h1 {
    font-size: 2rem;
  }
}

@media screen and (min-width: 1681px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
