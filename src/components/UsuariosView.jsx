import { useMemo, useState } from 'react'
import { SearchIcon, UsersIcon, FacilitadorMiniIcon, EstudanteMiniIcon } from '../icons'

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'Facilitador', label: 'Facilitadores' },
  { id: 'Estudante', label: 'Estudantes' },
]

export default function UsuariosView({ usuarios }) {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState('todos')

  const contagem = useMemo(() => ({
    total: usuarios.length,
    facilitadores: usuarios.filter((u) => u.role === 'Facilitador').length,
    estudantes: usuarios.filter((u) => u.role === 'Estudante').length,
  }), [usuarios])

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return usuarios.filter((u) => {
      const matchRole = filtro === 'todos' || u.role === filtro
      const matchBusca = !q ||
        u.nome.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.instituicao.toLowerCase().includes(q)
      return matchRole && matchBusca
    })
  }, [usuarios, busca, filtro])

  return (
    <div className="dash-view">
      <div className="dash-stats-grid">
        <div className="dash-stat-card">
          <span className="dash-stat-icon"><UsersIcon /></span>
          <div><p className="dash-stat-value">{contagem.total}</p><p className="dash-stat-label">Usuários no total</p></div>
        </div>
        <div className="dash-stat-card">
          <span className="dash-stat-icon"><FacilitadorMiniIcon /></span>
          <div><p className="dash-stat-value">{contagem.facilitadores}</p><p className="dash-stat-label">Facilitadores</p></div>
        </div>
        <div className="dash-stat-card">
          <span className="dash-stat-icon"><EstudanteMiniIcon /></span>
          <div><p className="dash-stat-value">{contagem.estudantes}</p><p className="dash-stat-label">Estudantes</p></div>
        </div>
      </div>

      <section className="dash-card dash-table-card">
        <div className="dash-content-toolbar">
          <div className="dash-tabs">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`dash-tab${filtro === f.id ? ' active' : ''}`}
                onClick={() => setFiltro(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="dash-search">
            <SearchIcon />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome, e-mail ou instituição..."
              aria-label="Buscar usuário"
            />
          </div>
        </div>

        {filtrados.length === 0 ? (
          <p className="dash-empty-state">Nenhum usuário encontrado.</p>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>Nome</th><th>E-mail</th><th>Papel</th><th>Instituição</th><th>Status</th><th>Cadastro</th></tr>
            </thead>
            <tbody>
              {filtrados.map((u) => (
                <tr key={u.id}>
                  <td><span className="dash-table-title">{u.nome}</span></td>
                  <td className="dash-table-sub">{u.email}</td>
                  <td>
                    <span className={`dash-badge ${u.role === 'Facilitador' ? 'dash-badge-role-facilitador' : 'dash-badge-role-estudante'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="dash-table-sub">{u.instituicao}</td>
                  <td>
                    <span className={`dash-badge ${
                      u.status === 'Ativo' ? 'dash-badge-done' : u.status === 'Pendente' ? 'dash-badge-pending' : 'dash-badge-muted'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="dash-mono">{u.cadastro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <p className="dash-perfil-hint dash-table-footnote">
          Exibindo {filtrados.length} de {usuarios.length} usuário(s).
        </p>
      </section>
    </div>
  )
}
