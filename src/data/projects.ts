// Fonte única de verdade dos projetos (home + fichas).
// Conteudo bilingue (EN/PT) via objetos { en, pt }.

export interface Bi {
  en: string;
  pt: string;
}

export interface ProjectSection {
  h3: Bi;
  body: Bi[]; // parágrafos (HTML inline permitido: <strong>, <em>)
  media?: { src: string; cap: Bi; heavy?: boolean }[]; // figuras/screenshots ao fim da seção
}

export interface ProjectLink {
  label: Bi;
  href: string;
}

export interface Project {
  slug: string;
  kind: Bi;
  title: Bi;
  lead: Bi;
  cover: string;
  coverIsVideo?: boolean;
  rep?: 'hand' | 'nn';
  featured: boolean;
  cell: string;
  metric: { value: string; label: Bi } | { value: string; label: Bi }[];
  tags: string[];
  links?: ProjectLink[];
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: 'detector-sos',
    kind: { en: 'computer vision', pt: 'visão computacional' },
    title: { en: 'Signal for Help Detector', pt: 'Detector de Sinal de Socorro' },
    lead: {
      en: 'A detector that recognizes the universal call-for-help gesture in real time, using just a webcam. Without any deep learning algorithm: 21 hand landmarks, euclidean geometry, and a 3-phase state machine (NORMAL · ARMED · TRIGGER) that decides whether that is a wave, a hand that happened to close, or someone silently asking for help.',
      pt: 'Um detector que reconhece o gesto universal de pedido de ajuda em tempo real, só com webcam. Sem usar nenhum algoritmo de deep learning: 21 landmarks da mão, geometria euclidiana e uma máquina de estados de 3 fases (NORMAL · ARMADO · DISPARO) que decide se aquilo é um tchau, uma mão fechada por acaso, ou alguém pedindo socorro em silêncio.',
    },
    cover: 'images/video_cv.mp4',
    coverIsVideo: true,
    rep: 'hand',
    featured: true,
    cell: 'In [03]:',
    metric: [
      { value: '21', label: { en: 'LANDMARKS · REAL TIME', pt: 'LANDMARKS · TEMPO REAL' } },
      { value: '3', label: { en: 'STATES · NORMAL → ARMED → TRIGGER', pt: 'ESTADOS · NORMAL → ARMADO → DISPARO' } },
    ],
    tags: ['MediaPipe', 'OpenCV', 'Python', 'FSM', 'n8n', 'geometria euclidiana'],
    links: [
      { label: { en: 'see the code on GitHub', pt: 'ver o código no GitHub' }, href: 'https://github.com/henriquetargino/sos_computer_vision' },
      { label: { en: 'the post that took off', pt: 'o post que repercutiu' }, href: 'https://www.linkedin.com/posts/henriquetargino_datascience-python-computervision-activity-7398759818959876096-HeEO' },
      { label: { en: 'the post about the masterclass', pt: 'o post sobre a masterclass' }, href: 'https://www.linkedin.com/posts/henriquetargino_visaetocomputacional-python-opencv-ugcPost-7407063214959587328-AMia' },
    ],
    sections: [
      {
        h3: { en: 'The gesture that became a cry for help', pt: 'O gesto que virou pedido de socorro' },
        body: [
          {
            en: 'In April 2020, at the height of the first pandemic lockdown, the <strong>Canadian Women\'s Foundation</strong> launched the <em>Signal for Help</em>: a silent gesture, made with just one hand, so that women in domestic violence situations could ask for help on a video call without leaving any written trace, without making noise, without having to step away from the abuser.',
            pt: 'Em abril de 2020, no auge do primeiro lockdown da pandemia, a <strong>Canadian Women\'s Foundation</strong> lançou o <em>Signal for Help</em>: um gesto silencioso, feito só com uma mão, para mulheres em situação de violência doméstica conseguirem pedir ajuda numa videochamada sem deixar rastro escrito, sem fazer barulho, sem precisar sair de perto do agressor.',
          },
          {
            en: 'The gesture has three steps: <strong>palm open to the camera</strong>, <strong>thumb folded across the palm</strong>, and <strong>the other four fingers closing over the thumb</strong>, forming a fist. Simple to do, hard to do by accident. It was designed to be invisible to whoever is next to you and obvious to whoever is on the other side of the screen.',
            pt: 'O gesto tem três passos: <strong>palma aberta para a câmera</strong>, <strong>dedão dobrado por cima da palma</strong>, e <strong>os outros quatro dedos fechando por cima do dedão</strong>, formando um punho. Simples de fazer, difícil de fazer por acaso. Foi pensado para ser invisível para quem está ao lado e óbvio para quem está do outro lado da tela.',
          },
          {
            en: 'Five years later, the gesture is in campaigns all over the world, and there are real rescue cases documented from it. But the person on the other side needs to <em>know</em> the signal to recognize it. This project starts from a simple idea: what if a computer also knew how to recognize it? What if any camera became a trained witness?',
            pt: 'Cinco anos depois, o gesto está em campanhas no mundo inteiro, e existem casos reais de resgate documentados a partir dele. Mas a pessoa do outro lado precisa <em>conhecer</em> o sinal pra reconhecer. Esse projeto parte de uma ideia simples: e se um computador também soubesse reconhecer? E se qualquer câmera virasse uma testemunha treinada?',
          },
        ],
      },
      {
        h3: { en: 'Why this project, and why me', pt: 'Por que esse projeto, e por que eu' },
        body: [
          {
            en: 'I got into Data impressed by self-driving cars, trying to understand how machines <em>saw</em> the world. But the path was not linear: I spent more than a year focused on Pandas, NumPy and prediction models, that is, far from the part that had brought me here in the first place.',
            pt: 'Entrei na área de Dados impressionado por carros autônomos, tentando entender como as máquinas <em>enxergavam</em> o mundo. Mas o caminho não foi linear: passei mais de um ano focado em Pandas, NumPy e modelos de predição, ou seja, longe da parte que tinha me trazido pra cá em primeiro lugar.',
          },
          {
            en: 'I decided to take a weekend to finally get my hands dirty with Computer Vision. I did not want a <em>Hello World</em> or a dog-ear filter. I wanted something with a real function, that justified the technical effort with social usefulness. Signal for Help showed up as the perfect match: a well-defined gesture, a concrete problem, and an interesting engineering constraint, that is, it had to run on any laptop, without a GPU, in real time.',
            pt: 'Decidi tirar um fim de semana pra finalmente colocar a mão na massa em Visão Computacional. Não queria um <em>Hello World</em> nem um filtro de orelha de cachorro. Queria algo com função real, que justificasse o esforço técnico com utilidade social. O Signal for Help apareceu como o encontro perfeito: gesto bem definido, problema concreto, e uma restrição interessante de engenharia, ou seja, precisava rodar em qualquer notebook, sem GPU, em tempo real.',
          },
          {
            en: 'The response was unexpected. The LinkedIn post passed <strong>more than 30 thousand views</strong>, and led to an invitation to <strong>teach a Computer Vision masterclass at TripleTen</strong>. More importantly: it brought people from fields that are not even technical (social work, public safety, law) asking how to integrate this into real systems.',
            pt: 'A repercussão foi inesperada. O post no LinkedIn passou de <strong>mais de 30 mil visualizações</strong>, e rendeu um convite para <strong>ministrar uma masterclass de Visão Computacional na TripleTen</strong>. Mais importante: trouxe gente de áreas que nem são técnicas (assistência social, segurança pública, advocacia) perguntando como integrar isso em sistemas reais.',
          },
        ],
      },
      {
        h3: { en: 'Three states, because a gesture is not a photo', pt: 'Três estados, porque um gesto não é uma foto' },
        body: [
          {
            en: 'The core problem is not detecting a closed hand. That is easy. The problem is telling <strong>intent</strong> apart from coincidence: waving is not a call for help, scratching your forehead is not a call for help, holding a mug is not a call for help. The real gesture has an <em>order</em>: first the palm opens, then the thumb folds, then the fingers close over it.',
            pt: 'O problema central não é detectar uma mão fechada. Isso é fácil. O problema é distinguir <strong>intenção</strong> de coincidência: dar tchau não é socorro, coçar a testa não é socorro, segurar uma caneca não é socorro. O gesto verdadeiro tem uma <em>ordem</em>: primeiro a palma abre, depois o dedão se dobra, depois os dedos fecham por cima.',
          },
          {
            en: 'To capture that order, I modeled the detector as a <strong>3-phase finite state machine</strong>. Each webcam frame updates the current state; the state only changes when a specific geometric rule is satisfied; and there is a <em>timeout</em> that resets everything if the sequence stalls halfway. It is the equivalent of requiring three key frames in order, instead of looking for a single magic frame.',
            pt: 'Pra capturar essa ordem, modelei o detector como uma <strong>máquina de estados finita de 3 fases</strong>. Cada frame da webcam atualiza o estado atual; o estado só muda quando uma regra geométrica específica é satisfeita; e existe um <em>timeout</em> que reseta tudo se a sequência travar no meio. É o equivalente a exigir três frames-chave em ordem, em vez de procurar um único frame mágico.',
          },
          {
            en: '<strong>State 0 · NORMAL (blue):</strong> the system sees the hand, draws the 21 landmarks, but does not judge. It is the baseline, the cold monitoring. <strong>State 1 · ARMED (orange):</strong> the 4 fingers are up, pressed together, and the thumb is folded hidden in the palm. The 2-second window opens. <strong>State 2 · TRIGGER (red):</strong> within the window, the person closes the 4 fingers over the thumb. The intent is mathematically proven, the webhook fires, the screen flashes.',
            pt: '<strong>Estado 0 · NORMAL (azul):</strong> o sistema vê a mão, desenha os 21 landmarks, mas não julga. É a base, o monitoramento frio. <strong>Estado 1 · ARMADO (laranja):</strong> os 4 dedos estão pra cima, colados, e o dedão está dobrado escondido na palma. A janela de 2 segundos abre. <strong>Estado 2 · DISPARO (vermelho):</strong> dentro da janela, a pessoa fecha os 4 dedos por cima do dedão. A intenção está matematicamente comprovada, o webhook dispara, a tela pisca.',
          },
        ],
        media: [
          {
            src: 'images/sos_normal.jpg',
            cap: {
              en: 'state 0 · NORMAL · cold monitoring, 21 landmarks drawn but no judgment',
              pt: 'estado 0 · NORMAL · monitoramento frio, 21 landmarks desenhados mas sem julgamento',
            },
          },
          {
            src: 'images/sos_armado.jpg',
            cap: {
              en: 'state 1 · ARMED · 4 fingers up and thumb hidden, orange bounding box around the suspect hand',
              pt: 'estado 1 · ARMADO · 4 dedos pra cima e dedão escondido, bounding box laranja em volta da mão suspeita',
            },
          },
          {
            src: 'images/sos_alerta.jpg',
            cap: {
              en: 'state 2 · TRIGGER · full gesture held long enough, webhook fired',
              pt: 'estado 2 · DISPARO · gesto completo segurado o suficiente, webhook disparado',
            },
          },
        ],
      },
      {
        h3: { en: 'From webcam to webhook, in four jumps', pt: 'Da webcam ao webhook, em quatro saltos' },
        body: [
          {
            en: 'The whole pipeline fits in a four-box diagram, and each box has a classic Computer Vision trap hidden inside. <strong>1) Capture:</strong> OpenCV pulls frames from the webcam in <strong>BGR</strong> (blue, green, red), which is its native format. <strong>2) Conversion:</strong> before sending to MediaPipe, I need to convert to <strong>RGB</strong>. Forgetting this does not break the code, it just silently destroys accuracy, because the network was trained expecting RGB and receives swapped channels.',
            pt: 'O pipeline inteiro cabe num diagrama de quatro caixas, e cada caixa tem uma armadilha clássica de Visão Computacional escondida dentro. <strong>1) Captura:</strong> OpenCV puxa frames da webcam em <strong>BGR</strong> (azul, verde, vermelho), que é o formato nativo dele. <strong>2) Conversão:</strong> antes de mandar pro MediaPipe, preciso converter pra <strong>RGB</strong>. Esquecer disso não quebra o código, só destrói a acurácia silenciosamente, porque a rede foi treinada esperando RGB e recebe canais trocados.',
          },
          {
            en: '<strong>3) Landmarks:</strong> MediaPipe Hands processes the frame and returns 21 3D points per detected hand (wrist, base and tip of each finger, with x, y, z). This is where Classic Vision meets Deep Learning: OpenCV sees color contrasts, MediaPipe <em>understands</em> that it is a hand and infers where each joint is, even with occluded points. <strong>4) Logic + alert:</strong> the 21 points go into the FSM. If the state reaches TRIGGER, a JSON POST is sent to an <strong>n8n</strong> webhook, which distributes the alert through whatever channel I set up (WhatsApp, SMS, dashboard, etc.).',
            pt: '<strong>3) Landmarks:</strong> o MediaPipe Hands processa o frame e devolve 21 pontos 3D por mão detectada (punho, base e ponta de cada dedo, com x, y, z). É aqui que a Visão Clássica encontra o Deep Learning: o OpenCV vê contrastes de cor, o MediaPipe <em>entende</em> que aquilo é uma mão e infere onde está cada articulação, mesmo com pontos oclusos. <strong>4) Lógica + alerta:</strong> os 21 pontos entram na FSM. Se o estado chegar em DISPARO, um POST JSON é enviado pra um webhook do <strong>n8n</strong>, que distribui o alerta pelo canal que eu configurar (WhatsApp, SMS, dashboard, etc.).',
          },
          {
            en: 'One important detail: the logic works with <strong>proportions between landmarks</strong>, not with absolute distances in pixels. That means it works with the hand near or far from the camera, at different angles, with different people. I do not need to recalibrate anything.',
            pt: 'Um detalhe importante: a lógica trabalha com <strong>proporções entre landmarks</strong>, não com distâncias absolutas em pixels. Isso significa que funciona com a mão perto ou longe da câmera, em ângulos diferentes, com pessoas diferentes. Não preciso recalibrar nada.',
          },
        ],
      },
      {
        h3: { en: 'The math of the folded thumb', pt: 'A matemática do dedão dobrado' },
        body: [
          {
            en: 'Detecting whether the 4 long fingers are raised is almost trivial. Since the <strong>Y axis in the image grows downward</strong>, you just compare the Y of the fingertip with the Y of the previous joint: if the tip has a <em>smaller</em> Y, the finger is physically stretched up. Five comparisons, five bits, a list like <code>[0, 1, 1, 1, 1]</code>.',
            pt: 'Detectar se os 4 dedos longos estão levantados é quase trivial. Como o <strong>eixo Y na imagem cresce pra baixo</strong>, basta comparar o Y da ponta do dedo com o Y da articulação anterior: se a ponta está com Y <em>menor</em>, o dedo está fisicamente esticado pra cima. Cinco comparações, cinco bits, lista do tipo <code>[0, 1, 1, 1, 1]</code>.',
          },
          {
            en: 'The thumb is the problem. It does not fold vertically like the others, it folds <em>sideways</em>, crossing the palm. You cannot use the Y rule. The solution was to switch from cartesian coordinates to <strong>euclidean distance</strong>: I compute the hypotenuse between the <em>thumb tip</em> and the <em>base of the pinky</em>. When the thumb is open to the side, that distance is large; when it is folded hidden in the palm, the distance shrinks drastically. A simple threshold solves it.',
            pt: 'O dedão é o problema. Ele não dobra na vertical como os outros, dobra <em>de lado</em>, cruzando a palma. Não dá pra usar a regra do Y. A solução foi mudar de coordenada cartesiana pra <strong>distância euclidiana</strong>: calculo a hipotenusa entre a <em>ponta do dedão</em> e a <em>base do mindinho</em>. Quando o dedão está aberto pro lado, essa distância é grande; quando está dobrado escondido na palma, a distância encurta drasticamente. Um threshold simples resolve.',
          },
          {
            en: 'One last trap was left: what if the hand is open, waving? The 4 fingers are also up. I added the <strong>Fingers Together</strong> rule: I compare the horizontal distance between the tips of neighboring fingers. A wave has spaced fingers; the SOS gesture has fingers pressed together. With that, the false positive rate dropped to near zero in normal use.',
            pt: 'Sobrou uma última armadilha: e se a mão estiver aberta dando tchau? Os 4 dedos também estão pra cima. Adicionei a regra de <strong>Dedos Juntos</strong>: comparo a distância horizontal entre as pontas dos dedos vizinhos. Tchau tem dedos espaçados; gesto SOS tem dedos colados. Com isso, a taxa de falso positivo caiu pra perto de zero em uso normal.',
          },
        ],
      },
      {
        h3: { en: 'The bugs that are not in the algorithm', pt: 'Os bugs que não estão no algoritmo' },
        body: [
          {
            en: '<strong>Threading for the webhook:</strong> the first version froze the camera every time the POST was sent. Classic <em>blocking I/O</em>: Python sat still waiting for the server to respond, and meanwhile the capture loop died, dropping the FPS to zero. I threw the request into a separate thread and the feed went back to flowing without hiccups, even when the webhook is slow.',
            pt: '<strong>Threading pro webhook:</strong> a primeira versão travava a câmera toda vez que o POST era enviado. Clássico <em>blocking I/O</em>: o Python ficava parado esperando o servidor responder, e enquanto isso o loop de captura morria, derrubando o FPS pra zero. Joguei o request numa thread separada e o feed voltou a fluir sem soluços, mesmo quando o webhook demora.',
          },
          {
            en: '<strong>Python version:</strong> MediaPipe at the time was not compatible with Python 3.13. It was the first hour of debugging lost trying to understand why <code>pip install</code> would not finish. I pinned everything to Python 3.10 via Anaconda. Small, but it is the kind of detail that kills a whole weekend if you do not know it.',
            pt: '<strong>Versão do Python:</strong> o MediaPipe na época não era compatível com Python 3.13. Foi a primeira hora de debug perdida tentando entender por que o <code>pip install</code> não terminava. Travei tudo em Python 3.10 via Anaconda. Pequeno, mas é o tipo de detalhe que mata um fim de semana inteiro se você não souber.',
          },
          {
            en: '<strong>Color spaces:</strong> the already mentioned headache of reverting BGR to RGB before MediaPipe, and sometimes going back to BGR before drawing the bounding box. Accuracy plummets silently if you forget. Nothing breaks, it just gets bad for no apparent reason.',
            pt: '<strong>Espaços de cor:</strong> a já mencionada dor de cabeça de reverter BGR pra RGB antes do MediaPipe, e às vezes voltar pra BGR antes de desenhar a bounding box. Acurácia despenca silenciosamente se você esquece. Nada quebra, só fica ruim sem motivo aparente.',
          },
          {
            en: '<strong>2-second timeout:</strong> without it, the FSM would stay armed forever after seeing a hand close by accident. With it, the window is short enough to require intent (the person has to complete the gesture), and long enough to accommodate natural movement. It was tuned empirically, I did it with several people testing, until I found the point where the real gesture passes and the random one does not.',
            pt: '<strong>Timeout de 2 segundos:</strong> sem ele, a FSM ficaria armada pra sempre depois de ver uma mão fechando por acidente. Com ele, a janela é curta o bastante pra exigir intenção (a pessoa precisa completar o gesto), e longa o bastante pra acomodar movimento natural. Foi ajustado empiricamente, fiz com várias pessoas testando, até achar o ponto em que o gesto real passa e o aleatório não.',
          },
        ],
      },
      {
        h3: { en: 'What this project taught me', pt: 'O que esse projeto me ensinou' },
        body: [
          {
            en: 'Computer Vision, before this project, was for me a set of tutorials with a cat being classified as a dog. After it, it became something else: a field where the hard part is translating <em>human intent</em> into geometry, and where 80% of the time is spent on problems that are not in the paper (color space, threading, timeout, library version).',
            pt: 'Visão Computacional, antes desse projeto, era pra mim um conjunto de tutoriais com gato sendo classificado como cachorro. Depois dele, virou outra coisa: um campo onde a parte difícil é traduzir <em>intenção humana</em> em geometria, e onde 80% do tempo é gasto em problemas que não estão no paper (espaço de cor, threading, timeout, versão de biblioteca).',
          },
          {
            en: 'It also taught me that <em>impact</em> and <em>technical simplicity</em> do not fight. The final solution has fewer lines of code than many data exploration notebooks I wrote. There is no neural network trained by me, no fine-tuning, no GPU. There are 21 points, three states, and a hypotenuse ruler. And it was enough to become a masterclass, to spark conversation about domestic violence in LinkedIn comments, and to make me come back for good to the Computer Vision path, which was what had brought me here from the start.',
            pt: 'Também me ensinou que <em>impacto</em> e <em>simplicidade técnica</em> não brigam. A solução final tem menos linhas de código que muitos notebooks de exploração de dados que escrevi. Não tem rede neural treinada por mim, não tem ajuste fino, não tem GPU. Tem 21 pontos, três estados, e uma régua de hipotenusa. E foi suficiente pra virar uma masterclass, pra gerar conversa sobre violência doméstica em comentários de LinkedIn, e pra me fazer voltar definitivamente pro caminho da Visão Computacional, que era o que tinha me trazido pra cá desde o começo.',
          },
        ],
      },
    ],
  },

  {
    slug: 'ai-soccer',
    kind: { en: 'neural networks · reinforcement learning', pt: 'redes neurais · reinforcement learning' },
    title: { en: 'AI Football', pt: 'AI Football' },
    lead: {
      en: 'I taught a neural network to play 1v1 football from scratch, with no hand-written rules, just trial and error. It was 3 months of stumbling, 1 billion steps accumulated across discarded runs, three silent failures that cost weeks, until the final version converged in 6 hours.',
      pt: 'Ensinei uma rede neural a jogar futebol 1v1 do zero, sem regra escrita à mão, só tentativa e erro. Foram 3 meses de tropeços, 1 bilhão de steps acumulados em treinos descartados, três falhas silenciosas que custaram semanas, até a versão final convergir em 6 horas.',
    },
    cover: 'images/aif_intro.mp4',
    coverIsVideo: true,
    rep: 'nn',
    featured: true,
    cell: 'In [04]:',
    metric: { value: '1B', label: { en: 'STEPS · V10.2', pt: 'STEPS · V10.2' } },
    tags: ['PyTorch', 'PPO', 'self-play', 'curriculum learning'],
    links: [
      {
        label: { en: 'read the article on Medium', pt: 'ler o artigo no Medium' },
        href: 'https://medium.com/@henriquetarginoalbuquerque/i-trained-an-ai-to-play-football-for-a-billion-steps-heres-what-broke-742328956196',
      },
      {
        label: { en: 'see the post on LinkedIn', pt: 'ver o post no LinkedIn' },
        href: 'https://www.linkedin.com/posts/henriquetargino_reinforcementlearning-machinelearning-ia-ugcPost-7462136934442835968-Te4J/',
      },
      {
        label: { en: 'see the code on GitHub', pt: 'ver o código no GitHub' },
        href: 'https://github.com/henriquetargino/ai_football',
      },
    ],
    sections: [
      {
        h3: { en: 'Project walkthrough', pt: 'Explicação do projeto' },
        body: [
          {
            en: 'On video, I tell how a small network learned football from scratch, going through the three silent failures that cost weeks. Audio included, player controls free for you to skip to whatever you want.',
            pt: 'Em vídeo, eu conto como uma rede pequena aprendeu futebol do zero, passando pelas três falhas silenciosas que custaram semanas. Áudio incluso, controles do player liberados pra você pular pro que quiser.',
          },
        ],
        media: [
          {
            src: 'images/ai_football.mp4',
            cap: { en: 'the full story · 9 minutes · with audio', pt: 'a história completa · 9 minutos · com áudio' },
            heavy: true,
          },
        ],
      },
      {
        h3: { en: 'The idea: football with no hand-written rules', pt: 'A ideia: futebol sem nenhuma regra escrita à mão' },
        body: [
          {
            en: 'Inspired by <strong>AI Warehouse</strong> (a YouTube channel that trains AIs in games), I decided to reproduce the classic RL experiment: two robots on a field, one goal each, one ball. And absolutely no instructions about what to do. The AI has to figure out on its own that there is an objective (kicking the ball into the other goal) and that there is a cost (conceding a goal). Dribbling, positioning, defending, anticipating: everything has to emerge from trial and error.',
            pt: 'Inspirado no <strong>AI Warehouse</strong> (canal do YouTube que treina IAs em jogos), decidi reproduzir o experimento clássico de RL: dois robôs num campo, um gol cada, uma bola. E absolutamente nenhuma instrução sobre o que fazer. A IA tem que descobrir sozinha que existe um objetivo (chutar a bola no gol do outro) e que existe um custo (sofrer gol). Driblar, posicionar, defender, antecipar: tudo precisa emergir de tentativa e erro.',
          },
          {
            en: 'The policy is a <strong>small neural network of ~26 thousand parameters</strong> (2 hidden layers of 64 units), trained with <strong>PPO</strong> and <strong>self-play</strong> against past versions of itself. The input is <strong>341 numbers</strong> coming from <strong>48 invisible raycasts</strong> that fan out from the agent\'s body, marking what each ray touched (wall, ball, post, opponent) and at what distance. The output is <strong>18 discrete actions</strong>: three accelerations × three rotations × kick or not.',
            pt: 'A política é uma <strong>rede neural pequena de ~26 mil parâmetros</strong> (2 camadas escondidas de 64 unidades), treinada com <strong>PPO</strong> e <strong>self-play</strong> contra versões passadas dela mesma. A entrada são <strong>341 números</strong> vindos de <strong>48 raycasts invisíveis</strong> que se abrem em leque pelo corpo do agente, marcando o que cada raio tocou (parede, bola, trave, oponente) e a que distância. A saída são <strong>18 ações discretas</strong>: três acelerações × três rotações × chutar ou não.',
          },
        ],
        media: [
          {
            src: 'images/aif_raycasts_diagram.png',
            cap: {
              en: 'the 48 raycasts coming out of the robot · each ray detects what it touched (wall, ball, goal, opponent) and at what distance',
              pt: 'os 48 raycasts saindo do robô · cada raio detecta o que tocou (parede, bola, gol, oponente) e a que distância',
            },
          },
        ],
      },
      {
        h3: { en: 'The pacifist trap (30M steps lost)', pt: 'A armadilha pacifista (30M steps perdidos)' },
        body: [
          {
            en: 'In one of the early versions, the AI learned to <em>not play football</em>. It would step onto the field, walk backwards to the corner farthest from the ball, and stand still the whole episode.',
            pt: 'Numa das primeiras versões, a IA aprendeu a <em>não jogar futebol</em>. Ela entrava em campo, andava de costas até o canto mais distante da bola, e ficava parada o episódio inteiro.',
          },
          {
            en: 'I found out why by doing the math. I had put a penalty of <strong>−0.05 per missed kick</strong> to encourage precision. But in a 400-step episode, the agent tried to kick about 100 times, accumulating −5.00 of expected return. The goal reward was +1.43. Mathematically, the optimum of the function I wrote was to <em>never get close to the ball</em>. PPO understood this better than I did.',
            pt: 'Descobri o porquê fazendo a conta. Eu tinha colocado uma penalidade de <strong>−0.05 por chute perdido</strong> pra incentivar precisão. Só que num episódio de 400 passos, o agente tentava chutar umas 100 vezes, acumulando −5.00 de retorno esperado. A recompensa de gol era +1.43. Matematicamente, o ótimo da função que eu escrevi era <em>nunca chegar perto da bola</em>. O PPO entendeu isso melhor do que eu.',
          },
          {
            en: 'What saved me was not the loss graph. It was the <strong>replay viewer</strong>. The logs said "reward rising, policy stable". The replay showed a robot walking backwards to flee the ball.',
            pt: 'O que me salvou não foi o gráfico de loss. Foi o <strong>visualizador de replay</strong>. Os logs diziam "recompensa subindo, política estável". O replay mostrava um robô andando de ré pra fugir da bola.',
          },
        ],
        media: [
          {
            src: 'images/aif_pacifist.mp4',
            cap: {
              en: '"dumb" agent at 30M steps · it preferred not trying over trying and being punished',
              pt: 'agente "burro" aos 30M steps · preferiu não tentar do que tentar e ser punido',
            },
          },
        ],
      },
      {
        h3: { en: 'Catastrophic forgetting and the 28M-step valley', pt: 'Esquecimento catastrófico e o vale dos 28M steps' },
        body: [
          {
            en: 'A curriculum is the obvious idea: start easy (big goal, motionless opponent), increase the difficulty little by little. In practice, each solution produces the opposite failure.',
            pt: 'Currículo é a ideia óbvia: começa fácil (gol grande, oponente parado), aumenta a dificuldade aos poucos. Na prática, cada solução produz a falha oposta.',
          },
          {
            en: 'In the <strong>adaptive curriculum</strong> (advance if &gt;70%, regress if &lt;30%), the agent oscillated <strong>35 times</strong> between stages 1 and 2 over 25M steps, ending stuck at 85% in stage 1 and 0% in stage 2. In the <strong>monotonic curriculum</strong>, the classic villain of small networks showed up: <em>catastrophic forgetting</em>. The agent went from 88% to 4% in stage 1 while trying to learn stage 2: it forgot how to attack while trying to defend.',
            pt: 'No <strong>currículo adaptativo</strong> (avança se &gt;70%, regride se &lt;30%), o agente oscilou <strong>35 vezes</strong> entre os estágios 1 e 2 ao longo de 25M steps, terminando travado em 85% no estágio 1 e 0% no estágio 2. No <strong>currículo monotônico</strong>, apareceu o vilão clássico das redes pequenas: <em>esquecimento catastrófico</em>. O agente foi de 88% pra 4% no estágio 1 enquanto tentava aprender o estágio 2: esqueceu de atacar pra tentar defender.',
          },
          {
            en: 'This shows up visibly in the V10.2 training curve as a <strong>valley around 28M steps</strong>, during the "goalkeeper bias" phase. The final solution was a <strong>12-stage curriculum</strong> (instead of 3) with <strong>temporal anchoring</strong>.',
            pt: 'Isso aparece visível na curva de treino da V10.2 como um <strong>vale por volta dos 28M steps</strong>, durante a fase do "viés de goleiro". A solução final foi um <strong>currículo de 12 estágios</strong> (em vez de 3) com <strong>ancoragem temporal</strong>.',
          },
        ],
        media: [
          {
            src: 'images/aif_return_curve.png',
            cap: {
              en: 'V10.2 return curve · the valley around 28M steps is the "goalkeeper bias" phase: the network unlearns attack to accommodate defense',
              pt: 'curva de retorno V10.2 · o vale por volta dos 28M steps é a fase "viés de goleiro": a rede desaprende ataque pra acomodar defesa',
            },
          },
        ],
      },
      {
        h3: { en: 'When the math breaks (NaN at 15.5M steps)', pt: 'Quando a matemática quebra (NaN aos 15.5M steps)' },
        body: [
          {
            en: 'A previous version used <strong>continuous actions</strong> (acceleration and rotation as real numbers). After 3 hours of training and 15.5 million steps, the process died with <code>NaN</code> in every parameter.',
            pt: 'Versão anterior usava <strong>ações contínuas</strong> (aceleração e rotação como números reais). Depois de 3 horas de treino e 15.5 milhões de steps, o processo morreu com <code>NaN</code> em todos os parâmetros.',
          },
          {
            en: 'Culprit: the entropy bonus that PPO uses to encourage exploration. Since the output was a gaussian, increasing the standard deviation always increased the entropy, and since the actual behavior does not matter (a std of 100 is as "useful" as one of 10), the gradient <em>never stopped pushing the std up</em>. At some point, it crossed the <code>float32</code> limit and blew up.',
            pt: 'Culpado: o bônus de entropia que o PPO usa pra incentivar exploração. Como a saída era uma gaussiana, aumentar o desvio-padrão sempre aumentava a entropia, e como tanto faz o comportamento real (uma std de 100 é tão "útil" quanto uma de 10), o gradiente <em>nunca parava de empurrar a std pra cima</em>. Em algum momento, ela passou do limite do <code>float32</code> e estourou.',
          },
          {
            en: 'The fix was structural, not cosmetic: I switched to <strong>18 discrete actions</strong> with tanh squash. This killed four pathologies at once: std explosion, KL-divergence threshold, the brownian drift that kept the agent from touching the ball in the first minutes, and the bad encoding of the kick (binary) as a continuous threshold.',
            pt: 'A correção foi estrutural, não cosmética: troquei pra <strong>18 ações discretas</strong> com tanh squash. Isso matou quatro patologias de uma vez: explosão da std, threshold de KL-divergência, deriva browniana que impedia o agente de tocar na bola nos primeiros minutos, e a codificação ruim do chute (binário) como threshold contínuo.',
          },
        ],
        media: [
          {
            src: 'images/aif_nan.mp4',
            cap: {
              en: 'training logs before the crash · std growing to 2.05e+18 and blowing past float32',
              pt: 'logs do treino antes do crash · std crescendo até 2.05e+18 e estourando o float32',
            },
          },
        ],
      },
      {
        h3: { en: 'What finally worked: V10.2', pt: 'O que finalmente funcionou: V10.2' },
        body: [
          {
            en: 'The final version converged in <strong>50 million steps</strong>, run in <strong>6 hours</strong> of CPU (no GPU). The curriculum has 12 stages; the <strong>self-play</strong> phase against past versions represents <strong>34% of the training</strong>; 20% of the rollouts come from earlier stages for anti-forgetting.',
            pt: 'A versão final convergiu em <strong>50 milhões de steps</strong>, rodados em <strong>6 horas</strong> de CPU (sem GPU). O currículo tem 12 estágios; a fase de <strong>self-play</strong> contra versões passadas representa <strong>34% do treino</strong>; 20% dos rollouts vêm de estágios anteriores pra anti-esquecimento.',
          },
          {
            en: 'The emergent behavior is what impresses me the most. The <strong>positioning heatmap</strong> shows the evolution: it starts chaotic, near its own goal; it ends covering the whole field with hotspots on the "natural routes" of the ball and in the attacking third. The AI discovered positioning, anticipation and even <em>high pressing</em>. Without anyone having said the word "football" to it.',
            pt: 'O comportamento emergente é o que mais me impressiona. O <strong>heatmap de posicionamento</strong> mostra a evolução: começa caótico, perto do próprio gol; termina cobrindo o campo inteiro com hotspots nas "rotas naturais" da bola e no terço ofensivo. A IA descobriu posicionamento, antecipação e até <em>pressão alta</em>. Sem ninguém ter dito a palavra "futebol" pra ela.',
          },
          {
            en: 'The final model is <strong>Markovian</strong> (it has no memory) on purpose: it has to fit and run in the browser. The fun consequence is that if you block its raycasts with your body, it <em>walks backwards looking for the ball until it hits the wall</em>. Emergent behavior has its cracks too.',
            pt: 'O modelo final é <strong>Markoviano</strong> (não tem memória) de propósito: precisa caber e rodar no navegador. A consequência divertida é que se você bloquear os raycasts dela com seu corpo, ela <em>anda de ré procurando a bola até bater na parede</em>. Comportamento emergente também tem suas frestas.',
          },
        ],
        media: [
          {
            src: 'images/aif_heatmap.png',
            cap: {
              en: 'positioning heatmap · from "chaos near its own goal" at the start to field coverage with attacking hotspots at the end',
              pt: 'mapa de calor de posicionamento · de "caos perto do próprio gol" no início pra cobertura de campo com hotspots ofensivos no fim',
            },
          },
        ],
      },
      {
        h3: { en: 'The side no one sees: real-time network visualization', pt: 'O lado que ninguém vê: visualização da rede em tempo real' },
        body: [
          {
            en: 'So it would not become just another AI-playing video, I decided to expose its <strong>brain</strong> live. The site renders, next to the field, the <strong>network activations neuron by neuron</strong> while it plays. You literally see which inputs ("raycast 12 touched the ball at 3m") light up which nodes and how that becomes the decision to kick or turn.',
            pt: 'Pra não virar mais um vídeo de IA jogando, decidi expor o <strong>cérebro</strong> dela ao vivo. O site renderiza, ao lado do campo, as <strong>ativações da rede neurônio a neurônio</strong> enquanto ela joga. Você vê literalmente quais inputs ("raycast 12 tocou a bola a 3m") acendem quais nós e como isso vira a decisão de chutar ou virar.',
          },
          {
            en: 'There are 3 modes: <strong>Replay</strong> (the AI against itself, 40 seconds), <strong>Challenge</strong> (you grab WASD + space and try to beat it) and <strong>Duel</strong> (two snapshots of the same AI, from different checkpoints, play each other, and you can watch the 5M version lose badly to the 50M one). Pressing <kbd>R</kbd> in the game, the 48 raycasts appear colored by what each one detected.',
            pt: 'Tem 3 modos: <strong>Replay</strong> (a IA contra si mesma, 40 segundos), <strong>Challenge</strong> (você pega WASD + espaço e tenta ganhar dela) e <strong>Duel</strong> (duas snapshots da mesma IA, de checkpoints diferentes, jogam entre si, e dá pra ver a versão de 5M perder feio pra de 50M). Pressionando <kbd>R</kbd> no jogo, aparecem os 48 raycasts coloridos pelo que cada um detectou.',
          },
          {
            en: 'All of this runs <strong>100% in the browser</strong>, with no server. The Python backend only trains and exports JSON; the Three.js frontend loads the model as a static asset on GitHub Pages.',
            pt: 'Tudo isso roda <strong>100% no navegador</strong>, sem servidor. Backend Python só treina e exporta JSON; o frontend Three.js carrega o modelo como asset estático no GitHub Pages.',
          },
        ],
        media: [
          {
            src: 'images/aif_nn_view.mp4',
            cap: {
              en: 'the AI deciding in real time · 341 inputs come in through the raycasts, 18 actions go out as probabilities',
              pt: 'a IA decidindo em tempo real · 341 inputs entram pelos raycasts, 18 ações saem como probabilidades',
            },
          },
        ],
      },
      {
        h3: { en: 'The bigger lesson', pt: 'A lição maior' },
        body: [
          {
            en: 'Adding up all the attempts, the project accumulated <strong>more than 1 billion steps</strong> of training, 3 full rewrites of the code, dozens of discarded runs and 3 months of project. The version that ended up ready, V10.2, is the result of a 26-thousand-parameter network learning a game from scratch, in 6 final hours without a GPU.',
            pt: 'Somando todas as tentativas, o projeto acumulou <strong>mais de 1 bilhão de steps</strong> de treino, 3 reescritas completas do código, dezenas de runs descartados e 3 meses de projeto. A versão que ficou pronta, V10.2, é o resultado de uma rede de 26 mil parâmetros aprendendo um jogo do zero, em 6 horas finais sem GPU.',
          },
          {
            en: 'The loss goes down nicely while the agent flees the ball. The curve rises while the network forgets what it knew. The training crashes because of a gaussian with no ceiling, not because of an obvious bug. The algorithm was the same one from the paper. What changed was me understanding that training AI is not clean optimization: it is debugging emergent behavior, and the bugs live outside the code.',
            pt: 'O loss desce bonito enquanto o agente foge da bola. A curva sobe enquanto a rede esquece o que sabia. O treino crasha por causa de uma gaussiana sem teto, não por causa de um bug óbvio. O algoritmo era o mesmo do paper. O que mudou foi eu entender que treinar IA não é otimização limpa: é depurar comportamento emergente, e os bugs moram fora do código.',
          },
        ],
      },
    ],
  },

  {
    slug: 'precos-carros',
    kind: { en: 'data analysis · machine learning', pt: 'análise de dados · machine learning' },
    title: { en: 'Automotive Analysis & Price Prediction', pt: 'Análise Automotiva & Previsão de Preços' },
    lead: {
      en: 'Exploratory analysis of a car market and a Machine Learning model to predict prices, complete with a mini-article on outliers.',
      pt: 'Análise exploratória de um mercado de carros e um modelo de Machine Learning para prever preços, com direito a um mini-artigo sobre outliers.',
    },
    cover: 'images/outliers2.png',
    featured: false,
    cell: '',
    metric: { value: '85%', label: { en: 'model score (Random Forest)', pt: 'score no modelo (Random Forest)' } },
    tags: ['EDA', 'scikit-learn', 'Pandas', 'Plotly', 'Random Forest'],
    links: [{ label: { en: 'see on GitHub', pt: 'ver no GitHub' }, href: 'https://github.com/henriquetargino/Vehicles' }],
    sections: [
      {
        h3: { en: 'Cleaning and EDA', pt: 'Limpeza e EDA' },
        body: [
          {
            en: 'I started with raw data from a vehicle sales platform (make, model, year, mileage, price, color). More than <strong>25 thousand records</strong> had empty fields: about 10 thousand in the color column (filled as "unknown"). The rest (year, cylinders, odometer) I handled by the mode per model, condition and mileage.',
            pt: 'Comecei com dados brutos de uma plataforma de venda de veículos (marca, modelo, ano, km, preço, cor). Mais de <strong>25 mil registros</strong> tinham campos vazios: cerca de 10 mil na coluna de cor (preenchidos como "unknown"). Os demais (ano, cilindros, odômetro) tratei pela moda por modelo, condição e quilometragem.',
          },
          {
            en: 'I removed cases that distorted everything: Mercedes-Benz had only 40 rows (repeated values) and more than 800 cars cost less than US$100, unrealistic outliers for the market.',
            pt: 'Removi casos que distorciam tudo: a Mercedes-Benz tinha só 40 linhas (valores repetidos) e mais de 800 carros custavam menos de US$100, outliers irreais para o mercado.',
          },
        ],
        media: [
          {
            src: 'images/grafico1.PNG',
            cap: {
              en: 'median price by make · more robust than the mean against extreme values',
              pt: 'mediana de preço por marca · mais robusta que a média contra valores extremos',
            },
          },
          {
            src: 'images/grafico2.PNG',
            cap: {
              en: 'distribution of colors in the inventory · market preferences',
              pt: 'distribuição das cores no estoque · preferências do mercado',
            },
          },
        ],
      },
      {
        h3: { en: 'Understanding outliers (for any audience)', pt: 'Entendendo outliers (para qualquer público)' },
        body: [
          {
            en: 'I prepared a simple explanation of what outliers are using a boxplot (median, quartiles, extremes). A practical case: a Chevrolet took 271 days to sell, while the median was 33. That single value pulled the mean to 39.6 days; removing the outliers, the mean dropped to 36.6.',
            pt: 'Preparei uma explicação simples do que são outliers usando um boxplot (mediana, quartis, extremos). Um caso prático: um Chevrolet levou 271 dias para vender, enquanto a mediana era 33. Esse único valor puxava a média para 39,6 dias; removendo os outliers, a média caiu para 36,6.',
          },
          {
            en: 'The removal was careful: only <strong>3.1% of the data</strong> left, but they inflated the mean by almost 10%. I validated the differences with statistical tests (ANOVA and Tukey\'s HSD via Scipy/Statsmodels), to base the conclusions on evidence, not on visual guesswork.',
            pt: 'A remoção foi criteriosa: só <strong>3,1% dos dados</strong> saíram, mas eles inflavam a média em quase 10%. Validei as diferenças com testes estatísticos (ANOVA e Tukey\'s HSD via Scipy/Statsmodels), para basear as conclusões em evidência, não em achismo visual.',
          },
        ],
        media: [
          {
            src: 'images/outliers.PNG',
            cap: {
              en: '% of outliers by make, computed by the interquartile range (IQR) in Python',
              pt: '% de outliers por marca, calculada pelo intervalo interquartil (IQR) em Python',
            },
          },
          {
            src: 'images/teste.PNG',
            cap: {
              en: 'ANOVA + Tukey HSD · differences between groups validated statistically',
              pt: 'ANOVA + Tukey HSD · diferenças entre grupos validadas estatisticamente',
            },
          },
        ],
      },
      {
        h3: { en: 'The model', pt: 'O modelo' },
        body: [
          {
            en: 'Linear Regression did not perform well; I moved to <strong>Random Forest Regression</strong>, with a better balance between precision and generalization. Trained with make, year, mileage, fuel and color, it reached <strong>more than 85% score</strong> on validation and was integrated into a web app where the user enters the characteristics and receives the price estimate.',
            pt: 'A Regressão Linear não rendeu bem; parti para o <strong>Random Forest Regression</strong>, com melhor equilíbrio entre precisão e generalização. Treinado com marca, ano, km, combustível e cor, atingiu <strong>mais de 85% de score</strong> na validação e foi integrado a um app web onde o usuário insere as características e recebe a estimativa de preço.',
          },
        ],
        media: [
          {
            src: 'images/model.PNG',
            cap: {
              en: 'Random Forest Regression · more than 85% score on validation',
              pt: 'Random Forest Regression · mais de 85% de score na validação',
            },
          },
        ],
      },
    ],
  },

  {
    slug: 'buraco',
    kind: { en: 'automation · data viz', pt: 'automação · data viz' },
    title: { en: 'Automating a Hobby', pt: 'Automatizando um Hobby' },
    lead: {
      en: 'An app that turns the scores from our Buraco game into real-time analytics, with dynamic dashboards and a celebration at every match.',
      pt: 'Um app que transforma os pontos do nosso jogo de Buraco em análises em tempo real, com dashboards dinâmicos e uma celebração a cada partida.',
    },
    cover: 'images/baralho.jpg',
    featured: false,
    cell: '',
    metric: [
      { value: '113+', label: { en: 'matches recorded', pt: 'partidas registradas' } },
      { value: '∞', label: { en: 'smiles from my mom', pt: 'sorrisos da minha mãe' } },
    ],
    tags: ['Streamlit', 'Plotly', 'gspread', 'Pandas'],
    links: [
      { label: { en: 'open the app', pt: 'abrir o app' }, href: 'https://buraco.streamlit.app' },
      { label: { en: 'see on GitHub', pt: 'ver no GitHub' }, href: 'https://github.com/henriquetargino/buraco' },
    ],
    sections: [
      {
        h3: { en: 'How the idea started', pt: 'O início da ideia' },
        body: [
          {
            en: 'The project was born from an everyday scene: playing Buraco with my mom. For a long time the score was jotted down in the notes app on her phone, a slow process with no visual charm at all. I saw there the perfect opportunity to automate and turn our hobby into an interactive experience. Today the app has already passed <strong>100 matches recorded</strong>, and the score between the two of us is still tight: 59 to 53 in my favor (I hope she isn\'t letting me win).',
            pt: 'O projeto nasceu de uma cena do cotidiano: jogar Buraco com a minha mãe. Por muito tempo o placar era anotado no bloco de notas do celular dela, um processo lento e sem nenhuma graça visual. Vi ali a oportunidade perfeita de automatizar e transformar nosso hobby numa experiência interativa. Hoje o app já passou de <strong>100 partidas registradas</strong>, e o placar entre nós dois segue acirrado: 59 a 53 a meu favor (espero que ela não esteja deixando).',
          },
        ],
      },
      {
        h3: { en: 'Development', pt: 'Desenvolvimento' },
        body: [
          {
            en: 'I had never used the Google Sheets API, so I studied: I discovered <strong>gspread</strong>, which connects the app directly to a spreadsheet as if it were an online database. For the interface I used <strong>Streamlit</strong>, and with <strong>Plotly</strong> I turned numbers into stories: wins, ties, longest unbeaten streak, biggest and smallest point difference, averages per match and evolution per round: all cross-cut by player.',
            pt: 'Nunca tinha usado a API do Google Sheets, então estudei: descobri o <strong>gspread</strong>, que conecta o app direto a uma planilha como se fosse um banco de dados online. Para a interface usei <strong>Streamlit</strong>, e com <strong>Plotly</strong> transformei números em histórias: vitórias, empates, maior sequência invicta, maior e menor diferença de pontos, médias por partida e evolução por rodada: tudo cruzado por jogador.',
          },
          {
            en: 'The app has 3 areas: <strong>General Statistics</strong> with all the numbers, <strong>Graphic Dashboard</strong> with the visual evolution, and <strong>Add Match</strong>, a password-protected form so that only authorized players record results. I implemented caching with <code>@st.cache_data</code> to keep everything fast, and with each new match the charts update on the spot.',
            pt: 'O app tem 3 áreas: <strong>Estatísticas Gerais</strong> com todos os números, <strong>Dashboard Gráfico</strong> com a evolução visual, e <strong>Adicionar Partida</strong>, um formulário protegido por senha pra que só jogadores autorizados registrem resultados. Implementei cache com <code>@st.cache_data</code> pra deixar tudo rápido, e a cada partida nova os gráficos se atualizam na hora.',
          },
        ],
        media: [
          {
            src: 'images/video_baralho.mp4',
            cap: {
              en: 'the app in action · Streamlit + Plotly dashboards, updating at every match',
              pt: 'o app em ação · dashboards em Streamlit + Plotly, atualizando a cada partida',
            },
          },
        ],
      },
      {
        h3: { en: 'Emotional impact', pt: 'Impacto emocional' },
        body: [
          {
            en: 'The best part: when a match is recorded, <code>st.balloons</code> releases balloons on the screen and my mom breaks into a big smile, as if she had won a trophy. It was not the most technical project I did, but it was by far the most fun. Proof that technology also serves to create memories and bring people closer.',
            pt: 'A melhor parte: quando uma partida é registrada, o <code>st.balloons</code> solta balões na tela e a minha mãe abre um sorrisão, como se tivesse ganhado um troféu. Não foi o projeto mais técnico que fiz, mas foi de longe o mais divertido. Prova de que a tecnologia também serve para criar memórias e aproximar pessoas.',
          },
        ],
      },
    ],
  },

  {
    slug: 'agente-whatsapp',
    kind: { en: 'ai · automation · n8n', pt: 'ia · automação · n8n' },
    title: { en: 'AI Agent on WhatsApp', pt: 'Agente de IA no WhatsApp' },
    lead: {
      en: 'A virtual secretary for a nutritionist: it answers on WhatsApp at any hour, replies based on each patient\'s data and hands off to the human when needed.',
      pt: 'Uma secretária virtual para uma nutricionista: atende no WhatsApp a qualquer hora, responde com base nos dados de cada paciente e passa o bastão para a humana quando precisa.',
    },
    cover: 'images/n8n0.PNG',
    featured: false,
    cell: '',
    metric: { value: '+30%', label: { en: 'interactions in the 1st month', pt: 'interações no 1º mês' } },
    tags: ['n8n', 'LLM', 'Evolution API', 'Chatwoot', 'RAG'],
    sections: [
      {
        h3: { en: 'The problem', pt: 'O problema' },
        body: [
          {
            en: 'A nutritionist reached out to me: her biggest pain was the volume of messages on WhatsApp. In the middle of appointments, conversations would scroll down the screen and go unanswered, with patients hurt and consultations canceled. The idea was an agent that would take on the role of secretary: answering questions, sending diet information and keeping the service active at any hour.',
            pt: 'Uma nutricionista me procurou: a maior dor dela era o volume de mensagens no WhatsApp. No meio dos atendimentos, as conversas desciam na tela e ficavam sem resposta, com pacientes prejudicados e consultas desmarcadas. A ideia era um agente que assumisse o papel de secretária: responder dúvidas, mandar informações de dieta e manter o atendimento ativo a qualquer hora.',
          },
        ],
      },
      {
        h3: { en: 'The solution', pt: 'A solução' },
        body: [
          {
            en: 'I structured a base in Google Sheets (name, contact, diet, notes like "bariatric patient, avoid X"). I orchestrated everything in <strong>n8n</strong>, integrating the <strong>Evolution API</strong> (WhatsApp messages) and <strong>Chatwoot</strong> (where the conversations centralize).',
            pt: 'Estruturei uma base no Google Sheets (nome, contato, dieta, observações como "paciente bariátrico, evitar X"). Orquestrei tudo no <strong>n8n</strong>, integrando a <strong>Evolution API</strong> (mensagens do WhatsApp) e o <strong>Chatwoot</strong> (onde as conversas se centralizam).',
          },
          {
            en: 'The flow handles text and audio (transcription), looks up the patient\'s data by phone and generates the reply with AI. An <em>If</em> node decides whether a <strong>handoff</strong> is needed: if the question requires history or context, the nutritionist is notified and replies in Chatwoot; otherwise, the AI simulates a natural typing time and replies on its own.',
            pt: 'O fluxo trata texto e áudio (transcrição), busca os dados do paciente pelo telefone e gera a resposta com IA. Um nó <em>If</em> decide se precisa de <strong>handoff</strong>: se a pergunta exige histórico ou contexto, a nutricionista é avisada e responde no Chatwoot; senão, a IA simula um tempo de digitação natural e responde sozinha.',
          },
        ],
        media: [
          {
            src: 'images/n8n1.PNG',
            cap: {
              en: 'flow · part 1: the webhook receives the message, filters the client, transcribes audio and joins the paths at the merge',
              pt: 'fluxo · parte 1: webhook recebe a mensagem, filtra o cliente, transcreve áudio e une os caminhos no merge',
            },
          },
          {
            src: 'images/n8n2.PNG',
            cap: {
              en: 'flow · part 2: lookup in Google Sheets, AI reply and the If node that decides the human handoff',
              pt: 'fluxo · parte 2: busca no Google Sheets, resposta da IA e o nó If que decide o handoff humano',
            },
          },
        ],
      },
      {
        h3: { en: 'The result', pt: 'O resultado' },
        body: [
          {
            en: 'Immediate transformation: since the implementation, <strong>no message has gone unanswered</strong> and interactions with patients grew <strong>30% in the first month</strong>. The nutritionist started spending less time on administrative tasks and more on what matters: following up with each patient.',
            pt: 'Transformação imediata: desde a implementação, <strong>nenhuma mensagem ficou sem resposta</strong> e as interações com pacientes cresceram <strong>30% no primeiro mês</strong>. A nutricionista passou a gastar menos tempo com tarefa administrativa e mais com o que importa: o acompanhamento de cada paciente.',
          },
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
