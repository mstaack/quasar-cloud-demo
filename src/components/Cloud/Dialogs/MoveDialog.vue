<template>
    <q-dialog v-model="showDialog">
        <span slot="title">Move</span>

        <span slot="message">Please select a target folder:</span>

        <div slot="body">
            <q-select
                    :filter="folders.length > 4"
                    v-model="targetFolder"
                    separator
                    :options="folders"
            />
        </div>

        <template slot="buttons" slot-scope="props">
            <q-btn flat label="Cancel" @click="showDialog=false"/>
            <q-btn
                    color="primary"
                    label="Move"
                    @click="moveItems"
                    :disable="targetFolder===null"
            />
        </template>
    </q-dialog>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'MoveDialog',
    data () {
      return {
        showDialog: false,
        items: [],
        targetFolder: null
      }
    },
    computed: {
      ...mapGetters('cloud', [
        'allFolders',
      ]),
      folders () {
        return this.allFolders
        // return this.allFolders.filter((folder) => folder.value !== this.item.path)
      },
      successMessage () {
        return this.items.length === 1 ?
          this.items[0].name + ' moved' :
          this.items.length + ' Items moved'
      },
    },
    created () {
      this.$root.$on('openMoveDialog', (items) => {
        this.items = items
        this.showDialog = true
      })
    },
    methods: {
      moveItems () {
        this.$store.dispatch('cloud/moveItems', {items: this.items, target: this.targetFolder})
          .then(() => {
            this.showDialog = false
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: this.successMessage,
              icon: 'fa-check-circle'
            })
          }).catch((error) => {
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
