// Fonte única de verdade dos projetos (home + fichas).
// Conteudo PT. O EN entra numa fase dedicada de i18n.

export interface ProjectSection {
  h3: string;
  body: string[]; // parágrafos (HTML inline permitido: <strong>, <em>)
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
  metric: { value: string; label: string };
  tags: string[];
  links?: ProjectLink[];
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: 'detector-sos',
    kind: 'visão computacional',
    title: 'Detector de Sinal de Socorro',
    lead: 'Um sistema que reconhece o gesto universal de pedido de ajuda em tempo real, só com webcam e CPU, e dispara um alerta silencioso via webhook.',
    cover: 'images/cv.jpeg',
    rep: 'hand',
    featured: true,
    cell: 'In [03]:',
    metric: { value: '21', label: 'landmarks · CPU · tempo real' },
    tags: ['OpenCV', 'MediaPipe', 'NumPy', 'FSM', 'Python'],
    links: [{ label: 'masterclass na TripleTen', href: '#' }],
    sections: [
      {
        h3: 'A inspiração',
        body: [
          'Entrei na área de Dados justamente por causa da Visão Computacional. Eu ficava impressionado assistindo vídeos de carros autônomos e câmeras inteligentes, tentando entender como as máquinas "enxergavam" o mundo. Decidi tirar um fim de semana para finalmente colocar a mão na massa naquilo que me trouxe para essa carreira.',
          'Não queria fazer só um "Hello World". Queria algo com impacto real. Desenvolvi um sistema capaz de identificar o <strong>Sinal de Socorro</strong> (Signal for Help) em tempo real e disparar um alerta silencioso via API. A repercussão rendeu um convite para <strong>ministrar uma masterclass</strong> de Visão Computacional na TripleTen.',
        ],
      },
      {
        h3: 'Como funciona a lógica',
        body: [
          'Diferente de abordagens que treinam modelos pesados de Deep Learning, este sistema usa <strong>geometria euclidiana</strong> e <strong>álgebra linear</strong> para analisar a biomecânica da mão em tempo real, só com CPU. Tudo passa por uma <strong>máquina de estados finita (FSM)</strong> para não confundir um "tchau" com um pedido de socorro:',
          '<strong>Estágio 1 (Armar):</strong> extraio 21 landmarks via MediaPipe e verifico se os 4 dedos estão levantados. Calculo a distância euclidiana entre a ponta do dedão e a base do mindinho. Se for curta (dedão escondido na palma), entra no estado de ALERTA (laranja).',
          '<strong>Estágio 2 (Disparar):</strong> abre uma janela de 2 segundos. Se a pessoa fechar o punho dentro desse limite, a intenção de socorro é comprovada matematicamente, a tela pisca em vermelho e um POST de alerta é disparado.',
        ],
      },
      {
        h3: 'Desafios de engenharia',
        body: [
          '<strong>Processamento paralelo (threading):</strong> sem isso ocorria o famoso "blocking I/O". O vídeo congelava toda vez que o Python esperava a resposta do servidor HTTP. Jogando o request numa thread separada, o FPS da câmera ficou intacto.',
          '<strong>Independência de profundidade:</strong> como a lógica mede proporções entre as juntas (e não distâncias absolutas em pixels), funciona com a mão perto ou longe da câmera.',
          '<strong>Espaços de cor:</strong> a clássica dor de cabeça de reverter o BGR nativo do OpenCV para o RGB que os modelos de pose exigem, e devolver as bounding boxes para a tela.',
        ],
      },
    ],
  },

  {
    slug: 'ai-soccer',
    kind: 'redes neurais · reinforcement learning',
    title: 'AI Soccer',
    lead: 'Agentes que aprendem a jogar futebol do zero, sem nenhuma regra escrita à mão, em pura tentativa e erro, ao longo de 50 milhões de steps de treino.',
    cover: 'images/ai_soccer_nn.mp4',
    coverIsVideo: true,
    rep: 'nn',
    featured: true,
    cell: 'In [04]:',
    metric: { value: '50M', label: 'steps de treino' },
    tags: ['PyTorch', 'PPO', 'Gymnasium', 'self-play', 'CPU-only'],
    links: [
      {
        label: 'ler o artigo no Medium',
        href: 'https://medium.com/@henriquetarginoalbuquerque/i-trained-an-ai-to-play-football-for-a-billion-steps-heres-what-broke-742328956196',
      },
    ],
    sections: [
      {
        h3: 'A ideia',
        body: [
          'Nada de comportamento programado: os agentes começam sabendo absolutamente nada e aprendem por reforço, jogando milhões de partidas contra si mesmos (self-play) até desenvolverem estratégia. A política é uma <strong>rede neural pequena (~26 mil parâmetros)</strong> treinada com um <strong>PPO escrito do zero</strong> (estilo CleanRL, sem bibliotecas de RL prontas), em PyTorch, tudo na CPU de um MacBook Air.',
        ],
      },
      {
        h3: 'As 3 falhas silenciosas',
        body: [
          '<strong>A armadilha pacifista (~30M steps perdidos):</strong> uma penalidade de −0.05 por chute errado se acumulava ~100 vezes por episódio (−5 de retorno esperado), engolindo a rara recompensa de gol. O PPO concluiu, matematicamente, que o ótimo era <em>nunca chutar</em>. O agente ia para o canto do campo e ficava parado.',
          '<strong>Esquecimento catastrófico:</strong> num currículo monotônico, o agente mandava bem no estágio 1 (88% de gols), travava no estágio 2 e <em>esquecia o estágio 1</em> (caía para 4%). É o vale visível perto dos 28M steps na curva de retorno: a rede "desaprendeu" o ataque para abrir espaço para a defesa.',
          '<strong>Colapso numérico:</strong> com ações contínuas, o bônus de entropia empurrava o desvio-padrão da gaussiana ao infinito até estourar o float32 (NaN, crash). A solução foi estrutural: troquei para <strong>18 ações discretas</strong> com squashing por tanh.',
        ],
      },
      {
        h3: 'O que finalmente funcionou',
        body: [
          'Ações discretas eliminaram quatro patologias de uma vez. Um <strong>currículo de 12 estágios</strong> com ancoragem temporal (20% dos episódios amostrados de estágios passados) resolveu o esquecimento. A versão V10.2 convergiu com 50M steps, depois de quase 1 bilhão somando todas as tentativas.',
          'A maior lição: <em>"a função de recompensa não descreve o que você quer; ela descreve o que o agente vai otimizar."</em> Treinar uma IA não é otimização limpa, é depurar um sistema cujos bugs se escondem dentro de valores esperados.',
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
    sections: [
      {
        h3: 'Limpeza e EDA',
        body: [
          'Comecei com dados brutos de uma plataforma de venda de veículos (marca, modelo, ano, km, preço, cor). Mais de <strong>25 mil registros</strong> tinham campos vazios: cerca de 10 mil na coluna de cor (preenchidos como "unknown"). Os demais (ano, cilindros, odômetro) tratei pela moda por modelo, condição e quilometragem.',
          'Removi casos que distorciam tudo: a Mercedes-Benz tinha só 40 linhas (valores repetidos) e mais de 800 carros custavam menos de US$100, outliers irreais para o mercado.',
        ],
      },
      {
        h3: 'Entendendo outliers (para qualquer público)',
        body: [
          'Preparei uma explicação simples do que são outliers usando um boxplot (mediana, quartis, extremos). Um caso prático: um Chevrolet levou 271 dias para vender, enquanto a mediana era 33. Esse único valor puxava a média para 39,6 dias; removendo os outliers, a média caiu para 36,6.',
          'A remoção foi criteriosa: só <strong>3,1% dos dados</strong> saíram, mas eles inflavam a média em quase 10%. Validei as diferenças com testes estatísticos (ANOVA e Tukey\'s HSD via Scipy/Statsmodels), para basear as conclusões em evidência, não em achismo visual.',
        ],
      },
      {
        h3: 'O modelo',
        body: [
          'A Regressão Linear não rendeu bem; parti para o <strong>Random Forest Regression</strong>, com melhor equilíbrio entre precisão e generalização. Treinado com marca, ano, km, combustível e cor, atingiu <strong>mais de 85% de score</strong> na validação e foi integrado a um app web onde o usuário insere as características e recebe a estimativa de preço.',
        ],
      },
    ],
  },

  {
    slug: 'buraco-da-mae',
    kind: 'automação · data viz',
    title: 'Automatizando um Hobby',
    lead: 'Um app que transforma os pontos do nosso jogo de Buraco em análises em tempo real, com dashboards dinâmicos e uma celebração a cada partida.',
    cover: 'images/baralho.jpg',
    featured: false,
    cell: '',
    metric: { value: '∞', label: 'sorrisos da minha mãe' },
    tags: ['Streamlit', 'Plotly', 'gspread', 'Pandas'],
    sections: [
      {
        h3: 'O início da ideia',
        body: [
          'O projeto nasceu de uma cena do cotidiano: jogar Buraco com a minha mãe. Por muito tempo o placar era anotado no bloco de notas do celular dela, um processo lento e sem nenhuma graça visual. Vi ali a oportunidade perfeita de automatizar e transformar nosso hobby numa experiência interativa.',
        ],
      },
      {
        h3: 'Desenvolvimento',
        body: [
          'Nunca tinha usado a API do Google Sheets, então estudei: descobri o <strong>gspread</strong>, que conecta o app direto a uma planilha como se fosse um banco de dados online. Para a interface usei <strong>Streamlit</strong>, e com <strong>Plotly</strong> transformei números em histórias: evolução de cada jogador, maiores vitórias, sequências, médias.',
          'Implementei cache com <code>@st.cache_data</code> para deixar tudo rápido, e um formulário protegido por senha para que só jogadores autorizados registrem resultados. A cada partida nova, os gráficos se atualizam na hora.',
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
    cover: 'images/n8n1.PNG',
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
