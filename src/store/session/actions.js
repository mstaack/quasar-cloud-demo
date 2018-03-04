import axios from 'axios'
import {LocalStorage} from 'quasar'

export function register ({commit}, form) {
  return axios.post('api/auth/register', form)
    .then(response => {
      commit('login', {token: response.data.token, user: response.data.user})
      LocalStorage.set('token', response.data.token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
    })
}

export function verify ({commit}) {
  let token = LocalStorage.get.item('token')
  if (token) {
    return axios.get('api/auth/user', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      commit('login', {token: token, user: response.data})
    }).catch((error) => {
      LocalStorage.clear()
    })
  }
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
