'use client'

import { useRouter } from 'next/navigation'
import { ROUTES, NEXT_ROLE_ROUTE } from '@/lib/routes'
import { FEATURES } from '@/config/features'
import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import PerfilForm from '../components/PerfilForm'
import Modal from '../components/Modal'
import { FACILITADOR_MOCK } from '../data/dashboardData'
import {
  HomeIcon, EventIcon, TrophyIcon, ForumIcon, UserGearIcon,
  PlusIcon, ChevronRightIcon, UsersIcon, ChartIcon,
} from '../icons'

const NAV = [
  { id: 'inicio', label: 'Início', icon: <HomeIcon /> },
  { id: 'eventos', label: 'Meus Eventos', icon: <EventIcon /> },
  { id: 'ranking', label: 'Ranking', icon: <TrophyIcon /> },
  { id: 'forum', label: 'Fórum', icon: <ForumIcon /> },
  { id: 'perfil', label: 'Meu Perfil', icon: <UserGearIcon /> },
].filter((item) => item.id !== 'ranking' || FEATURES.ranking)

export default function DashboardFacilitadorPage() {
  const router = useRouter()
  const [active, setActive] = useState('inicio')
  const [showNovoEvento, setShowNovoEvento] = useState(false)
  const [searchEvento, setSearchEvento] = useState('')
  const [selectedEvento, setSelectedEvento] = useState('')
  const [rankingModalOpen, setRankingModalOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 'fac-1', title: 'Participantes confirmados', detail: '12 estudantes se inscreveram no Workshop IA na Escola.', targetTab: 'eventos', read: false },
    { id: 'fac-2', title: 'Feedback pendente', detail: 'Há 3 projetos aguardando revisão de sua turma.', targetTab: 'eventos', read: false },
  ])
  const { user, stats, eventos, ranking, forum } = FACILITADOR_MOCK
  const isPerfil = active === 'perfil'
  const isRanking = active === 'ranking'
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
      role="facilitador"
      nav={NAV}
      active={active}
      onNavigate={setActive}
      user={user}
      pageTitle={isPerfil ? 'Meu Perfil' : `Olá, Prof. ${user.name.split(' ')[0]}`}
      pageSubtitle={isPerfil ? 'Atualize seus dados e sua senha de acesso.' : 'Acompanhe seus eventos e a evolução das turmas.'}
      onLogout={() => router.push(ROUTES.home)}
      onSwitchRole={() => router.push(NEXT_ROLE_ROUTE.facilitador)}
      notifications={notifications}
      onNotificationRead={handleNotificationRead}
    >
      {isPerfil ? (
        <PerfilForm user={user} escolaLabel="Escola" showEstadoCargo />
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
          {/* Métricas */}
          <div className="dash-stats-grid">
        <div className="dash-stat-card">
          <span className="dash-stat-icon"><EventIcon /></span>
          <div>
            <p className="dash-stat-value">{stats.eventosAtivos}</p>
            <p className="dash-stat-label">Eventos ativos</p>
          </div>
        </div>
        <div className="dash-stat-card">
          <span className="dash-stat-icon"><UsersIcon /></span>
          <div>
            <p className="dash-stat-value">{stats.participantes}</p>
            <p className="dash-stat-label">Participantes</p>
          </div>
        </div>
        <div className="dash-stat-card">
          <span className="dash-stat-icon"><ChartIcon /></span>
          <div>
            <p className="dash-stat-value">{stats.projetosSubmetidos}</p>
            <p className="dash-stat-label">Projetos submetidos</p>
          </div>
        </div>
        {FEATURES.ranking && (
        <div className="dash-stat-card">
          <span className="dash-stat-icon"><TrophyIcon /></span>
          <div>
            <p className="dash-stat-value">{stats.notaMedia}</p>
            <p className="dash-stat-label">Nota média</p>
          </div>
        </div>
        )}
      </div>

      {/* Meus eventos */}
      <section className="dash-card dash-table-card">
        <div className="dash-section-head">
          <h2>Meus eventos</h2>
          <button className="dash-btn dash-btn-primary dash-btn-sm" onClick={() => setShowNovoEvento((v) => !v)}>
            <PlusIcon /> Criar novo evento
          </button>
        </div>

        {showNovoEvento && (
          <form className="dash-inline-form" onSubmit={(e) => e.preventDefault()}>
            <div className="dash-form-row">
              <label>
                Nome do evento
                <input type="text" placeholder="Ex.: Semana de Tecnologia — 3º ano" />
              </label>
              <label>
                Visibilidade
                <select defaultValue="pin">
                  <option value="pin">Fechado (via PIN)</option>
                  <option value="publico">Público</option>
                </select>
              </label>
            </div>
            <label className="dash-checkbox">
              <input type="checkbox" /> Exigir upload de arquivo final (pitch, imagem ou PDF)
            </label>
            <div className="dash-form-actions">
              <button type="button" className="dash-btn dash-btn-ghost" onClick={() => setShowNovoEvento(false)}>Cancelar</button>
              <button type="submit" className="dash-btn dash-btn-orange">Criar evento</button>
            </div>
          </form>
        )}

        <table className="dash-table">
          <thead>
            <tr><th>Evento</th><th>Visibilidade</th><th>Participantes</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {eventos.map((ev) => (
              <tr key={ev.id}>
                <td><span className="dash-table-title">{ev.nome}</span></td>
                <td>
                  {ev.visibilidade === 'PIN'
                    ? <span className="dash-badge dash-badge-pin">PIN {ev.pin}</span>
                    : <span className="dash-badge dash-badge-public">Público</span>}
                </td>
                <td>{ev.participantes}</td>
                <td>
                  <span className={`dash-badge ${ev.status === 'Encerrado' ? 'dash-badge-muted' : 'dash-badge-progress'}`}>
                    {ev.status}
                  </span>
                </td>
                <td><button className="dash-table-action">Gerenciar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="dash-grid-2">
        {/* Ranking (pós-MVP) */}
        {FEATURES.ranking && (
        <section className="dash-card">
          <div className="dash-section-head">
            <h2>Ranking — Workshop IA na Escola</h2>
            <button className="dash-link" onClick={() => setActive('ranking')}>Ver completo <ChevronRightIcon /></button>
          </div>
          <ol className="dash-podium">
            {ranking.map((r) => (
              <li key={r.pos} className={`dash-podium-item pos-${r.pos}`}>
                <span className="dash-podium-pos">{r.pos}º</span>
                <span className="dash-podium-team">{r.equipe}</span>
                <span className="dash-podium-score">{r.nota}</span>
              </li>
            ))}
          </ol>
        </section>
        )}

        {/* Fórum */}
        <section className="dash-card">
          <div className="dash-section-head">
            <h2>Mural do evento</h2>
            <button className="dash-link" onClick={() => setActive('forum')}>Abrir fórum <ChevronRightIcon /></button>
          </div>
          <ul className="dash-forum-list">
            {forum.map((m, i) => (
              <li key={i} className="dash-forum-item">
                <div className="dash-avatar dash-avatar-sm">{m.autor.split(' ').map(w => w[0]).join('')}</div>
                <div>
                  <p><strong>{m.autor}</strong> <span className="dash-forum-time">{m.tempo}</span></p>
                  <p className="dash-forum-msg">{m.mensagem}</p>
                </div>
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
