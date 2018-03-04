import axios from 'axios'

export function register ({commit}, form) {
  return axios.post('api/auth/register', form)
    .then(response => {
      commit('login', {token: response.data.token, user: response.data.user})
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
