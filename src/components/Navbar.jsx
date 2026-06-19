import { useState, useEffect } from 'react'
import { MenuIcon, CloseIcon } from '../icons'

const NAV_LINKS = ['Início', 'Sobre', 'Funcionalidades', 'Dúvidas', 'Login', 'Cadastro', 'Parceiros']

const SECTION_MAP = {
  Sobre: 'sobre',
  Funcionalidades: 'funcionalidades',
  'Dúvidas': 'duvidas',
}

const PAGE_MAP = {
  Login: 'login',
  Cadastro: 'cadastro',
}

const ACTIVE_MAP = {
  home: 'Início',
  login: 'Login',
  cadastro: 'Cadastro',
}

const SECTION_TO_NAV = {
  sobre: 'Sobre',
  funcionalidades: 'Funcionalidades',
  trilhas: 'Sobre',
  duvidas: 'Dúvidas',
}

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar({ page, setPage, mobileOpen, setMobileOpen }) {
  const [activeSection, setActiveSection] = useState(null)

  const pageLinkActive = ACTIVE_MAP[page] || 'Início'
  const active = activeSection || pageLinkActive

  useEffect(() => {
    if (page !== 'home') { setActiveSection(null); return }

    const observed = {}
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { observed[e.target.id] = e.isIntersecting })
      const visible = Object.entries(observed).filter(([, v]) => v)
      setActiveSection(visible.length > 0 ? SECTION_TO_NAV[visible[0][0]] || null : null)
    }, { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-100px 0px -60% 0px' })

    ;[...Object.values(SECTION_MAP), 'trilhas'].forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [page])

  const handleNav = (link) => {
    setMobileOpen(false)
    const sectionId = SECTION_MAP[link]
    if (sectionId) {
      if (page !== 'home') { setPage('home'); setTimeout(() => scrollToSection(sectionId), 120) }
      else scrollToSection(sectionId)
      return
    }
    setPage(PAGE_MAP[link] || 'home')
  }

  return (
    <>
      <nav className="nav" role="navigation" aria-label="Menu principal">
        <button className="nav-logo" onClick={() => setPage('home')} aria-label="Ir para página inicial">
          InteliGenteCards
        </button>

        <ul className="nav-links">
          {NAV_LINKS.map((link) =>
            link === 'Parceiros' ? (
              <li key={link} className="nav-item has-dropdown">
                <button className="nav-button" type="button">Parceiros</button>
                <div className="nav-dropdown" role="menu">
                  <a href="https://inteligentehub.com.br" target="_blank" rel="noreferrer" role="menuitem">InteliGente</a>
                  <a href="https://inteligentehub.com.br/InteliGenteCards.html" target="_blank" rel="noreferrer" role="menuitem">InteliGenteCards</a>
                </div>
              </li>
            ) : (
              <li key={link}>
                <a
                  className={active === link ? 'active' : ''}
                  onClick={() => handleNav(link)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleNav(link)}
                  aria-current={active === link ? 'page' : undefined}
                >
                  {link}
                </a>
              </li>
            )
          )}
        </ul>

        <button className="hamburger" onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen}>
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu${mobileOpen ? ' open' : ''}`} role="menu">
        {NAV_LINKS.map((link) => (
          <a key={link} className={active === link ? 'active' : ''} onClick={() => handleNav(link)}
            role="menuitem" tabIndex={mobileOpen ? 0 : -1}>
            {link}
          </a>
        ))}
      </div>
    </>
  )
}
