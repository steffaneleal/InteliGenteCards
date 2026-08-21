import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import PerfilForm from '../components/PerfilForm'
import Modal from '../components/Modal'
import { estudante_MOCK, TRILHA_META } from '../data/dashboardData'
import {
  HomeIcon, FolderIcon, TrackMiniIcon, EventIcon, ForumIcon, UserGearIcon,
  SparkleIcon, ChevronRightIcon, IdeaIcon, KeyPinIcon, TrophyIcon,
} from '../icons'

const NAV = [
  { id: 'inicio', label: 'Início', icon: <HomeIcon /> },
  { id: 'projetos', label: 'Meus Projetos', icon: <FolderIcon /> },
  { id: 'trilhas', label: 'Trilhas', icon: <TrackMiniIcon /> },
  { id: 'eventos', label: 'Eventos', icon: <EventIcon /> },
  { id: 'ranking', label: 'Ranking', icon: <TrophyIcon /> },
  { id: 'forum', label: 'Fórum', icon: <ForumIcon /> },
  { id: 'perfil', label: 'Meu Perfil', icon: <UserGearIcon /> },
]

export default function DashboardestudantePage({ setPage, onSwitchRole }) {
  const [active, setActive] = useState('inicio')
  const [pin, setPin] = useState('')
  const [searchEvento, setSearchEvento] = useState('')
  const [selectedEvento, setSelectedEvento] = useState('')
  const [rankingModalOpen, setRankingModalOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 'student-1', title: 'Lembrete de evento', detail: 'Workshop IA na Escola começa hoje às 18h.', targetTab: 'eventos', read: false },
    { id: 'student-2', title: 'Novo retorno', detail: 'Seu projeto foi revisado pelo facilitador.', targetTab: 'projetos', read: false },
  ])
  const { user, progresso, emAndamento, projetos, eventos, ranking } = estudante_MOCK

  const isPerfil = active === 'perfil'
  const isRanking = active === 'ranking'
  const eventosFiltrados = eventos.filter((evento) =>
    evento.nome.toLowerCase().includes(searchEvento.toLowerCase())
  )
  const eventosRanking = [...new Map(
    ranking.map((item) => [item.evento, item.evento])
  ).entries()].map(([, evento]) => evento)
  const eventosRankingFiltrados = eventosRanking.filter((evento) =>
    evento.toLowerCase().includes(searchEvento.toLowerCase())
  )
  const rankingSelecionado = ranking.filter((item) => item.evento === selectedEvento)

  const openRankingModal = (evento) => {
    setSelectedEvento(evento)
    setRankingModalOpen(true)
  }

  const handleNotificationRead = (id) => {
    setNotifications((prev) => prev.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  return (
    <DashboardShell
      role="estudante"
      nav={NAV}
      active={active}
      onNavigate={setActive}
      user={user}
      pageTitle={isPerfil ? 'Meu Perfil' : `Olá, ${user.name.split(' ')[0]}`}
      pageSubtitle={isPerfil ? 'Atualize seus dados e sua senha de acesso.' : 'Pronta para continuar sua jornada em IA ética?'}
      onLogout={() => setPage('home')}
      onSwitchRole={onSwitchRole}
      notifications={notifications}
      onNotificationRead={handleNotificationRead}
    >
      {isPerfil ? (
        <PerfilForm user={user} escolaLabel="Escola" />
      ) : isRanking ? (
        <>
          <section className="dash-card">
            <div className="dash-section-head">
              <h2>Ranking por evento</h2>
            </div>

            <div className="dash-search-box">
              <input
                type="search"
                value={searchEvento}
                onChange={(e) => setSearchEvento(e.target.value)}
                placeholder="Buscar evento"
                aria-label="Buscar evento"
              />
            </div>

            <ul className="dash-event-list dash-ranking-list">
              {eventosRankingFiltrados.map((evento) => (
                <li
                  key={evento}
                  className="dash-event-item dash-ranking-event-item"
                  onClick={() => openRankingModal(evento)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openRankingModal(evento)
                    }
                  }}
                >
                  <div>
                    <p className="dash-event-name">{evento}</p>
                  </div>
                  <span className="dash-ranking-arrow">›</span>
                </li>
              ))}
            </ul>
          </section>

          {rankingModalOpen && (
            <Modal title={selectedEvento} subtitle="Ranking do workshop/evento" onClose={() => setRankingModalOpen(false)} size="md">
              <ol className="dash-podium">
                {rankingSelecionado.map((r) => (
                  <li key={`${r.evento}-${r.pos}`} className={`dash-podium-item pos-${r.pos}`}>
                    <span className="dash-podium-pos">{r.pos}º</span>
                    <div className="dash-podium-meta">
                      <span className="dash-podium-team">{r.equipe}</span>
                      <span className="dash-podium-project">{r.projeto}</span>
                    </div>
                    <span className="dash-podium-score">{r.nota}</span>
                  </li>
                ))}
              </ol>
            </Modal>
          )}
        </>
      ) : (
        <>
          {/* Destaques: criar solução + entrar em evento */}
          <div className="dash-hero-actions">
            <section className="dash-card dash-hero-card dash-hero-card-primary">
              <span className="dash-hero-icon"><IdeaIcon /></span>
              <h3 className="dash-hero-title">Criar Solução</h3>
              <p className="dash-hero-desc">
                Inicie uma nova ideia e percorra as trilhas do guia — ideação, ética,
                desenvolvimento e discussão — com o apoio do assistente de IA até
                gerar o artefato final da sua solução.
              </p>
              <button className="dash-btn dash-btn-orange dash-hero-btn">Criar</button>
            </section>

            <section className="dash-card dash-hero-card">
              <span className="dash-hero-icon dash-hero-icon-orange"><KeyPinIcon /></span>
              <h3 className="dash-hero-title">Entrar em um evento</h3>
              <p className="dash-hero-desc">
                Recebeu um PIN do seu facilitador? Digite abaixo para entrar na
                sessão e participar da dinâmica em grupo.
              </p>
              <form className="dash-pin-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Digite o PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength={6}
                />
                <button type="submit" className="dash-btn dash-btn-orange">Entrar</button>
              </form>
            </section>
          </div>

          {/*
            "Suas trilhas" — mantido no código para reaproveitar depois,
            porém faz mais sentido exibir o progresso das trilhas DENTRO
            de cada projeto (já que cada solução percorre as 4 trilhas
            de forma independente) do que como um resumo geral do estudante.

          <section className="dash-section">
            <div className="dash-section-head">
              <h2>Suas trilhas</h2>
              <button className="dash-link" onClick={() => setActive('trilhas')}>Ver todas <ChevronRightIcon /></button>
            </div>
            <div className="dash-trilhas-grid">
              {progresso.map((t) => {
                const meta = TRILHA_META[t.trilha]
                return (
                  <div key={t.trilha} className="dash-trilha-card" style={{ '--tc': meta.color }}>
                    <p className="dash-trilha-label">{meta.label}</p>
                    <div className="dash-ring" style={{ '--p': t.percent }}>
                      <span>{t.percent}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
          */}

          <div className="dash-grid-2">
            {/* Meus projetos */}
            <section className="dash-card dash-table-card">
              <div className="dash-section-head">
                <h2>Meus projetos</h2>
                <button className="dash-link" onClick={() => setActive('projetos')}>Ver todos <ChevronRightIcon /></button>
              </div>
              <table className="dash-table">
                <thead>
                  <tr><th>Projeto</th><th>Vínculo</th><th>Status</th><th></th></tr>
                </thead>
                <tbody>
                  {projetos.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <span className="dash-table-title">{p.titulo}</span>
                        <span className="dash-table-sub">Atualizado {p.atualizado}</span>
                      </td>
                      <td>{p.vinculo}</td>
                      <td>
                        <span className={`dash-badge ${p.status === 'Concluído' ? 'dash-badge-done' : 'dash-badge-progress'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Meus eventos */}
            <section className="dash-card">
              <div className="dash-section-head">
                <h2>Meus eventos</h2>
                <button className="dash-link" onClick={() => setActive('eventos')}>Ver todos <ChevronRightIcon /></button>
              </div>

              <div className="dash-search-box">
                <input
                  type="search"
                  value={searchEvento}
                  onChange={(e) => setSearchEvento(e.target.value)}
                  placeholder="Buscar evento"
                  aria-label="Buscar evento"
                />
              </div>

              <ul className="dash-event-list">
                {eventosFiltrados.map((e) => (
                  <li key={e.id} className="dash-event-item">
                    <div>
                      <p className="dash-event-name">{e.nome}</p>
                      <p className="dash-event-sub">Facilitador(a): {e.facilitador}</p>
                    </div>
                    <span className={`dash-badge ${e.status === 'Encerrado' ? 'dash-badge-muted' : 'dash-badge-progress'}`}>
                      {e.status}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      )}
    </DashboardShell>
  )
}
