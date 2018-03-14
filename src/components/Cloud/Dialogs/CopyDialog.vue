<template>
    <q-dialog v-model="showDialog">
        <span slot="title">Copy</span>

        <span slot="message">Please select a target folder:</span>

        <div slot="body">
            <q-select
                    filter
                    v-model="targetFolder"
                    separator
                    :options="allFolders"
            />
        </div>

        <template slot="buttons" slot-scope="props">
            <q-btn flat label="Cancel" @click="closeDialog('copy')"/>
            <q-btn color="primary" label="Copy" autofocus @click="copyItem"/>
        </template>
    </q-dialog>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'MoveDialog',
    props: ['item'],
    data () {
      return {
        targetFolder: null
      }
    },
    computed: {
      ...mapGetters('cloud', [
        'allFolders',
      ]),
      showDialog () {
        return this.$store.getters['cloud/dialogs'].copy
      },
    },
    methods: {
      ...mapActions('cloud', [
        'refresh',
        'closeDialog',
      ]),
      copyItem () {
        this.$axios.post('api/cloud/copy', {item: this.item, path: this.targetFolder})
          .then(() => {
            this.refresh()
            this.closeDialog('copy')
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: 'Item copied',
              icon: 'fa-check-circle'
            })
          })
          .catch((error) => {
            this.refresh()
            this.closeDialog('copy')
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: error.response.data.message || 'Something went wrong',
              icon: 'fa-exclamation-triangle'
            })
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
