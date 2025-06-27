<script setup>
import { vConfetti } from "@neoconfetti/vue";
import { ref } from "vue";
import { generateShareUrl, copyToClipboard } from "@/features/game/utils/shareUtils.js";
import AppButton from "@/components/AppButton.vue";

const props = defineProps({
  boardState: {
    type: Array,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  completionTime: {
    type: String,
    required: true
  }
});

const shareStatus = ref(""); // "success", "error", or empty

async function handleShare() {
  const shareUrl = generateShareUrl(props.boardState, props.difficulty);
  const shareText = `Queens (${props.completionTime})\n${shareUrl}`;
  const success = await copyToClipboard(shareText);
  
  if (success) {
    shareStatus.value = "success";
    setTimeout(() => {
      shareStatus.value = "";
    }, 2000);
  } else {
    shareStatus.value = "error";
    setTimeout(() => {
      shareStatus.value = "";
    }, 2000);
  }
}
</script>

<template>
  <span v-confetti />
  <div class="win-container">
    <div class="win-message">Congratulations!</div>
    <div class="share-section">
      <AppButton @click="handleShare" class="share-button">
        {{ shareStatus === 'success' ? 'Copied!' : 'Share Puzzle' }}
      </AppButton>
      <div v-if="shareStatus === 'success'" class="share-status success">
        Link copied to clipboard!
      </div>
      <div v-if="shareStatus === 'error'" class="share-status error">
        Failed to copy link
      </div>
    </div>
  </div>
</template>

<style scoped>
.win-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

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

.share-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.share-button {
  background: rgba(52, 152, 219, 0.9);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.share-button:hover {
  background: rgba(52, 152, 219, 1);
}

.share-status {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
}

.share-status.success {
  background: rgba(39, 174, 96, 0.2);
  color: #27ae60;
}

.share-status.error {
  background: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
}

/* Mobile responsive breakpoints */
@media (max-width: 480px) {
  .win-message {
    --win-message-size: 13px;
    padding: 10px;
  }
  
  .share-button {
    font-size: 13px;
    padding: 6px 12px;
  }
}

@media (max-width: 360px) {
  .win-message {
    --win-message-size: 12px;
    padding: 8px;
  }
  
  .share-button {
    font-size: 12px;
    padding: 5px 10px;
  }
}
</style>
