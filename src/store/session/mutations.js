export const login = (state, {token, email}) => {
  localStorage.setItem('token', token)
  state.token = token
  state.user = {
    email: email
  }
}

export const logout = (state) => {
  localStorage.clear()
  state.user = null
  state.token = null
}
