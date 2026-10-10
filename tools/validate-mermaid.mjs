// Valida a sintaxe dos diagramas Mermaid do repositório, sem navegador.
//
//   npm install mermaid jsdom
//   node tools/validate-mermaid.mjs docs/diagramas/*.mmd
//
// Sai com código 1 se qualquer diagrama não analisar, para poder ser usado
// como gate em um hook de pre-commit.

import fs from 'fs';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><body></body>', { pretendToBeVisual: true });
global.window = dom.window;
global.document = dom.window.document;
global.Element = dom.window.Element;
global.SVGElement = dom.window.SVGElement;

const mermaid = (await import('mermaid')).default;
mermaid.initialize({ startOnLoad: false });

const arquivos = process.argv.slice(2);
if (arquivos.length === 0) {
  console.error('uso: node tools/validate-mermaid.mjs <arquivo.mmd> [...]');
  process.exit(2);
}

let falhas = 0;
for (const arquivo of arquivos) {
  const conteudo = fs.readFileSync(arquivo, 'utf8');
  try {
    await mermaid.parse(conteudo);
    console.log('OK    ' + arquivo);
  } catch (erro) {
    falhas++;
    const msg = String(erro?.message ?? erro).split('\n').slice(0, 6).join('\n      ');
    console.log('ERRO  ' + arquivo + '\n      ' + msg);
  }
}

console.log(`\n${arquivos.length - falhas}/${arquivos.length} diagramas válidos.`);
process.exit(falhas ? 1 : 0);
