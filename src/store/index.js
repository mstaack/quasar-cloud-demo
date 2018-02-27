import Vue from 'vue'
import Vuex from 'vuex'

import session from './session'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    session
  }
})

export default store
