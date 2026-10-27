// Dados fictícios do baralho InteliGenteCards usados na tela de interação
// com as cartas. Cada carta pertence a uma trilha (ver TRILHA_META em
// dashboardData.jsx) e a uma etapa dentro dela. Quando a API estiver
// pronta, este array será substituído pelas cartas vindas do backend.

export const CARTAS_JOGO = [
  // ---------- Ideação ----------
  {
    id: 'C-01',
    trilha: 'ideacao',
    etapa: 'Identificação de Necessidades',
    pergunta: 'Que problema você observa em sua comunidade/empresa que poderia ser mitigado através da IA?',
  },
  {
    id: 'C-02',
    trilha: 'ideacao',
    etapa: 'Público-Alvo',
    pergunta: 'Quem seria diretamente beneficiado pela sua solução de IA?',
  },
  {
    id: 'C-03',
    trilha: 'ideacao',
    etapa: 'Diferencial da Solução',
    pergunta: 'O que tornaria a sua ideia diferente de soluções que já existem hoje?',
  },

  // ---------- Ética ----------
  {
    id: 'C-04',
    trilha: 'etica',
    etapa: 'Viés e Justiça',
    pergunta: 'Como você garantiria que sua solução não reproduz preconceitos presentes nos dados usados?',
  },
  {
    id: 'C-05',
    trilha: 'etica',
    etapa: 'Privacidade',
    pergunta: 'Quais dados pessoais sua solução precisaria coletar e como você protegeria essas informações?',
  },
  {
    id: 'C-06',
    trilha: 'etica',
    etapa: 'Transparência',
    pergunta: 'Como as pessoas afetadas pela IA saberiam que estão interagindo com um sistema automatizado?',
  },

  // ---------- Desenvolvimento ----------
  {
    id: 'C-07',
    trilha: 'desenvolvimento',
    etapa: 'Coleta de Dados',
    pergunta: 'Que tipos de dados seriam necessários para treinar o modelo da sua solução?',
  },
  {
    id: 'C-08',
    trilha: 'desenvolvimento',
    etapa: 'Treinamento do Modelo',
    pergunta: 'Qual técnica de aprendizado de máquina você utilizaria nessa solução e por quê?',
  },
  {
    id: 'C-09',
    trilha: 'desenvolvimento',
    etapa: 'Validação',
    pergunta: 'Como você mediria se o modelo da sua solução está funcionando bem na prática?',
  },

  // ---------- Discussão ----------
  {
    id: 'C-10',
    trilha: 'discussao',
    etapa: 'Impacto Social',
    pergunta: 'Quais grupos poderiam ser negativamente impactados pela sua solução de IA?',
  },
  {
    id: 'C-11',
    trilha: 'discussao',
    etapa: 'Regulamentação',
    pergunta: 'Deveria existir uma legislação específica para regular o uso da sua solução? Por quê?',
  },
  {
    id: 'C-12',
    trilha: 'discussao',
    etapa: 'Debate Coletivo',
    pergunta: 'Como você defenderia sua ideia diante da crítica de que a IA substituiria empregos?',
  },
]
