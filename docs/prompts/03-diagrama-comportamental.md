# Etapa 3 — Diagrama comportamental em Mermaid

```text
Você é um arquiteto de software sênior. Gere um diagrama comportamental para tornar
explícitas as interações da jornada crítica.

Descrição (linguagem natural):
No dia do jogo, o associado chega ao clube e faz check-in em um totem instalado em um
tablet, sem login. A tela carrega modelos de visão computacional e reconhece o rosto
no próprio navegador. Identificado o associado, o totem envia o check-in para a
aplicação PHP, que resolve qual é o jogo do dia, valida o associado, recusa presença
duplicada, respeita o limite de jogadores e devolve a posição na fila de chegada.
Há WebAuthn como alternativa quando o rosto não é reconhecido.

Objetivo do diagrama:
- Tipo: comportamental
- Notação: diagrama de sequência em Mermaid
- Escopo: do carregamento da tela até a confirmação na tela do totem

Entregue nesta ordem:
1) 5 a 8 lacunas e 4 a 6 perguntas de esclarecimento.
2) Roteiro revisado em 8 a 12 linhas, com participantes, mensagens relevantes,
   condições de sucesso e pelo menos uma falha realista.
3) O código Mermaid completo, com caminho de sucesso e caminhos de recusa.
   Indique onde a idempotência é necessária e por quê.
4) Checklist de 8 a 12 itens para revisão, cobrindo ordem, falhas parciais, efeitos
   colaterais e observabilidade mínima.

REGRAS CRÍTICAS:
- Explicite suposições; não assuma fatos como certezas.
- Não invente acordos de nível de serviço, tempos limite nem limiares.
- Não modele fluxos fora do escopo, como cancelamento de presença pelo admin.

Formato: Markdown.
Saída esperada: um diagrama em que o revisor consiga apontar, em cada repetição de
leitura, qual mecanismo impede presença duplicada.
```

## Ajustes feitos sobre a saída

- O modelo colocou o reconhecimento facial no servidor. Movido para o navegador, que
  é onde o código executa a comparação. Essa correção originou o ADR-001.
- O modelo propôs um tempo limite com valor numérico. Removido, porque não existe
  esse valor definido no sistema. Virou lacuna de medição.
- A anotação de idempotência foi colocada exatamente sobre a checagem de duplicata,
  em vez de aparecer como comentário genérico no rodapé.
- O caminho de queda de rede entrou como nota, não como fluxo desenhado, porque hoje
  não existe tratamento. Documentar a ausência vale mais do que desenhar um
  tratamento imaginário.
