<template>
  <button><slot /></button>
</template>

<style scoped>
button {
  background: #9f39e3;
  border: none;
  border-radius: 4px;
  padding: var(--button-padding, 6px 12px);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: var(--button-font-size, 12px);
  margin-right: 10px;
  min-height: 36px;
  transition: background-color 0.2s ease;
}

button:hover {
  background: #8b2fd1;
}

button:active {
  background: #7a2bc0;
}

/* Mobile responsive breakpoints */
@media (max-width: 480px) {
  button {
    --button-padding: 8px 16px;
    --button-font-size: 13px;
    min-height: 40px;
  }
}

@media (max-width: 360px) {
  button {
    --button-padding: 6px 12px;
    --button-font-size: 12px;
    min-height: 36px;
  }
}
</style>
