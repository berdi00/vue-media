<script setup lang="ts">
import AppLoading from '@/components/app/AppLoading.vue'
import Wrapper from '@/components/app/WrapperComponent.vue'
import MoviesBySubCatId from '@/components/movie/MovieFetcher.vue'
import VideoPlayer from '@/components/movie/VideoPlayer.vue'
import { getMovieById } from '@/services/movies'
import type { TLang } from '@/types/common'
import type { TMovie } from '@/types/movie'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const movie = ref<TMovie>()
const route = useRoute()
const loading = ref(false)
async function fetchMovieById() {
  loading.value = true
  try {
    const res = await getMovieById(route.params.id as string)
    movie.value = res.data
  } catch (err) {
    console.log(err)
    loading.value = false
  } finally {
    loading.value = false
  }
}

const data = {
  id: 1,
  title: {
    tk: 'Meňzeş kinolar',
    ru: 'Похожие фильмы',
  },
}

watch(
  () => route.params.id,
  newVal => {
    if (newVal) {
      fetchMovieById()
    }
  },
)
onMounted(() => {
  fetchMovieById()
})
</script>

<template>
  <AppLoading v-if="loading" />
  <Wrapper v-else>
    <div class="movie_view_container">
      <div class="movie_player">
        <VideoPlayer
          :path="movie?.path"
          v-if="$route.params.id"
          :id="$route.params.id as string"
        />
        <div class="movie_title_container">
          <h2>{{ movie?.title[$i18n.locale as keyof TLang] }}</h2>
          <span class="sub_cat_title"
            >|
            {{
              movie?.sub_categories[0].title[$i18n.locale as keyof TLang]
            }}</span
          >
          <span class="description">{{
            movie?.description[$i18n.locale as keyof TLang]
          }}</span>
        </div>
      </div>
      <MoviesBySubCatId
        v-if="movie?.sub_categories[0]"
        :id="movie?.sub_categories[0].id.toString()"
        :data="data"
      />
    </div>
  </Wrapper>
</template>

<style scoped>
.movie_view_container {
  padding-bottom: 3.5rem;
}
.movie_player {
  width: 100%;
}
.movie_title_container {
  width: 95%;
  max-width: var(--max-width);
  margin: auto;
}
h2 {
  color: white;
  padding-top: 1rem;
}

.description {
  display: block;
  color: var(--slate-300);
  font-size: medium;
}

.sub_cat_title {
  color: var(--slate-500);
}

@media screen and (max-width: 768px) {
  h2 {
    padding-top: 0.7rem;
    font-size: 1.3rem;
  }
  .sub_cat_title {
    font-size: 14px;
  }
}
@media screen and (min-width: 2000px) {
  .movie_title_container {
    width: 100%;
  }
}
</style>
