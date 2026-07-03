import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import PerfilForm from '../components/PerfilForm'
import { estudante_MOCK, TRILHA_META } from '../data/dashboardData'
import {
  HomeIcon, FolderIcon, TrackMiniIcon, EventIcon, ForumIcon, UserGearIcon,
  SparkleIcon, ChevronRightIcon, IdeaIcon, KeyPinIcon,
} from '../icons'

const NAV = [
  { id: 'inicio', label: 'Início', icon: <HomeIcon /> },
  { id: 'projetos', label: 'Meus Projetos', icon: <FolderIcon /> },
  { id: 'trilhas', label: 'Trilhas', icon: <TrackMiniIcon /> },
  { id: 'eventos', label: 'Eventos', icon: <EventIcon /> },
  { id: 'forum', label: 'Fórum', icon: <ForumIcon /> },
  { id: 'perfil', label: 'Meu Perfil', icon: <UserGearIcon /> },
]

export default function DashboardestudantePage({ setPage, onSwitchRole }) {
  const [active, setActive] = useState('inicio')
  const [pin, setPin] = useState('')
  const { user, progresso, emAndamento, projetos, eventos } = estudante_MOCK

  const isPerfil = active === 'perfil'

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
    >
      {isPerfil ? (
        <PerfilForm user={user} escolaLabel="Escola" />
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

          <div className="dash-grid-2">
            {/* Continue de onde parou */}
            <section className="dash-card dash-continue">
              <p className="dash-card-eyebrow">Continue de onde parou</p>
              <h3 className="dash-continue-title">{emAndamento.titulo}</h3>
              <p className="dash-continue-trilha" style={{ color: TRILHA_META[emAndamento.trilha].color }}>
                Trilha de {TRILHA_META[emAndamento.trilha].label}
              </p>
              <div className="dash-progress">
                <div className="dash-progress-bar">
                  <div className="dash-progress-fill" style={{ width: `${emAndamento.percent}%`, background: TRILHA_META[emAndamento.trilha].color }} />
                </div>
                <span>{emAndamento.percent}%</span>
              </div>
              <button className="dash-btn dash-btn-primary dash-continue-btn">
                Continuar <ChevronRightIcon />
              </button>
            </section>

            {/* Assistente Sabiá */}
            {/* <section className="dash-card dash-ai-card">
              <span className="dash-ai-icon"><SparkleIcon /></span>
              <div>
                <p className="dash-card-eyebrow">Assistente de IA</p>
                <h3>Precisa de uma direção?</h3>
                <p className="dash-ai-desc">
                  O Sabiá pode ajudar a destravar sua ideia, sugerir perguntas e apontar
                  riscos éticos que você ainda não considerou.
                </p>
              </div>
              <button className="dash-btn dash-btn-orange">Conversar com o Sabiá</button>
            </section> */}
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
                      <td><button className="dash-table-action">Abrir</button></td>
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
              <ul className="dash-event-list">
                {eventos.map((e) => (
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
