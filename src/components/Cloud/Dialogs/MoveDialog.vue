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
            <q-btn flat label="Cancel" @click="showDialog=false"/>
            <q-btn
                    color="primary"
                    label="Move"
                    @click="moveItem"
            />
        </template>
    </q-dialog>
</template>


<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'MoveDialog',
    props: ['item', 'show'],
    data () {
      return {
        targetFolder: null
      }
    },
    computed: {
      ...mapGetters('cloud', [
        'allFolders',
      ]),
      showDialog: {
        get () {
          return this.show
        },
        set (value) {
          this.$emit('update:show', value)
        }
      },
    },
    methods: {
      ...mapActions('cloud', [
        'refresh'
      ]),
      moveItem () {
        this.$axios.post('api/cloud/move', {
          item: this.item,
          target: this.targetFolder
        }).then(() => {
          this.refresh()
          this.showDialog = false
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: 'Item moved',
            icon: 'fa-check-circle'
          })
        }).catch((error) => {
          this.refresh()
          this.showDialog = false
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
