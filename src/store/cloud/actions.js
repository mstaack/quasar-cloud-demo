import axios from 'axios'

export function init ({dispatch}) {
  dispatch('refresh')
}

export function refresh ({commit, state}) {

  state.loading = true

  axios.all([
    axios.get('/api/cloud/list', {params: {path: state.path}}),
    axios.get('api/cloud/list-folders')
  ]).then(axios.spread(function (list, folders) {
    state.loading = false
    commit('SET_ITEMS', list.data.data)
    commit('SET_ALL_FOLDERS', folders.data.data)
  })).catch(() => {
    state.loading = false
  })
}

export function setPath ({commit, dispatch}, path) {
  commit('SET_PATH', path)
  dispatch('refresh')
}
