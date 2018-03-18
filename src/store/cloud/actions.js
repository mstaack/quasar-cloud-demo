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
    commit('RESET_ITEM_SELECTION')
  })).catch(() => {
    state.loading = false
  })
}

export function deleteItems ({dispatch, commit}, items) {
  return axios.post('/cloud/delete', {items: items})
    .then(() => {
      dispatch('refresh')
      dispatch('toggleSelectMode')
    })
}

export function copyItems ({dispatch}, {items, target}) {
  return axios.post('/cloud/copy', {items: items, target: target})
    .then(() => {
      dispatch('refresh')
    })
}

export function moveItems ({dispatch}, {items, target}) {
  return axios.post('/cloud/move', {items: items, target: target})
    .then(() => {
      dispatch('refresh')
    })
}

export function renameItem ({dispatch}, {item, name}) {
  return axios.post('/cloud/rename', {item: item, name: name})
    .then(() => {
      dispatch('refresh')
    })
}

export function createFolder ({dispatch, state}, name) {
  return axios.post('/cloud/create-directory', {name: name, target: state.path})
    .then(() => {
      dispatch('refresh')
    })
}

export function toggleSelectMode ({commit}) {
  commit('TOGGLE_SELECT_MODE')
  commit('RESET_ITEM_SELECTION')
}

export function selectAll ({commit}) {
  commit('SELECT_ALL')
}

export function selectNone ({commit}) {
  commit('RESET_ITEM_SELECTION')
}

export function changeViewMode ({commit}, view) {
  commit('CHANGE_VIEW_MODE', view)
}

export function toggleItemSelection ({commit}, item) {
  commit('TOGGLE_ITEM_SELECTION', item)
}




