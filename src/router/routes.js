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
    redirect: '/auth/login',
    component: () => import('layouts/auth'),
    children: [
      {path: 'login', component: () => import('pages/auth/login')},
      {path: 'register', component: () => import('pages/auth/register')},
      {path: 'password-reset', component: () => import('pages/auth/password-reset')}
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
