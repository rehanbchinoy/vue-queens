import { ref, computed } from 'vue'

// Create shared state outside the function to ensure it's shared across components
const time = ref(0)
const isRunning = ref(false)
const isPaused = ref(false)
let timerInterval = null

export function useTimer() {
  const startTimer = () => {
    if (timerInterval || isPaused.value) return
    isRunning.value = true
    timerInterval = setInterval(() => {
      time.value++
    }, 1000)
  }

  const pauseTimer = () => {
    if (!isRunning.value) return
    clearInterval(timerInterval)
    timerInterval = null
    isPaused.value = true
  }

  const resumeTimer = () => {
    if (!isPaused.value) return
    isPaused.value = false
    timerInterval = setInterval(() => {
      time.value++
    }, 1000)
  }

  const stopTimer = () => {
    clearInterval(timerInterval)
    timerInterval = null
    isRunning.value = false
    isPaused.value = false
  }

  const resetTimer = () => {
    clearInterval(timerInterval)
    timerInterval = null
    time.value = 0
    isRunning.value = false
    isPaused.value = false
  }

  const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60)
    const seconds = time.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  return {
    time,
    formattedTime,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    resetTimer
  }
}
