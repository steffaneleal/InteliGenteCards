'use client'

import { useState } from 'react'
import { EyeOffIcon } from '../icons'

/* Formulário de edição de perfil: dados pessoais + troca de senha. */
export default function PerfilForm({ user, escolaLabel = 'Escola / Instituição', showEstadoCargo = false }) {
  const [nome, setNome] = useState(user.name)
  const [email, setEmail] = useState(user.email || '')
  const [estado, setEstado] = useState(user.estado || '')
  const [cargo, setCargo] = useState(user.cargo || '')
  const [escola, setEscola] = useState(user.escola || '')

  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmaSenha, setConfirmaSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)

  const [saved, setSaved] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: enviar PATCH /usuarios/:id e, se preenchido, validar
    // a troca de senha no backend antes de confirmar.
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <form className="dash-card dash-perfil-form" onSubmit={handleSubmit}>
      <div className="dash-perfil-head">
        <div className="dash-avatar dash-avatar-lg">{user.initials}</div>
        <div>
          <p className="dash-perfil-name">{nome}</p>
          <button type="button" className="dash-link">Alterar foto</button>
        </div>
      </div>

      <div className="dash-perfil-section">
        <p className="dash-perfil-section-title">Dados pessoais</p>
        <div className="dash-form-row">
          <label>
            Nome completo
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>
          <label>
            E-mail
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        {showEstadoCargo && (
          <div className="dash-form-row">
            <label>
              Estado
              <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} placeholder="Ex.: Paraná" />
            </label>
            <label>
              Cargo / Função
              <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} placeholder="Ex.: Facilitador(a)" />
            </label>
          </div>
        )}
        <label>
          {escolaLabel}
          <input type="text" value={escola} onChange={(e) => setEscola(e.target.value)} placeholder="Nome da sua escola ou instituição" />
        </label>
      </div>

      <div className="dash-perfil-section">
        <p className="dash-perfil-section-title">Alterar senha</p>
        <p className="dash-perfil-hint">Deixe em branco se não quiser alterar sua senha atual.</p>
        <div className="dash-form-row">
          <label>
            Senha atual
            <input type={showSenha ? 'text' : 'password'} value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} placeholder="••••••••" />
          </label>
          <label>
            Nova senha
            <input type={showSenha ? 'text' : 'password'} value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} placeholder="••••••••" />
          </label>
        </div>
        <label className="dash-perfil-confirm">
          Confirmar nova senha
          <input type={showSenha ? 'text' : 'password'} value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} placeholder="••••••••" />
        </label>
        <button type="button" className="dash-perfil-toggle-pass" onClick={() => setShowSenha((s) => !s)}>
          <EyeOffIcon /> {showSenha ? 'Ocultar senhas' : 'Mostrar senhas'}
        </button>
      </div>

      <div className="dash-form-actions dash-perfil-actions">
        {saved && <span className="dash-perfil-saved">Alterações salvas!</span>}
        <button type="submit" className="dash-btn dash-btn-orange">Salvar alterações</button>
      </div>
    </form>
  )
}
