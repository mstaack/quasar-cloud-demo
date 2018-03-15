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
    return !item.is_file
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
