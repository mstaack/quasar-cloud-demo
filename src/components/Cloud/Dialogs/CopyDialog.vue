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
                    @click="copyItem"
                    @keyup.enter="copyItem"
            />
        </template>
    </q-dialog>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'CopyDialog',
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
      folders () {
        return this.allFolders.filter((folder) => folder.value !== this.item.path)
      }
    },
    methods: {
      ...mapActions('cloud', [
        'refresh',
      ]),
      copyItem () {
        this.$axios.post('api/cloud/copy', {item: this.item, path: this.targetFolder})
          .then(() => {
            this.refresh()
            this.showDialog = false
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: 'Item copied',
              icon: 'fa-check-circle'
            })
          })
          .catch((error) => {
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
