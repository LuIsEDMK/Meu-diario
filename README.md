# Meu Diário - Desktop Diary Application

A beautiful, lightweight desktop diary application with a paper-like interface. Write your thoughts, memories, and ideas in a nostalgic notebook environment. Fully offline and privacy-focused.

## Features

- 📓 **Paper-like Interface** - Beautiful ruled paper with red margin line
- ✍️ **Auto-save** - Automatic saving every 2 seconds with visual feedback
- 📅 **Entry Management** - Browse, search, and organize all your entries
- 🔍 **Full-text Search** - Search across all entries with highlighting
- 😊 **Mood Tags** - Track your mood with emoji tags (😊 😐 😢 😤)
- 🔐 **100% Private** - All data stored locally, no cloud sync
- ⚡ **Fast & Lightweight** - Built with Electron and React
- 🖋️ **Handwriting Fonts** - Caveat and Patrick Hand fonts for authentic feel

## System Requirements

- Node.js 16+ and npm 7+
- Windows, macOS, or Linux

## Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd meu-diario
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server with live reload:

```bash
npm run electron-dev
```

This command:
- Starts Vite dev server on http://localhost:5173
- Opens the Electron app and automatically connects to the dev server
- Hot reloads on code changes

## Building

Create a production build:

```bash
npm run build
```

This will:
- Build React app with Vite
- Compile TypeScript for Electron
- Package with electron-builder

The built app will be in the `dist` or `out` directory depending on your OS.

## Project Structure

```
meu-diario/
├── electron/               # Electron main process & preload
│   ├── main.ts            # Main process entry point
│   └── preload.ts         # Context bridge for IPC
├── src/                   # React application
│   ├── components/        # React components
│   │   ├── PaperEditor.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SearchBar.tsx
│   │   └── MoodPicker.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── useStorage.ts # Local storage management
│   ├── styles/           # CSS files
│   ├── App.tsx           # Main React app
│   └── main.tsx          # React entry point
├── index.html            # HTML template
├── package.json
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

## Data Storage

Entries are stored locally using `electron-store` in:
- **Windows**: `%APPDATA%/meu-diario/`
- **macOS**: `~/Library/Application Support/meu-diario/`
- **Linux**: `~/.config/meu-diario/`

## Architecture

### Frontend (React + Vite)
- **Sidebar**: Browse and manage past entries
- **Paper Editor**: Write entries with auto-save
- **Search Bar**: Full-text search functionality
- **Mood Picker**: Select mood emoji for current entry

### Storage Layer (useStorage Hook)
- Uses `electron-store` for persistent local storage
- Fallback to localStorage in development
- Simple JSON-based data structure

### Electron Process
- Main process handles window management
- Preload script enables secure IPC
- App opens to today's entry by default
- One window instance enforced

## Styling

The paper-like interface is achieved using:
- CSS gradients for ruled lines and red margin
- Google Fonts (Caveat, Patrick Hand)
- Box shadows for depth
- Subtle animations for interactions
- Responsive design for all screen sizes

## Keyboard Shortcuts

- `Ctrl/Cmd+F` - Focus search
- `Esc` - Clear search
- `Ctrl/Cmd+N` - New entry
- `Ctrl/Cmd+Q` - Quit app

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Future Enhancements

- Cloud backup (optional)
- Export to PDF
- Entry templates
- Custom fonts
- Dark mode
- Entry categories
- Calendar view
- Handwriting recognition

## Support

For issues or questions, please open an issue on GitHub.
