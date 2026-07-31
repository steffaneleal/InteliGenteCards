import { useMemo, useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import PerfilForm from '../components/PerfilForm'
import CartasView from '../components/CartasView'
import TrilhasView from '../components/TrilhasView'
import { TRILHA_COLOR_PALETTE } from '../components/TrilhaForm'
import { ADMIN_MOCK, TRILHA_META } from '../data/dashboardData'
import {
  HomeIcon, TrackMiniIcon, UsersIcon, UserGearIcon, ChartIcon, CardStackIcon,
  CheckIcon, XIcon, ChevronRightIcon,
} from '../icons'

const NAV = [
  { id: 'inicio', label: 'Início', icon: <HomeIcon /> },
  { id: 'cartas', label: 'Cartas', icon: <CardStackIcon /> },
  { id: 'trilhas', label: 'Trilhas', icon: <TrackMiniIcon /> },
  { id: 'facilitadores', label: 'Facilitadores', icon: <UsersIcon />, badgeKey: 'facilitadoresPendentes' },
  { id: 'usuarios', label: 'Usuários', icon: <UserGearIcon /> },
  { id: 'metricas', label: 'Métricas', icon: <ChartIcon /> },
  { id: 'perfil', label: 'Meu Perfil', icon: <UserGearIcon /> },
]

const TRILHA_KEY_ORDER = ['ideacao', 'etica', 'desenvolvimento', 'discussao']

const PAGE_META = {
  inicio: { title: 'Painel do Super Admin', subtitle: 'Gestão de conteúdo, facilitadores e métricas da plataforma.' },
  cartas: { title: 'Cartas', subtitle: 'Todas as perguntas cadastradas nas trilhas do guia.', breadcrumb: 'Conteúdo' },
  trilhas: { title: 'Trilhas', subtitle: 'Todas as trilhas de aprendizagem do guia.', breadcrumb: 'Conteúdo' },
  perfil: { title: 'Meu Perfil', subtitle: 'Atualize seus dados e sua senha de acesso.' },
}

// Remove acentos/espaços para gerar uma chave estável a partir do título.
function slugify(text) {
  return text
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Gera o próximo ID sequencial no padrão "PREFIXO-00" usado nas tabelas.
function nextId(prefix, list) {
  const max = list.reduce((acc, item) => {
    const n = parseInt(String(item.id).split('-')[1], 10)
    return Number.isNaN(n) ? acc : Math.max(acc, n)
  }, 0)
  return `${prefix}-${String(max + 1).padStart(2, '0')}`
}

export default function DashboardSuperAdminPage({ setPage, onSwitchRole }) {
  const [active, setActive] = useState('inicio')
  const { user, metrics, facilitadoresPendentes } = ADMIN_MOCK

  // ---------- Estado de conteúdo (cartas / trilhas) ----------
  // TODO: substituir por chamadas à API (GET/POST/PATCH/DELETE) quando o
  // backend estiver disponível. Por ora os dados vivem em memória.
  const [trilhas, setTrilhas] = useState(() =>
    ADMIN_MOCK.conteudo.trilhas.map((t, i) => ({
      ...t,
      key: TRILHA_KEY_ORDER[i] || slugify(t.titulo),
      color: TRILHA_META[TRILHA_KEY_ORDER[i]]?.color || TRILHA_COLOR_PALETTE[i % TRILHA_COLOR_PALETTE.length],
    }))
  )
  const [perguntas, setPerguntas] = useState(() => [...ADMIN_MOCK.conteudo.perguntas])

  const trilhaByKey = useMemo(
    () => Object.fromEntries(trilhas.map((t) => [t.key, t])),
    [trilhas]
  )
  const trilhasComContagem = useMemo(
    () => trilhas.map((t) => ({ ...t, cartas: perguntas.filter((p) => p.trilha === t.key).length })),
    [trilhas, perguntas]
  )

  // ---------- CRUD: cartas ----------
  const handleCreateCarta = ({ titulo, trilha, status }) => {
    const novo = { id: nextId('C', perguntas), titulo, trilha, status }
    setPerguntas((list) => [novo, ...list])
  }
  const handleUpdateCarta = (id, { titulo, trilha, status }) => {
    setPerguntas((list) => list.map((c) => (c.id === id ? { ...c, titulo, trilha, status } : c)))
  }
  const handleDeleteCarta = (id) => {
    setPerguntas((list) => list.filter((c) => c.id !== id))
  }

  // ---------- CRUD: trilhas ----------
  const handleCreateTrilha = ({ titulo, color, status }) => {
    const novaKey = slugify(titulo) || `trilha-${Date.now()}`
    const nova = { id: nextId('T', trilhas), key: novaKey, titulo, color, status, cartas: 0 }
    setTrilhas((list) => [nova, ...list])
  }
  const handleUpdateTrilha = (id, { titulo, color, status }) => {
    setTrilhas((list) => list.map((t) => (t.id === id ? { ...t, titulo, color, status } : t)))
  }
  const handleDeleteTrilha = (id) => {
    setTrilhas((list) => list.filter((t) => t.id !== id))
  }

  const navWithBadge = NAV.map((n) =>
    n.badgeKey ? { ...n, badge: metrics[n.badgeKey] || undefined } : n
  )
  const meta = PAGE_META[active] || PAGE_META.inicio

  return (
    <DashboardShell
      role="admin"
      nav={navWithBadge}
      active={active}
      onNavigate={setActive}
      user={user}
      pageTitle={meta.title}
      pageSubtitle={meta.subtitle}
      breadcrumb={meta.breadcrumb}
      onLogout={() => setPage('home')}
      onSwitchRole={onSwitchRole}
    >
      {active === 'perfil' && <PerfilForm user={user} escolaLabel="Organização" />}

      {active === 'cartas' && (
        <CartasView
          perguntas={perguntas}
          trilhas={trilhas}
          trilhaByKey={trilhaByKey}
          onCreate={handleCreateCarta}
          onUpdate={handleUpdateCarta}
          onDelete={handleDeleteCarta}
        />
      )}

      {active === 'trilhas' && (
        <TrilhasView
          trilhas={trilhasComContagem}
          onCreate={handleCreateTrilha}
          onUpdate={handleUpdateTrilha}
          onDelete={handleDeleteTrilha}
        />
      )}

      {active === 'inicio' && (
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

          {/* Gestão de conteúdo — acesso às views de Cartas e Trilhas (RF08) */}
          <section className="dash-section">
            <div className="dash-section-head">
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-dark)' }}>Gestão de conteúdo</h2>
            </div>
            <div className="dash-hero-actions">
              <button type="button" className="dash-hero-card dash-hero-card-link" onClick={() => setActive('cartas')}>
                <span className="dash-hero-icon dash-hero-icon-orange"><CardStackIcon /></span>
                <span className="dash-hero-title">Cartas</span>
                <span className="dash-hero-desc">
                  {perguntas.length} carta(s) cadastrada(s). Veja, crie, edite e exclua as perguntas do guia.
                </span>
                <span className="dash-btn dash-btn-orange dash-hero-btn">Gerenciar cartas <ChevronRightIcon /></span>
              </button>

              <button type="button" className="dash-hero-card dash-hero-card-link" onClick={() => setActive('trilhas')}>
                <span className="dash-hero-icon dash-hero-icon-orange"><TrackMiniIcon /></span>
                <span className="dash-hero-title">Trilhas</span>
                <span className="dash-hero-desc">
                  {trilhas.length} trilha(s) cadastrada(s). Veja, crie, edite e exclua as trilhas do guia.
                </span>
                <span className="dash-btn dash-btn-orange dash-hero-btn">Gerenciar trilhas <ChevronRightIcon /></span>
              </button>
            </div>
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
