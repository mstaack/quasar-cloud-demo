import axios from 'axios'

import {LocalStorage} from 'quasar'
import setAxiosHeaders from './helpers'

export function init ({state}) {
  setAxiosHeaders(state)
}

export function register ({commit, state}, form) {
  return axios.post('auth/register', form)
    .then(response => {
      commit('LOGIN', response.data.user)
      setAxiosHeaders(state)
    })
}

export function login ({commit, dispatch, getters}, form) {

  if (getters.isAuthenticated) return dispatch('validate')

  return axios.post('auth/login', form)
    .then(response => {
      const user = response.data.user
      commit('LOGIN', user)
      return user
    })
}

export function validate ({commit, state}) {
  if (!state.user) return Promise.resolve(null)

  return axios.get('auth/user')
    .then(response => {
      const user = response.data.user
      commit('LOGIN', user)
      return user
    }).catch(error => {
      if (error.response.status === 401) {
        commit('LOGOUT')
      }
      return null
    })
}

export function logout ({commit}) {
  commit('LOGOUT')
}
