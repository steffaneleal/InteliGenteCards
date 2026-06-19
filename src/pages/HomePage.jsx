import { TRILHAS, FAQS, FUNCIONALIDADES } from '../data'
import TrilhaItem from '../components/TrilhaItem'
import FAQItem from '../components/FAQItem'
import Footer from '../components/Footer'
import { CardsIcon, AIIcon, PDFIcon, CollabIcon } from '../icons'
import heroImg from '../assets/hero.png'
import capaFrente from '../assets/images/capa-frente.png'
import capaVerso from '../assets/images/capa-verso.png'
import bgGif from '../assets/images/bg.gif'

const FUNC_ICONS = {
  cartas: <img src="\src\assets\icone-cards-branco.png" width="40" alt="Cartas" />,
  ai: <img src="\src\assets\icone-maritaca.png" width="40" alt="AI" />,
  pdf: <img src="\src\assets\icone-pdf.png" width="35" alt="PDF" />,
  collab: <img src="\src\assets\icone-globo.png" width="35" alt="Collab" />,
}

export default function HomePage({ setPage }) {
  return (
    <div className="page-home">
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-bg" style={{ backgroundImage: `url(${bgGif})` }} />
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-title-inteli">Inteli<span className="hero-title-gente">Gente</span></span>
              <br />Cards
            </h1>
            <p className="hero-subtitle">
              Explore a inteligência artificial de forma prática, colaborativa e responsável através
              de dinâmicas interativas com cartas digitais
            </p>
            <button className="btn-primary-hero hero-cta" onClick={() => setPage('cadastro')}>
              Começar Agora
            </button>
          </div>

          <div className="hero-card-wrap">
            <div className="hero-card-container">
              <div className="hero-card-inner">
                <div className="hero-card-front">
                  <img src={capaFrente} alt="Capa frente InteliGenteCards" />
                </div>
                <div className="hero-card-back">
                  <img src={capaVerso} alt="Capa verso InteliGenteCards" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="sobre-section">
        <p className="section-eyebrow">SOBRE</p>
        <h2 className="section-title">InteliGenteCards</h2>
        <p className="sobre-text">
          O <strong>InteliGenteCards</strong> é um jogo de cartas e baralho educacional desenvolvido para orientar
          estudantes, professores e profissionais a pensarem em soluções de Inteligência Artificial que sejam éticas,
          justas, responsáveis e integradas ao impacto social.
        </p>
        <p className="sobre-text">
          Diferente de metodologias tradicionais, a plataforma não entrega respostas prontas. O sistema funciona
          iteramente baseado em perguntas estratégicas. Como cada comunidade e problema possui particularidades únicas,
          as perguntas estimulam o debate, a pluralidade de vozes e o desenvolvimento do pensamento crítico aplicado à
          realidade local, combatendo a importação passiva de tecnologias do Norte Global.
        </p>
        <h3 className="sobre-subtitle">Entenda a Proposta por Trás das Cartas</h3>
        <div className="video-wrap">
          <iframe
            width="100%"
            height="100%"
            src="https://youtube.com/embed/ERklQsima5g?si=mUG2MHy7dtCi6NF6" 
            title="InteliGenteCards: Baralho Educacional"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* TRILHAS */}
      <section id="trilhas" className="trilhas-section">
        <div className="trilhas-inner">
          <p className="section-eyebrow light">TRILHAS</p>
          <h2 className="section-title light">Conheça as 4 Trilhas de Aprendizado</h2>
          <p className="trilhas-sub light">
            O jogo é composto por 4 trilhas para direcionar o desenvolvimento e o pensamento ético do usuário.
          </p>
          <div className="trilhas-list">
            {TRILHAS.map((t) => (
              <TrilhaItem key={t.id} trilha={t} />
            ))}
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section id="funcionalidades" className="func-section">
        <p className="section-eyebrow">FUNCIONALIDADES</p>
        <h2 className="section-title">Funcionalidades Principais</h2>
        <p className="func-sub">Tudo que você precisa para aprender inteligência artificial de forma responsável e colaborativa.</p>
        <div className="func-grid">
          {FUNCIONALIDADES.map((f) => (
            <div key={f.id} className="func-card">
              <div className="func-icon">{FUNC_ICONS[f.id]}</div>
              <h3 className="func-card-title">{f.title}</h3>
              <p className="func-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="duvidas" className="faq-section">
        <p className="section-eyebrow">FAQ</p>
        <h2 className="section-title">Dúvidas Frequentes</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <FAQItem key={i} item={item} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
