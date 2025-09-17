<template>
  <div id="home">
    <div class="span-container">
      <span v-for="(letter, index) in title" :style="{ '--delay': index * 10 + 250 + 'ms' }">
        {{ letter === ' ' ? '\u00A0' : letter }}
      </span>
    </div>
    <div class="span-container" id="subtitle">
      <span v-for="(letter, index) in subtitle" :style="{ '--delay': index * 10 + 250 + 'ms' }">
        {{ letter === ' ' ? '\u00A0' : letter }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables";

#home {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .span-container {
    display: flex;
    overflow: hidden;

    font-size: 2rem;
    font-weight: normal;

    margin: 10px;

    > span {
      display: inline-block;
      transform: translateY(100%);
      animation: slideUp 0.5s ease-out forwards;
      animation-delay: var(--delay);
    }
  }

  #subtitle {
    font-size: 1rem;
    font-weight: lighter;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>

<script setup lang="ts">
const title = "SparksWeb".split('');
const subtitle = "Work in progress".split('');
</script>