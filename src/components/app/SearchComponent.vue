<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchExpanded = ref(false)

const toggleSearch = () => {
  searchExpanded.value = !searchExpanded.value
}

const searchValue = ref('')
const router = useRouter()
</script>

<template>
  <div class="search-input" :class="{ expanded: searchExpanded }">
    <div class="search_icon">
      <img class="icon" src="/search.svg" @click="toggleSearch" />
    </div>
    <form
      @submit="
        e => {
          e.preventDefault()
          router.push({
            path: `/search/movies/${searchValue}`,
          })
        }
      "
    >
      <input
        v-show="searchExpanded"
        type="text"
        placeholder="Titanic"
        v-model="searchValue"
      />
    </form>
  </div>
</template>

<style scoped>
.search-input {
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 5px 10px;
  width: 44px;
  height: 40px;
  background-color: var(--slate-950);
  transition:
    width 0.3s ease,
    height 0.3s ease,
    background-color 0.3s ease,
    border-radius 0.3s ease-in-out;
  overflow: hidden;
}

.search-input.expanded {
  border: 1px solid var(--slate-600);
  width: 250px;
  height: 40px;
}

.search_icon {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.icon {
  width: 100%;
  height: 100%;
  transition:
    width 0.3s ease,
    height 0.3s ease;
}

.search-input.expanded .icon {
  width: 50%;
  height: 100%;
}
.search-input > form > input {
  flex-grow: 1;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: var(--slate-200);
}

.search-input > form > input::placeholder {
  color: var(--slate-400);
}

@media screen and (max-width: 768px) {
  .search-input.expanded {
    height: 40px;
  }
}
</style>
