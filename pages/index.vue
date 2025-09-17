<template>
  <Stars />

  <Loader v-if="!loaded" />

  <main v-if="loaded">
    <Home />
  </main>
</template>

<script setup lang="ts">
import Loader from "~/components/other/Loader.vue";
import Stars from "~/components/three/Stars.vue";
import Home from "~/components/Home.vue";

const { $listen } = useNuxtApp();
let loaded = ref(false);

$listen('loaded', (loaded_: boolean) => {
  loaded.value = loaded_;
});
</script>