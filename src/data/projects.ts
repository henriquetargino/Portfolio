// Fonte única de verdade dos projetos (home + fichas).
// Conteudo PT. O EN entra numa fase dedicada de i18n.

export interface ProjectSection {
  h3: string;
  body: string[]; // parágrafos (HTML inline permitido: <strong>, <em>)
  media?: { src: string; cap: string; heavy?: boolean }[]; // figuras/screenshots ao fim da seção
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  kind: string;
  title: string;
  lead: string;
  cover: string;
  coverIsVideo?: boolean;
  rep?: 'hand' | 'nn';
  featured: boolean;
  cell: string;
  metric: { value: string; label: string } | { value: string; label: string }[];
  tags: string[];
  links?: ProjectLink[];
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: 'detector-sos',
    kind: 'visão computacional',
    title: 'Detector de Sinal de Socorro',
    lead: 'Um detector que reconhece o gesto universal de pedido de ajuda em tempo real, só com webcam. Sem usar nenhum algoritmo de deep learning: 21 landmarks da mão, geometria euclidiana e uma máquina de estados de 3 fases (NORMAL · ARMADO · DISPARO) que decide se aquilo é um tchau, uma mão fechada por acaso, ou alguém pedindo socorro em silêncio.',
    cover: 'images/video_cv.mp4',
    coverIsVideo: true,
    rep: 'hand',
    featured: true,
    cell: 'In [03]:',
    metric: [
      { value: '21', label: 'LANDMARKS · TEMPO REAL' },
      { value: '3', label: 'ESTADOS · NORMAL → ARMADO → DISPARO' },
    ],
    tags: ['MediaPipe', 'OpenCV', 'Python', 'FSM', 'n8n', 'geometria euclidiana'],
    links: [
      { label: 'ver o código no GitHub', href: 'https://github.com/henriquetargino/sos_computer_vision' },
      { label: 'o post que repercutiu', href: 'https://www.linkedin.com/posts/henriquetargino_datascience-python-computervision-activity-7398759818959876096-HeEO' },
      { label: 'o post sobre a masterclass', href: 'https://www.linkedin.com/posts/henriquetargino_visaetocomputacional-python-opencv-ugcPost-7407063214959587328-AMia' },
    ],
    sections: [
      {
        h3: 'O gesto que virou pedido de socorro',
        body: [
          'Em abril de 2020, no auge do primeiro lockdown da pandemia, a <strong>Canadian Women\'s Foundation</strong> lançou o <em>Signal for Help</em>: um gesto silencioso, feito só com uma mão, para mulheres em situação de violência doméstica conseguirem pedir ajuda numa videochamada sem deixar rastro escrito, sem fazer barulho, sem precisar sair de perto do agressor.',
          'O gesto tem três passos: <strong>palma aberta para a câmera</strong>, <strong>dedão dobrado por cima da palma</strong>, e <strong>os outros quatro dedos fechando por cima do dedão</strong>, formando um punho. Simples de fazer, difícil de fazer por acaso. Foi pensado para ser invisível para quem está ao lado e óbvio para quem está do outro lado da tela.',
          'Cinco anos depois, o gesto está em campanhas no mundo inteiro, e existem casos reais de resgate documentados a partir dele. Mas a pessoa do outro lado precisa <em>conhecer</em> o sinal pra reconhecer. Esse projeto parte de uma ideia simples: e se um computador também soubesse reconhecer? E se qualquer câmera virasse uma testemunha treinada?',
        ],
      },
      {
        h3: 'Por que esse projeto, e por que eu',
        body: [
          'Entrei na área de Dados impressionado por carros autônomos, tentando entender como as máquinas <em>enxergavam</em> o mundo. Mas o caminho não foi linear: passei mais de um ano focado em Pandas, NumPy e modelos de predição, ou seja, longe da parte que tinha me trazido pra cá em primeiro lugar.',
          'Decidi tirar um fim de semana pra finalmente colocar a mão na massa em Visão Computacional. Não queria um <em>Hello World</em> nem um filtro de orelha de cachorro. Queria algo com função real, que justificasse o esforço técnico com utilidade social. O Signal for Help apareceu como o encontro perfeito: gesto bem definido, problema concreto, e uma restrição interessante de engenharia, ou seja, precisava rodar em qualquer notebook, sem GPU, em tempo real.',
          'A repercussão foi inesperada. O post no LinkedIn passou de <strong>mais de 30 mil visualizações</strong>, e rendeu um convite para <strong>ministrar uma masterclass de Visão Computacional na TripleTen</strong>. Mais importante: trouxe gente de áreas que nem são técnicas (assistência social, segurança pública, advocacia) perguntando como integrar isso em sistemas reais.',
        ],
      },
      {
        h3: 'Três estados, porque um gesto não é uma foto',
        body: [
          'O problema central não é detectar uma mão fechada. Isso é fácil. O problema é distinguir <strong>intenção</strong> de coincidência: dar tchau não é socorro, coçar a testa não é socorro, segurar uma caneca não é socorro. O gesto verdadeiro tem uma <em>ordem</em>: primeiro a palma abre, depois o dedão se dobra, depois os dedos fecham por cima.',
          'Pra capturar essa ordem, modelei o detector como uma <strong>máquina de estados finita de 3 fases</strong>. Cada frame da webcam atualiza o estado atual; o estado só muda quando uma regra geométrica específica é satisfeita; e existe um <em>timeout</em> que reseta tudo se a sequência travar no meio. É o equivalente a exigir três frames-chave em ordem, em vez de procurar um único frame mágico.',
          '<strong>Estado 0 · NORMAL (azul):</strong> o sistema vê a mão, desenha os 21 landmarks, mas não julga. É a base, o monitoramento frio. <strong>Estado 1 · ARMADO (laranja):</strong> os 4 dedos estão pra cima, colados, e o dedão está dobrado escondido na palma. A janela de 2 segundos abre. <strong>Estado 2 · DISPARO (vermelho):</strong> dentro da janela, a pessoa fecha os 4 dedos por cima do dedão. A intenção está matematicamente comprovada, o webhook dispara, a tela pisca.',
        ],
        media: [
          { src: 'images/sos_normal.jpg', cap: 'estado 0 · NORMAL · monitoramento frio, 21 landmarks desenhados mas sem julgamento' },
          { src: 'images/sos_armado.jpg', cap: 'estado 1 · ARMADO · 4 dedos pra cima e dedão escondido, bounding box laranja em volta da mão suspeita' },
          { src: 'images/sos_alerta.jpg', cap: 'estado 2 · DISPARO · gesto completo segurado o suficiente, webhook disparado' },
        ],
      },
      {
        h3: 'Da webcam ao webhook, em quatro saltos',
        body: [
          'O pipeline inteiro cabe num diagrama de quatro caixas, e cada caixa tem uma armadilha clássica de Visão Computacional escondida dentro. <strong>1) Captura:</strong> OpenCV puxa frames da webcam em <strong>BGR</strong> (azul, verde, vermelho), que é o formato nativo dele. <strong>2) Conversão:</strong> antes de mandar pro MediaPipe, preciso converter pra <strong>RGB</strong>. Esquecer disso não quebra o código, só destrói a acurácia silenciosamente, porque a rede foi treinada esperando RGB e recebe canais trocados.',
          '<strong>3) Landmarks:</strong> o MediaPipe Hands processa o frame e devolve 21 pontos 3D por mão detectada (punho, base e ponta de cada dedo, com x, y, z). É aqui que a Visão Clássica encontra o Deep Learning: o OpenCV vê contrastes de cor, o MediaPipe <em>entende</em> que aquilo é uma mão e infere onde está cada articulação, mesmo com pontos oclusos. <strong>4) Lógica + alerta:</strong> os 21 pontos entram na FSM. Se o estado chegar em DISPARO, um POST JSON é enviado pra um webhook do <strong>n8n</strong>, que distribui o alerta pelo canal que eu configurar (WhatsApp, SMS, dashboard, etc.).',
          'Um detalhe importante: a lógica trabalha com <strong>proporções entre landmarks</strong>, não com distâncias absolutas em pixels. Isso significa que funciona com a mão perto ou longe da câmera, em ângulos diferentes, com pessoas diferentes. Não preciso recalibrar nada.',
        ],
      },
      {
        h3: 'A matemática do dedão dobrado',
        body: [
          'Detectar se os 4 dedos longos estão levantados é quase trivial. Como o <strong>eixo Y na imagem cresce pra baixo</strong>, basta comparar o Y da ponta do dedo com o Y da articulação anterior: se a ponta está com Y <em>menor</em>, o dedo está fisicamente esticado pra cima. Cinco comparações, cinco bits, lista do tipo <code>[0, 1, 1, 1, 1]</code>.',
          'O dedão é o problema. Ele não dobra na vertical como os outros, dobra <em>de lado</em>, cruzando a palma. Não dá pra usar a regra do Y. A solução foi mudar de coordenada cartesiana pra <strong>distância euclidiana</strong>: calculo a hipotenusa entre a <em>ponta do dedão</em> e a <em>base do mindinho</em>. Quando o dedão está aberto pro lado, essa distância é grande; quando está dobrado escondido na palma, a distância encurta drasticamente. Um threshold simples resolve.',
          'Sobrou uma última armadilha: e se a mão estiver aberta dando tchau? Os 4 dedos também estão pra cima. Adicionei a regra de <strong>Dedos Juntos</strong>: comparo a distância horizontal entre as pontas dos dedos vizinhos. Tchau tem dedos espaçados; gesto SOS tem dedos colados. Com isso, a taxa de falso positivo caiu pra perto de zero em uso normal.',
        ],
      },
      {
        h3: 'Os bugs que não estão no algoritmo',
        body: [
          '<strong>Threading pro webhook:</strong> a primeira versão travava a câmera toda vez que o POST era enviado. Clássico <em>blocking I/O</em>: o Python ficava parado esperando o servidor responder, e enquanto isso o loop de captura morria, derrubando o FPS pra zero. Joguei o request numa thread separada e o feed voltou a fluir sem soluços, mesmo quando o webhook demora.',
          '<strong>Versão do Python:</strong> o MediaPipe na época não era compatível com Python 3.13. Foi a primeira hora de debug perdida tentando entender por que o <code>pip install</code> não terminava. Travei tudo em Python 3.10 via Anaconda. Pequeno, mas é o tipo de detalhe que mata um fim de semana inteiro se você não souber.',
          '<strong>Espaços de cor:</strong> a já mencionada dor de cabeça de reverter BGR pra RGB antes do MediaPipe, e às vezes voltar pra BGR antes de desenhar a bounding box. Acurácia despenca silenciosamente se você esquece. Nada quebra, só fica ruim sem motivo aparente.',
          '<strong>Timeout de 2 segundos:</strong> sem ele, a FSM ficaria armada pra sempre depois de ver uma mão fechando por acidente. Com ele, a janela é curta o bastante pra exigir intenção (a pessoa precisa completar o gesto), e longa o bastante pra acomodar movimento natural. Foi ajustado empiricamente, fiz com várias pessoas testando, até achar o ponto em que o gesto real passa e o aleatório não.',
        ],
      },
      {
        h3: 'O que esse projeto me ensinou',
        body: [
          'Visão Computacional, antes desse projeto, era pra mim um conjunto de tutoriais com gato sendo classificado como cachorro. Depois dele, virou outra coisa: um campo onde a parte difícil é traduzir <em>intenção humana</em> em geometria, e onde 80% do tempo é gasto em problemas que não estão no paper (espaço de cor, threading, timeout, versão de biblioteca).',
          'Também me ensinou que <em>impacto</em> e <em>simplicidade técnica</em> não brigam. A solução final tem menos linhas de código que muitos notebooks de exploração de dados que escrevi. Não tem rede neural treinada por mim, não tem ajuste fino, não tem GPU. Tem 21 pontos, três estados, e uma régua de hipotenusa. E foi suficiente pra virar uma masterclass, pra gerar conversa sobre violência doméstica em comentários de LinkedIn, e pra me fazer voltar definitivamente pro caminho da Visão Computacional, que era o que tinha me trazido pra cá desde o começo.',
        ],
      },
    ],
  },

  {
    slug: 'ai-soccer',
    kind: 'redes neurais · reinforcement learning',
    title: 'AI Football',
    lead: 'Ensinei uma rede neural a jogar futebol 1v1 do zero, sem regra escrita à mão, só tentativa e erro. Foram 3 meses de tropeços, 1 bilhão de steps acumulados em treinos descartados, três falhas silenciosas que custaram semanas, até a versão final convergir em 6 horas.',
    cover: 'images/aif_intro.mp4',
    coverIsVideo: true,
    rep: 'nn',
    featured: true,
    cell: 'In [04]:',
    metric: { value: '1B', label: 'STEPS · V10.2' },
    tags: ['PyTorch', 'PPO', 'self-play', 'curriculum learning'],
    links: [
      {
        label: 'ler o artigo no Medium',
        href: 'https://medium.com/@henriquetarginoalbuquerque/i-trained-an-ai-to-play-football-for-a-billion-steps-heres-what-broke-742328956196',
      },
      {
        label: 'ver o post no LinkedIn',
        href: 'https://www.linkedin.com/posts/henriquetargino_reinforcementlearning-machinelearning-ia-ugcPost-7462136934442835968-Te4J/',
      },
      {
        label: 'ver o código no GitHub',
        href: 'https://github.com/henriquetargino/ai_football',
      },
    ],
    sections: [
      {
        h3: 'Explicação do projeto',
        body: [
          'Em vídeo, eu conto como uma rede pequena aprendeu futebol do zero, passando pelas três falhas silenciosas que custaram semanas. Áudio incluso, controles do player liberados pra você pular pro que quiser.',
        ],
        media: [
          { src: 'images/ai_football.mp4', cap: 'a história completa · 9 minutos · com áudio', heavy: true },
        ],
      },
      {
        h3: 'A ideia: futebol sem nenhuma regra escrita à mão',
        body: [
          'Inspirado no <strong>AI Warehouse</strong> (canal do YouTube que treina IAs em jogos), decidi reproduzir o experimento clássico de RL: dois robôs num campo, um gol cada, uma bola. E absolutamente nenhuma instrução sobre o que fazer. A IA tem que descobrir sozinha que existe um objetivo (chutar a bola no gol do outro) e que existe um custo (sofrer gol). Driblar, posicionar, defender, antecipar: tudo precisa emergir de tentativa e erro.',
          'A política é uma <strong>rede neural pequena de ~26 mil parâmetros</strong> (2 camadas escondidas de 64 unidades), treinada com <strong>PPO</strong> e <strong>self-play</strong> contra versões passadas dela mesma. A entrada são <strong>341 números</strong> vindos de <strong>48 raycasts invisíveis</strong> que se abrem em leque pelo corpo do agente, marcando o que cada raio tocou (parede, bola, trave, oponente) e a que distância. A saída são <strong>18 ações discretas</strong>: três acelerações × três rotações × chutar ou não.',
        ],
        media: [
          { src: 'images/aif_raycasts_diagram.png', cap: 'os 48 raycasts saindo do robô · cada raio detecta o que tocou (parede, bola, gol, oponente) e a que distância' },
        ],
      },
      {
        h3: 'A armadilha pacifista (30M steps perdidos)',
        body: [
          'Numa das primeiras versões, a IA aprendeu a <em>não jogar futebol</em>. Ela entrava em campo, andava de costas até o canto mais distante da bola, e ficava parada o episódio inteiro.',
          'Descobri o porquê fazendo a conta. Eu tinha colocado uma penalidade de <strong>−0.05 por chute perdido</strong> pra incentivar precisão. Só que num episódio de 400 passos, o agente tentava chutar umas 100 vezes, acumulando −5.00 de retorno esperado. A recompensa de gol era +1.43. Matematicamente, o ótimo da função que eu escrevi era <em>nunca chegar perto da bola</em>. O PPO entendeu isso melhor do que eu.',
          'O que me salvou não foi o gráfico de loss. Foi o <strong>visualizador de replay</strong>. Os logs diziam "recompensa subindo, política estável". O replay mostrava um robô andando de ré pra fugir da bola.',
        ],
        media: [
          { src: 'images/aif_pacifist.mp4', cap: 'agente "burro" aos 30M steps · preferiu não tentar do que tentar e ser punido' },
        ],
      },
      {
        h3: 'Esquecimento catastrófico e o vale dos 28M steps',
        body: [
          'Currículo é a ideia óbvia: começa fácil (gol grande, oponente parado), aumenta a dificuldade aos poucos. Na prática, cada solução produz a falha oposta.',
          'No <strong>currículo adaptativo</strong> (avança se &gt;70%, regride se &lt;30%), o agente oscilou <strong>35 vezes</strong> entre os estágios 1 e 2 ao longo de 25M steps, terminando travado em 85% no estágio 1 e 0% no estágio 2. No <strong>currículo monotônico</strong>, apareceu o vilão clássico das redes pequenas: <em>esquecimento catastrófico</em>. O agente foi de 88% pra 4% no estágio 1 enquanto tentava aprender o estágio 2: esqueceu de atacar pra tentar defender.',
          'Isso aparece visível na curva de treino da V10.2 como um <strong>vale por volta dos 28M steps</strong>, durante a fase do "viés de goleiro". A solução final foi um <strong>currículo de 12 estágios</strong> (em vez de 3) com <strong>ancoragem temporal</strong>.',
        ],
        media: [
          { src: 'images/aif_return_curve.png', cap: 'curva de retorno V10.2 · o vale por volta dos 28M steps é a fase "viés de goleiro": a rede desaprende ataque pra acomodar defesa' },
        ],
      },
      {
        h3: 'Quando a matemática quebra (NaN aos 15.5M steps)',
        body: [
          'Versão anterior usava <strong>ações contínuas</strong> (aceleração e rotação como números reais). Depois de 3 horas de treino e 15.5 milhões de steps, o processo morreu com <code>NaN</code> em todos os parâmetros.',
          'Culpado: o bônus de entropia que o PPO usa pra incentivar exploração. Como a saída era uma gaussiana, aumentar o desvio-padrão sempre aumentava a entropia, e como tanto faz o comportamento real (uma std de 100 é tão "útil" quanto uma de 10), o gradiente <em>nunca parava de empurrar a std pra cima</em>. Em algum momento, ela passou do limite do <code>float32</code> e estourou.',
          'A correção foi estrutural, não cosmética: troquei pra <strong>18 ações discretas</strong> com tanh squash. Isso matou quatro patologias de uma vez: explosão da std, threshold de KL-divergência, deriva browniana que impedia o agente de tocar na bola nos primeiros minutos, e a codificação ruim do chute (binário) como threshold contínuo.',
        ],
        media: [
          { src: 'images/aif_nan.mp4', cap: 'logs do treino antes do crash · std crescendo até 2.05e+18 e estourando o float32' },
        ],
      },
      {
        h3: 'O que finalmente funcionou: V10.2',
        body: [
          'A versão final convergiu em <strong>50 milhões de steps</strong>, rodados em <strong>6 horas</strong> de CPU (sem GPU). O currículo tem 12 estágios; a fase de <strong>self-play</strong> contra versões passadas representa <strong>34% do treino</strong>; 20% dos rollouts vêm de estágios anteriores pra anti-esquecimento.',
          'O comportamento emergente é o que mais me impressiona. O <strong>heatmap de posicionamento</strong> mostra a evolução: começa caótico, perto do próprio gol; termina cobrindo o campo inteiro com hotspots nas "rotas naturais" da bola e no terço ofensivo. A IA descobriu posicionamento, antecipação e até <em>pressão alta</em>. Sem ninguém ter dito a palavra "futebol" pra ela.',
          'O modelo final é <strong>Markoviano</strong> (não tem memória) de propósito: precisa caber e rodar no navegador. A consequência divertida é que se você bloquear os raycasts dela com seu corpo, ela <em>anda de ré procurando a bola até bater na parede</em>. Comportamento emergente também tem suas frestas.',
        ],
        media: [
          { src: 'images/aif_heatmap.png', cap: 'mapa de calor de posicionamento · de "caos perto do próprio gol" no início pra cobertura de campo com hotspots ofensivos no fim' },
        ],
      },
      {
        h3: 'O lado que ninguém vê: visualização da rede em tempo real',
        body: [
          'Pra não virar mais um vídeo de IA jogando, decidi expor o <strong>cérebro</strong> dela ao vivo. O site renderiza, ao lado do campo, as <strong>ativações da rede neurônio a neurônio</strong> enquanto ela joga. Você vê literalmente quais inputs ("raycast 12 tocou a bola a 3m") acendem quais nós e como isso vira a decisão de chutar ou virar.',
          'Tem 3 modos: <strong>Replay</strong> (a IA contra si mesma, 40 segundos), <strong>Challenge</strong> (você pega WASD + espaço e tenta ganhar dela) e <strong>Duel</strong> (duas snapshots da mesma IA, de checkpoints diferentes, jogam entre si, e dá pra ver a versão de 5M perder feio pra de 50M). Pressionando <kbd>R</kbd> no jogo, aparecem os 48 raycasts coloridos pelo que cada um detectou.',
          'Tudo isso roda <strong>100% no navegador</strong>, sem servidor. Backend Python só treina e exporta JSON; o frontend Three.js carrega o modelo como asset estático no GitHub Pages.',
        ],
        media: [
          { src: 'images/aif_nn_view.mp4', cap: 'a IA decidindo em tempo real · 341 inputs entram pelos raycasts, 18 ações saem como probabilidades' },
        ],
      },
      {
        h3: 'A lição maior',
        body: [
          'Somando todas as tentativas, o projeto acumulou <strong>mais de 1 bilhão de steps</strong> de treino, 3 reescritas completas do código, dezenas de runs descartados e 3 meses de projeto. A versão que ficou pronta, V10.2, é o resultado de uma rede de 26 mil parâmetros aprendendo um jogo do zero, em 6 horas finais sem GPU.',
          'O loss desce bonito enquanto o agente foge da bola. A curva sobe enquanto a rede esquece o que sabia. O treino crasha por causa de uma gaussiana sem teto, não por causa de um bug óbvio. O algoritmo era o mesmo do paper. O que mudou foi eu entender que treinar IA não é otimização limpa: é depurar comportamento emergente, e os bugs moram fora do código.',
        ],
      },
    ],
  },

  {
    slug: 'precos-carros',
    kind: 'análise de dados · machine learning',
    title: 'Análise Automotiva & Previsão de Preços',
    lead: 'Análise exploratória de um mercado de carros e um modelo de Machine Learning para prever preços, com direito a um mini-artigo sobre outliers.',
    cover: 'images/outliers2.png',
    featured: false,
    cell: '',
    metric: { value: '85%', label: 'score no modelo (Random Forest)' },
    tags: ['EDA', 'scikit-learn', 'Pandas', 'Plotly', 'Random Forest'],
    links: [{ label: 'ver no GitHub', href: 'https://github.com/henriquetargino/Vehicles' }],
    sections: [
      {
        h3: 'Limpeza e EDA',
        body: [
          'Comecei com dados brutos de uma plataforma de venda de veículos (marca, modelo, ano, km, preço, cor). Mais de <strong>25 mil registros</strong> tinham campos vazios: cerca de 10 mil na coluna de cor (preenchidos como "unknown"). Os demais (ano, cilindros, odômetro) tratei pela moda por modelo, condição e quilometragem.',
          'Removi casos que distorciam tudo: a Mercedes-Benz tinha só 40 linhas (valores repetidos) e mais de 800 carros custavam menos de US$100, outliers irreais para o mercado.',
        ],
        media: [
          { src: 'images/grafico1.PNG', cap: 'mediana de preço por marca · mais robusta que a média contra valores extremos' },
          { src: 'images/grafico2.PNG', cap: 'distribuição das cores no estoque · preferências do mercado' },
        ],
      },
      {
        h3: 'Entendendo outliers (para qualquer público)',
        body: [
          'Preparei uma explicação simples do que são outliers usando um boxplot (mediana, quartis, extremos). Um caso prático: um Chevrolet levou 271 dias para vender, enquanto a mediana era 33. Esse único valor puxava a média para 39,6 dias; removendo os outliers, a média caiu para 36,6.',
          'A remoção foi criteriosa: só <strong>3,1% dos dados</strong> saíram, mas eles inflavam a média em quase 10%. Validei as diferenças com testes estatísticos (ANOVA e Tukey\'s HSD via Scipy/Statsmodels), para basear as conclusões em evidência, não em achismo visual.',
        ],
        media: [
          { src: 'images/outliers.PNG', cap: '% de outliers por marca, calculada pelo intervalo interquartil (IQR) em Python' },
          { src: 'images/teste.PNG', cap: 'ANOVA + Tukey HSD · diferenças entre grupos validadas estatisticamente' },
        ],
      },
      {
        h3: 'O modelo',
        body: [
          'A Regressão Linear não rendeu bem; parti para o <strong>Random Forest Regression</strong>, com melhor equilíbrio entre precisão e generalização. Treinado com marca, ano, km, combustível e cor, atingiu <strong>mais de 85% de score</strong> na validação e foi integrado a um app web onde o usuário insere as características e recebe a estimativa de preço.',
        ],
        media: [
          { src: 'images/model.PNG', cap: 'Random Forest Regression · mais de 85% de score na validação' },
        ],
      },
    ],
  },

  {
    slug: 'buraco',
    kind: 'automação · data viz',
    title: 'Automatizando um Hobby',
    lead: 'Um app que transforma os pontos do nosso jogo de Buraco em análises em tempo real, com dashboards dinâmicos e uma celebração a cada partida.',
    cover: 'images/baralho.jpg',
    featured: false,
    cell: '',
    metric: [
      { value: '113+', label: 'partidas registradas' },
      { value: '∞', label: 'sorrisos da minha mãe' },
    ],
    tags: ['Streamlit', 'Plotly', 'gspread', 'Pandas'],
    links: [
      { label: 'abrir o app', href: 'https://buraco.streamlit.app' },
      { label: 'ver no GitHub', href: 'https://github.com/henriquetargino/buraco' },
    ],
    sections: [
      {
        h3: 'O início da ideia',
        body: [
          'O projeto nasceu de uma cena do cotidiano: jogar Buraco com a minha mãe. Por muito tempo o placar era anotado no bloco de notas do celular dela, um processo lento e sem nenhuma graça visual. Vi ali a oportunidade perfeita de automatizar e transformar nosso hobby numa experiência interativa. Hoje o app já passou de <strong>100 partidas registradas</strong>, e o placar entre nós dois segue acirrado: 59 a 53 a meu favor (espero que ela não esteja deixando).',
        ],
      },
      {
        h3: 'Desenvolvimento',
        body: [
          'Nunca tinha usado a API do Google Sheets, então estudei: descobri o <strong>gspread</strong>, que conecta o app direto a uma planilha como se fosse um banco de dados online. Para a interface usei <strong>Streamlit</strong>, e com <strong>Plotly</strong> transformei números em histórias: vitórias, empates, maior sequência invicta, maior e menor diferença de pontos, médias por partida e evolução por rodada — tudo cruzado por jogador.',
          'O app tem 3 áreas: <strong>Estatísticas Gerais</strong> com todos os números, <strong>Dashboard Gráfico</strong> com a evolução visual, e <strong>Adicionar Partida</strong>, um formulário protegido por senha pra que só jogadores autorizados registrem resultados. Implementei cache com <code>@st.cache_data</code> pra deixar tudo rápido, e a cada partida nova os gráficos se atualizam na hora.',
        ],
        media: [
          { src: 'images/video_baralho.gif', cap: 'o app em ação · dashboards em Streamlit + Plotly, atualizando a cada partida' },
        ],
      },
      {
        h3: 'Impacto emocional',
        body: [
          'A melhor parte: quando uma partida é registrada, o <code>st.balloons</code> solta balões na tela e a minha mãe abre um sorrisão, como se tivesse ganhado um troféu. Não foi o projeto mais técnico que fiz, mas foi de longe o mais divertido. Prova de que a tecnologia também serve para criar memórias e aproximar pessoas.',
        ],
      },
    ],
  },

  {
    slug: 'agente-whatsapp',
    kind: 'ia · automação · n8n',
    title: 'Agente de IA no WhatsApp',
    lead: 'Uma secretária virtual para uma nutricionista: atende no WhatsApp a qualquer hora, responde com base nos dados de cada paciente e passa o bastão para a humana quando precisa.',
    cover: 'images/n8n0.PNG',
    featured: false,
    cell: '',
    metric: { value: '+30%', label: 'interações no 1º mês' },
    tags: ['n8n', 'LLM', 'Evolution API', 'Chatwoot', 'RAG'],
    sections: [
      {
        h3: 'O problema',
        body: [
          'Uma nutricionista me procurou: a maior dor dela era o volume de mensagens no WhatsApp. No meio dos atendimentos, as conversas desciam na tela e ficavam sem resposta, com pacientes prejudicados e consultas desmarcadas. A ideia era um agente que assumisse o papel de secretária: responder dúvidas, mandar informações de dieta e manter o atendimento ativo a qualquer hora.',
        ],
      },
      {
        h3: 'A solução',
        body: [
          'Estruturei uma base no Google Sheets (nome, contato, dieta, observações como "paciente bariátrico, evitar X"). Orquestrei tudo no <strong>n8n</strong>, integrando a <strong>Evolution API</strong> (mensagens do WhatsApp) e o <strong>Chatwoot</strong> (onde as conversas se centralizam).',
          'O fluxo trata texto e áudio (transcrição), busca os dados do paciente pelo telefone e gera a resposta com IA. Um nó <em>If</em> decide se precisa de <strong>handoff</strong>: se a pergunta exige histórico ou contexto, a nutricionista é avisada e responde no Chatwoot; senão, a IA simula um tempo de digitação natural e responde sozinha.',
        ],
        media: [
          { src: 'images/n8n1.PNG', cap: 'fluxo · parte 1: webhook recebe a mensagem, filtra o cliente, transcreve áudio e une os caminhos no merge' },
          { src: 'images/n8n2.PNG', cap: 'fluxo · parte 2: busca no Google Sheets, resposta da IA e o nó If que decide o handoff humano' },
        ],
      },
      {
        h3: 'O resultado',
        body: [
          'Transformação imediata: desde a implementação, <strong>nenhuma mensagem ficou sem resposta</strong> e as interações com pacientes cresceram <strong>30% no primeiro mês</strong>. A nutricionista passou a gastar menos tempo com tarefa administrativa e mais com o que importa: o acompanhamento de cada paciente.',
        ],
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
