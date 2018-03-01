export default [
  {
    path: '/',
    component: () => import('layouts/main'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/index'),
        meta: {title: 'Home'}
      }
    ]
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    component: () => import('layouts/auth'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/login'),
        meta: {title: 'Login'}
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/auth/register'),
        meta: {title: 'Register'}
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
