var routers = [{
  name: "Login",
  path: '/login',
  componentUrl: '../public/core/pages/page-login.html?v=2'
},
{
  name: "Listar Categorias",
  path: '/dashboard',
  componentUrl: '../public/core/pages/dashboard.html?v=2'
},
{
  name: "Reader",
  path: '/reader/:bookId',
  componentUrl: '../public/core/pages/read-book.html?v=4'
}
]

export { routers }