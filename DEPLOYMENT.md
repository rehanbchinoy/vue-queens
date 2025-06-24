# Vue Queens Deployment Guide

## Deployment Strategy: Standalone GitHub Pages Site

Since your Vue Queens game is in a separate repository from your main website, we'll deploy it as a standalone GitHub Pages site.

### Step 1: Push Your Code to GitHub
```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### Step 2: Enable GitHub Pages on This Repository
1. Go to your `vue-queens` repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow I created will automatically deploy your app

### Step 3: Access Your Game
Your Vue Queens game will be available at:
- **GitHub Pages URL**: `https://rehanbchinoy.github.io/vue-queens/`

### Step 4: Link from Your Main Website
Add a link to your game from your main website at `rehanchinoy.com`:

```html
<a href="https://rehanbchinoy.github.io/vue-queens/" target="_blank">
  Play Vue Queens Game
</a>
```

## Alternative: Custom Domain Setup

If you want to use your custom domain:

1. **Option A: Subdomain** - Set up `vue-queens.rehanchinoy.com`
2. **Option B: Subdirectory** - Deploy to `rehanchinoy.com/vue-queens/` (requires main site integration)

For subdirectory deployment, you'd need to:
1. Copy the built files to your main website repository
2. Place them in a `vue-queens` folder
3. Deploy your main website

## Configuration Details

### Vite Configuration
The `vite.config.js` is configured with:
```javascript
base: "/vue-queens/"
```

This ensures all assets are loaded correctly from the GitHub Pages path.

### Build Process
- Run `npm run build` to create production files
- The `dist` folder contains the deployable files
- GitHub Actions automatically builds and deploys on push

## Testing Locally

To test the production build locally:
```bash
npm run build
npm run preview
```

This will serve the production build at `http://localhost:4173/vue-queens/`

## Next Steps

1. **Push your code** to trigger the automatic deployment
2. **Wait for the GitHub Action** to complete (check the Actions tab)
3. **Test your game** at `https://rehanbchinoy.github.io/vue-queens/`
4. **Add a link** from your main website to the game

Your Vue Queens game will be live as a standalone site that you can link to from your main website! 