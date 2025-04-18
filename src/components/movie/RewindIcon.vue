<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-rewind-icon lucide-rewind"
  >
    <polygon points="11 19 2 12 11 5 11 19" />
    <polygon points="22 19 13 12 22 5 22 19" />
  </svg>
  <span class="second">10s</span>
</template>

<style scoped>
.second {
  color: white;
  font-size: 1rem;
  animation: fadeZoom 0.6s ease;
  position: absolute;
  top: 60%;
  left: 30%;
  transform: translate(-50%, -50%);
  opacity: 1;
  pointer-events: none;
  user-select: none;
  text-shadow: 0 0 8px black;
}

svg {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  width: 84px;
  height: 84px;
  animation: fadeZoom 0.6s ease;
  opacity: 1;
  pointer-events: none;
  user-select: none;
}

@keyframes fadeZoom {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  30% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
