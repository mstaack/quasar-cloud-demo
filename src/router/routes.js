export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {path: '', component: () => import('pages/index')}
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/auth'),
    children: [
      {path: 'login', component: () => import('pages/login')},
      {path: 'register', component: () => import('pages/register')},
      {path: 'password-reset', component: () => import('pages/password-reset')}
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
