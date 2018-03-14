export const SET_ITEMS = (state, items) => {
  state.items = items
}

export const SET_ALL_FOLDERS = (state, folders) => {
  state.allFolders = folders
}

export const SET_PATH = (state, path) => {
  state.path = path
}

export const OPEN_DIALOG = (state, dialog) => {
  state.dialogs[dialog] = true
}

export const CLOSE_DIALOG = (state, dialog) => {
  state.dialogs[dialog] = false
}
