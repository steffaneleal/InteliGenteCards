import { useState } from 'react'
import Footer from '../components/Footer'
import bgGif from '../assets/images/bg.gif'

export default function LoginPage({ setPage }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)

  return (
    <div className="page-auth">
      <div className="auth-bg" style={{ backgroundImage: `url(${bgGif})` }} />
      <div className="auth-center">
        <div className="auth-card">
          <h1 className="auth-title">Login</h1>
          <div className="auth-field">
            <input
              type="email"
              placeholder="Digite o seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>
          <div className="auth-field auth-field-pass">
            <input
              type={showSenha ? 'text' : 'password'}
              placeholder="Digite a sua senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              className="auth-input"
            />
            <button className="auth-show-pass" onClick={() => setShowSenha(s => !s)} tabIndex={-1}>
              {showSenha ? '🙈' : '👁'}
            </button>
          </div>
          <button className="auth-forgot" onClick={() => {}}>Esqueceu a senha?</button>
          <button className="btn-primary auth-btn">Entrar</button>
          <p className="auth-switch">
            Ainda não tem uma conta?{' '}
            <button className="auth-link" onClick={() => setPage('cadastro')}>Cadastre-se!</button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
