import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Base & tokens
import './styles/variables.css'
import './styles/base.css'

// Compartilhados (buttons, inputs, auth base, section helpers)
import './styles/shared.css'

// Componentes globais
import './styles/navbar.css'
import './styles/footer.css'
import './styles/hero-card-flip.css'

// Views
import './styles/pages/home.css'
import './styles/pages/login.css'
import './styles/pages/cadastro.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
