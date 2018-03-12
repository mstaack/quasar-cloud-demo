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
}

export const path = (state) => {
  return state.path
}

export const loading = (state) => {
  return state.loading
}



