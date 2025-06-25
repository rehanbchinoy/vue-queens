<template>
  <div class="timer-container">
    <div class="timer">⏱ {{ formattedTime }}</div>
    <div class="button-container">
      <button 
        v-if="isRunning && !isPaused" 
        @click="pauseTimer" 
        class="timer-button pause"
      >
        ⏸ Pause
      </button>
      <button 
        v-if="isPaused" 
        @click="resumeTimer" 
        class="timer-button resume"
      >
        ▶ Resume
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTimer } from "../composables/useTimer";

const { formattedTime, isRunning, isPaused, pauseTimer, resumeTimer } = useTimer();
</script>

<style scoped>
.timer-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 15px 0;
  flex-wrap: wrap;
  justify-content: center;
}

.timer {
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 80px;
  text-align: center;
}

.button-container {
  min-width: 80px;
  height: 36px;
  display: flex;
  align-items: center;
}

.timer-button {
  width: 80px;
  height: 36px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-button.pause {
  background: #f39c12;
  color: white;
}

.timer-button.pause:hover {
  background: #e67e22;
}

.timer-button.resume {
  background: #27ae60;
  color: white;
}

.timer-button.resume:hover {
  background: #2ecc71;
}

/* Mobile responsive breakpoints */
@media (max-width: 480px) {
  .timer-container {
    flex-direction: column;
    gap: 10px;
  }
  
  .timer {
    font-size: 15px;
    padding: 6px 10px;
  }
  
  .timer-button {
    width: 90px;
    height: 40px;
    font-size: 13px;
  }
}

@media (max-width: 360px) {
  .timer {
    font-size: 14px;
    padding: 5px 8px;
  }
  
  .timer-button {
    width: 80px;
    height: 36px;
    font-size: 12px;
  }
}
</style>
