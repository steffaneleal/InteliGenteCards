import Modal from './Modal'
import { AlertTriangleIcon } from '../icons'

/**
 * Diálogo de confirmação para ações destrutivas (excluir carta / trilha).
 */
export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Excluir',
  cancelLabel = 'Cancelar',
  danger = true,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal title={title} onClose={onCancel} size="sm">
      <div className="dash-confirm-body">
        <span className={`dash-confirm-icon${danger ? ' dash-confirm-icon-danger' : ''}`}>
          <AlertTriangleIcon />
        </span>
        <p>{message}</p>
      </div>
      <div className="dash-form-actions">
        <button type="button" className="dash-btn dash-btn-ghost" onClick={onCancel}>{cancelLabel}</button>
        <button
          type="button"
          className={`dash-btn ${danger ? 'dash-btn-danger' : 'dash-btn-orange'}`}
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
