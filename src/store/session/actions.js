import axios from 'axios'
import LocalStorage from 'quasar'

export function register ({commit}, form) {
  return axios.post('api/auth/register', form)
    .then(response => {
      commit('login', {token: response.data.token, user: response.data.user})
      LocalStorage.set('token', response.data.token)
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
    })
}

export function verify ({commit}) {
  this._vm.$q.localStorage.getItem('token')

  return axios.post('api/auth/user', {
    headers: {
      'Authentication': 'Bearer ' + token
    }
  })
    .then(response => {
      commit('login', {token: token, user: response.data})
    })
}

export function login ({commit}, form) {
  return axios.post('api/auth/login', form)
    .then(response => {
      commit('login', {token: response.data.token, user: response.data.user})
    })
}

export function logout ({commit}) {
  commit('logout')
}
