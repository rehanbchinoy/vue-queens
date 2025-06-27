# Vue Queens

A Vue.js implementation of the classic Queens puzzle game.

## Features

- Interactive 8x8 grid game board
- Three difficulty levels (Easy, Medium, Hard)
- Timer functionality
- Share puzzle functionality
- Responsive design
- Win detection and celebration

## Game Rules

The goal is to place queens on the board so that no two queens can attack each other. Queens can move:
- Horizontally and vertically (any number of squares)
- Diagonally (any number of squares)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

The game is deployed at: https://rehanbchinoy.github.io/vue-queens/

## Technologies Used

- Vue 3 with Composition API
- Vite for build tooling
- Vue Router for navigation
- CSS Grid for the game board layout

## Project Structure

```
src/
├── components/          # Shared components
├── features/           # Feature-based organization
│   ├── game/          # Game logic and components
│   ├── help/          # Help and instructions
│   └── timer/         # Timer functionality
├── router/            # Vue Router configuration
├── views/             # Page components
└── assets/            # Static assets
```

## Recent Update

Updated deployment configuration and fixed any potential loading issues.

## Features

- **Interactive Game Board**: Click cells to place queens and solve the puzzle
- **Multiple Difficulty Levels**: Easy, Medium, and Hard with different board configurations
- **Real-time Validation**: Visual feedback for invalid queen placements
- **Timer**: Track your solving time
- **Share Functionality**: Share completed puzzles with friends
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## How to Play

1. **Place Queens**: Click on empty cells to place queens
2. **Follow Rules**: Queens cannot attack each other (same row, column, diagonal, or section)
3. **Solve the Puzzle**: Place exactly 8 queens on the board
4. **Share Your Solution**: Click "Share Puzzle" when you win to share with friends

## 🎯 Game Rules

- Place queens on the colored sections of the board
- Only one queen per row, column, and colored section
- Queens cannot be placed in adjacent diagonal cells
- Complete the puzzle by placing all 8 queens correctly

## ✨ Features

- **Clean, Modern UI** - Intuitive drag-and-drop interface
- **Real-time Validation** - Immediate feedback on valid/invalid placements
- **Timer** - Track your solving time
- **Responsive Design** - Works on desktop and mobile devices
- **Visual Feedback** - Clear indication of conflicts and valid moves

## 🛠️ Technical Stack

- **Vue 3** - Composition API for reactive state management
- **Vite** - Fast build tool and development server
- **CSS Grid** - Responsive game board layout
- **Modern JavaScript** - ES6+ features and modules

## 🏗️ Architecture

The game is built with a clean, modular architecture:

```
src/
├── components/          # Reusable UI components
├── features/
│   ├── game/           # Game logic and components
│   ├── timer/          # Timer functionality
│   └── help/           # Game instructions
├── composables/        # Vue 3 composables for state management
└── assets/            # Images and styling
```

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📚 Inspiration

This implementation was inspired by [Fotis Adamakis's excellent article](https://fadamakis.com/recreating-queens-game-in-vue-d7e3b3013ccb) on recreating the Queens game in Vue. The original article provided valuable insights into game mechanics and implementation approaches.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs or suggest features
- Submit pull requests
- Improve documentation
- Add new game modes or difficulty levels

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Enjoy the game!** 🎯

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
