import axios from 'axios'

export default ({app, router, Vue}) => {

  if (!process.env.DEV) {
    axios.defaults.baseURL = 'https://quasar.maxmatteostaack.com'
  }

  Vue.prototype.$axios = axios
}
