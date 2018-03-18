import axios from 'axios'

export function setPath ({commit, dispatch}, path) {
  commit('SET_PATH', path)
  dispatch('refresh')
}

export function refresh ({commit, state}) {
  state.loading = true
  axios.all([
    axios.get('cloud/list', {params: {path: state.path}}),
    axios.get('cloud/folders')
  ]).then(axios.spread((listResponse, allFoldersResponse) => {
    state.loading = false
    commit('SET_ITEMS', listResponse.data.data)
    commit('SET_ALL_FOLDERS', allFoldersResponse.data.data)
  })).catch(() => {
    state.loading = false
  })
}

export function deleteItems ({dispatch, commit, state}, items) {
  return axios.post('/cloud/delete', {items: items})
    .then(() => {
      dispatch('refresh')
      commit('RESET_ITEM_SELECTION')
    })
}

export function toggleSelectMode ({commit}) {
  commit('TOGGLE_SELECT_MODE')
  commit('RESET_ITEM_SELECTION')
}

export function changeViewMode ({commit}, view) {
  commit('CHANGE_VIEW_MODE', view)
}

export function toggleItemSelection ({commit}, item) {
  commit('TOGGLE_ITEM_SELECTION', item)
}




