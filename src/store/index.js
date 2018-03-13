import Vue from 'vue'
import Vuex from 'vuex'

import session from './session'
import cloud from './cloud'

Vue.use(Vuex)

const modules = {
  session,
  cloud
}

const store = new Vuex.Store({modules})

// Automatically run the `init` action if available for every module.
for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions.init) {
    store.dispatch(`${moduleName}/init`)
  }
}

export default store
