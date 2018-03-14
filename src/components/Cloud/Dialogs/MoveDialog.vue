<template>
    <q-dialog v-model="showDialog">
        <span slot="title">Move</span>

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
            <q-btn flat label="Cancel" @click="closeDialog('move')"/>
            <q-btn color="primary" label="Move" autofocus @click="moveItem"/>
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
        return this.$store.getters['cloud/dialogs'].move
      },
    },
    methods: {
      ...mapActions('cloud', [
        'refresh',
        'closeDialog',
      ]),
      moveItem () {
        this.$axios.post('api/cloud/move', {
          item: this.item,
          target: this.targetFolder
        })
          .then(() => {
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: 'Item moved',
              icon: 'fa-check-circle'
            })
          })
          .catch((error) => {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: error.response.data.message || 'Something went wrong',
              icon: 'fa-exclamation-triangle'
            })
          })

        this.closeDialog('move')
        this.$store.dispatch('cloud/refresh')
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
