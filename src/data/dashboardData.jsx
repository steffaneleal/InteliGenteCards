// Dados fictícios usados apenas para popular os protótipos das telas
// pós-login. Quando a API (Node.js/PostgreSQL) estiver pronta, estes dados serão substituídos por chamadas reais.s

export const TRILHA_META = {
  ideacao: { label: 'Ideação', color: '#F79C5A' },
  etica: { label: 'Ética', color: '#FBD160' },
  desenvolvimento: { label: 'Desenvolvimento', color: '#f17419' },
  discussao: { label: 'Discussão', color: '#F1A5C1' },
}

// ---------- estudante ----------

export const estudante_MOCK = {
  user: { name: 'Stéffane Leal', initials: 'SL', email: 'steffane.leal@gmail.com.br', escola: 'E.E. Dona Ana Rosa de Araújo' },
  progresso: [
    { trilha: 'ideacao', percent: 100 },
    { trilha: 'etica', percent: 75 },
    { trilha: 'desenvolvimento', percent: 30 },
    { trilha: 'discussao', percent: 0 },
  ],
  emAndamento: {
    titulo: 'App de apoio a agricultores familiares',
    trilha: 'etica',
    percent: 75,
  },
  projetos: [
    { id: 1, titulo: 'App de apoio a agricultores familiares', vinculo: 'Workshop IA na Escola', status: 'Em andamento', atualizado: 'há 2 dias' },
    { id: 2, titulo: 'Assistente de triagem em UBS', vinculo: 'Projeto privado', status: 'Em andamento', atualizado: 'há 5 dias' },
    { id: 3, titulo: 'Detector de fake news local', vinculo: 'Hackathon InteliGente 2026', status: 'Concluído', atualizado: '28 jun' },
  ],
  eventos: [
    { id: 1, nome: 'Workshop IA na Escola', facilitador: 'Prof. Rosangela', status: 'Em andamento' },
    { id: 2, nome: 'Hackathon InteliGente 2026', facilitador: 'Prof. Rodrigo Palácios', status: 'Encerrado' },
  ],
}

// ---------- Facilitador ----------

export const FACILITADOR_MOCK = {
  user: { name: 'Rosângela', initials: 'RM' },
  stats: { eventosAtivos: 3, participantes: 87, projetosSubmetidos: 41, notaMedia: 8.4 },
  eventos: [
    { id: 1, nome: 'Workshop IA na Escola', visibilidade: 'PIN', pin: '4821', participantes: 32, status: 'Aberto' },
    { id: 2, nome: 'Semana de Tecnologia — 2º ano', visibilidade: 'Público', pin: null, participantes: 41, status: 'Aberto' },
    { id: 3, nome: 'Formação de Professores IA', visibilidade: 'PIN', pin: '7734', participantes: 14, status: 'Aberto' },
    { id: 4, nome: 'Hackathon InteliGente 2026', visibilidade: 'Público', pin: null, participantes: 0, status: 'Encerrado' },
  ],
  ranking: [
    { pos: 1, equipe: 'InteliGente', nota: 9.6 },
    { pos: 2, equipe: 'Furiosa', nota: 9.1 },
    { pos: 3, equipe: 'Lúdico', nota: 8.8 },
  ],
  forum: [
    { autor: 'Nestor Júnior', mensagem: 'Podemos usar dados fictícios para treinar o exemplo de IA?', tempo: 'há 12 min' },
    { autor: 'Josiane B.', mensagem: 'Consegui finalizar a trilha de Ética, alguém quer trocar feedback?', tempo: 'há 40 min' },
  ],
}

// ---------- Super Admin ----------

export const ADMIN_MOCK = {
  user: { name: 'Robson Bonídia', initials: 'RB' },
  metrics: { usuarios: 1284, eventos: 37, projetos: 512, facilitadoresPendentes: 3 },
  conteudo: {
    perguntas: [
      { id: 'C-01', titulo: 'Que problema você observa em sua comunidade que poderia ser mitigado com IA?', trilha: 'ideacao', status: 'Ativo' },
      { id: 'C-05', titulo: 'Quais tecnologias podem impulsionar ou influenciar sua solução?', trilha: 'desenvolvimento', status: 'Ativo' },
      { id: 'C-08', titulo: 'Quais impactos sociais positivos e negativos sua ideia pode ter?', trilha: 'etica', status: 'Ativo' },
      { id: 'C-11', titulo: 'Quais são os principais desafios éticos que você pode enfrentar?', trilha: 'discussao', status: 'Inativo' },
    ],
    trilhas: [
      { id: 'T-01', titulo: 'Ideação', cartas: 12, status: 'Ativo' },
      { id: 'T-02', titulo: 'Ética', cartas: 10, status: 'Ativo' },
      { id: 'T-03', titulo: 'Desenvolvimento', cartas: 14, status: 'Ativo' },
      { id: 'T-04', titulo: 'Discussão', cartas: 8, status: 'Ativo' },
    ],
  },
  facilitadoresPendentes: [
    { id: 1, nome: 'Rodrigo Palácios', instituicao: 'E.E. Prof. Adolfo Trípoli', justificativa: 'Coordenador do laboratório de informática, deseja aplicar o guia com o 9º ano.' },
    { id: 2, nome: 'Maria Aparecida', instituicao: 'Colégio Santo Américo', justificativa: 'Professora de Projeto de Vida, quer usar em oficina de extensão.' },
    { id: 3, nome: 'Pamela Berti', instituicao: 'UTFPR — Campus Cornélio Procópio', justificativa: 'Monitor de extensão do projeto InteliGente.' },
  ],
}
