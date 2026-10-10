# Descrição do sistema em linguagem natural

Roteiro usado como entrada para a geração dos diagramas. Segue os elementos da
Tabela 2 da Unidade III: escopo, nível, limites e responsabilidades, integrações,
restrições e lacunas.

## Escopo

O A.R.E Football Club é um clube de futebol amador em Morrinhos (GO). O sistema de
gestão cobre associados, mensalidades, presença em jogos, comandas do bar, caixa,
produtos, fornecedores, funcionários e a landing page pública do clube.

Entra nesta documentação: a visão de containers do sistema inteiro e a jornada
crítica de check-in de presença em dia de jogo.

Fica de fora: telas de cadastro administrativo, relatórios do caixa, fluxo de
comandas e o detalhamento interno de cada controller. Esses módulos aparecem nos
diagramas apenas como responsabilidade da aplicação de gestão, sem abrir o nível
de componentes.

## Nível da visão

Dois níveis, em desenhos separados:

- Estrutural, nível de containers, inspirado no C4. Mostra aplicações, banco,
  armazenamento de arquivos e integrações externas.
- Comportamental, diagrama de sequência, para o check-in pelo totem, mais uma
  máquina de estados para o ciclo de vida do jogo.

Nenhum desenho mistura níveis. Rotas e endpoints só aparecem no diagrama de
sequência, onde a ordem das mensagens é o próprio objeto da análise.

## Limites e responsabilidades

- **Aplicação de gestão.** PHP com MVC próprio, sem framework. Um único ponto de
  entrada, `public/index.php`, registra as rotas e despacha para controllers.
  Concentra autenticação, regra de negócio e acesso a dados.
- **App do associado.** Páginas servidas pela própria aplicação, com Service
  Worker e manifesto para funcionar como PWA. Faz check-in, consulta mensalidades
  e recebe notificações.
- **Totem de presença.** Tela sem login, instalada em um tablet no clube. Carrega
  os modelos do face-api.js localmente, reconhece o rosto no navegador e envia
  apenas o identificador do associado para o servidor. Tem WebAuthn como
  alternativa à face.
- **Landing page pública.** HTML e JavaScript sem etapa de build, hospedada na
  raiz do domínio. Consome um único endpoint JSON para montar elenco,
  campeonato, patrocinadores, notícias e galeria.
- **Banco de dados.** MySQL único, acessado por PDO através de um singleton.
- **Armazenamento de arquivos.** Uploads de fotos e logos gravados em disco,
  dentro da pasta pública.

## Integrações externas

- Serviço de push do navegador, do tipo FCM ou autopush, acionado por chamadas
  HTTP assinadas com VAPID feitas pelo próprio PHP.
- Entrega de e-mail para recuperação de senha, via função nativa do servidor.
- Agendador de tarefas do painel de hospedagem, que chama um endpoint protegido
  por token para abrir e encerrar jogos no horário.

Nenhuma dessas integrações tem contrato próprio documentado hoje. Isso está
registrado como lacuna.

## Restrições

- Hospedagem compartilhada. Sem Docker, sem acesso root, sem pipeline de
  integração contínua. Deploy manual.
- Desenvolvedor único, em tempo parcial. Não há suíte de testes automatizados.
- Legado: regra de negócio e acesso a dados convivem dentro dos controllers.
  Mudanças de schema são aplicadas por `ALTER TABLE` disparado em código de
  inicialização, não por migrações versionadas.
- Dados sensíveis sob a LGPD: CPF, telefone e endereço dos associados, mais
  descritores faciais e credenciais WebAuthn, que são dado biométrico.
- A landing page não pode depender de sessão. O endpoint que ela consome é
  público e precisa continuar assim.

## Dependências que não devem existir

- A landing page não acessa o banco diretamente. Só fala com o endpoint público.
- O totem não recebe sessão de administrador. Autentica-se por segredo
  compartilhado e só pode escrever presença.
- Nenhum cliente fala com o MySQL sem passar pela aplicação de gestão.

## Lacunas

1. Não existe contrato versionado do endpoint público consumido pela landing
   page. Uma mudança de campo quebra o site sem aviso.
2. O totem recebe o descritor facial de todos os associados ativos para fazer a
   comparação no navegador. Falta decidir se isso é aceitável sob a LGPD. Está
   registrado em ADR-001.
3. Não há política de retenção nem de revogação de dado biométrico.
4. O segredo do totem é uma constante fixa em arquivo de configuração. Falta
   definir rotação e o que acontece se o tablet for perdido.
5. Não está definido o comportamento do check-in quando a rede cai no meio da
   requisição. Hoje o associado simplesmente tenta de novo.
6. Não há métrica coletada sobre falha de reconhecimento facial. Sem isso, não dá
   para saber se o limiar de similaridade adotado está adequado.
7. O agendador externo é o único mecanismo que abre e encerra jogos no horário.
   Não há alarme se ele parar de rodar.
