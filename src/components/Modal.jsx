'use client'

import { useEffect } from 'react'
import { CloseIcon } from '../icons'

// Modal genérico usado pelas telas de CRUD (cartas / trilhas). Fecha com ESC, clique no backdrop ou botão de fechar.
export default function Modal({ title, subtitle, onClose, children, size = 'md' }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="dash-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`dash-modal dash-modal-${size}`} role="dialog" aria-modal="true" aria-labelledby="dash-modal-title">
        <div className="dash-modal-head">
          <div>
            <h2 id="dash-modal-title">{title}</h2>
            {subtitle && <p className="dash-modal-subtitle">{subtitle}</p>}
          </div>
          <button type="button" className="dash-icon-btn dash-modal-close" onClick={onClose} aria-label="Fechar">
            <CloseIcon />
          </button>
        </div>
        <div className="dash-modal-body">{children}</div>
      </div>
    </div>
  )
}
