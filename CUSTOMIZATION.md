# Customization Guide

## Changing Application Settings

### Window Size
Edit `electron/main.ts`:
```typescript
mainWindow = new BrowserWindow({
  width: 1200,    // Change default width
  height: 800,    // Change default height
  minWidth: 900,  // Minimum window width
  minHeight: 650, // Minimum window height
})
```

### Application Title
Edit `package.json`:
```json
"build": {
  "productName": "Meu Diário"  // Change app name
}
```

## Customizing Paper Appearance

### Background Color
Edit `src/styles/PaperEditor.css`:
```css
.paper-textarea {
  background-color: #faf6f1;  /* Change this color */
}
```

Available color options:
- `#faf6f1` - Cream (default)
- `#fff8f0` - Warmer cream
- `#f5eeeb` - Cooler cream
- `#fffef9` - Off-white

### Ruled Line Spacing
Edit `src/styles/PaperEditor.css` - the `line-height: 29px` value:
```css
line-height: 29px;  /* 29px = 2.5cm spacing, adjust for tighter/looser lines */
```

Also update the gradient:
```css
repeating-linear-gradient(
  0deg,
  #faf6f1 0px,
  #faf6f1 28px,        /* Should be line-height - 1 */
  #e8d5c4 28px,
  #e8d5c4 29px         /* Should be line-height */
)
```

### Red Margin Color
Edit `src/styles/PaperEditor.css`:
```css
linear-gradient(90deg, #d9534f 0, #d9534f 60px, ...)
                        ^^^^^^^ Change color code
```

Other margin colors:
- `#d9534f` - Red (default)
- `#2196F3` - Blue
- `#4CAF50` - Green
- `#FF9800` - Orange

### Margin Width
Change the 60px value in the same gradient:
```css
linear-gradient(90deg, #d9534f 0, #d9534f 60px, ...)  /* 60px = margin width */
```

## Changing Fonts

### Handwriting Fonts
Edit `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Patrick+Hand&display=swap" rel="stylesheet">
```

Other handwriting fonts:
- `Indie+Flower`
- `Dancing+Script`
- `Pacifico`
- `Satisfy`

Edit `src/styles/PaperEditor.css`:
```css
.date-label {
  font-family: 'Caveat', cursive;        /* Title font */
}

.paper-textarea {
  font-family: 'Patrick Hand', cursive;  /* Text font */
}
```

### Font Size
Edit `src/styles/PaperEditor.css`:
```css
.date-label {
  font-size: 32px;  /* Change title size */
}

.paper-textarea {
  font-size: 18px;  /* Change text size */
}
```

## Mood Emoji Options

### Change Mood Emojis
Edit `src/components/MoodPicker.tsx`:
```javascript
const MOODS = ['😊', '😐', '😢', '😤']  // Change these emojis
```

Suggestions:
- Happy: 😊 😄 😃 🙂
- Neutral: 😐 😑 😶
- Sad: 😢 😭 😔 😞
- Angry: 😤 😠 😡 🤬

## Sidebar Customization

### Entry Preview Length
Edit `src/components/Sidebar.tsx`:
```typescript
const truncateContent = (content: string, maxLength = 50)  // Change 50 to desired length
```

### Sidebar Width
Edit `src/styles/Sidebar.css`:
```css
.sidebar {
  width: 280px;  /* Change sidebar width */
}
```

### Sidebar Colors
```css
.sidebar {
  background: linear-gradient(180deg, #fff5f0 0%, #fef0e8 100%);
  /* Change these color values */
}
```

## Search Customization

### Highlight Color
Edit `src/styles/PaperEditor.css`:
```css
.search-highlight mark {
  background-color: #ffd580;  /* Change highlight color */
  box-shadow: 0 0 0 1.5px #ffb800;  /* Change shadow color */
}
```

### Search Placeholder Text
Edit `src/components/SearchBar.tsx`:
```jsx
placeholder="Buscar nas anotações..."  // Change text
```

## Storage Settings

### Auto-save Delay
Edit `src/components/PaperEditor.tsx`:
```javascript
saveTimeoutRef.current = setTimeout(() => {
  // Save after this delay
}, 2000);  // 2000ms = 2 seconds, adjust as needed
```

### Store Location (Electron)
Edit `electron/main.ts`:
```typescript
// Add to electron main.ts for custom store path
const Store = require('electron-store');
const store = new Store({
  cwd: '/path/to/custom/location'
});
```

## Date Format

### Change Date Display Language
The date is formatted using `Intl.DateTimeFormat` in `src/components/PaperEditor.tsx`:
```javascript
return new Intl.DateTimeFormat('pt-BR', {
  // 'pt-BR' = Portuguese (Brazil)
  // Change to 'en-US' for English, 'fr-FR' for French, etc.
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(date)
```

## Application Theme

### Light Mode (Default)
All CSS uses light colors - cream, white, subtle shadows

### Creating Dark Mode (Advanced)
1. Create `src/styles/dark.css`
2. Add dark theme variables
3. Toggle theme on app startup
4. Example:

```css
:root {
  --bg-paper: #faf6f1;
  --text-color: #333;
}

body.dark-mode {
  --bg-paper: #1e1e1e;
  --text-color: #f0f0f0;
}
```

## Performance Tips

### Optimize Entry Rendering
If you have many entries, use virtual scrolling:
```bash
npm install react-window
```

### Image Optimization
If adding images:
- Keep images under 100KB
- Use WebP format
- Lazy load with Intersection Observer

## Building Custom Styles

### CSS Variables (Recommended)
Add to top of CSS files:
```css
:root {
  --margin-color: #d9534f;
  --line-color: #e8d5c4;
  --paper-bg: #faf6f1;
  --text-color: #333;
  --save-color: #d9534f;
}
```

Then use:
```css
linear-gradient(90deg, var(--margin-color) 0, ...)
background-color: var(--paper-bg);
```

## Testing Changes

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Make changes to files
3. Vite hot-reloads automatically
4. Check browser DevTools for CSS/JS errors
5. Refresh browser if needed (Ctrl+R)

## Reverting Changes

If you make mistakes:
1. Use Git to revert:
   ```bash
   git checkout -- src/
   ```
2. Or restore from backup

## Common Customizations

### Add Watermark
Add to `src/styles/PaperEditor.css`:
```css
.paper-container::before {
  content: 'MINHA VIDA';
  position: absolute;
  font-size: 80px;
  opacity: 0.05;
  transform: rotate(-45deg);
  z-index: 0;
}
```

### Add Corner Fold Effect
```css
.paper-container::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  border: 20px solid transparent;
  border-top: 20px solid #f5eeeb;
  border-right: 20px solid #f5eeeb;
}
```

### Change Save Animation
Edit `src/styles/PaperEditor.css` - `@keyframes stampAppear`

## Need Help?

- Check original files before customizing
- Use browser DevTools to inspect styles
- Test changes in dev mode before building
- Refer to DEVELOPER_GUIDE.md for architecture
