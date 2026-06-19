# 📔 Meu Diário - Comece a Usar Agora!

## ✅ Seu Aplicativo Está Pronto!

Seu **Meu Diário** foi configurado com sucesso! Um atalho foi criado na sua **Área de Trabalho**.

### 🚀 Para Iniciar o App:

1. **Procure na sua Área de Trabalho pelo arquivo:**
   ```
   Meu Diario.lnk
   ```

2. **Clique duplo** para abrir o aplicativo

3. **Pronto!** O app se abrirá com a interface do seu diário

---

## 📝 Como Usar

### Escrevendo suas anotações:

- **Clique no espaço branco** para começar a digitar
- O texto é **auto-salvo a cada 2 segundos** (você verá um carimbo de tinta)
- Use as **emojis de humor** para marcar como você está se sentindo:
  - 😊 Feliz
  - 😐 Neutro
  - 😢 Triste
  - 😤 Irritado

### Consultando entradas antigas:

- **Clique nas abas à esquerda** para ver suas anotações anteriores
- **Procure pelo conteúdo** usando a barra de busca (ctrl+F no navegador)

### Deletando uma entrada:

- **Passe o mouse** sobre uma aba de entrada
- **Clique no botão ✕** que aparece para deletar

---

## 💾 Onde os Dados São Guardados

Todos os seus diários são **salvos localmente** em:
```
C:\Users\[seu-usuario]\AppData\Roaming\meu-diario\
```

### Características:
✅ **100% Offline** - Sem necessidade de internet  
✅ **Privado** - Dados só no seu PC  
✅ **Seguro** - Nada é enviado para ninguém  

---

## 🔧 Troubleshooting

### "O app não abre"

Verifique se você tem **Node.js instalado**:

1. Abra PowerShell como Administrador
2. Execute:
   ```powershell
   node --version
   ```

Se não mostrar uma versão, **baixe Node.js em:** https://nodejs.org/

### "Preciso reinstalar o atalho"

Abra PowerShell como Administrador e execute:

```powershell
cd "W:\projetos vscode\aplicativo de diario"
.\create-shortcut.ps1
```

### "Quer começar o desenvolvimento?"

Para modo de desenvolvimento com auto-reload:

```bash
cd "W:\projetos vscode\aplicativo de diario"
npm run electron-dev
```

---

## 📂 Estrutura do Projeto

```
aplicativo de diario/
├── src/                    # Código React
├── electron/               # Código Electron
├── assets/                 # Ícones e recursos
├── dist/                   # Build produção
├── start-app.bat          # Script para iniciar o app
├── create-shortcut.ps1    # Script para criar atalho
└── package.json           # Configuração npm
```

---

## ✨ Características Principais

- **Interface estilo papel** com linhas e margem vermelha
- **Fontes manuscritas** (Caveat e Patrick Hand)
- **Auto-save automático** a cada 2 segundos
- **Busca de conteúdo** em tempo real
- **Tags de humor** com emojis
- **Uma entrada por dia** (ou múltiplas conforme desejar)
- **Totalmente offline**

---

## 🎨 Personalizando

Você pode modificar:

- **Cores** em `src/styles/`
- **Fontes** em `src/index.html`
- **Comportamento** em `src/App.tsx`

Depois execute:
```bash
npm run electron-dev
```

---

## 📞 Precisa de Ajuda?

Consulte os arquivos de documentação:
- `README.md` - Visão geral do projeto
- `DEVELOPER_GUIDE.md` - Guia para desenvolvedores
- `CUSTOMIZATION.md` - Como personalizar
- `GUIA_DE_USO.md` - Guia em português

---

**Aproveite seu novo diário! ✍️**

Clique no atalho **"Meu Diario"** na Área de Trabalho para começar! 🎉
