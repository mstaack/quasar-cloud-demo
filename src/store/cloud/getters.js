export const items = (state) => {
  return state.items
}

export const files = (state) => {
  return state.items.filter((item) => {
    return item.is_file
  })
}

export const folders = (state) => {
  return state.items.filter((item) => {
    return item.is_dir
  })
}

export const allFolders = (state) => {
  return state.allFolders
    .filter((folder) => state.path !== folder)
    .map((folder) => {
      return {
        value: folder,
        label: folder
      }
    })
}

export const path = (state) => {
  return state.path
}

export const loading = (state) => {
  return state.loading
}

export const selectMode = (state) => {
  return state.selectMode
}

export const viewMode = (state) => {
  return state.viewMode
}

export const selectedItems = (state) => {
  return state.selectedItems
}

