'use client'

import { useMemo, useState } from 'react'
import TrilhaForm from './TrilhaForm'
import ConfirmDialog from './ConfirmDialog'
import { PlusIcon, EditIcon, TrashIcon, SearchIcon } from '../icons'

/**
 * View completa de gestão de trilhas: lista todas as trilhas cadastradas,
 * com busca, criação (formulário inline, nesta própria página), edição
 * e exclusão.
 */
export default function TrilhasView({ trilhas, onCreate, onUpdate, onDelete }) {
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
    if (!q) return trilhas
    return trilhas.filter((t) => t.titulo.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
  }, [trilhas, busca])

  const handleSubmit = (data) => {
    if (panel.mode === 'edit') {
      onUpdate(panel.data.id, data)
      showFeedback('Trilha atualizada com sucesso.')
    } else {
      onCreate(data)
      showFeedback('Trilha criada com sucesso.')
    }
    setPanel(null)
  }

  const handleConfirmDelete = () => {
    onDelete(confirmDelete.id)
    showFeedback('Trilha excluída.')
    setConfirmDelete(null)
  }

  const trilhaEmUso = confirmDelete && confirmDelete.cartas > 0

  return (
    <div className="dash-view">
      {panel && (
        <TrilhaForm
          mode={panel.mode}
          initialData={panel.data}
          onSubmit={handleSubmit}
          onCancel={() => setPanel(null)}
        />
      )}

      <section className="dash-card dash-table-card">
        <div className="dash-section-head">
          <h2>Todas as trilhas</h2>
          {!panel && (
            <button className="dash-btn dash-btn-primary dash-btn-sm" onClick={() => setPanel({ mode: 'create' })}>
              <PlusIcon /> Nova trilha
            </button>
          )}
        </div>

        <div className="dash-search">
          <SearchIcon />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar trilha por título ou ID..."
            aria-label="Buscar trilha"
          />
        </div>

        {feedback && <p className="dash-perfil-saved dash-content-feedback">{feedback}</p>}

        {filtradas.length === 0 ? (
          <p className="dash-empty-state">Nenhuma trilha encontrada.</p>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>ID</th><th>Trilha</th><th>Cartas</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {filtradas.map((t) => (
                <tr key={t.id}>
                  <td className="dash-mono">{t.id}</td>
                  <td>
                    <span className="dash-badge-dot" style={{ background: t.color }} />
                    <span className="dash-table-title" style={{ display: 'inline' }}>{t.titulo}</span>
                  </td>
                  <td>{t.cartas}</td>
                  <td><span className={`dash-badge ${t.status === 'Ativo' ? 'dash-badge-done' : 'dash-badge-muted'}`}>{t.status}</span></td>
                  <td className="dash-row-actions">
                    <button className="dash-icon-btn" aria-label="Editar trilha" onClick={() => setPanel({ mode: 'edit', data: t })}>
                      <EditIcon />
                    </button>
                    <button
                      className="dash-icon-btn dash-icon-btn-danger"
                      aria-label="Excluir trilha"
                      disabled={t.cartas > 0}
                      title={t.cartas > 0 ? 'Remova ou realoque as cartas desta trilha antes de excluí-la.' : undefined}
                      onClick={() => setConfirmDelete(t)}
                    >
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
          title="Excluir trilha"
          message={
            trilhaEmUso
              ? `A trilha "${confirmDelete.titulo}" possui ${confirmDelete.cartas} carta(s) vinculada(s) e não pode ser excluída. Realoque ou exclua as cartas primeiro.`
              : `Tem certeza que deseja excluir a trilha "${confirmDelete.titulo}"? Esta ação não pode ser desfeita.`
          }
          confirmLabel={trilhaEmUso ? 'Entendi' : 'Excluir'}
          onConfirm={trilhaEmUso ? () => setConfirmDelete(null) : handleConfirmDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  )
}
