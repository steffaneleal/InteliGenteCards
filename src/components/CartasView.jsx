'use client'

import { useMemo, useState } from 'react'
import CartaForm from './CartaForm'
import ConfirmDialog from './ConfirmDialog'
import { PlusIcon, EditIcon, TrashIcon, SearchIcon } from '../icons'

// View completa de gestão de cartas: lista todas as cartas cadastradas, com busca, criação (formulário inline, nesta própria página), edição e exclusão.
export default function CartasView({ perguntas, trilhas, trilhaByKey, onCreate, onUpdate, onDelete }) {
  const [busca, setBusca] = useState('')
  const [panel, setPanel] = useState(null) // { mode: 'create'|'edit', data? }
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [feedback, setFeedback] = useState('')

  const showFeedback = (msg) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(''), 2500)
  }

  const filtradas = useMemo(() => {
    const q = busca.trim().toLowerCase()
    if (!q) return perguntas
    return perguntas.filter((c) => c.titulo.toLowerCase().includes(q) || c.id.toLowerCase().includes(q))
  }, [perguntas, busca])

  const handleSubmit = (data) => {
    if (panel.mode === 'edit') {
      onUpdate(panel.data.id, data)
      showFeedback('Carta atualizada com sucesso.')
    } else {
      onCreate(data)
      showFeedback('Carta criada com sucesso.')
    }
    setPanel(null)
  }

  const handleConfirmDelete = () => {
    onDelete(confirmDelete.id)
    showFeedback('Carta excluída.')
    setConfirmDelete(null)
  }

  return (
    <div className="dash-view">
      {panel && (
        <CartaForm
          mode={panel.mode}
          initialData={panel.data}
          trilhaOptions={trilhas}
          onSubmit={handleSubmit}
          onCancel={() => setPanel(null)}
        />
      )}

      <section className="dash-card dash-table-card">
        <div className="dash-section-head">
          <h2>Todas as cartas</h2>
          {!panel && (
            <button className="dash-btn dash-btn-primary dash-btn-sm" onClick={() => setPanel({ mode: 'create' })}>
              <PlusIcon /> Nova carta
            </button>
          )}
        </div>

        <div className="dash-search">
          <SearchIcon />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar carta por título ou ID..."
            aria-label="Buscar carta"
          />
        </div>

        {feedback && <p className="dash-perfil-saved dash-content-feedback">{feedback}</p>}

        {filtradas.length === 0 ? (
          <p className="dash-empty-state">Nenhuma carta encontrada.</p>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>ID</th><th>Carta</th><th>Trilha</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {filtradas.map((c) => (
                <tr key={c.id}>
                  <td className="dash-mono">{c.id}</td>
                  <td><span className="dash-table-title">{c.titulo}</span></td>
                  <td>
                    <span className="dash-badge-dot" style={{ background: trilhaByKey[c.trilha]?.color }} />
                    {trilhaByKey[c.trilha]?.titulo || '—'}
                  </td>
                  <td>
                    <span className={`dash-badge ${c.status === 'Ativo' ? 'dash-badge-done' : 'dash-badge-muted'}`}>{c.status}</span>
                  </td>
                  <td className="dash-row-actions">
                    <button className="dash-icon-btn" aria-label="Editar carta" onClick={() => setPanel({ mode: 'edit', data: c })}>
                      <EditIcon />
                    </button>
                    <button className="dash-icon-btn dash-icon-btn-danger" aria-label="Excluir carta" onClick={() => setConfirmDelete(c)}>
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {confirmDelete && (
        <ConfirmDialog
          title="Excluir carta"
          message={`Tem certeza que deseja excluir a carta "${confirmDelete.titulo}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  )
}
