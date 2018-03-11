import axios from 'axios/index'

export default function setAxiosHeaders (state) {
  axios.defaults.headers.common.Authorization = state.user
    ? 'Bearer ' + state.user.token
    : ''
}
