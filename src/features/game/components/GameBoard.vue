<script setup>
import { ref, onMounted } from 'vue'
import { createGame } from '../composables/createGame.js'
import { useTimer } from '../../timer/composables/useTimer.js'
import GridCell from './GridCell.vue'
import WinMessage from './WinMessage.vue'
import AppTimer from '../../timer/components/AppTimer.vue'
import { decodeBoardState } from '../utils/shareUtils.js'
import { cellColors } from '../data/cellColors.js'

const { 
  boardState, 
  currentDifficulty, 
  toggleCell, 
  isValidQueen, 
  clearBoard, 
  changeDifficulty, 
  loadSharedPuzzle, 
  targetTime,
  gameWon 
} = createGame();

const { startTimer, stopTimer, formattedTime } = useTimer();

const hasStarted = ref(false);

function formatTime(time) {
  if (!time) return '--:--';
  if (typeof time === 'string' && time.includes(':')) return time;
  // If time is a number (seconds), format as mm:ss
  const t = typeof time === 'number' ? time : parseInt(time, 10);
  if (isNaN(t)) return '--:--';
  const m = Math.floor(t / 60).toString().padStart(2, '0');
  const s = (t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function handleToggleCell(rowIndex, cellIndex) {
  // Start timer on first click if not already started
  if (!hasStarted.value) {
    startTimer();
    hasStarted.value = true;
  }

  toggleCell(rowIndex, cellIndex);

  if (gameWon.value) {
    stopTimer();
  }
}

// Load shared puzzle from URL parameters
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const puzzleParam = urlParams.get('puzzle');
  
  if (puzzleParam) {
    const decoded = decodeBoardState(puzzleParam);
    if (decoded) {
      loadSharedPuzzle(decoded.difficulty, decoded.boardState, decoded.completionTime);
      // Clear the URL parameter after loading
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }
});
</script>

<template>
  <div class="game-board">
    <div class="game-header">
      <h2>Queens Puzzle</h2>
      <div class="difficulty-controls">
        <button 
          v-for="difficulty in ['easy', 'medium', 'hard']" 
          :key="difficulty"
          :class="{ active: currentDifficulty === difficulty }"
          @click="changeDifficulty(difficulty)"
        >
          {{ difficulty.charAt(0).toUpperCase() + difficulty.slice(1) }}
        </button>
      </div>
    </div>
    
    <div class="board-container">
      <div class="grid">
        <template v-for="(row, rowIndex) in boardState">
          <GridCell
            v-for="(cell, cellIndex) in row"
            :key="`${rowIndex}-${cellIndex}`"
            :content="cell.content"
            :color="cellColors[cell.section]"
            :invalid="isValidQueen(rowIndex, cellIndex)"
            @click="handleToggleCell(rowIndex, cellIndex)"
          />
        </template>
      </div>
      <div v-if="targetTime" class="completion-time">
        Completed in: {{ formatTime(targetTime) }}
      </div>
    </div>
    
    <div class="game-controls">
      <button @click="clearBoard" class="clear-btn">Clear Board</button>
    </div>
    
    <WinMessage 
      v-if="gameWon" 
      :board-state="boardState"
      :difficulty="currentDifficulty"
      :completion-time="formattedTime"
    />
    <AppTimer />
  </div>
</template>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 100%;
  margin: 0 auto;
}

.game-header {
  text-align: center;
  margin-bottom: 20px;
}

.game-header h2 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 2rem;
}

.difficulty-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 10px;
}

.difficulty-controls button {
  padding: 8px 16px;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.difficulty-controls button:hover {
  background: #3498db;
  color: white;
}

.difficulty-controls button.active {
  background: #3498db;
  color: white;
}

.target-time {
  font-size: 1.1rem;
  color: #e74c3c;
  font-weight: 600;
  margin-top: 10px;
}

.board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(8, var(--cell-size, 55px));
  grid-template-rows: repeat(8, var(--cell-size, 55px));
  border: 2px solid #2c3e50;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  gap: 0;
  width: fit-content;
}

.completion-time {
  font-size: 1.2rem;
  color: #27ae60;
  font-weight: 600;
  text-align: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #27ae60;
}

.game-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.clear-btn {
  padding: 10px 20px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.clear-btn:hover {
  background: #c0392b;
}

/* Mobile responsive breakpoints */
@media (max-width: 480px) {
  .grid {
    --cell-size: 35px;
  }
  
  .game-header h2 {
    font-size: 1.5rem;
  }
  
  .difficulty-controls button {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}

@media (max-width: 360px) {
  .grid {
    --cell-size: 30px;
  }
}

@media (max-width: 320px) {
  .grid {
    --cell-size: 28px;
  }
}
</style>
