import { useState } from 'react'
import { MenuIcon, CloseIcon, BellIcon, LogoutIcon, ChevronRightIcon } from '../icons'

const ROLE_LABEL = {
  estudante: 'Estudante',
  facilitador: 'Facilitador',
  admin: 'Super Admin',
}

const ROLE_ACCENT = {
  estudante: '#e07b3a',
  facilitador: '#f17419',
  admin: '#8fb3e8',
}

/**
 * Casca (shell) comum às três áreas logadas: sidebar de navegação + topbar.
 * `nav` recebe os itens do menu daquele perfil; `active` o id atual.
 */
export default function DashboardShell({
  role,
  nav,
  active,
  onNavigate,
  user,
  pageTitle,
  pageSubtitle,
  breadcrumb,
  onLogout,
  onSwitchRole,
  notifications = [],
  onNotificationRead,
  children,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [bellOpen, setBellOpen] = useState(false)
  const accent = ROLE_ACCENT[role]
  const unreadCount = notifications.filter((item) => !item.read).length

  const handleNav = (id) => {
    setDrawerOpen(false)
    onNavigate(id)
  }

  const handleNotificationSelect = (notification) => {
    setBellOpen(false)
    if (notification.targetTab) {
      handleNav(notification.targetTab)
    }
    if (!notification.read) {
      onNotificationRead?.(notification.id)
    }
  }

  return (
    <div className="dash-shell" style={{ '--role-accent': accent }}>
      <aside className={`dash-sidebar${drawerOpen ? ' open' : ''}`}>
        <div className="dash-sidebar-top">
          <button className="dash-logo" onClick={() => handleNav(nav[0].id)}>
            Reflet<span className="dash-logo-gente">IA</span>
          </button>
          <button className="dash-drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Fechar menu">
            <CloseIcon />
          </button>
        </div>

        <p className="dash-role-tag">Área do {ROLE_LABEL[role]}</p>

        <nav className="dash-nav" aria-label="Navegação principal">
          {nav.map((item) => (
            <button
              key={item.id}
              className={`dash-nav-item${active === item.id ? ' active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="dash-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge != null && <span className="dash-nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="dash-sidebar-footer">
          {onSwitchRole && (
            <button className="dash-role-switch" onClick={onSwitchRole}>
              Ver como outro perfil
              <ChevronRightIcon />
            </button>
          )}
          <button className="dash-logout" onClick={onLogout}>
            <LogoutIcon />
            Sair
          </button>
        </div>
      </aside>

      {drawerOpen && <div className="dash-scrim" onClick={() => setDrawerOpen(false)} />}

      <div className="dash-main">
        <header className="dash-topbar">
          <button className="dash-hamburger" onClick={() => setDrawerOpen(true)} aria-label="Abrir menu">
            <MenuIcon />
          </button>

          <div className="dash-topbar-title">
            {breadcrumb && <p className="dash-breadcrumb">{breadcrumb}</p>}
            <h1>{pageTitle}</h1>
            {pageSubtitle && <p className="dash-topbar-subtitle">{pageSubtitle}</p>}
          </div>

          <div className="dash-topbar-actions">
            <div className="dash-bell-wrap">
              <button className="dash-bell" aria-label="Notificações" aria-expanded={bellOpen} onClick={() => setBellOpen((v) => !v)}>
                <BellIcon />
                {unreadCount > 0 && <span className="dash-bell-dot" />}
              </button>

              {bellOpen && notifications.length > 0 && (
                <div className="dash-notify-panel" role="menu" aria-label="Notificações">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      type="button"
                      className={`dash-notify-item${notification.read ? ' read' : ''}`}
                      onClick={() => handleNotificationSelect(notification)}
                    >
                      <span className="dash-notify-title">{notification.title}</span>
                      <span className="dash-notify-detail">{notification.detail}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="dash-user">
              <div className="dash-avatar">{user.initials}</div>
              <div className="dash-user-text">
                <span className="dash-user-name">{user.name}</span>
                <span className="dash-user-role">{ROLE_LABEL[role]}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="dash-content">{children}</main>
      </div>
    </div>
  )
}
