import axios from 'axios'

export function refresh ({commit, state}) {
  state.loading = true
  axios.all([
    axios.get('/api/cloud/list', {params: {path: state.path}}),
    axios.get('api/cloud/folders')
  ]).then(axios.spread((listResponse, allFoldersResponse) => {
    state.loading = false
    commit('SET_ITEMS', listResponse.data.data)
    commit('SET_ALL_FOLDERS', allFoldersResponse.data.data)
  })).catch(() => {
    state.loading = false
  })
}

export function setPath ({commit, dispatch}, path) {
  commit('SET_PATH', path)
  dispatch('refresh')
}

export function openDialog ({commit}, dialog) {
  commit('OPEN_DIALOG', dialog)
}

export function closeDialog ({commit}, dialog) {
  commit('CLOSE_DIALOG', dialog)
}
