/*
export const someAction = (state) => {
}
*/
export function login ({ commit }, { username, password }) {
  this._vm.$axios.post('/api/session/login', { username, password })
    .then(response => {
      commit('login', { user: response.data.user })
    })
    .catch(() => {
      // this._vm.$router.push('/')
    })
}

export function logout ({ commit }) {
  this._vm.$axios.get('/api/session/logout')
    .then(response => {
      commit('logout')
      // this._vm.$router.push('/')
    })
    .catch(() => {
      // this._vm.$router.push('/')
    })
}
