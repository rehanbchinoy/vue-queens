<script setup>
import { ref } from "vue";
import GridCell from "@/features/game/components/GridCell.vue";
import { createGame } from "@/features/game/composables/createGame";
import WinMessage from "@/features/game/components/WinMessage.vue";
import AppTimer from "@/features/timer/components/AppTimer.vue";
import { useTimer } from "@/features/timer/composables/useTimer";
import AppButton from "@/components/AppButton.vue";
import DifficultySelector from "@/features/game/components/DifficultySelector.vue";
import { cellColors } from "@/features/game/data/cellColors.js";

const { 
  boardState, 
  gameWon, 
  isValidQueen, 
  toggleCell, 
  clearBoard, 
  currentDifficulty,
  changeDifficulty 
} = createGame();

const { startTimer, stopTimer, resetTimer } = useTimer();

const hasStarted = ref(false);

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

function resetGame() {
  clearBoard();
  resetTimer();
  hasStarted.value = false;
}

function handleDifficultyChange(difficulty) {
  changeDifficulty(difficulty);
  resetTimer();
  hasStarted.value = false;
}
</script>

<template>
  <DifficultySelector 
    :current-difficulty="currentDifficulty" 
    :change-difficulty="handleDifficultyChange" 
  />
  <div class="game-board">
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
  <WinMessage v-if="gameWon" />
  <AppTimer />
  <div class="button-group">
    <AppButton @click="resetGame">Reset Game</AppButton>
    <AppButton @click="clearBoard">Clear Board</AppButton>
  </div>
</template>

<style scoped>
.game-board {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(8, var(--cell-size, 55px));
  grid-template-rows: repeat(8, var(--cell-size, 55px));
  border: 2px solid #2c3e50;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 100%;
  margin: 0 auto;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

/* Mobile responsive breakpoints */
@media (max-width: 480px) {
  .game-board {
    --cell-size: 35px;
  }
}

@media (max-width: 360px) {
  .game-board {
    --cell-size: 30px;
  }
}

@media (max-width: 320px) {
  .game-board {
    --cell-size: 28px;
  }
}
</style>
