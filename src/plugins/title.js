export default ({ app, router, Vue }) => {
  router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Quasar App`
    next()
  })
}
