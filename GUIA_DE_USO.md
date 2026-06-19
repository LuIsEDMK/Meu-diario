# Guia de Uso - Meu Diário

## Iniciando o Aplicativo

### Modo Desenvolvimento

1. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O aplicativo abrirá em `http://localhost:5173`

2. **Para executar com Electron (em desenvolvimento):**
   ```bash
   npm run electron-dev
   ```

### Produção

Para criar um build de produção:
```bash
npm run build
```

Para construir com Electron e criar um instalador:
```bash
npm run electron-build
```

## Funcionalidades

### Escrevendo no Diário
1. Clique no textarea principal ("Comece a escrever seu diário...")
2. Digite seu texto - o aplicativo auto-salva a cada 2 segundos
3. Veja o "Salvo ✓" aparecer no canto inferior direito

### Selecionando seu Humor
Clique em um dos emojis no topo da página:
- 😊 Feliz
- 😐 Neutro
- 😢 Triste
- 😤 Irritado

### Procurando Anotações
1. Use a barra de busca no topo
2. Digite o termo de busca
3. As palavras correspondentes serão destacadas em amarelo
4. Clique no ✕ para limpar a busca

### Gerenciando Entradas
1. **Nova entrada:** Clique o botão ➕ na barra lateral
2. **Ver entrada anterior:** Clique na entrada na barra lateral
3. **Deletar entrada:** Passe o mouse sobre a entrada e clique no ✕
4. **Confirmar deleção:** Clique OK na caixa de confirmação

## Armazenamento de Dados

Todas as suas entradas são salvas localmente em:

**Windows:**
```
%APPDATA%\meu-diario\
```

**macOS:**
```
~/Library/Application Support/meu-diario/
```

**Linux:**
```
~/.config/meu-diario/
```

Os dados são armazenados em formato JSON - completamente privado e sem sincronização com a nuvem.

## Dicas

- Use a data em PT-BR para melhor experiência
- As entradas são armazenadas por data
- Você pode ter múltiplas entradas por dia
- A busca é case-insensitive (não diferencia maiúsculas)
- Use Ctrl+F ou Cmd+F no app para usar a busca do navegador

## Troubleshooting

### Entradas não aparecem na barra lateral
- Recarregue a página (F5)
- Verifique se há entradas salvas
- Limpe o cache do navegador se necessário

### Auto-save não está funcionando
- Verifique a console do navegador (F12)
- Certifique-se de que localStorage está habilitado
- Recarregue a página

### Fonte de caligrafia não aparece
- A fonte é carregada do Google Fonts
- Verifique sua conexão de internet
- Limpe o cache do navegador

## Suporte

Para problemas ou sugestões, abra uma issue no repositório do projeto.
