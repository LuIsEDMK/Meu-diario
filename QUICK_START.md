# 🚀 Quick Start - Meu Diário

## 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Browser opens automatically at http://localhost:5173
# Done! Start writing!
```

## Features at a Glance

| Feature | How to Use |
|---------|-----------|
| **📝 Write** | Click textarea, type freely, auto-saves every 2 seconds |
| **😊 Mood** | Click emoji at top to tag your mood |
| **🔍 Search** | Type in search bar to find text, results highlight yellow |
| **📅 Browse** | Click entries in sidebar to view past entries |
| **➕ New** | Click `➕` button to create new entry |
| **❌ Delete** | Hover over entry in sidebar, click `✕` to delete |

## Running Modes

### 🌐 Browser Dev (Simplest)
```bash
npm run dev
```
- Open http://localhost:5173
- Best for development
- Uses browser localStorage

### 🖥️ Desktop App
```bash
npm run electron-dev
```
- Full Electron app experience
- Can use all OS integrations
- Data in electron-store

### 📦 Production Build
```bash
npm run build
```
- Optimized React bundle in `dist/`

### 🎁 Packaged App (Installer)
```bash
npm run electron-build
```
- Creates `.exe` (Windows) or `.app` (macOS)
- Ready to distribute

## First Run Checklist

- [ ] Ran `npm install`
- [ ] Ran `npm run dev`
- [ ] Browser opened to http://localhost:5173
- [ ] Can see paper-like interface with red margin
- [ ] Can type in the text area
- [ ] Can see "Salvo ✓" after typing
- [ ] Can click mood emoji buttons
- [ ] Can search and see highlights
- [ ] Can click new entry button

## Troubleshooting

### "Port 5173 already in use"
```bash
npm run dev -- --port 5174
```

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Nothing appears"
- Press F5 to refresh browser
- Check console: F12 → Console tab
- Verify localStorage: F12 → Storage → Local Storage

### "Fonts don't look handwritten"
- Check internet connection (fonts load from Google)
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page (Ctrl+R)

## File Locations

### Your Data
**Browser:** Stored in localStorage (F12 → Storage → Local Storage)
**Electron:** 
- Windows: `%APPDATA%\meu-diario\`
- macOS: `~/Library/Application Support/meu-diario/`
- Linux: `~/.config/meu-diario/`

### Project Files
```
meu-diario/
├── src/           ← Main React app code
├── electron/      ← Desktop app code
├── README.md      ← Full documentation
├── DEVELOPER_GUIDE.md  ← For developers
└── CUSTOMIZATION.md   ← How to customize
```

## Next Steps

### 🎨 Customize
Edit colors, fonts, or paper appearance:
- See `CUSTOMIZATION.md`

### 🔧 Develop
Add features or modify:
- See `DEVELOPER_GUIDE.md`

### 📖 Learn More
Full documentation:
- See `README.md`

### 🚀 Deploy
Build for production:
- Run `npm run build`
- Run `npm run electron-build` for installer

## Keyboard Shortcuts

- `F12` - Open DevTools
- `F5` - Refresh browser
- `Ctrl+A` - Select all (in textarea)
- `Ctrl+F` - Browser search (for debugging)

## Tips & Tricks

💡 **Tip 1:** Use "Salvei uma memória" in text to test search feature

💡 **Tip 2:** Change mood multiple times - it saves instantly

💡 **Tip 3:** Search filters sidebar too - only shows matching entries

💡 **Tip 4:** Auto-save waits 2 seconds - don't close app immediately after typing

💡 **Tip 5:** Check browser console (F12) for any errors

## Common Tasks

### Delete All Data
**Browser:** DevTools → Storage → Local Storage → Delete `diary_entries`
**Electron:** Delete files in user data folder (see above)

### Export Data
Data is stored as JSON. To export:
1. DevTools → Storage → Local Storage
2. Copy the `diary_entries` value
3. Save as `.json` file

### Import Data
1. Edit the JSON file
2. DevTools → Console
3. Paste: `localStorage.setItem('diary_entries', JSON.stringify([...entries...]))`

### Backup Data
1. Copy data folder
2. Save to external drive
3. Restore by pasting back

## Performance

- Works on older computers
- Can handle 1000+ entries
- Lightweight (~2MB install size)
- Fast search even with lots of entries

## Need Help?

1. **Quick issues?** → Check Troubleshooting section
2. **Setup problems?** → See `README.md`
3. **Want to customize?** → See `CUSTOMIZATION.md`
4. **Developer questions?** → See `DEVELOPER_GUIDE.md`
5. **Feature requests?** → See `CHANGELOG.md` for planned features

---

**Ready to start?**
```bash
npm install && npm run dev
```

**Happy writing!** ✍️
