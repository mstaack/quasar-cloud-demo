export default ({app, router, Vue}) => {

  // Check for authentication token from last usage withing localstorage
  let token = localStorage.getItem('token')
  if (token) {
    app.store.commit('session/login', {token: token})
  }

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
