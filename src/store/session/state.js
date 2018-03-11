import {LocalStorage} from 'quasar'

export default {
  user: LocalStorage.get.item('user')
}
