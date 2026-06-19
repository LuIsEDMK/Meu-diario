# Developer Setup Guide

## Quick Start

### Prerequisites
- Node.js 16+ and npm 7+
- Windows, macOS, or Linux

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   - Opens browser at `http://localhost:5173`
   - Data stored in localStorage during development

3. **With Electron (full desktop app):**
   ```bash
   npm run electron-dev
   ```
   - Starts Vite dev server
   - Opens Electron window
   - Hot reloads on code changes

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build React + Electron |
| `npm run preview` | Preview production build |
| `npm run electron-dev` | Run full Electron app in dev |
| `npm run electron-build` | Build packaged desktop app |

## Project Structure

```
src/
├── components/          # React components
│   ├── PaperEditor.tsx # Main editor with paper styling
│   ├── Sidebar.tsx     # Entry list & navigation
│   ├── SearchBar.tsx   # Search functionality
│   └── MoodPicker.tsx  # Emotion tags
├── hooks/
│   └── useStorage.ts   # Local storage management
├── styles/             # Component CSS
├── App.tsx            # Main app component
├── main.tsx           # React entry point
└── types.ts           # TypeScript types

electron/
├── main.ts            # Electron main process
├── preload.ts         # Security bridge
└── tsconfig.json      # Electron TypeScript config
```

## Key Features Implementation

### Paper Styling (`src/styles/PaperEditor.css`)
- CSS gradients for ruled lines & red margin
- Background pattern: `repeating-linear-gradient`
- Handwriting fonts: Caveat (title), Patrick Hand (text)
- Line-height: 29px matches gradient spacing

### Auto-save (`src/components/PaperEditor.tsx`)
- 2-second delay before saving
- Ink-stamp animation on save
- Saves to localStorage/electron-store

### Search (`src/components/SearchBar.tsx`)
- Case-insensitive full-text search
- Yellow highlight overlay
- Real-time highlighting

### Storage (`src/hooks/useStorage.ts`)
- electron-store for production (Electron)
- localStorage fallback for dev (browser)
- JSON data format

## Development Tips

### Hot Reload
- Vite provides instant HMR
- Changes reflect immediately in browser
- Electron reloads on main process changes

### Browser DevTools
- Open DevTools: `F12`
- Check Console for errors
- Inspect localStorage: DevTools → Storage → Local Storage

### Adding Components
1. Create `.tsx` file in `src/components/`
2. Create `.css` file in `src/styles/`
3. Import & use in `App.tsx`

### Modifying Styles
- Paper styling: `src/styles/PaperEditor.css`
- Sidebar styling: `src/styles/Sidebar.css`
- Colors defined as CSS variables recommended

## Data Storage

### Development (Browser)
```javascript
localStorage.getItem('diary_entries')
// Returns JSON array of entries
```

### Production (Electron)
```
Windows: %APPDATA%/meu-diario/
macOS: ~/Library/Application Support/meu-diario/
Linux: ~/.config/meu-diario/
```

## Troubleshooting

### Port 5173 Already in Use
```bash
# Kill the process or use different port
npm run dev -- --port 5174
```

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styles Not Loading
- Check browser cache (Ctrl+Shift+Delete)
- Verify CSS file path in imports
- Check browser console for 404 errors

### Electron Won't Start
- Ensure Vite server is running first
- Check port 5173 is accessible
- Run `npm install` again

## Building for Production

1. **Development build:**
   ```bash
   npm run build
   ```
   Creates `dist/` folder with optimized React app

2. **Packaged app (macOS/Windows installer):**
   ```bash
   npm run electron-build
   ```
   Uses electron-builder (requires configuration)

3. **Cross-platform builds:**
   - Install build tools for target OS
   - Modify `electron-builder` config in `package.json`

## Performance Optimization

- Lazy load components for large apps
- Use React.memo for expensive components
- Optimize images and assets
- Code splitting with Vite

## Security Notes

- Electron preload script isolates context
- IPC communication between processes
- Data stored locally only
- No external API calls

## Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Electron Documentation](https://www.electronjs.org/docs)
- [electron-store](https://github.com/sindresorhus/electron-store)

## Contributing

1. Create feature branch
2. Make changes
3. Test in dev mode
4. Create pull request

## License

MIT
