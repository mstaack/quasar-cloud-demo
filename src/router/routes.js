export default [
  {
    path: '/',
    redirect: '/news',
    component: () => import('layouts/main'),
    meta: {auth: true},
    children: [
      {
        path: 'news',
        name: 'news',
        component: () => import('pages/news'),
        meta: {title: 'News'}
      },
      {
        path: 'cloud',
        name: 'cloud',
        component: () => import('pages/cloud'),
        meta: {title: 'Cloud'}
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('pages/profile'),
        meta: {title: 'Profile'}
      }
    ]
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    meta: {guest: true},
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
