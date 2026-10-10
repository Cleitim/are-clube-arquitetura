# ADR-001: Onde executar o reconhecimento facial do totem

- **Status:** Proposto
- **Data:** 2026-10-10
- **Decisores:** desenvolvedor responsável e diretoria do clube

## Contexto

O totem de presença é um tablet em modo quiosque, instalado no clube, sem login. Para
identificar o associado, a tela carrega modelos de visão computacional e compara o
rosto capturado pela câmera com os descritores faciais cadastrados.

Hoje essa comparação acontece no navegador. Para que funcione, o servidor entrega ao
tablet o descritor facial de **todos** os associados ativos, em uma única requisição
sem autenticação de usuário. O descritor é um vetor numérico derivado do rosto, ou
seja, dado biométrico, categoria especial de dado pessoal na LGPD.

Esse comportamento não foi uma decisão registrada. Ele apareceu ao desenhar o
diagrama de sequência da jornada de check-in.

## Decisão proposta

A definir. O que esta ADR registra é que a decisão existe e precisa ser tomada, com
três alternativas na mesa.

## Alternativas consideradas

### A. Manter a comparação no navegador, como está

- A favor: funciona sem latência de rede durante a fila de check-in, que é o momento
  mais sensível da jornada. Não depende de a hospedagem compartilhada aguentar
  processamento de imagem.
- Contra: expõe o template biométrico de todo o quadro ativo a um dispositivo físico
  que fica em campo. Perda ou clonagem do tablet, ou interceptação da resposta, expõe
  dado sensível de todos, não de um.

### B. Comparar no servidor, enviando apenas o descritor capturado

- A favor: o template dos demais associados nunca sai do banco. Reduz o impacto de
  perda do tablet ao vetor de quem está na frente da câmera naquele instante.
- Contra: joga processamento para uma hospedagem compartilhada, sem garantia de
  capacidade, exatamente no horário de pico do check-in. Introduz dependência de rede
  no passo mais sensível da jornada.

### C. Manter no navegador, restringindo o conjunto entregue

- A favor: entrega apenas os descritores de quem está confirmado ou é esperado no jogo
  do dia, em vez de todo o quadro ativo. Reduz a exposição sem mudar a arquitetura.
- Contra: quebra o check-in de quem aparece sem confirmação prévia, que é um caso
  comum no clube. Exige regra nova de quem entra na lista.

## Consequências a aceitar

Qualquer das três exige, antes de ser considerada resolvida:

- Registro de consentimento do associado para o uso de biometria.
- Política de retenção e procedimento de exclusão do descritor.
- Procedimento definido para tablet perdido ou roubado, incluindo rotação do segredo
  compartilhado que autoriza o totem.

## Plano de verificação

Nenhuma métrica está sendo inventada aqui. O que precisa ser medido, antes de decidir:

1. Taxa de falha de reconhecimento hoje, contada no próprio totem, separando rosto não
   encontrado de rosto trocado. Sem esse número não dá para comparar A com B.
2. Tempo entre o posicionamento do rosto e a confirmação na tela, medido no cliente,
   em dia de jogo cheio.
3. Tamanho da resposta com os descritores, para estimar o custo da alternativa B em uma
   hospedagem compartilhada.
4. Quantos associados fazem check-in sem confirmação prévia, para avaliar se a
   alternativa C é viável.

## Sinais de alerta

- Reclamação recorrente de associado reconhecido como outro. Indica limiar inadequado,
  e o risco de identificação cruzada é maior do que o de fila lenta.
- Qualquer cópia do banco ou do tráfego do totem saindo do clube sem controle.
- Crescimento do quadro ativo a ponto de a carga de descritores atrasar a abertura da
  tela do totem.

## Lacunas que impedem a decisão agora

- Não há consentimento formal coletado hoje.
- Não há medição de falha de reconhecimento.
- Não está definido quem no clube responde pelo tratamento de dado pessoal.
