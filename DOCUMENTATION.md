# 📚 Documentation Index

Welcome to **Meu Diário** documentation! Choose your starting point:

## 🎯 Get Started Fast
**Read this first if you want to start immediately**
- [QUICK_START.md](QUICK_START.md) - 30-second setup, basic commands, troubleshooting

## 📖 Main Documentation  
**Complete information about features and usage**
- [README.md](README.md) - Project overview, features, architecture, requirements
- [GUIA_DE_USO.md](GUIA_DE_USO.md) - User guide in Portuguese (Como usar o app)

## 👨‍💻 For Developers
**Technical documentation for building and extending**
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - Setup, project structure, development tips, troubleshooting
- [CUSTOMIZATION.md](CUSTOMIZATION.md) - How to customize colors, fonts, styles, behavior
- [CHANGELOG.md](CHANGELOG.md) - Features, version history, technical details

## 📂 Project Structure

```
Meu Diário Documentation
├── QUICK_START.md          ← START HERE for immediate use
├── README.md              ← Complete project info
├── GUIA_DE_USO.md        ← Portuguese user guide
├── DEVELOPER_GUIDE.md     ← For developers
├── CUSTOMIZATION.md       ← Customize everything
├── CHANGELOG.md           ← Version history & features
└── This file (you are here)
```

## 🎯 Find Answers by Topic

### Installation & Setup
- First time? → [QUICK_START.md](QUICK_START.md)
- Detailed setup? → [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md#quick-start)
- Windows/Mac/Linux? → [README.md](README.md#system-requirements)

### Using the App
- How to write entries? → [GUIA_DE_USO.md](GUIA_DE_USO.md#escrevendo-no-diário)
- How to search? → [GUIA_DE_USO.md](GUIA_DE_USO.md#procurando-anotações)
- How to use moods? → [GUIA_DE_USO.md](GUIA_DE_USO.md#selecionando-seu-humor)
- How to delete entries? → [GUIA_DE_USO.md](GUIA_DE_USO.md#gerenciando-entradas)

### Development & Customization
- Project structure? → [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md#project-structure)
- Change colors? → [CUSTOMIZATION.md](CUSTOMIZATION.md#customizing-paper-appearance)
- Change fonts? → [CUSTOMIZATION.md](CUSTOMIZATION.md#changing-fonts)
- Add features? → [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md#adding-components)
- Optimize performance? → [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md#performance-optimization)

### Troubleshooting
- Problem? → [QUICK_START.md](QUICK_START.md#troubleshooting)
- Data issues? → [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md#troubleshooting)
- Can't run? → [README.md](README.md#system-requirements)
- Technical error? → [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md#troubleshooting)

### Building & Deployment
- Build for production? → [README.md](README.md#building)
- Package as app? → [QUICK_START.md](QUICK_START.md#packaged-app-installer)
- Distribute? → [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md#building-for-production)

## ❓ Common Questions

**Q: How do I start?**
A: See [QUICK_START.md](QUICK_START.md#30-second-setup)

**Q: Can I use it offline?**
A: Yes! 100% offline after initial setup. See [README.md](README.md#offline)

**Q: Where is my data stored?**
A: Locally on your device. See [GUIA_DE_USO.md](GUIA_DE_USO.md#armazenamento-de-dados)

**Q: Can I customize the appearance?**
A: Yes! See [CUSTOMIZATION.md](CUSTOMIZATION.md)

**Q: How do I backup my data?**
A: See [QUICK_START.md](QUICK_START.md#backup-data)

**Q: Is it free?**
A: Yes! MIT licensed, completely free. See [README.md](README.md#license)

**Q: Can I add features?**
A: Yes! It's open source. See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)

**Q: What if I find a bug?**
A: Open an issue in the repository. Check [README.md](README.md#support)

## 🔍 Quick Reference

### Commands
| Command | Use | See |
|---------|-----|-----|
| `npm install` | First setup | [QUICK_START.md](QUICK_START.md) |
| `npm run dev` | Start dev server | [QUICK_START.md](QUICK_START.md) |
| `npm run electron-dev` | Run as desktop app | [QUICK_START.md](QUICK_START.md) |
| `npm run build` | Production build | [QUICK_START.md](QUICK_START.md#production-build) |
| `npm run electron-build` | Build installer | [QUICK_START.md](QUICK_START.md#packaged-app-installer) |

### Files to Edit for Customization
| Want to Change | Edit File | See |
|----------------|-----------|-----|
| Colors | `src/styles/*.css` | [CUSTOMIZATION.md](CUSTOMIZATION.md#customizing-paper-appearance) |
| Fonts | `index.html`, `src/styles/*.css` | [CUSTOMIZATION.md](CUSTOMIZATION.md#changing-fonts) |
| Window size | `electron/main.ts` | [CUSTOMIZATION.md](CUSTOMIZATION.md#changing-application-settings) |
| Moods | `src/components/MoodPicker.tsx` | [CUSTOMIZATION.md](CUSTOMIZATION.md#mood-emoji-options) |
| Auto-save delay | `src/components/PaperEditor.tsx` | [CUSTOMIZATION.md](CUSTOMIZATION.md#auto-save-delay) |

## 📚 Document Summaries

### 📄 QUICK_START.md
**Length:** 2-3 min read  
**Best for:** Getting started immediately  
**Contains:** Setup, features, troubleshooting, tips

### 📄 README.md
**Length:** 5-10 min read  
**Best for:** Understanding the project  
**Contains:** Overview, features, architecture, tech stack

### 📄 GUIA_DE_USO.md
**Length:** 5 min read  
**Best for:** Portuguese-speaking users  
**Contains:** How to use features, data storage, troubleshooting

### 📄 DEVELOPER_GUIDE.md
**Length:** 15 min read  
**Best for:** Developers, customization  
**Contains:** Project structure, setup, development tips, building

### 📄 CUSTOMIZATION.md
**Length:** 20 min read  
**Best for:** Modifying appearance/behavior  
**Contains:** All customization options with examples

### 📄 CHANGELOG.md
**Length:** 10 min read  
**Best for:** Version info, feature history  
**Contains:** What's included, technical details, future plans

## 🎓 Learning Path

**👶 Absolute Beginner:**
1. Read [QUICK_START.md](QUICK_START.md)
2. Run `npm install && npm run dev`
3. Start using the app
4. Read [GUIA_DE_USO.md](GUIA_DE_USO.md) for features

**🤔 Intermediate (Want to customize):**
1. Read [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
2. Read [CUSTOMIZATION.md](CUSTOMIZATION.md)
3. Make changes and test with `npm run dev`

**🚀 Advanced (Want to add features):**
1. Read entire [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
2. Review project structure
3. Check [CHANGELOG.md](CHANGELOG.md) for planned features
4. Start developing!

## 🔗 Navigation

Feeling lost? Here's how to navigate:

- **Looking for quick answers?** → [QUICK_START.md](QUICK_START.md)
- **Need full documentation?** → [README.md](README.md)
- **Want to customize?** → [CUSTOMIZATION.md](CUSTOMIZATION.md)
- **Developer questions?** → [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
- **Português?** → [GUIA_DE_USO.md](GUIA_DE_USO.md)
- **Version history?** → [CHANGELOG.md](CHANGELOG.md)

## 📞 Still Need Help?

1. **Search the docs** - Most questions answered here
2. **Check troubleshooting sections** - Common issues covered
3. **Review examples** - Code examples in DEVELOPER_GUIDE.md and CUSTOMIZATION.md
4. **Browser console** - Press F12 to see any errors

---

**Happy reading! 📖**

*Last updated: June 8, 2026*
