const translations = {
    pt: {
        // --- Header ---
        "menu_home": "Início",
        "menu_about": "Sobre",
        "menu_projects": "Projetos",
        "menu_certifications": "Certificações",
        "menu_contact": "Contato",

        // --- Index: Hero ---
        "hero_greeting": "Olá, eu sou",
        "hero_transform": "Transformo dados em",
        // O efeito typing tem as próprias strings em main.js
        "hero_subtitle": "Bem-vindo ao meu portfólio de Ciência de Dados.",
        "hero_explore": "Explorar",

        // --- Index: About ---
        "about_title": "Minha Jornada",
        "about_p1": 'Minha paixão por tecnologia começou cedo com os videogames. Mais do que jogar, o que me prendia era entender como tudo funcionava "por trás das telas".',
        "about_p2": 'Lembro que, aos 10 anos, uma professora perguntou o que queríamos ser quando crescer. Peguei meu papel e escrevi: <strong>"quero ser TI"</strong>. Desde aquela época, eu já sabia o caminho que iria seguir.',
        "about_p3": 'O tempo passou e aquele desejo virou minha realidade como <strong>Cientista de Dados</strong>. Escolhi essa área impulsionado principalmente pela <strong>Visão Computacional</strong>: o fato de uma máquina "aprender" a distinguir a mão de um humano de uma xícara é algo que sempre me impressionou muito.',
        "about_p4": 'Tenho sólida experiência profissional na criação de <strong>agentes de IA</strong>, no desenvolvimento de <strong>Machine Learning</strong> (como sistemas de recomendação e predição) e em fluxos de <strong>Automação</strong> avançados para integrar processos de ponta a ponta.',
        "about_p5_1": 'No fim das contas, a tecnologia só faz sentido quando gera impacto e ajuda pessoas. Afinal, por trás de todos esses dados, fluxos e modelos, existe alguém que simplesmente ama o que faz.',
        "about_p5_2": '(obs: esse texto veio 100% do coração e não foi uma I.A. que fez hahaha)',

        // --- Index: Tech ---
        "tech_title": "Minhas Tecnologias",
        "tech_cv": "Visão Computacional",

        // --- Index: Projects ---
        "projects_title": "Principais Projetos",
        "legend_ml": "Machine Learning",
        "legend_data": "Análise de Dados",
        "legend_auto": "Automação",
        "legend_cv": "Visão Computacional",
        "view_project": "Visualizar projeto →",

        // Project 1: SOS
        "proj1_title": "Hand Tracking: Detector de Sinal de Socorro",
        "proj1_desc": "Sistema de visão computacional em tempo real (MediaPipe/OpenCV) para detecção do sinal universal de socorro. Valida gestos via geometria analítica e dispara alertas automáticos via webhook.",
        // Project 2: Cars
        "proj2_title": "Análise de Dados Automotivos & Previsão de Preços",
        "proj2_desc": "Análise exploratória de dados veiculares e modelo de Machine Learning para predição de preços. Contém um pequeno artigo sobre outliers e como lidar com eles.",
        // Project 3: Buraco
        "proj3_title": "Automatizando um Hobby: Jogo de Baralho",
        "proj3_desc": "Projeto pessoal feito para cadastrar partidas e gerar estatísticas das partidas de Buraco com a minha mãe. Tem como objetivo aumentar a competitividade e diversão do nosso hobby.",
        // Project 4: N8N
        "proj4_title": "Agente de I.A. no WhatsApp",
        "proj4_desc": "Automação completa baseada em Inteligência Artificial utilizando N8N, Evolution API e Chatwoot para realizar o atendimento inicial autônomo, automatizando respostas e acompanhamentos.",

        // --- Index: Certifications Highlights ---
        "cert_highlight_title": "Certificações em Destaque",
        "view_all_cert": "Ver todas",

        // --- Footer ---
        "footer_title": "Vamos nos conectar?",
        "footer_text": "Estou aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato.",
        "footer_copy": "© 2026 | Desenvolvido por Henrique Targino", // updated to 2026 as per one file

        // --- Shared Project Detail Elements ---
        "back_home": "← Voltar para todos os projetos",
        "view_github": "Ver Código no GitHub",
        "view_github_2": "Ver no GitHub",

        // --- Project 1 Text ---
        "p1_h1": 'Detector de "Sinal de Socorro" em Tempo Real',
        "p1_sb": "Um sistema de segurança baseado em Visão Computacional que identifica pedidos de ajuda e dispara alertas via API.",
        "p1_h3_1": "A Inspiração",
        "p1_p1_1": 'Entrei na área de Dados justamente por causa da Visão Computacional. Eu ficava impressionado assistindo aqueles vídeos de carros autônomos e câmeras de segurança inteligentes, tentando entender como as máquinas "enxergavam" o mundo. Curiosamente, o caminho profissional me levou para análises e automações, mas decidi tirar um fim de semana para finalmente colocar a mão na massa no que me trouxe para essa carreira.',
        "p1_p1_2": 'Não queria fazer apenas um "Hello World". Queria algo diferente, com impacto real. Desenvolvi um sistema capaz de identificar o "Sinal de Socorro" (Signal for Help) em tempo real e disparar um alerta silencioso via API.',
        "p1_p1_3": 'Por conta desta aplicação e da repercussão do meu ',
        "p1_a_1": 'post original',
        "p1_p1_4": ', fui <strong>convidado para ministrar uma aula</strong> sobre Visão Computacional para alunos da TripleTen, compartilhando toda a engenharia e os desafios práticos da construção deste sistema (você pode conferir o ',
        "p1_a_2": 'post sobre a aula aqui',
        "p1_p1_5": ').',
        "p1_h3_2": "Como Funciona a Lógica?",
        "p1_p2_1": 'Diferente de abordagens tradicionais que exigem o treinamento de modelos pesados de Deep Learning, este sistema utiliza <strong>Geometria Euclidiana</strong> e <strong>Álgebra Linear</strong> para analisar a biomecânica da mão em tempo real usando apenas CPU. O algoritmo segue um pipeline de decisão rigoroso através de uma <strong>Máquina de Estados Finita (FSM)</strong> para evitar detectar um "tchau" ou gestos aleatórios:',
        "p1_li_1": '<strong>Estágio 1 (Armar):</strong> O sistema extrai 21 landmarks via MediaPipe e verifica se os 4 dedos estão levantados. Calculamos a <em>Distância Euclidiana</em> entre a ponta do dedão e a base do mindinho. Se for curta (dedão escondido na palma), entra no estado de <strong>ALERTA (Laranja)</strong> na UI.',
        "p1_li_2": '<strong>Estágio 2 (Disparar):</strong> Uma janela temporal invisível de apenas 2 segundos é aberta. Se o usuário fechar o punho (abaixar os 4 dedos juntos) estritamente dentro desse limite, a intenção de socorro é comprovada matematicamente.',
        "p1_li_3": '<strong>Output Assíncrono:</strong> A tela pisca em vermelho como feedback visual e dispara magicamente um POST Request de alerta para o N8N (ou qualquer webhook de segurança).',
        "p1_h3_3": "Desafios de Engenharia Superados",
        "p1_p3_1": 'Para construir a solução, diversos obstáculos práticos do uso de processamento de imagens ao vivo precisaram ser trabalhados para o algoritmo não ser lento e nem impreciso:',
        "p1_li2_1": '<strong>Processamento Paralelo (Threading):</strong> Sem dúvida o desafio crucial de UX. Utilizar <em>Threading</em> foi vital porque sem isso ocorre o famoso <em>"Blocking I/O"</em>. Basicamente, o vídeo "congelava" toda vez que o Python aguardava a resposta de sucesso do servidor HTTP na internet. Colocando o request em uma Thread separada, o FPS da câmera local se manteve inalterado.',
        "p1_li2_2": '<strong>Independência de Profundidade:</strong> Como a lógica mede as proporções das juntas em vez de calcular distâncias exatas de pixels na tela, a segurança matemática funciona quer a mão da pessoa esteja muito perto da câmera, ou lá no final do quarto.',
        "p1_li2_3": '<strong>Tratamento de Matrizes:</strong> A clássica dor de cabeça com canais de cores. Garantir a fluidez na hora de reverter o espaço de cores nativo BGR lido nativamente pelo OpenCV para o formato RGB exigido pelos modelos de análise de pose para então desenhar as <em>Bounding Boxes</em> devolvendo à tela original.',

        // --- Project 2 Text ---
        "p2_h1": "Aplicativo Web: Previsão de Preços (Machine Learning) e Análise de Dados Automotivos.",
        "p2_sb": "Aplicativo web interativo para análise e previsões de dados do mercado automotivo.",
        "p2_h3_1": "O Começo",
        "p2_p1_1": "O desenvolvimento do projeto iniciou-se com a coleta dos dados brutos fornecidos por uma plataforma de vendas de veículos. Esses dados continham diversas informações, como marca, modelo, ano, quilometragem, preço, cor e outras características. Antes de qualquer análise, foi necessário realizar um processo de limpeza e pré-processamento dos dados.",
        "p2_h3_2": "Exploração e Análise dos Dados (EDA)",
        "p2_p2_1_1": "Após a etapa de limpeza e pré-processamento, iniciei a Análise Exploratória de Dados (EDA) para compreender melhor o comportamento do conjunto de dados e identificar padrões relevantes. O primeiro desafio foi lidar com valores ausentes. Mais de ",
        "p2_s_1": "25 mil registros",
        "p2_p2_1_2": ' apresentavam campos vazios, sendo que cerca de 10 mil estavam na coluna "paint_color", preenchida com a categoria "unknown". Os demais valores ausentes, presentes em colunas como "model_year", "cylinders" e "odometer", foram tratados com base na moda por modelo, na condição do veículo, na quilometragem e no ano de fabricação, garantindo consistência nas informações.',
        "p2_p2_2": "Durante a análise, identifiquei casos específicos que poderiam distorcer os resultados, como a marca Mercedes-Benz, que tinha apenas 40 linhas de dados para dois modelos de carro (valores repetidos). Para manter a robustez estatística, essa marca foi removida. Também foram eliminados mais de 800 registros de veículos com preços inferiores a 100 dólares, considerados outliers irreais para o mercado automotivo.",
        "p2_p2_3": "Essa etapa foi fundamental para estruturar as variáveis que alimentariam o modelo de machine learning e os gráficos.",
        "p2_h3_3": "Análises Visuais",
        "p2_p3_1": "Com o conjunto de dados tratado, iniciei a construção de visualizações interativas para investigar padrões no mercado automotivo. Um dos principais gráficos foi a mediana de preços por marca, que oferece uma visão mais robusta do valor central de cada fabricante, reduzindo o impacto de valores extremos e fornecendo uma referência mais fiel do mercado. Essa análise permitiu identificar quais marcas se posicionam em faixas de preço mais altas e quais apresentam valores mais acessíveis.",
        "p2_p3_2": "Outro ponto explorado foi a distribuição das cores dos veículos. Ao mapear a frequência de cada cor, foi possível observar preferências do mercado e avaliar se determinadas tonalidades podem ter relação com liquidez de venda ou variações de preço. Esses insights visuais ajudam tanto compradores quanto vendedores a compreender melhor as tendências de consumo.",
        "p2_h3_4": "Entendendo e Tratando Outliers",
        "p2_p4_1_1": "Para tornar a análise mais ",
        "p2_s_2": "compreensível",
        "p2_p4_1_2": " a ",
        "p2_s_3": "qualquer público",
        "p2_p4_1_3": ", preparei uma explicação simples sobre o que são outliers, como identificá-los e qual o impacto que eles podem ter nas conclusões. Utilizei o exemplo de um boxplot, explicando seus elementos principais: mediana, quartis e outliers. Além disso, mostrei como esses outliers representam valores extremos que podem distorcer métricas como a média.",
        "p2_p4_2": "Um caso prático foi o tempo de venda de veículos Chevrolet, onde um registro indicava 271 dias para a venda, enquanto a mediana era de apenas 33 dias. Esse único valor elevava a média para 39,6 dias. Após a remoção dos outliers, a mediana caiu para 32 dias e a média para 36,6 dias, evidenciando que a média é muito mais sensível a valores extremos do que a mediana.",
        "p2_p4_3": "Expliquei também que a remoção foi criteriosa: apenas 3,1% dos dados foram excluídos, mas eles inflavam a média em quase 10%. Incluí um exemplo de código em Python mostrando como calcular a porcentagem de outliers por marca, utilizando o intervalo interquartil (IQR) como critério. Essa abordagem combinou clareza na explicação com aplicação prática, tornando o conceito acessível até mesmo para quem não tem formação em ciência de dados.",
        "p2_h3_5": "Testes Estatísticos",
        "p2_p5_1": "Para validar se as diferenças observadas nos gráficos eram estatisticamente significativas, utilizei testes como ANOVA e Tukey’s HSD. O ANOVA foi aplicado para verificar se havia diferenças relevantes entre as médias de preço de diferentes grupos, enquanto o teste de Tukey’s HSD ajudou a identificar quais pares de grupos apresentavam essas diferenças de forma mais precisa. Essa abordagem assegurou que as conclusões fossem baseadas em evidências numéricas e não apenas em percepções visuais.",
        "p2_p5_2": "Esses testes foram implementados com as bibliotecas Scipy e Statsmodels, e os resultados foram apresentados de forma visual, utilizando gráficos para destacar comparações significativas.",
        "p2_h3_6": "Modelo de Machine Learning",
        "p2_p6_1": "Com a análise estatística concluída e as variáveis mais relevantes definidas, desenvolvi um modelo de Machine Learning para prever preços de veículos. Inicialmente testei a Regressão Linear, mas o desempenho não foi satisfatório. Em seguida, optei pelo algoritmo Random Forest Regression, que apresentou melhor equilíbrio entre precisão e capacidade de generalização.",
        "p2_p6_2": "O modelo foi treinado com atributos como marca, ano de fabricação, quilometragem, tipo de combustível e cor do veículo. Para medir a performance, utilizei métricas de avaliação de regressão, garantindo que as previsões fossem consistentes com o comportamento real do mercado. O modelo atingiu mais de 85% de score no conjunto de validação e foi integrado à aplicação web, permitindo que o usuário insira as características de um veículo e obtenha uma estimativa de preço baseada no histórico de dados.",
        "p2_h3_7": "Resultado",
        "p2_p7_1": "Este projeto combinou o poder do machine learning com uma análise detalhada de dados e testes estatísticos para construir uma ferramenta completa de análise do mercado automotivo. A combinação de visualizações interativas, tratamento criterioso de dados e modelo preditivo oferece uma solução completa para análise e tomada de decisão.",

        // --- Project 3 Text ---
        "p3_h1": "Automatizando o dia a dia: Do Bloco de Notas ao Dashboard Interativo",
        "p3_sb": "Aplicativo web interativo que transforma os pontos de um jogo de cartas em análises de dados em tempo real, com dashboards dinâmicos e controle seguro de partidas.",
        "p3_h3_1": "O Início da Ideia",
        "p3_p1_1": "O projeto nasceu de uma situação simples do cotidiano: jogar Buraco, um jogo de baralho, com minha mãe. Por um bom tempo, nosso placar era anotado manualmente no bloco de notas do celular dela, um processo lento e pouco visual. Ao observar essas anotações, percebi uma oportunidade perfeita de automatizar essa tarefa e transformar nosso hobby em uma experiência interativa. A ideia era uma só: criar um sistema que registrasse os pontos, mostrasse gráficos e métricas, e permitisse acompanhar o desempenho de cada jogador ao longo do tempo.",
        "p3_h3_2": "Desenvolvimento",
        "p3_p2_1_1": "O primeiro desafio foi entender como manter uma base de dados viva que fosse atualizada a cada nova partida. Até então, eu nunca tinha trabalhado com a API do Google Sheets, então comecei a estudar. Busquei documentações e fóruns para entender como autenticar, escrever e ler dados de forma segura. Descobri o poder das bibliotecas Python ",
        "p3_s_1": "gspread",
        "p3_p2_1_2": " e ",
        "p3_s_2": "gspread-dataframe",
        "p3_p2_1_3": ", que permitiram conectar a aplicação diretamente a uma planilha, como se fosse um banco de dados online, acessível de qualquer lugar.",
        "p3_p2_2_1": "Com os dados garantidos, o próximo passo foi dar vida à interface. Usei ",
        "p3_s_3": "Streamlit",
        "p3_p2_2_2": " para criar uma página interativa, intuitiva e responsiva. Mas o grande diferencial estava em transformar números em histórias visuais: com ",
        "p3_s_4": "Plotly",
        "p3_p2_2_3": ", desenvolvi gráficos interativos. Assim, é possível ver a evolução de cada jogador, as maiores vitórias, sequências, diferenças médias de pontuação e até estatísticas como “qual foi o dia em que um jogador fez a maior pontuação?”.",
        "p3_p2_3_1": "Para que tudo fosse rápido, implementei cache com ",
        "p3_s_5": "<code>@st.cache_data</code>",
        "p3_p2_3_2": ", garantindo que as consultas à planilha fossem otimizadas e que os dados estivessem sempre atualizados. Ao registrar novas partidas, criei um formulário seguro, protegido por senha, para que apenas os jogadores autorizados pudessem inserir resultados. Isso garantiu integridade e confiabilidade nas análises. Cada vez que uma partida é registrada, os dados mudam, e os gráficos se atualizam instantaneamente, tornando a experiência quase tão empolgante quanto o próprio jogo.",
        "p3_h3_3": "Impacto Emocional",
        "p3_p3_1_1": "A melhor parte de todo o projeto acontece quando uma nova partida é registrada: o ",
        "p3_s_6": "st.balloons",
        "p3_p3_1_2": " (função do Streamlit de soltar balões na tela) toma conta da tela, e minha mãe começa a sorrir à toa, como se tivesse acabado de ganhar um troféu. Esse detalhe simples virou um momento esperado em cada jogo, transformando a atualização de um placar em uma pequena celebração.",
        "p3_p3_2": "Esse não foi nem de perto o projeto mais trabalhoso ou mais técnico que já desenvolvi, mas, sem sombra de dúvidas, foi o mais divertido e o que trouxe o maior retorno: a felicidade e o orgulho da minha mãe. Mais do que gráficos, estatísticas ou linhas de código, esse projeto provou que a tecnologia pode criar memórias, aproximar pessoas e transformar momentos simples em experiências inesquecíveis.",

        // --- Project 4 Text ---
        "p4_h1": "Agente de IA Secretário Virtual para Nutricionista",
        "p4_sb": "Automação de atendimento no WhatsApp com integração entre N8N, Evolution API e Chatwoot",
        "p4_h3_1": "Início",
        "p4_p1_1": "Uma nutricionista me procurou dizendo que a maior dor dela era lidar com o volume de mensagens no WhatsApp. Muitas vezes, no meio da rotina de atendimentos, as conversas desciam na tela e acabavam ficando sem resposta, o que prejudicava a experiência dos pacientes e gerava atrasos para marcar ou desmarcar consultas. A ideia era criar um agente virtual que pudesse assumir esse papel de secretária: responder dúvidas, enviar informações personalizadas sobre dietas e manter o atendimento ativo a qualquer hora do dia.",
        "p4_h3_2": "Desenvolvimento",
        "p4_p2_1": "O primeiro passo foi estruturar uma base de dados centralizada e fácil de atualizar. Optei pelo Google Sheets, mesmo sabendo que não é o banco de dados mais robusto, porque a aplicação não exigia grandes volumes de armazenamento e a nutricionista já estava acostumada a trabalhar com planilhas. Ali, registrei informações como nome e número de contato dos pacientes, dietas personalizadas e observações importantes, como “paciente bariátrico, evitar X alimento”.",
        "p4_p2_2_1": "Para orquestrar todo o fluxo, utilizei o ",
        "p4_s_1": "N8N",
        "p4_p2_2_2": ", que integrou a ",
        "p4_s_2": "Evolution API",
        "p4_p2_2_3": " (responsável pela gestão das mensagens no ",
        "p4_s_3": "WhatsApp",
        "p4_p2_2_4": ") e o ",
        "p4_s_4": "Chatwoot",
        "p4_p2_2_5": ", onde todas as conversas são centralizadas. O agente foi configurado para buscar respostas diretamente na planilha, garantindo mensagens rápidas e personalizadas. Se um paciente perguntasse “Qual a minha dieta desta semana?”, o sistema consultava seus dados e respondia instantaneamente. Quando surgiam perguntas que exigiam histórico ou contexto de consultas anteriores, como “Você lembra o que conversamos na última consulta?”, o agente acionava o handoff e transferia a conversa para que a nutricionista respondesse diretamente no Chatwoot.",
        "p4_h3_3": "Fluxo N8N",
        "p4_p3_1_1": "Na primeira parte do fluxo, a mensagem chega pelo WhatsApp através do nó ",
        "p4_s_5": "Webhook",
        "p4_p3_1_2": ". Em seguida, o nó ",
        "p4_s_6": "Filter",
        "p4_p3_1_3": " verifica se a mensagem foi enviada por um cliente. Os nós ",
        "p4_s_7": "Set (0 , 1 , 2 , 3)",
        "p4_p3_1_4": " armazenam variáveis importantes, como o número de telefone do cliente. Depois, há uma verificação de áudio: caso a mensagem recebida seja um áudio, ela é baixada e transcrita; caso contrário, o fluxo segue normalmente. No final dessa etapa, os dois caminhos (texto e áudio) se unem no nó ",
        "p4_s_8": "Merge",
        "p4_p3_1_5": ", permitindo que o processamento continue de forma centralizada.",
        "p4_p3_2_1": "Na segunda parte do fluxo, o nó ",
        "p4_s_9": "Google Sheets",
        "p4_p3_2_2": " busca informações adicionais sobre o cliente com base no número de telefone, como nome, dieta e observações. Esses dados, junto com a mensagem recebida, são enviados ao agente de IA, que gera a resposta. Em seguida, um nó ",
        "p4_s_10": "If",
        "p4_p3_2_3": " verifica se a situação exige um <em>handoff</em> para atendimento humano: se sim, a nutricionista é notificada e o fluxo para; se não, a IA analisa o tamanho da mensagem para calcular o tempo de digitação simulada, criando uma experiência mais natural, e então envia a resposta diretamente para o cliente no WhatsApp.",
        "p4_h3_4": "Resultado",
        "p4_p4_1": "O resultado foi uma transformação imediata no fluxo de trabalho. Desde a implementação, nenhuma mensagem deixou de ser respondida e o número de interações com os pacientes aumentou em 30% no primeiro mês. A nutricionista passou a dedicar menos tempo a tarefas administrativas e mais tempo a atividades de alto valor, como o acompanhamento detalhado de cada paciente.",

        // --- Certifications ---
        "cert_title_main": "Minhas Certificações",
        "cert_subtitle": "Aqui estão algumas das certificações que conquistei ao longo da minha jornada de aprendizado contínuo.",
        "cert_img": "https://placehold.co/400x300/181A1D/FFFFFF?text=Ver+Certificado",
        "cert_1_h3": "Bootcamp Ciência de Dados ( 1 ano )",
        "cert_1_p": "Agosto 2024 - Setembro 2025",
        "cert_2_h3": "CS50's Introduction to Computer Science",
        "cert_2_p": "Abril 2024 - Agosto 2025",
        "cert_3_h3": "Visão Computacional com OpenCV",
        "cert_3_p": "Novembro 2025",
        "cert_4_h3": "Machine Learning",
        "cert_4_p": "Janeiro 2025 - Junho 2025",
    },
    en: {
        // --- Header ---
        "menu_home": "Home",
        "menu_about": "About",
        "menu_projects": "Projects",
        "menu_certifications": "Certifications",
        "menu_contact": "Contact",

        // --- Index: Hero ---
        "hero_greeting": "Hello, I am",
        "hero_transform": "I transform data into",
        "hero_subtitle": "Welcome to my Data Science portfolio.",
        "hero_explore": "Explore",

        // --- Index: About ---
        "about_title": "My Journey",
        "about_p1": 'My passion for technology started early with video games. More than just playing, what really caught my attention was understanding how everything worked "behind the screens".',
        "about_p2": 'I remember that at the age of 10, a teacher asked what we wanted to be when we grew up. I took my paper and wrote: <strong>"I want to be IT"</strong>. Since then, I already knew the path I was going to follow.',
        "about_p3": 'Time passed and that desire became my reality as a <strong>Data Scientist</strong>. I chose this field driven mostly by <strong>Computer Vision</strong>: the fact that a machine can "learn" to distinguish a human hand from a cup is continuously fascinating to me.',
        "about_p4": 'I have solid professional experience in building <strong>AI agents</strong>, developing <strong>Machine Learning</strong> models (such as recommendation and prediction systems) and creating advanced <strong>Automation</strong> workflows to integrate end-to-end processes.',
        "about_p5_1": 'At the end of the day, technology only makes sense when it generates impact and helps people. After all, behind all these data, flows and models, there is someone who simply loves what they do.',
        "about_p5_2": "(ps: this text came 100% from the heart and wasn't generated by AI hahaha)",

        // --- Index: Tech ---
        "tech_title": "My Technologies",
        "tech_cv": "Computer Vision",

        // --- Index: Projects ---
        "projects_title": "Main Projects",
        "legend_ml": "Machine Learning",
        "legend_data": "Data Analysis",
        "legend_auto": "Automation",
        "legend_cv": "Computer Vision",
        "view_project": "View project →",

        // Project 1
        "proj1_title": "Hand Tracking: Distress Signal Detector",
        "proj1_desc": "Real-time computer vision system (MediaPipe/OpenCV) for detecting the universal distress signal. Validates gestures via analytic geometry and triggers automated alerts via webhook.",
        // Project 2
        "proj2_title": "Automotive Data Analysis & Price Prediction",
        "proj2_desc": "Exploratory analysis of vehicle data and Machine Learning model for price prediction. Also features a brief article on outliers and how to handle them.",
        // Project 3
        "proj3_title": "Automating a Hobby: Card Game",
        "proj3_desc": "A personal project built to register matches and generate statistics for Buraco games played with my mother. Aimed at increasing the competitiveness and fun of our hobby.",
        // Project 4
        "proj4_title": "WhatsApp A.I. Agent",
        "proj4_desc": "A complete Artificial Intelligence-based automation using N8N, Evolution API, and Chatwoot to autonomously handle initial customer service, automating responses and follow-ups.",

        // --- Index: Certifications Highlights ---
        "cert_highlight_title": "Featured Certifications",
        "view_all_cert": "View all",

        // --- Footer ---
        "footer_title": "Let's connect?",
        "footer_text": "I am open to new opportunities and collaborations. Feel free to reach out to me.",
        "footer_copy": "© 2026 | Developed by Henrique Targino",

        // --- Shared Project Detail Elements ---
        "back_home": "← Back to all projects",
        "view_github": "View Code on GitHub",
        "view_github_2": "View on GitHub",

        // --- Project 1 Text ---
        "p1_h1": 'Real-Time "Signal for Help" Detector',
        "p1_sb": "A Computer Vision-based security system that identifies distress signals and triggers alerts via API.",
        "p1_h3_1": "The Inspiration",
        "p1_p1_1": 'I got into Data Science precisely because of Computer Vision. I used to be amazed watching videos of autonomous vehicles and smart security cameras, trying to understand how machines "saw" the world. Interestingly, my professional path led me into data analysis and automation, but I decided to take a weekend to finally get hands-on with what brought me to this career.',
        "p1_p1_2": 'I did not want to just make a "Hello World" app. I wanted something different, with a real impact. I developed a system capable of identifying the "Signal for Help" in real time and triggering a silent alert via API.',
        "p1_p1_3": 'Due to this application and the repercussion of my ',
        "p1_a_1": 'original post',
        "p1_p1_4": ', I was <strong>invited to teach a masterclass</strong> about Computer Vision to the students at TripleTen, sharing all the engineering and practical challenges of building this system (you can check the ',
        "p1_a_2": 'post about the class here',
        "p1_p1_5": ').',
        "p1_h3_2": "How Does the Logic Work?",
        "p1_p2_1": 'Unlike traditional approaches that require training heavy Deep Learning models, this system uses <strong>Euclidean Geometry</strong> and <strong>Linear Algebra</strong> to analyze hand biomechanics in real time using only the CPU. The algorithm follows a rigorous decision pipeline via a <strong>Finite State Machine (FSM)</strong> to avoid falsely detecting a "wave" or random gestures:',
        "p1_li_1": '<strong>Stage 1 (Arming):</strong> The system extracts 21 landmarks via MediaPipe and verifies if all 4 fingers are raised. We calculate the <em>Euclidean Distance</em> between the tip of the thumb and the base of the pinky. If it is short (thumb tucked in the palm), it enters the <strong>ALERT (Orange)</strong> state in the UI.',
        "p1_li_2": '<strong>Stage 2 (Triggering):</strong> An invisible temporal window of just 2 seconds opens up. If the user makes a fist (lowering all 4 fingers together) strictly within this limit, the distress intention is mathematically confirmed.',
        "p1_li_3": '<strong>Async Output:</strong> The screen flashes red as visual feedback and magically dispatches a POST Request alert to N8N (or any security webhook).',
        "p1_h3_3": "Engineering Challenges Overcome",
        "p1_p3_1": 'To build this solution, several practical obstacles of live image processing had to be addressed so the algorithm would not be slow or inaccurate:',
        "p1_li2_1": '<strong>Parallel Processing (Threading):</strong> Without a doubt, the crucial UX challenge. Using <em>Threading</em> was vital because otherwise the famous <em>"Blocking I/O"</em> would occur. Basically, the video would "freeze" every time Python waited for a success response from the HTTP server. By putting the request in a separate Thread, the local camera FPS remained unchanged.',
        "p1_li2_2": '<strong>Depth Independence:</strong> Since the logic measures the proportions of the joints rather than calculating exact pixel distances on the screen, the mathematical security works whether the person\'s hand is very close to the camera or far away across the room.',
        "p1_li2_3": '<strong>Matrix Handling:</strong> The classic color space headache. Ensuring fluidity when reversing the native BGR color space read natively by OpenCV to the RGB format demanded by the pose analysis models, to then draw the <em>Bounding Boxes</em> and return them to the original screen view.',

        // --- Project 2 Text ---
        "p2_h1": "Web Application: Price Prediction (Machine Learning) and Automotive Data Analysis.",
        "p2_sb": "Interactive web app for analyzing and forecasting automotive market data.",
        "p2_h3_1": "The Beginning",
        "p2_p1_1": "The development of the project began with the collection of raw data provided by a car sales platform. This data contained various features, such as make, model, year, mileage, price, color, and other characteristics. Before any analysis, a data cleaning and preprocessing step was necessary.",
        "p2_h3_2": "Exploratory Data Analysis (EDA)",
        "p2_p2_1_1": "Following the cleaning and preprocessing stage, I started the Exploratory Data Analysis (EDA) to better understand the dataset's behavior and identify relevant patterns. The first challenge was handling missing values. Over ",
        "p2_s_1": "25 thousand records",
        "p2_p2_1_2": ' had empty fields, with around 10 thousand inside the "paint_color" column, which were filled with the category "unknown". Other missing values, present in columns like "model_year", "cylinders", and "odometer", were handled based on the mode by model, vehicle condition, mileage, and manufacturing year, ensuring data consistency.',
        "p2_p2_2": "During the analysis, I identified specific cases that could distort the results, such as the Mercedes-Benz brand, which had only 40 rows of data for two car models (repeated values). To maintain statistical robustness, this brand was removed. Additionally, over 800 records of vehicles priced under $100 were eliminated, as they were considered unrealistic outliers for the automotive market.",
        "p2_p2_3": "This step was crucial to structure the variables that would feed the machine learning model and the charts.",
        "p2_h3_3": "Visual Analysis",
        "p2_p3_1": "With the dataset treated, I began building interactive visualizations to investigate patterns in the automotive market. A key chart was the median price by brand, which offers a more robust view of the central value for each manufacturer, reducing the impact of extreme values and providing a more faithful market reference. This analysis allowed identifying which brands are positioned in higher price ranges and which offer more accessible values.",
        "p2_p3_2": "Another aspect explored was the distribution of vehicle colors. By mapping the frequency of each color, it was possible to observe market preferences and assess if certain shades correlate with sales liquidity or price variations. These visual insights help both buyers and sellers better understand consumer trends.",
        "p2_h3_4": "Understanding and Handling Outliers",
        "p2_p4_1_1": "To make the analysis more ",
        "p2_s_2": "understandable",
        "p2_p4_1_2": " to ",
        "p2_s_3": "any audience",
        "p2_p4_1_3": ", I prepared a simple explanation of what outliers are, how to identify them, and what impact they can have on conclusions. I used the example of a boxplot, explaining its main elements: median, quartiles, and outliers. Furthermore, I showed how these outliers represent extreme values that can distort metrics such as the mean.",
        "p2_p4_2": "A practical case was the selling time of Chevrolet vehicles, where one record indicated 271 days to sell, while the median was just 33 days. This single value raised the mean to 39.6 days. After removing the outliers, the median dropped to 32 days and the mean to 36.6 days, proving that the mean is much more sensitive to extreme values than the median.",
        "p2_p4_3": "I also explained that the removal was rigorous: only 3.1% of the data was excluded, yet it inflated the average by nearly 10%. I included a Python code example showing how to calculate the percentage of outliers per brand, using the interquartile range (IQR) as a criterion. This approach combined clarity in explanation with practical application, making the concept accessible even to those without a background in data science.",
        "p2_h3_5": "Statistical Tests",
        "p2_p5_1": "To validate whether the differences observed in the graphs were statistically significant, I ran tests like ANOVA and Tukey's HSD. ANOVA was applied to check if there were relevant differences between the average prices of different groups, while Tukey's HSD helped identify exactly which pairs of groups presented these differences. This approach ensured that conclusions were based on numerical evidence rather than just visual perception.",
        "p2_p5_2": "These tests were implemented with Scipy and Statsmodels libraries, and the results were presented visually, using graphs to highlight significant comparisons.",
        "p2_h3_6": "Machine Learning Model",
        "p2_p6_1": "With the statistical analysis completed and the most relevant variables defined, I developed a Machine Learning model to predict vehicle prices. I initially tested Linear Regression, but the performance was not satisfactory. Then, I opted for the Random Forest Regression algorithm, which showed a better balance between accuracy and generalization capability.",
        "p2_p6_2": "The model was trained with features such as brand, year of manufacture, mileage, fuel type, and vehicle color. To measure performance, I used regression evaluation metrics, ensuring that the predictions were consistent with real market behavior. The model achieved over 85% score on the validation set and was integrated into the web application, allowing the user to input a vehicle's characteristics and obtain a price estimate based on historical data.",
        "p2_h3_7": "Result",
        "p2_p7_1": "This project combined the power of machine learning with a detailed data analysis and statistical tests to build a comprehensive tool for analyzing the automotive market. The combination of interactive visualizations, careful data processing, and predictive modeling provides a complete solution for analysis and decision-making.",

        // --- Project 3 Text ---
        "p3_h1": "Automating the Everyday: From a Notepad to an Interactive Dashboard",
        "p3_sb": "An interactive web application that transforms the scores of a card game into real-time data analysis, featuring dynamic dashboards and secure match tracking.",
        "p3_h3_1": "The Starting Idea",
        "p3_p1_1": "The project was born from a simple everyday situation: playing Buraco, a card game, with my mom. For a long time, our scoreboard was manually annotated in her phone's notepad, a slow and manual process with no visual feedback. Observing these notes, I realized a perfect opportunity to automate this task and turn our hobby into an interactive experience. The idea was straightforward: create a system to register scores, display charts and metrics, and track each player's performance over time.",
        "p3_h3_2": "Development",
        "p3_p2_1_1": "The first challenge was figuring out how to maintain a live database that would update with every new match. Initially, I had never worked with the Google Sheets API before, so I started studying. I looked up documentation and forums to understand how to authenticate, read, and write data securely. I discovered the power of the Python libraries ",
        "p3_s_1": "gspread",
        "p3_p2_1_2": " and ",
        "p3_s_2": "gspread-dataframe",
        "p3_p2_1_3": ", which allowed connecting the app directly to a spreadsheet, acting as an online, universally accessible database.",
        "p3_p2_2_1": "With the data secured, the next step was bringing the interface to life. I used ",
        "p3_s_3": "Streamlit",
        "p3_p2_2_2": " to build an interactive, intuitive, and responsive page. However, the true differentiator lay in transforming numbers into visual stories: leveraging ",
        "p3_s_4": "Plotly",
        "p3_p2_2_3": ", I developed interactive charts. As a result, you can view each player's evolution, biggest wins, streaks, average score differences, and even stats like “on what day did a player score the most points?”.",
        "p3_p2_3_1": "To ensure lightning-fast performance, I implemented caching with ",
        "p3_s_5": "<code>@st.cache_data</code>",
        "p3_p2_3_2": ", guaranteeing optimized spreadsheet queries and always up-to-date data. To log new matches, I built a secure password-protected form, so only authorized players can submit results. This assured data integrity and analytical reliability. Every time a match is registered, the data changes and the charts update instantly, making the experience almost as thrilling as the game itself.",
        "p3_h3_3": "Emotional Impact",
        "p3_p3_1_1": "The best part of the whole project happens whenever a new match is registered: the ",
        "p3_s_6": "st.balloons",
        "p3_p3_1_2": " (Streamlit's screen balloons function) takes over the screen, and my mom gets a huge smile on her face, as if she had just won a trophy. This simple detail became a highly anticipated moment every game, changing a scoreboard update into a mini celebration.",
        "p3_p3_2": "This wasn't nearly the most exhausting or technically complex project I've ever developed, but without a doubt, it was the most fun and brought the highest return: my mother's happiness and pride. Beyond charts, statistics or lines of code, this project proved that technology can create memories, bring people closer, and turn simple moments into unforgettable experiences.",

        // --- Project 4 Text ---
        "p4_h1": "A.I. Virtual Assistant for Nutritionist",
        "p4_sb": "WhatsApp customer service automation built by integrating N8N, Evolution API, and Chatwoot",
        "p4_h3_1": "Beginning",
        "p4_p1_1": "A nutritionist approached me saying her biggest pain point was dealing with the volume of WhatsApp messages. Often, amidst her consultation routine, chats would get pushed down and left unanswered, which harmed the patients' experience and caused delays in scheduling or canceling appointments. The idea was to build a virtual agent that could assume this secretary role: answering questions, sending personalized diet information, and keeping the service active at any time of the day.",
        "p4_h3_2": "Development",
        "p4_p2_1": "The first step was to structure a centralized, easy-to-update database. I chose Google Sheets, even knowing it's not the most robust database, because the application didn't require massive storages and the nutritionist was already accustomed to working with spreadsheets. There, I registered info like patient names and contact numbers, custom diets, and crucial notes, such as “bariatric patient, avoid X food”.",
        "p4_p2_2_1": "To orchestrate the whole workflow, I used ",
        "p4_s_1": "N8N",
        "p4_p2_2_2": ", which integrated the ",
        "p4_s_2": "Evolution API",
        "p4_p2_2_3": " (responsible for managing messages on ",
        "p4_s_3": "WhatsApp",
        "p4_p2_2_4": ") and ",
        "p4_s_4": "Chatwoot",
        "p4_p2_2_5": ", where all conversations are centralized. The agent was configured to pull answers directly from the spreadsheet, guaranteeing fast and customized messages. If a patient asked “What is my diet this week?”, the system queried their data and replied instantly. Whenever questions arose requiring chat history or prior consultation context, such as “Do you remember what we talked about in the last consultation?”, the agent triggered a handoff and transferred the chat so the nutritionist could reply manually within Chatwoot.",
        "p4_h3_3": "N8N Flow",
        "p4_p3_1_1": "In the first part of the flow, the message arrives from WhatsApp through the ",
        "p4_s_5": "Webhook",
        "p4_p3_1_2": " node. Next, the ",
        "p4_s_6": "Filter",
        "p4_p3_1_3": " node checks if the message was sent by a client. The ",
        "p4_s_7": "Set (0 , 1 , 2 , 3)",
        "p4_p3_1_4": " nodes store critical variables, such as the client's phone number. Afterwards, there is an audio check: if the received message is an audio, it is downloaded and transcribed; otherwise, the flow proceeds normally. By the end of this stage, the two paths (text and audio) merge into the ",
        "p4_s_8": "Merge",
        "p4_p3_1_5": " node, allowing processing to continue in a centralized manner.",
        "p4_p3_2_1": "In the second part of the flow, the ",
        "p4_s_9": "Google Sheets",
        "p4_p3_2_2": " node fetches additional insights about the client based on their phone number, like name, diet, and notes. This data, alongside the received message, is forwarded to the AI agent, which synthesizes the response. Then, an ",
        "p4_s_10": "If",
        "p4_p3_2_3": " node verifies whether the situation requires a human <em>handoff</em>: if so, the nutritionist is alerted and the flow pauses; if not, the AI assesses the message's length to gauge a simulated typing delay, crafting a more natural experience, and ultimately dispatches the answer straight to the client on WhatsApp.",
        "p4_h3_4": "Result",
        "p4_p4_1": "The outcome was an immediate transformation in the workflow. Since implementation, not a single message was left unreplied, and the number of patient interactions grew by 30% in the first month. The nutritionist was able to spend less time on administrative duties and more time on high-value tasks, like the detailed follow-up of every patient.",

        // --- Certifications ---
        "cert_title_main": "My Certifications",
        "cert_subtitle": "Here are some of the certifications I have earned along my continuous learning journey.",
        "cert_img": "https://placehold.co/400x300/181A1D/FFFFFF?text=View+Certificate",
        "cert_1_h3": "Data Science Bootcamp ( 1 year )",
        "cert_1_p": "August 2024 - September 2025",
        "cert_2_h3": "CS50's Introduction to Computer Science",
        "cert_2_p": "April 2024 - August 2025",
        "cert_3_h3": "Computer Vision with OpenCV",
        "cert_3_p": "November 2025",
        "cert_4_h3": "Machine Learning",
        "cert_4_p": "January 2025 - June 2025",
    }
};

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-src]').forEach(el => {
        const key = el.getAttribute('data-i18n-src');
        if (translations[lang] && translations[lang][key]) {
            el.src = translations[lang][key];
        }
    });

    // Update typing strings in main.js if needed by storing lang globally
    window.currentLang = lang;
}

