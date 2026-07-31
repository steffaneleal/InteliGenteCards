import { useState } from 'react'
import Modal from './Modal'

const emptyErrors = { titulo: '', trilha: '' }

/**
 * Modal de criação / edição de carta (pergunta) de uma trilha.
 * `trilhaOptions`: [{ key, titulo, color }]
 */
export default function CartaFormModal({ mode, initialData, trilhaOptions, onSubmit, onClose }) {
  const isEdit = mode === 'edit'
  const [titulo, setTitulo] = useState(initialData?.titulo || '')
  const [trilha, setTrilha] = useState(initialData?.trilha || trilhaOptions[0]?.key || '')
  const [status, setStatus] = useState(initialData?.status || 'Ativo')
  const [errors, setErrors] = useState(emptyErrors)

  const validate = () => {
    const next = { ...emptyErrors }
    if (titulo.trim().length < 8) next.titulo = 'Escreva a pergunta da carta (mínimo 8 caracteres).'
    if (!trilha) next.trilha = 'Selecione a trilha desta carta.'
    setErrors(next)
    return !next.titulo && !next.trilha
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ titulo: titulo.trim(), trilha, status })
  }

  return (
    <Modal
      title={isEdit ? 'Editar carta' : 'Nova carta'}
      subtitle={isEdit ? `ID ${initialData.id}` : 'Cadastre uma nova pergunta para uma trilha do guia.'}
      onClose={onClose}
    >
      <form className="dash-inline-form dash-modal-form" onSubmit={handleSubmit} noValidate>
        <label>
          Pergunta da carta
          <textarea
            rows={3}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Que problema você observa em sua comunidade que poderia ser mitigado com IA?"
            aria-invalid={!!errors.titulo}
          />
          {errors.titulo && <span className="dash-field-error">{errors.titulo}</span>}
        </label>

        <div className="dash-form-row">
          <label>
            Trilha
            <select value={trilha} onChange={(e) => setTrilha(e.target.value)} aria-invalid={!!errors.trilha}>
              {trilhaOptions.map((t) => (
                <option key={t.key} value={t.key}>{t.titulo}</option>
              ))}
            </select>
            {errors.trilha && <span className="dash-field-error">{errors.trilha}</span>}
          </label>
          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </label>
        </div>

        <div className="dash-form-actions">
          <button type="button" className="dash-btn dash-btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="dash-btn dash-btn-orange">{isEdit ? 'Salvar alterações' : 'Criar carta'}</button>
        </div>
      </form>
    </Modal>
  )
}
