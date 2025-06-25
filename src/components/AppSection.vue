<template>
  <div class="section">
    <slot />
  </div>
</template>

<style scoped>
.section {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25), 0 10px 50px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: var(--section-padding, 24px);
  border-radius: 12px;
  margin: var(--section-margin, 40px) 0;
  max-width: 100%;
  box-sizing: border-box;
}

/* Mobile responsive breakpoints */
@media (max-width: 480px) {
  .section {
    --section-padding: 16px;
    --section-margin: 20px;
  }
}

@media (max-width: 360px) {
  .section {
    --section-padding: 12px;
    --section-margin: 16px;
  }
}
</style>
