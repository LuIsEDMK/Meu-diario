# Meu Diário

Aplicativo de diário pessoal para Windows — bonito, leve e 100% offline. Escreva seus pensamentos, registre seu humor e acompanhe sua evolução ao longo do tempo.

## Download

**[⬇️ Baixar Meu Diário Setup 1.0.1.exe](https://github.com/LuIsEDMK/Meu-diario/releases/download/v1.0.1/Meu.Diario.Setup.1.0.1.exe)**

Ou veja todas as versões na [página de Releases](https://github.com/LuIsEDMK/Meu-diario/releases).

> **Requisito:** Windows 10 ou superior (64-bit). Não é necessário instalar Node.js ou qualquer dependência.

## Funcionalidades

- ✍️ **Editor de texto** — escreva suas páginas com múltiplos estilos de fonte
- 😊 **Humor do dia** — registre como você está se sentindo
- 🏷️ **Tags** — organize suas páginas com etiquetas personalizadas
- 📊 **Estatísticas** — acompanhe sua frequência de escrita e sequências
- 🔍 **Busca** — encontre qualquer página por texto, título ou tag
- 🔐 **100% privado** — tudo salvo localmente, sem nuvem, sem conta

---

## Para desenvolvedores

### Requisitos

- Node.js 18+ e npm 9+
- Windows 10+ (64-bit)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/LuIsEDMK/Meu-diario.git
cd Meu-diario
```

2. Instale as dependências:
```bash
npm install
```

### Desenvolvimento

Inicia o app em modo dev com hot reload:

```bash
npm run electron-dev
```

### Gerar instalador

```bash
npm run electron-build
```

O instalador será gerado em `release/Meu Diário Setup <versão>.exe`.

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
