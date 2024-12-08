<script setup lang="ts">
import type { TMovie } from '@/types/movie'
import { useI18n } from 'vue-i18n'
import type { TLang } from '@/types/common'
import formatDuration from '@/utils/formatDuration'
import { ref } from 'vue'
import { useIsMobile } from '@/composables/useIsMobile'
const env = import.meta.env.VITE_API_URL
const loadingImage = ref(true)

const props = defineProps<{
  movie: TMovie
}>()

const { locale } = useI18n()

const onImageLoad = () => {
  loadingImage.value = false
}

const { isMobile } = useIsMobile()
</script>

<template>
  <RouterLink :to="'/movies/' + movie.id" class="movie_item_link">
    <div class="movie_item">
      <span class="movie_duration">{{ formatDuration(movie.duration) }}</span>
      <img
        @load="onImageLoad"
        :src="movie.image ? env + movie.image : '/placeholder.png'"
        alt="movie image"
      />
      <!-- Skeleton  -->
      <div v-if="loadingImage" class="skeleton"></div>
      <div class="play_icon_item">
        <svg
          :width="isMobile ? '14' : '24'"
          :height="isMobile ? '14' : '24'"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.99 11.7773C22.9219 10.8388 22.4205 9.92777 21.4859 9.39398L7.48782 1.39936C5.48785 0.25713 3 1.70127 3 4.00443V19.9937C3 22.2968 5.48785 23.741 7.48781 22.5988L21.4859 14.6041C22.4205 14.0703 22.9219 13.1593 22.99 12.2208C23.0226 12.0751 23.0226 11.9231 22.99 11.7773Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
    <span class="movie_title"
      >{{ movie.title[locale as keyof TLang] }} {{ movie.id }}</span
    >
  </RouterLink>
</template>
<style scoped>
.movie_item_link {
  text-decoration: none;
  position: relative;
  display: flex;
  flex-direction: column;
}
.movie_item {
  position: relative;
  flex-shrink: 0;
  scroll-behavior: smooth;
  width: 100px;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
  height: 140px;
  overflow: hidden;
}

.movie_item:hover {
  transform: scale(1.05);
  /* Bottom shading */
}

.movie_title {
  font-size: 8px;
  text-transform: capitalize;
  color: var(--movie-title);
  display: block;
}

.movie_item_info > p {
  font-size: smaller;
  color: var(--slate-300);
}

.movie_duration {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 8px;
  color: white;
}

.movie_item > img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
}

.play_icon_item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play_icon_item > svg {
  width: 14;
  height: 14;
}

/* Shimmer Effect */

@media screen and (min-width: 500px) and (max-width: 768px) {
  .movie_item {
    width: 120px;
    height: 90%;
  }
}

@media (min-width: 768px) and (max-width: 1440px) {
  .movie_item {
    height: 300px;
  }
  .movie_title {
    font-size: medium;
  }
  .movie_duration {
    font-size: small;
  }
}

@media (min-width: 1440px) {
  .movie_item {
    width: 200px;
    height: 300px;
  }
  .movie_title {
    font-size: medium;
  }
  .movie_duration {
    font-size: small;
  }
}
</style>
