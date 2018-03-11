export default ({app, router, Vue}) => {

  // Check for protected and guest routes and perform checks
  router.beforeEach((to, from, next) => {

    const protectedRoute = to.matched.some(route => route.meta.auth)

    // If auth isn't required for the route, just continue.
    if (!protectedRoute) return next()

    // If auth is required and the user is logged in...
    if (app.store.getters['session/isAuthenticated']) {

      // Validate the token...
      return app.store.dispatch('session/validate').then(user => {
        user ? next() : next({name: 'login'})
      })
    }

    next({name: 'login'})
  })
}
