import Navbar from '@/components/Navbar'

// Páginas públicas (com a navbar do site). Os dashboards ficam em (dashboard)/.
export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
