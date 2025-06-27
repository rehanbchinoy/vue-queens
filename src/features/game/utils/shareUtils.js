// Utility functions for sharing puzzle states

/**
 * Encodes the board state, difficulty, and completion time into a shareable string
 * @param {Array} boardState - The current board state
 * @param {string} difficulty - The current difficulty level
 * @param {string} completionTime - The completion time
 * @returns {string} - Encoded string for sharing
 */
export function encodeBoardState(boardState, difficulty, completionTime) {
  // Create a simple encoding: difficulty + completion time + board state
  const boardString = boardState.map(row => 
    row.map(cell => {
      if (cell.content === 'queen') return 'Q'
      if (cell.content === 'marked') return 'M'
      return 'E' // Empty
    }).join('')
  ).join('')
  
  // Combine difficulty, completion time, and board state
  const encoded = `${difficulty}:${completionTime}:${boardString}`
  
  // Use base64 encoding for URL safety
  return btoa(encoded)
}

/**
 * Decodes a shared string back into board state, difficulty, and completion time
 * @param {string} encodedString - The encoded string from URL
 * @returns {Object} - Object containing difficulty, completion time, and board state
 */
export function decodeBoardState(encodedString) {
  try {
    // Decode from base64
    const decoded = atob(encodedString)
    
    // Split difficulty, completion time, and board state
    const parts = decoded.split(':')
    if (parts.length < 3) {
      throw new Error('Invalid encoded string')
    }
    
    const difficulty = parts[0]
    const completionTime = parts[1]
    const boardString = parts.slice(2).join(':') // In case completion time contains colons
    
    if (!difficulty || !completionTime || !boardString) {
      throw new Error('Invalid encoded string')
    }
    
    // Reconstruct board state
    const boardState = []
    const boardSize = Math.sqrt(boardString.length)
    
    for (let i = 0; i < boardSize; i++) {
      const row = []
      for (let j = 0; j < boardSize; j++) {
        const index = i * boardSize + j
        const cellChar = boardString[index]
        
        let content = null
        if (cellChar === 'Q') content = 'queen'
        else if (cellChar === 'M') content = 'marked'
        
        row.push({ content, section: 0 }) // We'll need to get the actual section from the difficulty grid
      }
      boardState.push(row)
    }
    
    return { difficulty, completionTime, boardState }
  } catch (error) {
    console.error('Failed to decode board state:', error)
    return null
  }
}

/**
 * Generates a shareable URL for the current puzzle state with completion time
 * @param {Array} boardState - The current board state
 * @param {string} difficulty - The current difficulty level
 * @param {string} completionTime - The completion time
 * @returns {string} - Shareable URL
 */
export function generateShareUrl(boardState, difficulty, completionTime) {
  const encoded = encodeBoardState(boardState, difficulty, completionTime)
  const baseUrl = window.location.origin + window.location.pathname
  return `${baseUrl}?puzzle=${encoded}`
}

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
} 