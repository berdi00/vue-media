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
    class="lucide lucide-fast-forward-icon lucide-fast-forward"
  >
    <polygon points="13 19 22 12 13 5 13 19" />
    <polygon points="2 19 11 12 2 5 2 19" />
  </svg>
  <span class="seconds">10s</span>
</template>

<style scoped>
.seconds {
  color: white;
  font-size: 1rem;
  animation: fadeZoom 0.6s ease;
  opacity: 1;
  position: absolute;
  top: 60%;
  right: 30%;
  transform: translate(50%, -50%);
  pointer-events: none;
  user-select: none;
  text-shadow: 0 0 8px black;
}

svg {
  position: absolute;
  top: 50%;
  right: 30%;
  transform: translate(50%, -50%);
  width: 84px;
  height: 84px;
  opacity: 1;
  animation: fadeZoom 0.6s ease;
  pointer-events: none;
  user-select: none;
  text-shadow: 0 0 8px black;
}

@keyframes fadeZoom {
  0% {
    opacity: 0;
    transform: translate(50%, -50%) scale(0.8);
  }
  30% {
    opacity: 1;
    transform: translate(50%, -50%) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translate(50%, -50%) scale(1);
  }
}
</style>
