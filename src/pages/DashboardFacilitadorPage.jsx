import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import PerfilForm from '../components/PerfilForm'
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
]

export default function DashboardFacilitadorPage({ setPage, onSwitchRole }) {
  const [active, setActive] = useState('inicio')
  const [showNovoEvento, setShowNovoEvento] = useState(false)
  const { user, stats, eventos, ranking, forum } = FACILITADOR_MOCK
  const isPerfil = active === 'perfil'

  return (
    <DashboardShell
      role="facilitador"
      nav={NAV}
      active={active}
      onNavigate={setActive}
      user={user}
      pageTitle={isPerfil ? 'Meu Perfil' : `Olá, Prof. ${user.name.split(' ')[0]}`}
      pageSubtitle={isPerfil ? 'Atualize seus dados e sua senha de acesso.' : 'Acompanhe seus eventos e a evolução das turmas.'}
      onLogout={() => setPage('home')}
      onSwitchRole={onSwitchRole}
    >
      {isPerfil ? (
        <PerfilForm user={user} escolaLabel="Escola" />
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
        <div className="dash-stat-card">
          <span className="dash-stat-icon"><TrophyIcon /></span>
          <div>
            <p className="dash-stat-value">{stats.notaMedia}</p>
            <p className="dash-stat-label">Nota média</p>
          </div>
        </div>
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
        {/* Ranking */}
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