function updateLangButtons(lang) {
    const ptBtn = document.getElementById('lang-pt');
    const enBtn = document.getElementById('lang-en');

    if (!ptBtn || !enBtn) return;

    if (lang === 'en') {
        enBtn.classList.add('active');
        ptBtn.classList.remove('active');
    } else {
        ptBtn.classList.add('active');
        enBtn.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let savedLang = localStorage.getItem('portfolioLang');

    // Default to PT or EN based on browser language
    if (!savedLang) {
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang && userLang.toLowerCase().includes('en')) {
            savedLang = 'en';
        } else {
            savedLang = 'pt';
        }
        localStorage.setItem('portfolioLang', savedLang);
    }

    applyTranslations(savedLang);
    updateLangButtons(savedLang);

    // Add listeners
    const ptBtn = document.getElementById('lang-pt');
    const enBtn = document.getElementById('lang-en');

    if (ptBtn) {
        ptBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('portfolioLang', 'pt');
            applyTranslations('pt');
            updateLangButtons('pt');
            // If typing effect is running, we might need to reload or update the words array
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                if (window.updateTypingWords) window.updateTypingWords('pt');
            }
        });
    }

    if (enBtn) {
        enBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('portfolioLang', 'en');
            applyTranslations('en');
            updateLangButtons('en');
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                if (window.updateTypingWords) window.updateTypingWords('en');
            }
        });
    }
});
