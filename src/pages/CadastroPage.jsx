import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import bgGif from '../assets/images/bg.gif'
import estudanteImg from '../assets/Estudante.png'
import facilitadorImg from '../assets/Facilitador.png'

function EstudanteForm({ setPage, onSwitch }) {
  return (
    <>
      <h1 className="auth-title">Cadastro de Estudante</h1>
      <div className="auth-field"><input type="text" placeholder="Nome Completo" className="auth-input" /></div>
      <div className="auth-field"><input type="email" placeholder="E-mail" className="auth-input" /></div>
      <div className="auth-field"><input type="password" placeholder="Senha" className="auth-input" /></div>
      <div className="auth-field"><input type="password" placeholder="Verificação de Senha" className="auth-input" /></div>
      <div className="auth-field"><input type="text" placeholder="Estado" className="auth-input" /></div>
      <div className="auth-field"><input type="text" placeholder="Instituição de Ensino (opcional)" className="auth-input" /></div>
      <button className="btn-primary auth-btn">Entrar</button>
      <p className="auth-switch">
        Ou, <button className="auth-link" onClick={() => setPage('login')}>faça login!</button>
      </p>
    </>
  )
}

function FacilitadorForm({ setPage, onSwitch }) {
  return (
    <>
      <h1 className="auth-title">Cadastro de Facilitador</h1>
      <div className="auth-field"><input type="text" placeholder="Nome Completo" className="auth-input" /></div>
      <div className="auth-field"><input type="email" placeholder="E-mail Institucional" className="auth-input" /></div>
      <div className="auth-field"><input type="password" placeholder="Senha" className="auth-input" /></div>
      <div className="auth-field"><input type="password" placeholder="Verificação de Senha" className="auth-input" /></div>
      <div className="auth-field"><input type="text" placeholder="Instituição de Ensino" className="auth-input" /></div>
      <div className="auth-field"><input type="text" placeholder="Estado" className="auth-input" /></div>
      <div className="auth-field"><input type="text" placeholder="Cargo / Função" className="auth-input" /></div>
      <button className="btn-primary auth-btn">Cadastrar</button>
      <p className="auth-switch">
        Ou, <button className="auth-link" onClick={() => setPage('login')}>faça login!</button>
      </p>
    </>
  )
}

export default function CadastroPage({ setPage }) {
  const [isFacilitador, setIsFacilitador] = useState(false)

  useEffect(() => {
    const target = document.querySelector('.auth-bg.finisher-header')
    if (!target || target.querySelector('canvas')) return

    const init = () => {
      if (window.FinisherHeader) {
        new window.FinisherHeader({
          count: 10,
          size: { min: 2, max: 45, pulse: 0.4 },
          speed: { x: { min: 0, max: 0.8 }, y: { min: 0, max: 0.2 } },
          colors: { background: '#253046', particles: ['#293d65'] },
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
      <div className="auth-bg finisher-header"/>
      <div className="auth-center">
        <div className={`cadastro-wrapper${isFacilitador ? ' flipped' : ''}`}>
          {/* Panel esquerdo — formulário */}
          <div className="cadastro-form-panel">
            <div className="auth-card cadastro-auth-card">
              {isFacilitador
                ? <FacilitadorForm setPage={setPage} />
                : <EstudanteForm setPage={setPage} />
              }
            </div>
          </div>

          {/* Panel direito — switch */}
          <div className="cadastro-switch-panel" onClick={() => setIsFacilitador(f => !f)}>
            <div className="cadastro-switch-inner">
              {isFacilitador
                ? <img src={estudanteImg} width="130" alt="Estudante" />
                : <img src={facilitadorImg} width="130" alt="Facilitador" />
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
