export function login ({commit}, {email, password}) {
  return this._vm.$axios.post('/api/login', {email, password})
    .then(response => {
      commit('login', {token: response.data.token})
    })
}

export function logout ({commit}) {
  this._vm.$axios.get('/api/session/logout')
    .then(response => {
      commit('logout')
    })
    .catch(() => {
    })
}
