<template>
  <div class="difficulty-selector">
    <h3>Difficulty</h3>
    <div class="difficulty-buttons">
      <button 
        @click="changeDifficulty('easy')" 
        :class="['difficulty-btn', { active: currentDifficulty === 'easy' }]"
      >
        Easy
      </button>
      <button 
        @click="changeDifficulty('medium')" 
        :class="['difficulty-btn', { active: currentDifficulty === 'medium' }]"
      >
        Medium
      </button>
      <button 
        @click="changeDifficulty('hard')" 
        :class="['difficulty-btn', { active: currentDifficulty === 'hard' }]"
      >
        Hard
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentDifficulty: {
    type: String,
    required: true
  },
  changeDifficulty: {
    type: Function,
    required: true
  }
})
</script>

<style scoped>
.difficulty-selector {
  margin: 20px 0;
  text-align: center;
}

.difficulty-selector h3 {
  color: #1e3a8a;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.difficulty-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.difficulty-btn {
  padding: 8px 16px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  background: white;
  color: #64748b;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 80px;
}

.difficulty-btn:hover {
  border-color: #94a3b8;
  color: #475569;
}

.difficulty-btn.active {
  border-color: #1e3a8a;
  background: #1e3a8a;
  color: white;
}
</style> 