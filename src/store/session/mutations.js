/*
export const someMutation = (state) => {
}
*/

export const login = (state, { token }) => {
  state.token = token
}

export const logout = (state) => {
  state.user = null
}
