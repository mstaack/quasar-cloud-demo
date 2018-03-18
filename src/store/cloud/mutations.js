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
export const RESET_ITEM_SELECTION = (state) => {
  state.selectedItems = []
}

export const TOGGLE_ITEM_SELECTION = (state, item) => {
  const selectedItemIndex = state.selectedItems.findIndex((selectedItem) => selectedItem.path === item.path)
  selectedItemIndex === -1 ?
    state.selectedItems.push(item) :
    state.selectedItems.splice(selectedItemIndex, 1)
}

export const SELECT_ALL = (state) => {
  state.selectedItems = state.items
}
