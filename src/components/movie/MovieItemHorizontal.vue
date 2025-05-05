<script setup lang="ts">
import type { TMovie } from '@/types/movie'
import { useI18n } from 'vue-i18n'
import type { TLang } from '@/types/common'
import formatDuration from '@/utils/formatDuration'
import { ref } from 'vue'
import { useIsMobile } from '@/composables/useIsMobile'
import { useRouter } from 'vue-router'
import { truncate } from '@/utils/truncate'
const loadingImage = ref(true)
const router = useRouter()
defineProps<{
  movie: TMovie
}>()

const { locale } = useI18n()

const onImageLoad = () => {
  loadingImage.value = false
}

const { isMobile } = useIsMobile()
</script>

<template>
  <div class="movie_item_container" @click="router.push(`/movies/${movie.id}`)">
    <div class="movie_item">
      <span class="movie_duration">{{ formatDuration(movie.duration) }}</span>
      <img
        @load="onImageLoad"
        :src="movie.image ? movie.image : '/placeholder.png'"
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
    <span class="movie_title">{{
      truncate(movie.title[locale as keyof TLang], 20)
    }}</span>
  </div>
</template>
<style scoped>
.movie_item_container {
  width: 140px;
  display: flex;
  flex-direction: column;
  height: fit-content;
}
.movie_item {
  position: relative;
  flex-shrink: 0;
  scroll-behavior: smooth;
  width: 140px;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
  height: 140px;
}

.movie_item:hover {
  transform: scale(1.05);
  /* Bottom shading */
}

.movie_title {
  font-size: small;
  text-transform: capitalize;
  color: var(--movie-title);
  display: block;
  text-wrap: wrap;
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

@media (min-width: 768px) {
  .movie_item_container {
    width: 200px;
  }
  .movie_item {
    width: 200px;
    height: 250px;
  }
  .movie_title {
    font-size: medium;
  }
  .movie_duration {
    font-size: small;
  }
}
</style>
