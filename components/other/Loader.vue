<template>
  <div id="loader-container">
    <span>{{ percent }}%</span>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables";

#loader-container {
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 1);

  transition: background-color 0.3s ease-out;

  > span {
    font-weight: lighter;
  }
}
</style>

<script setup lang="ts">
const { $event } = useNuxtApp();
let percent = ref<number>(0);

onMounted(() => {
  const interval = setInterval(() => {
    percent.value += Math.floor(Math.random() * 3) + 1;

    if (percent.value >= 70) {
      document.getElementById('loader-container')?.style.setProperty('background-color', 'rgba(0, 0, 0, 0)');
    }

    if (percent.value >= 100) {
      percent.value = 100;
      clearInterval(interval);
      $event('loaded', true);
    }
  }, 30);
})
</script>