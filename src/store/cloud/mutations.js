export const SET_ITEMS = (state, items) => {
  state.items = items
}

export const SET_ALL_FOLDERS = (state, folders) => {
  state.allFolders = folders
}

export const SET_PATH = (state, path) => {
  state.path = path
}

export const CHANGE_VIEW_MODE = (state, view) => {
  state.viewMode = view
}

export const TOGGLE_SELECT_MODE = (state) => {
  state.selectMode = !state.selectMode
}
