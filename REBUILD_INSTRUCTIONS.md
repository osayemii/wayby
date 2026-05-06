# Fix for Fonts and Images Not Working

## The Problem
Fonts and images weren't working because Vite was building with absolute paths (`/assets/...`) which don't work in WordPress themes. The theme files are in a subdirectory, so paths need to be relative.

## Solution Applied

1. **Updated `vite.config.js`** - Changed to use relative paths (`base: './'`)
2. **Updated WordPress theme** - Improved path handling for assets

## What You Need to Do

### Step 1: Rebuild Your React App

Since we changed the Vite configuration, you need to rebuild:

```bash
npm run build
```

This will create a new `dist` folder with relative paths for all assets.

### Step 2: Copy New Files to WordPress Theme

1. Go to your React project's `dist` folder
2. **Delete the old files** in `wayby-wordpress-theme/dist/` (if they exist)
3. **Copy ALL new files** from `dist` folder
4. **Paste them** into `wayby-wordpress-theme/dist/`

### Step 3: Reinstall/Update WordPress Theme

**Option A: If theme is already installed:**
- Just replace the files in `wp-content/themes/wayby-wordpress-theme/dist/` via FTP/cPanel
- Or upload the updated theme ZIP file again

**Option B: Fresh install:**
- Create a new ZIP of the `wayby-wordpress-theme` folder
- Upload and install in WordPress

### Step 4: Clear Cache

- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Clear WordPress cache if you have a caching plugin
- Visit your site - fonts and images should now work!

## What Changed

### Before:
- Assets used absolute paths: `/assets/image.jpg`
- WordPress couldn't find them at theme path

### After:
- Assets use relative paths: `./assets/image.jpg`
- WordPress correctly resolves them to theme directory

## Verify It Works

After rebuilding and uploading:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Check that CSS, JS, and image files load with status 200 (not 404)
5. Images should display correctly
6. Fonts should render properly

