<script setup>
import { vConfetti } from "@neoconfetti/vue";
</script>

<template>
  <span v-confetti />
  <div class="win-message">Congratulations - you have won the game. 🤝</div>
</template>

<style scoped>
.win-message {
  font-size: 14px;
  margin: 10px 0;
  color: #fff;
}
</style>
