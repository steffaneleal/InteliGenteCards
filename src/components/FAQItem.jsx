import { useState } from 'react'
import { ChevronDownIcon } from '../icons'

export default function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((o) => !o)

  return (
    <div className="faq-item">
      <div
        className="faq-question"
        onClick={toggle}
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggle()}
      >
        <span>{item.q}</span>
        <span className={`faq-chevron${open ? ' open' : ''}`} aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </div>
      {open && <p className="faq-answer">{item.a}</p>}
    </div>
  )
}
