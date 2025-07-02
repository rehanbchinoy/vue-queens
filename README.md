# Vue Queens

A Vue.js implementation of the Queens puzzle from LinkedIn.

## Features

- Three difficulty levels (Easy, Medium, Hard)
- Timer functionality
- Share puzzle functionality

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


## Inspiration

This implementation was inspired by [Fotis Adamakis's excellent article](https://fadamakis.com/recreating-queens-game-in-vue-d7e3b3013ccb) on recreating the Queens game in Vue. The original article provided valuable insights into game mechanics and implementation approaches.