export const isAuthenticated = (state) => {
  return state.token !== null && state.user !== null
}
