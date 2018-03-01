export default ({app, router, Vue}) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.auth) && !app.store.getters['session/isAuthenticated']) {
      /*
       * If the user is not authenticated and visits
       * a page that requires authentication, redirect to the login page
       */
      next({
        name: 'auth.login',
      })
    } else if (to.matched.some(m => m.meta.guest) && app.store.getters['session/isAuthenticated']) {
      /*
       * If the user is authenticated and visits
       * an guest page, redirect to the dashboard page
       */
      next({
        name: 'home.index',
      })
    } else {
      next()
    }
  })
}
