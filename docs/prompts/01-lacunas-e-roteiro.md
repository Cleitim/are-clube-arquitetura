# Etapa 1 — Lacunas e roteiro, antes de qualquer diagrama

Objetivo: forçar as suposições a aparecerem antes de existir desenho. Nenhum diagrama
é gerado nesta etapa.

```text
Você é um arquiteto de software sênior. Antes de gerar qualquer diagrama, identifique
lacunas e faça perguntas de esclarecimento.

REGRAS CRÍTICAS:
- Se faltar contexto, explicite; não assuma fatos.
- Não invente números, limiares, tempos limite nem volumes.
- Marque cada afirmação como [FATO], quando vier do contexto abaixo, ou [HIPÓTESE].

Descrição (linguagem natural):
Sistema de gestão de um clube de futebol amador. Aplicação em PHP com MVC próprio,
sem framework, ponto de entrada único, banco MySQL, front-end sem etapa de build.
Três clientes: a landing page pública, o app do associado como PWA e um totem de
presença em tablet, sem login, que reconhece o rosto do associado e registra o
check-in. Hospedagem compartilhada, sem Docker e sem integração contínua.
Desenvolvedor único. Há dado biométrico envolvido.

Objetivo do diagrama:
- Tipo: estrutural
- Nível: containers
- Escopo: entra o sistema inteiro no nível de containers; fica de fora o
  detalhamento interno de cada módulo administrativo.

Restrições:
- Dependências proibidas: nenhum cliente acessa o banco diretamente; a landing page
  não depende de sessão; o totem não recebe sessão de administrador.
- Não deve aparecer no diagrama: rotas, endpoints, nomes de classe.

Entregue:
1) 5 a 10 lacunas ou ambiguidades relevantes.
2) 5 a 8 perguntas de esclarecimento, curtas e objetivas.
3) Um roteiro revisado em 8 a 12 linhas, cobrindo escopo, nível, limites e
   responsabilidades, integrações externas, restrições e lacunas.

Fora de escopo: não gere o diagrama nesta etapa.
Formato: Markdown.
Saída esperada: um roteiro que outra pessoa consiga usar na etapa seguinte sem reler
o contexto original.
```

## Resultado

As perguntas que mais mudaram o desenho foram três: onde roda o reconhecimento
facial, quem dispara a transição de estado dos jogos e se a landing page lê o banco
ou um endpoint. As três foram respondidas lendo o código, não chutando. O roteiro
consolidado virou [../descricao-sistema.md](../descricao-sistema.md).
