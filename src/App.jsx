import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'
import HomePage from './pages/HomePage'
import DashboardalunoPage from './pages/DashboardalunoPage'
import DashboardFacilitadorPage from './pages/DashboardFacilitadorPage'
import DashboardSuperAdminPage from './pages/DashboardSuperAdminPage'

const DASHBOARD_PAGES = ['dashboard-aluno', 'dashboard-facilitador', 'dashboard-admin']

export default function App() {
  const [page, setPage] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  const isDashboard = DASHBOARD_PAGES.includes(page)

  // Seletor para mudar os perfis, mas é temporário
  // TODO: remover quando a autenticação (JWT) estiver implementada
  const switchRole = () => {
    const next = {
      'dashboard-aluno': 'dashboard-facilitador',
      'dashboard-facilitador': 'dashboard-admin',
      'dashboard-admin': 'dashboard-aluno',
    }
    setPage(next[page] || 'dashboard-aluno')
  }

  return (
    <div>
      {!isDashboard && (
        <Navbar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      )}

      {page === 'login'    && <LoginPage setPage={setPage} onLoginSuccess={() => setPage('dashboard-aluno')} />}
      {page === 'cadastro' && <CadastroPage setPage={setPage} />}
      {page === 'home'     && <HomePage setPage={setPage} />}

      {page === 'dashboard-aluno' && (
        <DashboardalunoPage setPage={setPage} onSwitchRole={switchRole} />
      )}
      {page === 'dashboard-facilitador' && (
        <DashboardFacilitadorPage setPage={setPage} onSwitchRole={switchRole} />
      )}
      {page === 'dashboard-admin' && (
        <DashboardSuperAdminPage setPage={setPage} onSwitchRole={switchRole} />
      )}
    </div>
  )
}
