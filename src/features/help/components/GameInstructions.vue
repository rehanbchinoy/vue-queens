<template>
  <div class="instructions">
    <h2>How to play</h2>
    <ol>
      <li>
        Your goal is to have exactly one
        <img src="@/assets/crown.png" class="queen" /> in each row, column, and color
        region.
      </li>
      <li>
        Tap once to place <span class="x-mark">×</span> and tap twice for
        <img src="@/assets/crown.png" class="queen" />. Use
        <span class="x-mark">×</span> to mark where
        <img src="@/assets/crown.png" class="queen" /> cannot be placed.
      </li>
      <li>
        Two <img src="@/assets/crown.png" class="queen" /> cannot touch each other, not
        even diagonally.
      </li>
    </ol>
  </div>
</template>

<style scoped>
.instructions {
  max-width: 100%;
  box-sizing: border-box;
}

.instructions h2 {
  font-size: 16px;
  margin: 0 0 10px;
}

.instructions ol {
  padding-left: 20px;
}

.instructions li {
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 1.5;
}

.queen,
.x-mark {
  width: 14px;
  height: 14px;
  position: relative;
  top: 1px;
}

/* Mobile responsive breakpoints */
@media (max-width: 480px) {
  .instructions h2 {
    font-size: 15px;
  }
  
  .instructions li {
    font-size: 13px;
    margin-bottom: 8px;
  }
  
  .queen,
  .x-mark {
    width: 12px;
    height: 12px;
  }
}

@media (max-width: 360px) {
  .instructions h2 {
    font-size: 14px;
  }
  
  .instructions li {
    font-size: 12px;
    margin-bottom: 6px;
  }
  
  .instructions ol {
    padding-left: 16px;
  }
}
</style>
