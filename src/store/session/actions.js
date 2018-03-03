export function login ({commit}, {email, password}) {
  this._vm.$axios.post('/api/login', {email, password})
    .then((response) => {
      commit('login', {token: response.data.token})
      console.log(this._vm.$router)
      this._vm.router.push('/')
    })
    .catch(() => {
      this._vm.$q.notify({
        color: 'negative',
        position: 'top',
        message: 'Your credentials are wrong!',
        icon: 'report_problem'
      })
    })
}

export function logout ({commit}) {
  this._vm.$axios.get('/api/session/logout')
    .then(response => {
      commit('logout')
      // this._vm.$router.push('/')
    })
    .catch(() => {
      // this._vm.$router.push('/')
    })
}
