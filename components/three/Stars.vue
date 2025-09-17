<template>
  <canvas ref="threeCanvas" class="three-canvas" />
</template>

<style scoped>
.three-canvas {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>

<script setup lang="ts">
import { initThreeScene, destroyThreeScene } from '@/composables/useStarScene';
const threeCanvas: Ref<HTMLCanvasElement | null> = useTemplateRef("threeCanvas");

onMounted(() => {
  if (threeCanvas.value) {
    initThreeScene(threeCanvas.value);
  }
});

onBeforeUnmount(() => {
  destroyThreeScene();
});
</script>