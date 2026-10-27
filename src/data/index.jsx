import { IdeaIcon, EthicsIcon, DevIcon, DiscussIcon } from '../icons'
const cardTrilha1 = '/assets/images/card-trilha1.png'
const cardTrilha2 = '/assets/images/card-trilha2.png'
const cardTrilha3 = '/assets/images/card-trilha3.png'
const cardTrilha4 = '/assets/images/card-trilha4.png'
export const TRILHAS = [
  {
    id: 'ideacao',
    label: 'IDEAÇÃO',
    labelColor: '#F79C5A',
    borderColor: '#F79C5A',
    bg: '#fff9f5',
    icon: <IdeaIcon />,
    cardImage: cardTrilha1,
    title: 'Desenvolver Ideias sobre Projetos ou Soluções em IA',
    desc1: 'Estruture o seu projeto, defina o impacto, a dificuldade e os diferenciais da sua solução.',
    desc2: 'A primeira trilha do jogo tem como objetivo estimular o questionamento sobre ideias sobre a eficiência da sua solução, quem será impactado, a dificuldade de desenvolvimento e os diferenciais.',
  },
  {
    id: 'etica',
    label: 'ÉTICA',
    labelColor: '#FBD160',
    borderColor: '#FBD160',
    bg: '#fffdf0',
    icon: <EthicsIcon />,
    cardImage: cardTrilha2,
    title: 'Princípios Éticos Básicos Aplicáveis à Solução',
    desc1: 'Explore os fundamentos éticos para construir soluções de IA justas, responsáveis e inclusivas.',
    desc2: 'Reflita sobre viés algorítmico, privacidade de dados, transparência e responsabilidade nas soluções de inteligência artificial.',
  },
  {
    id: 'desenvolvimento',
    label: 'DESENVOLVIMENTO',
    labelColor: '#f17419',
    borderColor: '#f17419',
    bg: '#fff9f5',
    icon: <DevIcon />,
    cardImage: cardTrilha3,
    title: 'Passos do Desenvolvimento de uma Solução de IA usando Aprendizado de Máquina',
    desc1: 'Entenda o ciclo completo de desenvolvimento: coleta de dados, treinamento, validação e implantação.',
    desc2: 'Percorra cada etapa prática do desenvolvimento de um modelo de machine learning com foco em boas práticas e qualidade.',
  },
  {
    id: 'discussao',
    label: 'DISCUSSÃO',
    labelColor: '#F1A5C1',
    borderColor: '#F1A5C1',
    bg: '#fff5f9',
    icon: <DiscussIcon />,
    cardImage: cardTrilha4,
    title: 'Princípios Éticos Básicos Aplicáveis à Solução',
    desc1: 'Provoque debates ricos e fundamentados sobre o impacto social das soluções de IA.',
    desc2: 'A trilha de discussão incentiva o diálogo plural, considerando diferentes perspectivas culturais, econômicas e sociais sobre a aplicação da inteligência artificial.',
  },
]

export const FAQS = [
  {
    q: 'O que é o RefletIA?',
    a: 'O RefletIA é uma plataforma educacional que utiliza o jogo de cartas InteliGenteCards para ensinar conceitos de Inteligência Artificial de forma ética, responsável e colaborativa.',
  },
  {
    q: 'Por que o RefletIA não se chama mais InteliGenteCards?',
    a: 'O nome RefletIA foi escolhido para refletir o propósito da plataforma: promover reflexão sobre Inteligência Artificial. O InteliGenteCards continua sendo o nome do jogo de cartas utilizado na plataforma.',
  },
  {
    q: 'O que é o InteliGenteCards?',
    a: 'O InteliGenteCards é um jogo de cartas e baralho educacional desenvolvido para orientar estudantes, professores e profissionais a pensarem em soluções de Inteligência Artificial que sejam éticas, justas, responsáveis e integradas ao impacto social.',
  },
  {
    q: 'Para que o InteliGenteCards foi criado?',
    a: 'O InteliGenteCards foi criado para facilitar o aprendizado sobre IA de forma colaborativa, estimulando o pensamento crítico e o debate entre participantes de diferentes contextos.',
  },
  {
    q: 'Quem pode usar o RefletIA?',
    a: 'Qualquer pessoa interessada em aprender sobre IA de forma responsável: estudantes, educadores, profissionais de tecnologia e facilitadores de workshops.',
  },
  {
    q: 'Preciso pagar para utilizar o RefletIA?',
    a: 'A plataforma é 100% gratuita, com o objetivo de democratizar o acesso ao conhecimento sobre IA ética e responsável.',
  },
  {
    q: 'Qual é a diferença entre os perfis de Estudante e de Facilitador?',
    a: 'O Estudante participa das dinâmicas com as cartas. O Facilitador conduz as sessões, tem acesso a recursos adicionais e pode criar e compartilhar baralhos personalizados.',
  },
  {
    q: 'Sobre o Autor do Baralho',
    a: 'Robson Bonidia possui Doutorado em Ciência da Computação e Matemática Computacional pela Universidade de São Paulo (USP). Atualmente, é membro dos comitês de coordenação da rede global AI4PEP. Sua experiência abrange IA, reconhecimento de padrões, aprendizado de máquina e biologia computacional, com foco na democratização do uso de IA para o bem social.',
  },
  {
    q: 'Sobre os responsáveis pelo desenvolvimento da Plataforma',
    a: 'A plataforma foi desenvolvida por Stéffane Leal Silva Santos como seu Trabalho de Conclusão de Curso (TCC) em Engenharia de Computação na Universidade Tecnológica Federal do Paraná (UTFPR). O projeto contou com a colaboração de Josiane Mariane Batista, que auxiliou em todo o processo de levantamento de requisitos e organização das ideias, sendo orientado pelo Prof. Dr. Robson Parmezan Bonídia (coordenador do Projeto de Extensão InteliGente e autor do Baralho InteliGenteCards) e pelo Prof. Dr. Rodrigo Henrique Cunha Palácios.',
  }
]

export const FUNCIONALIDADES = [
  {
    id: 'cartas',
    title: 'Dinâmica Interativa com Cartas',
    desc: 'Participe de sessões colaborativas guiadas por cartas de desafio e questionário que promovem pensamento crítico sobre IA ética.',
  },
  {
    id: 'ai',
    title: 'Assistente de IA',
    desc: 'Receba orientação em tempo real com Sabia, da Maritaca AI, assistente inteligente otimizado para português que auxilia na ideação.',
  },
  {
    id: 'pdf',
    title: 'Relatório em PDF',
    desc: 'Gere um relatório formatado e profissional com suas respostas respondendo ética e tecnicamente os desafios propostos.',
  },
  {
    id: 'collab',
    title: 'Colaboração',
    desc: 'Compartilhe suas ideias com outros usuários.',
  },
]
