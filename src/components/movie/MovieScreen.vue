<script setup lang="ts">
import type { TMovie } from '@/types/movie'
import { useI18n } from 'vue-i18n'
import type { TLang } from '@/types/common'
import { ref } from 'vue'
import { truncate } from '@/utils/truncate'
import { useRouter } from 'vue-router'
const env = import.meta.env.VITE_API_URL
const loadingImage = ref(true)
const router = useRouter()
defineProps<{
  movie: TMovie
}>()

const { locale } = useI18n()

const onImageLoad = () => {
  loadingImage.value = false
}

const onMovieClick = (movie: TMovie) => {
  // e.preventDefault()
  router.push({ name: 'movie', params: { id: movie.id } })
}
</script>

<template>
  <div v-if="movie" class="movie_screen" @click="onMovieClick(movie)">
    <!-- Skeleton -->
    <div v-if="loadingImage" class="skeleton"></div>
    <div class="movie_screen__info">
      <span>{{ movie.title[locale as keyof TLang] }}</span>
      <p>
        {{ truncate(movie.description[locale as keyof TLang], 200) }}
      </p>
      <button @click="onMovieClick(movie)">
        <div class="movie_screen__info__play">
          <img src="/play.svg" alt="play svg" />
          <span>{{ $t('play') }}</span>
        </div>
      </button>
    </div>
    <img
      @load="onImageLoad"
      :src="movie.image ? env + movie.image : '/logo.svg'"
      alt="movie image"
    />
  </div>
</template>

<style scoped>
.movie_screen {
  width: 100%;
  height: 700px;
  overflow: hidden;
  position: relative;
}
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.movie_screen::before {
  content: '';
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.5) 8%,
    rgba(0, 0, 0, 0.565) 15.67%,
    rgba(0, 0, 0, 0.5361) 23.33%,
    rgba(0, 0, 0, 0.5187) 31%,
    rgba(0, 0, 0, 0.6944) 38.67%,
    rgba(0, 0, 0, 0.6632) 46.33%,
    rgba(0, 0, 0, 0.625) 54%,
    rgba(0, 0, 0, 0.5868) 61.67%,
    rgba(0, 0, 0, 0.5556) 69.33%,
    rgba(0, 0, 0, 0.5312) 77%,
    rgba(0, 0, 0, 0.5139) 84.67%,
    rgba(0, 0, 0, 0.5035) 92.33%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

.movie_screen__info {
  position: absolute;
  top: 50%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  z-index: 2;
  padding-left: 2rem;
}

.movie_screen__info > span {
  color: white;
  font-weight: 600;
  font-size: 4rem;
  display: block;
  text-transform: uppercase;
}
.movie_screen__info > p {
  width: 20vw;
  text-wrap: wrap;
  color: var(--slate-100);
}

.movie_screen__info__play {
  display: flex;
  gap: 1rem;
  padding: 5px;
}

.movie_screen__info__play > span {
  color: white;
}

.movie_screen__info > button {
  padding: 0.6rem 2rem;
  color: color;
  background-color: var(--slate-800);
  border: none;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
}

.movie_screen__info > button:hover {
  background-color: var(--slate-500);
}

@media screen and (max-width: 768px) {
  .movie_screen {
    height: 400px;
  }
  .movie_screen__info {
    top: 40%;
  }
  .movie_screen__info > p {
    width: 70vw;
    font-size: small;
  }
  .movie_screen__info > span {
    font-size: 1rem;
  }

  .movie_screen__info > button {
    padding: 0.3rem 0.2rem;
  }
  .movie_screen__info__play {
    padding: 3px;
  }
  .movie_screen__info__play > span {
    font-size: small;
  }
}

@media (min-width: 768px) and (max-width: 1440px) {
  .movie_screen {
    height: 500px;
  }
  .movie_screen__info {
    top: 40%;
  }
  .movie_screen__info > p {
    width: 50vw;
    font-size: medium;
  }
  .movie_screen__info > span {
    font-size: 3rem;
  }

  .movie_screen__info > button {
    padding: 0.3rem 1rem;
  }
}
</style>
