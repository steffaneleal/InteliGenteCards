import Script from 'next/script'

// Base & tokens
import '@/styles/variables.css'
import '@/styles/base.css'

// Compartilhados (buttons, inputs, auth base, section helpers)
import '@/styles/shared.css'

// Componentes globais
import '@/styles/navbar.css'
import '@/styles/footer.css'
import '@/styles/hero-card-flip.css'

// Views
import '@/styles/pages/home.css'
import '@/styles/pages/login.css'
import '@/styles/pages/cadastro.css'
import '@/styles/pages/dashboard.css'
import '@/styles/pages/cartas-jogo.css'

export const metadata = {
  title: 'RefletIA',
  description: 'Explore a inteligência artificial de forma prática, colaborativa e responsável.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Script src="/finisher-header.es5.min.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
