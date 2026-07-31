import { useState } from 'react'
import Modal from './Modal'

// Paleta de cores da identidade visual do InteliGenteCards, usada nos
// distintivos (badges) de trilha em toda a plataforma.
export const TRILHA_COLOR_PALETTE = [
  '#F79C5A', '#FBD160', '#f17419', '#F1A5C1', '#8fb3e8', '#e07b3a', '#a78bfa', '#6fcf97',
]

const emptyErrors = { titulo: '' }

export default function TrilhaFormModal({ mode, initialData, onSubmit, onClose }) {
  const isEdit = mode === 'edit'
  const [titulo, setTitulo] = useState(initialData?.titulo || '')
  const [color, setColor] = useState(initialData?.color || TRILHA_COLOR_PALETTE[0])
  const [status, setStatus] = useState(initialData?.status || 'Ativo')
  const [errors, setErrors] = useState(emptyErrors)

  const validate = () => {
    const next = { ...emptyErrors }
    if (titulo.trim().length < 3) next.titulo = 'Dê um nome para a trilha (mínimo 3 caracteres).'
    setErrors(next)
    return !next.titulo
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ titulo: titulo.trim(), color, status })
  }

  return (
    <Modal
      title={isEdit ? 'Editar trilha' : 'Nova trilha'}
      subtitle={isEdit ? `ID ${initialData.id}` : 'Cadastre uma nova trilha de aprendizagem do guia.'}
      onClose={onClose}
    >
      <form className="dash-inline-form dash-modal-form" onSubmit={handleSubmit} noValidate>
        <label>
          Nome da trilha
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Prototipação"
            aria-invalid={!!errors.titulo}
          />
          {errors.titulo && <span className="dash-field-error">{errors.titulo}</span>}
        </label>

        <div>
          <span className="dash-color-label">Cor de identificação</span>
          <div className="dash-color-swatches" role="radiogroup" aria-label="Cor da trilha">
            {TRILHA_COLOR_PALETTE.map((c) => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={color === c}
                aria-label={`Selecionar cor ${c}`}
                className={`dash-color-swatch${color === c ? ' active' : ''}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </label>

        {isEdit && (
          <p className="dash-perfil-hint">
            Esta trilha possui {initialData.cartas} carta(s) vinculada(s). O número de cartas é atualizado automaticamente.
          </p>
        )}

        <div className="dash-form-actions">
          <button type="button" className="dash-btn dash-btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="dash-btn dash-btn-orange">{isEdit ? 'Salvar alterações' : 'Criar trilha'}</button>
        </div>
      </form>
    </Modal>
  )
}
