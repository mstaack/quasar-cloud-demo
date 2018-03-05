import axios from 'axios'
import {LocalStorage} from 'quasar'

export function register ({commit}, form) {
  return axios.post('api/auth/register', form)
    .then(response => {
      commit('login', {token: response.data.token, user: response.data.user})
      LocalStorage.set('token', response.data.token)
      setAxiosHeaders(response.data.token)
    })
}

export function verify ({commit, dispatch}) {
  let token = LocalStorage.get.item('token')
  if (token) {
    setAxiosHeaders(token)
    return axios.get('api/auth/user').then(response => {
      commit('login', {token: token, user: response.data})
    }).catch(() => {
      dispatch('logout')
    })
  }
}

export function login ({commit}, form) {
  return axios.post('api/auth/login', form)
    .then(response => {
      commit('login', {token: response.data.token, user: response.data.user})
      LocalStorage.set('token', response.data.token)
      setAxiosHeaders(response.data.token)
    })
}

export function logout ({commit}) {
  commit('logout')
  LocalStorage.clear()
}

function setAxiosHeaders (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}
