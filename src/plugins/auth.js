export default ({ app, router, Vue }) => {

  router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Quasar App`
    next()
  })

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!app.store.getters['session/isAuthenticated']) {
        next({
          path: '/auth/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
  })
}
