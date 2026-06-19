import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'
import HomePage from './pages/HomePage'

export default function App() {
  const [page, setPage] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div>
      <Navbar
        page={page}
        setPage={setPage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      {page === 'login'    && <LoginPage setPage={setPage} />}
      {page === 'cadastro' && <CadastroPage setPage={setPage} />}
      {page === 'home'     && <HomePage setPage={setPage} />}
    </div>
  )
}
