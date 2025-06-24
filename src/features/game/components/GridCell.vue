<script setup>
defineProps(["content", "color", "invalid"]);
</script>

<template>
  <div class="cell" :class="{ invalid }" :style="{ backgroundColor: color }">
    <img v-if="content === 'queen'" src="@/assets/crown.png" class="queen" />
    <span v-if="content === 'marked'">×</span>
  </div>
</template>

<style scoped>
.cell {
  font-size: 32px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.cell:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.cell.invalid {
  border: 3px solid #e74c3c;
  background-color: rgba(231, 76, 60, 0.2);
  box-shadow: 0 0 10px rgba(231, 76, 60, 0.5);
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-10px);
  }
  40%,
  80% {
    transform: translateX(10px);
  }
}

.queen {
  width: 32px;
  height: 32px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}
</style>
