<script setup>
import { vConfetti } from "@neoconfetti/vue";
</script>

<template>
  <span v-confetti />
  <div class="win-message">Congratulations - you have won the game!</div>
</template>

<style scoped>
.win-message {
  font-size: var(--win-message-size, 14px);
  margin: 10px 0;
  color: #fff;
  text-align: center;
  font-weight: 500;
  background: rgba(39, 174, 96, 0.9);
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Mobile responsive breakpoints */
@media (max-width: 480px) {
  .win-message {
    --win-message-size: 13px;
    padding: 10px;
  }
}

@media (max-width: 360px) {
  .win-message {
    --win-message-size: 12px;
    padding: 8px;
  }
}
</style>
