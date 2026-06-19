import { useState } from 'react'
import Footer from '../components/Footer'
import { FacilitadorIcon, EstudanteIcon } from '../icons'
import bgGif from '../assets/images/bg.gif'

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

  return (
    <div className="page-auth">
      <div className="auth-bg" style={{ backgroundImage: `url(${bgGif})` }} />
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
                ? <img src="\src\assets\Estudante.png" width="130" alt="Estudante" />
                : <img src="\src\assets\Facilitador.png" width="130" alt="Facilitador" />
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
