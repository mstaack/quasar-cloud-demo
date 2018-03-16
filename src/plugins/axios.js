import axios from 'axios'

export default ({app, router, Vue}) => {
  axios.defaults.baseURL = process.env.API_HOST
  Vue.prototype.$axios = axios
}
