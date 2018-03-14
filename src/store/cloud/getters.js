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

  const folders = [{
    value: '/',
    label: '/'
  }]

  folder.push(state.allFolders
    .filter((folder) => state.path !== folder)
    .map((folder) => {
      return {
        value: folder,
        label: folder
      }
    }))

  return folders
}

export const path = (state) => {
  return state.path
}

export const loading = (state) => {
  return state.loading
}

export const dialogs = (state) => {
  return state.dialogs
}

