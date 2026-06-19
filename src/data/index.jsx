import { IdeaIcon, EthicsIcon, DevIcon, DiscussIcon } from '../icons'

export const TRILHAS = [
  {
    id: 'ideacao',
    label: 'IDEAÇÃO',
    labelColor: '#F79C5A',
    borderColor: '#F79C5A',
    bg: '#fff9f5',
    icon: <IdeaIcon />,
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
    title: 'Princípios Éticos Básicos Aplicáveis à Solução',
    desc1: 'Provoque debates ricos e fundamentados sobre o impacto social das soluções de IA.',
    desc2: 'A trilha de discussão incentiva o diálogo plural, considerando diferentes perspectivas culturais, econômicas e sociais sobre a aplicação da inteligência artificial.',
  },
]

export const FAQS = [
  {
    q: 'O que é o InteliGenteCards?',
    a: 'O InteliGenteCards é um jogo de cartas e baralho educacional desenvolvido para orientar estudantes, professores e profissionais a pensarem em soluções de Inteligência Artificial que sejam éticas, justas, responsáveis e integradas ao impacto social.',
  },
  {
    q: 'Para que o InteliGenteCards foi criado?',
    a: 'O InteliGenteCards foi criado para facilitar o aprendizado sobre IA de forma colaborativa, estimulando o pensamento crítico e o debate entre participantes de diferentes contextos.',
  },
  {
    q: 'Quem pode usar o InteliGenteCards?',
    a: 'Qualquer pessoa interessada em aprender sobre IA de forma responsável: estudantes, educadores, profissionais de tecnologia e facilitadores de workshops.',
  },
  {
    q: 'Qual é a diferença entre o perfil de Estudante e o de Facilitador?',
    a: 'O Estudante participa das dinâmicas com as cartas. O Facilitador conduz as sessões, tem acesso a recursos adicionais e pode criar e compartilhar baralhos personalizados.',
  },
  {
    q: 'Preciso pagar para utilizar o InteliGenteCards?',
    a: 'A plataforma é 100% gratuita, com o objetivo de democratizar o acesso ao conhecimento sobre IA ética e responsável.',
  },
  {
    q: 'Sobre o Autor do Baralho',
    a: 'Robson Bonidia possui Doutorado em Ciência da Computação e Matemática Computacional pela Universidade de São Paulo (USP). Atualmente, é membro dos comitês de coordenação da rede global AI4PEP. Sua experiência abrange IA, reconhecimento de padrões, aprendizado de máquina e biologia computacional, com foco na democratização do uso de IA para o bem social.',
  },
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
    title: 'Colaboração Síncrona',
    desc: 'Compartilhe suas ideias com outros usuários para edição colaborativa em tempo real.',
  },
]
