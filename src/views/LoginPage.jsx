'use client'

import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/routes'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)

  useEffect(() => {
    const target = document.querySelector('.auth-bg.finisher-header')
    if (!target || target.querySelector('canvas')) return

    const init = () => {
      if (window.FinisherHeader) {
        new window.FinisherHeader({
          count: 10,
          size: { min: 2, max: 45, pulse: 0.4 },
          speed: { x: { min: 0, max: 0.8 }, y: { min: 0, max: 0.2 } },
          colors: { background: '#243046', particles: ['#293d65'] },
          blending: 'screen',
          opacity: { center: 1, edge: 1 },
          skew: -1,
          shapes: ['c'],
        })
      }
    }

    if (window.FinisherHeader) {
      init()
      return
    }

    const checkTimer = window.setInterval(() => {
      if (window.FinisherHeader) {
        init()
        window.clearInterval(checkTimer)
      }
    }, 100)

    return () => window.clearInterval(checkTimer)
  }, [])

  return (
    <div className="page-auth">
      <div className="auth-bg finisher-header" />
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
              {showSenha ? <img src="/assets/icone-show.png" width="15" alt="Mostrar senha" /> : <img src="/assets/icone-hide.png" width="15" alt="Esconder senha" />}
            </button>
          </div>
          <button className="auth-forgot" onClick={() => {}}>Esqueceu a senha?</button>
          <button className="btn-primary auth-btn" onClick={() => router.push(ROUTES.estudante)} /* TODO: autenticar via API e redirecionar conforme o perfil */>Entrar</button>
          <p className="auth-switch">
            Ainda não tem uma conta?{' '}
            <button className="auth-link" onClick={() => router.push(ROUTES.cadastro)}>Cadastre-se!</button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
