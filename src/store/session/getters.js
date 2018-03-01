/*
export const someGetter = (state) => {
}
*/

export function isAuthenticated ({ user }) {
  return !!user
}

// returns fucntions which expects a string role
// expects user in state to have an array of roles

export function isAuthorized ({ user }, { isAuthenticated }) {
  return (role) => {
    return isAuthenticated() && user.roles.includes(role)
  }
}
