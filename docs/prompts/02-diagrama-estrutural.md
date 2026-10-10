# Etapa 2 — Diagrama estrutural em Mermaid

```text
Você é um arquiteto de software sênior. Gere um diagrama estrutural em Mermaid a
partir do roteiro revisado abaixo.

Roteiro revisado:
<conteúdo de docs/descricao-sistema.md>

REGRAS DO DIAGRAMA:
- Use apenas o nível de containers; não misture com componentes nem com rotas.
- Marque toda integração de terceiro como EXTERNO, fora da fronteira do sistema.
- Mostre apenas dependências relevantes; não liste endpoints.
- Use notação Mermaid flowchart, válida para renderização direta no GitHub.
- Evite caracteres que quebrem o parser: sem acento dentro dos rótulos de nó, sem
  parênteses soltos, texto de aresta sempre entre aspas.
- Se algo for suposição, declare a suposição antes do código.

Entregue:
1) 3 a 6 suposições, se houver.
2) O código Mermaid completo.
3) Um checklist de revisão de 8 a 12 itens, focado em limites, dependências e
   vazamentos.

Fora de escopo: não proponha mudanças na arquitetura; desenhe a que existe.
Formato: Markdown.
```

## Ajustes feitos sobre a saída

- Containers inventados para presença e site foram colapsados na aplicação de gestão.
- O serviço de push saiu de dentro da fronteira do sistema.
- O agendador externo entrou, porque sem ele nenhum jogo muda de estado.
- Acentos nos rótulos de nó foram removidos para não depender do modo de rotulagem
  em HTML do renderizador. O texto corrido do README mantém a acentuação normal.
