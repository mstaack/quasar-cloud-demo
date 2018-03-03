export default ({app, router, Vue}) => {

  // Check for authentication token from last usage withing localstorage
  app.store.commit('session/login', {token: localStorage.getItem('token')})

  // Check for protected and guest routes and perform checks
  router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.auth) && !app.store.getters['session/isAuthenticated']) {
      next({
        name: 'login',
      })
    } else if (to.matched.some(m => m.meta.guest) && app.store.getters['session/isAuthenticated']) {
      next({
        name: 'index',
      })
    } else {
      next()
    }
  })
}
