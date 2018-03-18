<template>
    <q-dialog v-model="showDialog">
        <span slot="title">Copy</span>

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
                    label="Copy"
                    @click="copyItems"
                    :disable="targetFolder===null"
            />
        </template>
    </q-dialog>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'CopyDialog',
    data () {
      return {
        showDialog: false,
        items: [],
        targetFolder: null
      }
    },
    created () {
      this.$root.$on('openCopyDialog', (items) => {
        this.items = items
        this.showDialog = true
      })
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
          this.items[0].name + ' copied' :
          this.items.length + ' Items copied'
      },
    },
    methods: {
      copyItems () {
        this.$store.dispatch('cloud/copyItems', {items: this.items, target: this.targetFolder})
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
