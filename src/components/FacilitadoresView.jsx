'use client'

import { useMemo, useState } from 'react'
import Modal from './Modal'
import ConfirmDialog from './ConfirmDialog'
import { CheckIcon, XIcon, EyeIcon, SearchIcon } from '../icons'

function iniciais(nome) {
  return nome.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function FacilitadoresView({ pendentes, onApprove, onReject }) {
  const [busca, setBusca] = useState('')
  const [details, setDetails] = useState(null) // facilitador selecionado no "Ver dados"
  const [confirmAction, setConfirmAction] = useState(null) // { type: 'aprovar'|'recusar', item }
  const [feedback, setFeedback] = useState('')

  const showFeedback = (msg) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(''), 2500)
  }

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    if (!q) return pendentes
    return pendentes.filter((f) =>
      f.nome.toLowerCase().includes(q) || f.instituicao.toLowerCase().includes(q) || f.email.toLowerCase().includes(q)
    )
  }, [pendentes, busca])

  const handleConfirm = () => {
    const { type, item } = confirmAction
    if (type === 'aprovar') {
      onApprove(item.id)
      showFeedback(`Cadastro de ${item.nome} aprovado. Acesso de facilitador liberado.`)
    } else {
      onReject(item.id)
      showFeedback(`Cadastro de ${item.nome} recusado.`)
    }
    setConfirmAction(null)
  }

  return (
    <div className="dash-view">
      <section className="dash-card dash-table-card">
        <div className="dash-section-head">
          <h2>Solicitações pendentes</h2>
          <span className="dash-count-pill">{pendentes.length} pendente(s)</span>
        </div>

        <div className="dash-search">
          <SearchIcon />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, instituição ou e-mail..."
            aria-label="Buscar solicitação"
          />
        </div>

        {feedback && <p className="dash-perfil-saved dash-content-feedback">{feedback}</p>}

        {filtrados.length === 0 ? (
          <p className="dash-empty-state">
            {pendentes.length === 0 ? 'Nenhuma solicitação pendente no momento.' : 'Nenhuma solicitação encontrada.'}
          </p>
        ) : (
          <ul className="dash-approval-list">
            {filtrados.map((f) => (
              <li key={f.id} className="dash-approval-item dash-approval-item-full">
                <div className="dash-approval-actions dash-approval-actions-left">
                  <button
                    className="dash-icon-btn dash-icon-btn-approve"
                    aria-label={`Aprovar cadastro de ${f.nome}`}
                    title="Aprovar cadastro"
                    onClick={() => setConfirmAction({ type: 'aprovar', item: f })}
                  >
                    <CheckIcon />
                  </button>
                  <button
                    className="dash-icon-btn dash-icon-btn-danger"
                    aria-label={`Recusar cadastro de ${f.nome}`}
                    title="Recusar cadastro"
                    onClick={() => setConfirmAction({ type: 'recusar', item: f })}
                  >
                    <XIcon />
                  </button>
                  <button
                    className="dash-icon-btn"
                    aria-label={`Ver dados de ${f.nome}`}
                    title="Ver dados do cadastro"
                    onClick={() => setDetails(f)}
                  >
                    <EyeIcon />
                  </button>
                </div>

                <div className="dash-avatar dash-avatar-sm">{iniciais(f.nome)}</div>
                <div className="dash-approval-text">
                  <p className="dash-table-title">{f.nome}</p>
                  <p className="dash-table-sub">{f.instituicao} · {f.estado}</p>
                  <p className="dash-approval-justificativa">&ldquo;{f.justificativa}&rdquo;</p>
                </div>
                <span className="dash-approval-date">Solicitado em {f.dataSolicitacao}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {details && (
        <Modal title="Dados do cadastro" subtitle={details.nome} onClose={() => setDetails(null)} size="sm">
          <dl className="dash-detail-list">
            <div><dt>Nome completo</dt><dd>{details.nome}</dd></div>
            <div><dt>E-mail institucional</dt><dd>{details.email}</dd></div>
            <div><dt>Instituição de ensino</dt><dd>{details.instituicao}</dd></div>
            <div><dt>Estado</dt><dd>{details.estado}</dd></div>
            <div><dt>Cargo / Função</dt><dd>{details.cargo}</dd></div>
            <div><dt>Data da solicitação</dt><dd>{details.dataSolicitacao}</dd></div>
            <div><dt>Justificativa</dt><dd>{details.justificativa}</dd></div>
          </dl>
          <div className="dash-form-actions">
            <button type="button" className="dash-btn dash-btn-ghost" onClick={() => setDetails(null)}>Fechar</button>
          </div>
        </Modal>
      )}

      {confirmAction && (
        <ConfirmDialog
          title={confirmAction.type === 'aprovar' ? 'Aprovar facilitador' : 'Recusar facilitador'}
          message={
            confirmAction.type === 'aprovar'
              ? `Confirma a aprovação do cadastro de "${confirmAction.item.nome}"? Ele(a) passará a ter acesso de facilitador na plataforma.`
              : `Tem certeza que deseja recusar o cadastro de "${confirmAction.item.nome}"? Esta ação não pode ser desfeita.`
          }
          confirmLabel={confirmAction.type === 'aprovar' ? 'Aprovar' : 'Recusar'}
          danger={confirmAction.type === 'recusar'}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmAction(null)}
        />
      )}
    </div>
  )
}
