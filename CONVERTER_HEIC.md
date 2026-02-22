# Conversor de Arquivos HEIC

Este guia explica como converter arquivos HEIC para PNG/JPG para que possam ser visualizados no site.

## Opção 1: Usar o Script Automático (Recomendado)

1. **Instale a biblioteca sharp:**
   ```bash
   npm install sharp --save-dev
   ```

2. **Execute o script de conversão:**
   ```bash
   npm run convert-heic
   ```

O script irá:
- Encontrar todos os arquivos HEIC na pasta `src/imagens/` e converter para PNG
- Encontrar outras imagens não-PNG (JPG, JPEG, WEBP, GIF, BMP) em todas as subpastas (incluindo `portico_de_entrada`) e converter para PNG
- Manter os arquivos HEIC originais; nas demais conversões para PNG o arquivo original é removido após sucesso

## Opção 2: Conversão Manual Online

1. Acesse um conversor online gratuito:
   - https://heictojpg.com
   - https://cloudconvert.com/heic-to-png
   - https://convertio.co/heic-png/

2. Faça upload dos arquivos HEIC da pasta `src/imagens/tenda_paissandu_5x5/`

3. Baixe os arquivos convertidos em PNG ou JPG

4. Substitua os arquivos HEIC pelos PNG/JPG convertidos na mesma pasta

## Opção 3: Usar macOS Preview (se estiver no Mac)

1. Abra os arquivos HEIC com Preview
2. Vá em **Arquivo → Exportar**
3. Escolha formato **PNG** ou **JPEG**
4. Salve na mesma pasta `src/imagens/tenda_paissandu_5x5/`

## Opção 4: Usar ImageMagick (Windows/Mac/Linux)

1. Instale ImageMagick: https://imagemagick.org/script/download.php

2. Execute no terminal:
   ```bash
   cd src/imagens/tenda_paissandu_5x5
   magick convert *.heic -set filename:base "%[basename]" "%[filename:base].png"
   ```

## Formato Suportado

Após a conversão, o site suporta os seguintes formatos:
- PNG ✅
- JPG/JPEG ✅
- WEBP ✅
- SVG ✅
- GIF ✅
- BMP ✅

**Nota:** Arquivos HEIC não são suportados diretamente pelos navegadores, por isso é necessário converter.
