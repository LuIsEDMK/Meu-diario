# 🚀 Meu Diário - Executável Windows

## Como Usar

### Opção 1: Criar Atalho na Área de Trabalho (Recomendado)

1. **Abra PowerShell como Administrador:**
   - Pressione `Windows + X`
   - Selecione "Windows PowerShell (Administrador)"

2. **Execute o script de criação de atalho:**
   ```powershell
   cd "W:\projetos vscode\aplicativo de diario"
   .\create-shortcut.ps1
   ```

3. **Um atalho será criado na sua Área de Trabalho!**
   - Procure por "Meu Diário" na Área de Trabalho
   - Clique duplo para abrir o app

### Opção 2: Iniciar Diretamente

Duplo-clique no arquivo `start-app.bat` na pasta do projeto.

### Opção 3: Usar npm (Para Desenvolvimento)

```bash
npm run electron-dev
```

---

## O Que Acontece

- **Primeira execução:** Pode levar alguns segundos enquanto carrega o Electron
- **Armazenamento:** Seus diários são salvos localmente em:
  ```
  %APPDATA%\meu-diario\
  ```

## Requisitos

- Node.js instalado (se ainda não tiver, baixe em https://nodejs.org/)
- Windows 7 ou superior

## Troubleshooting

### "PowerShell não reconhece o comando"

Se receber erro de execução, execute este comando primeiro:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Depois tente novamente.

### "Erro ao iniciar o app"

Se vir uma mensagem de erro ao executar `start-app.bat`:

1. Verifique se Node.js está instalado:
   ```bash
   node --version
   ```

2. Se não estiver, baixe em https://nodejs.org/ e instale

3. Após instalar Node.js, execute novamente:
   ```bash
   .\start-app.bat
   ```

---

## Dicas

✅ Você pode mover a pasta do projeto para qualquer lugar no seu computador
✅ O atalho funcionará de onde quer que esteja a pasta
✅ Todos os seus dados estão salvos localmente no seu PC
✅ Nenhuma conexão com internet é necessária para usar

---

**Pronto! Clique no atalho da Área de Trabalho e comece a escrever seus diários!** ✍️
