import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import PerfilForm from '../components/PerfilForm'
import { ADMIN_MOCK, TRILHA_META } from '../data/dashboardData'
import {
  HomeIcon, TrackMiniIcon, UsersIcon, UserGearIcon, ChartIcon, ShieldIcon,
  PlusIcon, EditIcon, TrashIcon, CheckIcon, XIcon,
} from '../icons'

const NAV = [
  { id: 'inicio', label: 'Início', icon: <HomeIcon /> },
  { id: 'conteudo', label: 'Conteúdo', icon: <TrackMiniIcon /> },
  { id: 'facilitadores', label: 'Facilitadores', icon: <UsersIcon />, badgeKey: 'facilitadoresPendentes' },
  { id: 'usuarios', label: 'Usuários', icon: <UserGearIcon /> },
  { id: 'metricas', label: 'Métricas', icon: <ChartIcon /> },
  { id: 'perfil', label: 'Meu Perfil', icon: <UserGearIcon /> },
]

export default function DashboardSuperAdminPage({ setPage, onSwitchRole }) {
  const [active, setActive] = useState('inicio')
  const [tab, setTab] = useState('perguntas')
  const { user, metrics, conteudo, facilitadoresPendentes } = ADMIN_MOCK

  const isPerfil = active === 'perfil'
  const navWithBadge = NAV.map((n) =>
    n.badgeKey ? { ...n, badge: metrics[n.badgeKey] || undefined } : n
  )

  return (
    <DashboardShell
      role="admin"
      nav={navWithBadge}
      active={active}
      onNavigate={setActive}
      user={user}
      pageTitle={isPerfil ? 'Meu Perfil' : 'Painel do Super Admin'}
      pageSubtitle={isPerfil ? 'Atualize seus dados e sua senha de acesso.' : 'Gestão de conteúdo, facilitadores e métricas da plataforma.'}
      onLogout={() => setPage('home')}
      onSwitchRole={onSwitchRole}
    >
      {isPerfil ? (
        <PerfilForm user={user} escolaLabel="Organização" />
      ) : (
        <>
          {/* Métricas globais */}
          <div className="dash-stats-grid">
            <div className="dash-stat-card">
              <span className="dash-stat-icon"><UsersIcon /></span>
              <div><p className="dash-stat-value">{metrics.usuarios.toLocaleString('pt-BR')}</p><p className="dash-stat-label">Usuários</p></div>
            </div>
            <div className="dash-stat-card">
              <span className="dash-stat-icon"><ChartIcon /></span>
              <div><p className="dash-stat-value">{metrics.eventos}</p><p className="dash-stat-label">Eventos</p></div>
            </div>
            <div className="dash-stat-card">
              <span className="dash-stat-icon"><TrackMiniIcon /></span>
              <div><p className="dash-stat-value">{metrics.projetos}</p><p className="dash-stat-label">Projetos</p></div>
            </div>
            <div className="dash-stat-card dash-stat-alert">
              <span className="dash-stat-icon"><UserGearIcon /></span>
              <div><p className="dash-stat-value">{metrics.facilitadoresPendentes}</p><p className="dash-stat-label">Facilitadores pendentes</p></div>
            </div>
          </div>

          {/* Gestão de conteúdo (RF08) */}
          <section className="dash-card dash-table-card">
            <div className="dash-section-head">
              <h2>Gestão de conteúdo</h2>
              <button className="dash-btn dash-btn-primary dash-btn-sm">
                <PlusIcon /> {tab === 'trilhas' ? 'Nova trilha' : 'Nova carta'}
              </button>
            </div>

            <div className="dash-tabs">
              <button className={`dash-tab${tab === 'perguntas' ? ' active' : ''}`} onClick={() => setTab('perguntas')}>Perguntas / Cartas</button>
              <button className={`dash-tab${tab === 'trilhas' ? ' active' : ''}`} onClick={() => setTab('trilhas')}>Trilhas</button>
            </div>

            {tab === 'perguntas' ? (
              <table className="dash-table">
                <thead>
                  <tr><th>ID</th><th>Carta</th><th>Trilha</th><th>Status</th><th></th></tr>
                </thead>
                <tbody>
                  {conteudo.perguntas.map((c) => (
                    <tr key={c.id}>
                      <td className="dash-mono">{c.id}</td>
                      <td><span className="dash-table-title">{c.titulo}</span></td>
                      <td>
                        <span className="dash-badge-dot" style={{ background: TRILHA_META[c.trilha].color }} />
                        {TRILHA_META[c.trilha].label}
                      </td>
                      <td>
                        <span className={`dash-badge ${c.status === 'Ativo' ? 'dash-badge-done' : 'dash-badge-muted'}`}>{c.status}</span>
                      </td>
                      <td className="dash-row-actions">
                        <button className="dash-icon-btn" aria-label="Editar"><EditIcon /></button>
                        <button className="dash-icon-btn dash-icon-btn-danger" aria-label="Excluir"><TrashIcon /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="dash-table">
                <thead>
                  <tr><th>ID</th><th>Trilha</th><th>Cartas</th><th>Status</th><th></th></tr>
                </thead>
                <tbody>
                  {conteudo.trilhas.map((t) => (
                    <tr key={t.id}>
                      <td className="dash-mono">{t.id}</td>
                      <td><span className="dash-table-title">{t.titulo}</span></td>
                      <td>{t.cartas}</td>
                      <td><span className="dash-badge dash-badge-done">{t.status}</span></td>
                      <td className="dash-row-actions">
                        <button className="dash-icon-btn" aria-label="Editar"><EditIcon /></button>
                        <button className="dash-icon-btn dash-icon-btn-danger" aria-label="Excluir"><TrashIcon /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {/* Facilitadores pendentes (RN03) */}
          <section className="dash-card">
            <div className="dash-section-head">
              <h2>Facilitadores pendentes de aprovação</h2>
            </div>
            <ul className="dash-approval-list">
              {facilitadoresPendentes.map((f) => (
                <li key={f.id} className="dash-approval-item">
                  <div className="dash-avatar dash-avatar-sm">{f.nome.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                  <div className="dash-approval-text">
                    <p className="dash-table-title">{f.nome}</p>
                    <p className="dash-table-sub">{f.instituicao}</p>
                    <p className="dash-approval-justificativa">&ldquo;{f.justificativa}&rdquo;</p>
                  </div>
                  <div className="dash-approval-actions">
                    <button className="dash-icon-btn dash-icon-btn-approve" aria-label="Aprovar"><CheckIcon /></button>
                    <button className="dash-icon-btn dash-icon-btn-danger" aria-label="Rejeitar"><XIcon /></button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </DashboardShell>
  )
}
