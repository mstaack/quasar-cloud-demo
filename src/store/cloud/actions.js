import axios from 'axios'

export function init ({dispatch}) {
  dispatch('refresh')
}

export function refresh ({commit, state}) {
  state.loading = true
  return axios.get('/api/cloud/list', {params: {path: state.path}})
    .then(response => {
      state.loading = false
      commit('setItems', response.data.data)
    }).catch(() => {
      state.loading = false
    })
}

export function setPath ({commit, dispatch}, path) {
  commit('changePath', path)
  dispatch('refresh')
}
