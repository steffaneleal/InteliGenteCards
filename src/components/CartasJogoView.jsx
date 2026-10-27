'use client'

import { useEffect, useRef, useState } from 'react'
import { CARTAS_JOGO } from '../data/cartasJogo'
import { TRILHA_META } from '../data/dashboardData'
import { ChevronLeftIcon, ChevronRightIcon, XIcon, SendIcon, AttachIcon } from '../icons'
const mariataIcon = '/assets/icone-maritaca.png'
// Respostas fictícias do assistente "Sabiá AI" (Maritaca AI), usadas apenas
// para simular a experiência de conversa neste protótipo. Quando a
// integração real com a API da Maritaca AI estiver pronta, `gerarRespostaIA`
// será substituída por uma chamada ao backend.
const DICAS_IA = [
  'Boa pergunta! Pense em um problema real que você já vivenciou ou observou de perto — isso deixa sua resposta mais concreta.',
  'Tente pensar em quem seria mais afetado por esse problema: uma pessoa, um grupo específico ou toda a comunidade?',
  'Não existe resposta errada aqui — o importante é registrar o seu raciocínio. Quer que eu te dê um exemplo parecido?',
  'Considere também o que já existe hoje para resolver isso e por que talvez não seja suficiente.',
  'Vale lembrar: toda solução de IA deve ser pensada com responsabilidade e cuidado com quem ela impacta.',
  'Se quiser, você pode me contar sua ideia em poucas palavras e eu te ajudo a organizar a resposta.',
]

function gerarRespostaIA(pergunta) {
  const q = pergunta.toLowerCase()
  if (q.includes('?') === false) {
    return 'Pode me contar um pouco mais sobre isso? Assim consigo te ajudar melhor.'
  }
  const idx = Math.abs(
    [...q].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  ) % DICAS_IA.length
  return DICAS_IA[idx]
}

export default function CartasJogoView({ onClose, user }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [respostas, setRespostas] = useState({})
  const [chatInput, setChatInput] = useState('')
  const [isAIOpen, setIsAIOpen] = useState(true)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      from: 'ai',
      text: 'Olá! Eu sou a Sabiá AI. Estou aqui para te ajudar a pensar em cada carta. Pode me chamar sempre que tiver uma dúvida ✨',
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const visitedRef = useRef(new Set([0]))
  const chatEndRef = useRef(null)

  const total = CARTAS_JOGO.length
  const carta = CARTAS_JOGO[activeIndex]
  const meta = TRILHA_META[carta.trilha]
  const resposta = respostas[carta.id] || ''

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

  // useEffect(() => {
  //   if (visitedRef.current.has(activeIndex)) return
  //   visitedRef.current.add(activeIndex)
  //   setMessages((prev) => [
  //     ...prev,
  //     {
  //       id: `intro-${carta.id}`,
  //       from: 'ai',
  //       text: `Chegamos à carta ${carta.id}, da trilha ${meta.label} — etapa "${carta.etapa}". Fique à vontade para me perguntar algo sobre esse tema.`,
  //     },
  //   ])
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activeIndex])

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const goNext = () => setActiveIndex((i) => Math.min(total - 1, i + 1))

  const handleRespostaChange = (e) => {
    setRespostas((prev) => ({ ...prev, [carta.id]: e.target.value }))
  }

  const handleSendChat = (e) => {
    e.preventDefault()
    const texto = chatInput.trim()
    if (!texto) return

    const userMsg = { id: `u-${Date.now()}`, from: 'user', text: texto }
    setMessages((prev) => [...prev, userMsg])
    setChatInput('')
    setIsTyping(true)

    // Simulação de resposta assíncrona da IA (mock).
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, from: 'ai', text: gerarRespostaIA(texto) },
      ])
      setIsTyping(false)
    }, 900)
  }

  return (
    <div className="jogo-shell">
      <header className="jogo-topbar">
        <span className="jogo-logo">RefletIA</span>
        <nav className="jogo-topnav" aria-label="Navegação do jogo">
        </nav>
        <div className="jogo-user">
          <span className="jogo-user-name">{user?.name?.split(' ')[0] || 'Estudante'}</span>
          <div className="jogo-avatar">{user?.initials || 'E'}</div>
        </div>
      </header>

      <div className="jogo-body">
        <button className="jogo-close" onClick={onClose} aria-label="Fechar jogo de cartas">
          <XIcon />
        </button>

        <main className="jogo-main">
          <p className="jogo-progress">Carta {activeIndex + 1} de {total}</p>

          <div className="jogo-carta-row">
            <div className="jogo-nav-btns-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <button
                className="jogo-nav-btn"
                onClick={goPrev}
                disabled={activeIndex === 0}
                aria-label="Carta anterior"
              >
                <ChevronLeftIcon />
              </button>
              <span style={{ fontSize: '0.6rem' }}>anterior</span>
            </div>

            <article className="jogo-carta" style={{ '--trilha-color': meta.color }}>
              <p className="jogo-carta-trilha">{meta.label}</p>
              <p className="jogo-carta-etapa">{carta.etapa}</p>
              <p className="jogo-carta-pergunta">{carta.pergunta}</p>
              <span className="jogo-carta-id">{carta.id}</span>
            </article>

            <div className="jogo-nav-btns-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <button
                className="jogo-nav-btn"
                onClick={goNext}
                disabled={activeIndex === total - 1}
                aria-label="Próxima carta"
              >
                <ChevronRightIcon />
              </button>
              <span style={{ fontSize: '0.6rem' }}>próxima</span>
            </div>
          </div>

          <div className="jogo-resposta-wrapper">
            <textarea
              className="jogo-resposta"
              value={resposta}
              onChange={handleRespostaChange}
              placeholder="Digite sua resposta..."
              rows={4}
              aria-label={`Sua resposta para a carta ${carta.id}`}
            />
            <button className="jogo-resposta-attach" aria-label="Anexar arquivo">
              <AttachIcon />
            </button>
          </div>
        </main>
{/* 
        <aside className={`jogo-ai ${isAIOpen ? 'open' : 'closed'}`}>
          <button 
            className="jogo-ai-toggle" 
            onClick={() => setIsAIOpen(!isAIOpen)}
            aria-label={isAIOpen ? 'Fechar painel de IA' : 'Abrir painel de IA'}
          >
            <ChevronRightIcon />
          </button>

          <div className="jogo-ai-head">
            <img src={mariataIcon} alt="Sabiá AI" className="jogo-ai-icon" />
            <span>Sabiá AI</span>
          </div>

          <div className="jogo-ai-messages">
            {messages.map((m) => (
              <p key={m.id} className={`jogo-ai-bubble ${m.from === 'ai' ? 'from-ai' : 'from-user'}`}>
                {m.text}
              </p>
            ))}
            {isTyping && (
              <p className="jogo-ai-bubble from-ai jogo-ai-typing">
                <span /><span /><span />
              </p>
            )}
            <div ref={chatEndRef} />
          </div>

          <form className="jogo-ai-form" onSubmit={handleSendChat}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Digite sua pergunta..."
              aria-label="Digite sua pergunta para a IA"
            />
            <button type="submit" aria-label="Enviar pergunta" disabled={!chatInput.trim()}>
              <SendIcon />
            </button>
          </form>
        </aside> */}
      </div>
    </div>
  )
}
