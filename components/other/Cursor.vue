<template>
  <div ref="cursor" class="cursor" />
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables";

.cursor {
  z-index: 9999;

  position: fixed;
  pointer-events: none;

  width: 20px;
  height: 20px;

  border-radius: 50%;
  border: 1px solid variables.$color-white;

  opacity: 0.7;

  transform: translate(-100%, -100%);

  top: 0;
  left: 0;

  transition: all .4s ease-in-out, background-color .2s ease-out, opacity .2s ease-out, transform .1s ease-out;
}

.active {
  background-color: variables.$color-white;
  opacity: 1 !important;
}
</style>

<script setup lang="ts">
const cursor: Ref<HTMLDivElement | null> = useTemplateRef("cursor");
let stopTimeout: number | null = null;

const commonSize = 20;
const minSpeed = 0.5;
const maxSpeed = 2;

let lastX = 0;
let lastY = 0;
let lastTime = Date.now();

const updateCursorPosition = (event: MouseEvent) => {
  if (!cursor.value) return;

  const deltaX = event.clientX - lastX;
  const deltaY = event.clientY - lastY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  const currentTime = Date.now();
  const timeElapsed = currentTime - lastTime;

  let speed = distance / timeElapsed;
  speed = Math.max(minSpeed, Math.min(maxSpeed, speed));

  const scaleFactor = 1 + Math.sqrt((speed - minSpeed) / (maxSpeed - minSpeed)) * 4;
  const cursorSize = commonSize * scaleFactor;

  cursor.value.style.width = `${cursorSize}px`;
  cursor.value.style.height = `${cursorSize}px`;
  cursor.value.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;

  lastX = event.clientX;
  lastY = event.clientY;
  lastTime = currentTime;

  if (stopTimeout) clearTimeout(stopTimeout);
  stopTimeout = window.setTimeout(() => {
    if (cursor.value) {
      cursor.value.style.width = `${commonSize}px`;
      cursor.value.style.height = `${commonSize}px`;
    }
  }, 100);
};

const handleMouseLeave = () => {
  if (!cursor.value) return;

  cursor.value.style.opacity = '0';
};

const handleMouseEnter = () => {
  if (!cursor.value) return;

  cursor.value.style.opacity = '0.7';
};

onMounted(() => {
  document.addEventListener('mousemove', updateCursorPosition);
  document.addEventListener('mouseleave', handleMouseLeave);
  document.addEventListener('mouseenter', handleMouseEnter);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursorPosition);
  document.removeEventListener('mouseleave', handleMouseLeave);
  document.removeEventListener('mouseenter', handleMouseEnter);

  if (stopTimeout !== null) clearTimeout(stopTimeout);
});
</script>