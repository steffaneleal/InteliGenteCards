'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '../icons'

export default function TrilhaItem({ trilha }) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((o) => !o)

  return (
    <div className={`trilha-item${open ? ' open' : ''}`} style={{ '--tc': trilha.labelColor }}>
      <div
        className="trilha-header"
        onClick={toggle}
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggle()}
      >
        <span className="trilha-icon" aria-hidden="true">{trilha.icon}</span>
        <div className="trilha-text">
          <div className="trilha-label">{trilha.label}</div>
          <div className="trilha-title">{trilha.title}</div>
        </div>
        <span className={`trilha-chevron${open ? ' open' : ''}`} aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </div>

      {open && (
        <div className="trilha-body" style={{ background: trilha.bg }}>
          <div className="trilha-body-text">
            <p>{trilha.desc1}</p>
            <p>{trilha.desc2}</p>
          </div>
          <div className="trilha-sample-card">
            <img src={trilha.cardImage} alt={`Carta da trilha ${trilha.label}`} />
          </div>
        </div>
      )}
    </div>
  )
}
