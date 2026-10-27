// Rotas
// As páginas ficam em src/app/.
export const ROUTES = {
  home: '/',
  login: '/login',
  cadastro: '/cadastro',
  estudante: '/estudante',
  facilitador: '/facilitador',
  admin: '/admin',
}

// TEMPORÁRIO: usado pelo botão "Ver como outro perfil".
// TODO: não esquecer de remover quando a autenticação JWT estiver implementada.
export const NEXT_ROLE_ROUTE = {
  estudante: ROUTES.facilitador,
  facilitador: ROUTES.admin,
  admin: ROUTES.estudante,
}
