export default ({app, router, Vue}) => {

  // Check for protected and guest routes and perform checks
  router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.auth) && !app.store.getters['session/isAuthenticated']) {

      app.store.dispatch('session/verify').then(() => {
        next()
      }).catch(() => {
        next({
          name: 'login',
        })
      })

    } else if (to.matched.some(m => m.meta.guest) && app.store.getters['session/isAuthenticated']) {
      next({
        name: 'home',
      })
    } else {
      next()
    }
  })
}
