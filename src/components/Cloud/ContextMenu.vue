<template>
    <q-context-menu>
        <q-list link separator style="min-width: 130px; max-height: 300px;">
            <q-item v-close-overlay>
                <q-item-side icon="fa-arrow-alt-circle-down" color="grey-5"/>
                <q-item-main label="Download" @click.native="downloadItem(item)"/>
            </q-item>
            <q-item v-close-overlay>
                <q-item-side icon="fa-pencil-alt" color="grey-5"/>
                <q-item-main label="Rename" @click.native="renameItem(item)"/>
            </q-item>
            <q-item v-close-overlay>
                <q-item-side icon="fa-copy" color="grey-5"/>
                <q-item-main label="Copy" @click.native="moveItem(item)"/>
            </q-item>
            <q-item v-close-overlay>
                <q-item-side icon="fa-arrow-right" color="grey-5"/>
                <q-item-main label="Move" @click.native="copyItem(item)"/>
            </q-item>
            <q-item v-close-overlay>
                <q-item-side icon="fa-trash-alt" color="grey-5"/>
                <q-item-main label="Delete" @click.native="deleteItem(item)"/>
            </q-item>
        </q-list>

        <q-dialog v-model="dialog">
            <span slot="title">Move</span>

            <span slot="message">Please select a folder:</span>

            <div slot="body">
                <q-select
                        filter
                        v-model="selectedFolder"
                        separator
                        :options="folders"
                />
            </div>

            <template slot="buttons" slot-scope="props">
                <q-btn flat label="Cancel"/>
                <q-btn color="primary" label="Move"/>
            </template>
        </q-dialog>
    </q-context-menu>
</template>

<script>

  export default {
    props: ['item'],
    data () {
      return {
        dialog: false,
        selectedFolder: null
      }
    },
    computed: {
      folders () {
        return this.$store.getters['cloud/allFolders'].map((folder) => {
          return {
            value: folder,
            label: folder
          }
        })
      }
    },
    methods: {
      downloadItem (item) {
        this.$axios.post('api/cloud/download', {item: item}).then(response => {
          window.location = response.data.url
        })
      },
      moveItem (item) {
        this.dialog = true
      },
      copyItem (item) {
        this.dialog = true
      },
      renameItem (item) {
        this.$q.dialog({
          title: 'Rename Item',
          prompt: {
            model: item.name,
            type: 'text' // optional
          },
          ok: 'Rename',
          cancel: 'Cancel',
        }).then((data) => {
          this.$axios.post('/api/cloud/rename', {item: item, name: data})
            .then(() => {
              this.$q.notify({
                color: 'positive',
                position: 'top',
                message: 'Rename done!',
                icon: 'fa-check-circle',
              })
              this.$emit('refresh')
            })
            .catch((error) => {
              console.log(error)
              this.$q.notify({
                color: 'negative',
                position: 'top',
                message: 'Whoops, something went wrong!',
                icon: 'report_problem'
              })
            })
        }).catch(() => {
        })

      },
      deleteItem (item) {
        this.$q.dialog({
          title: 'Delete Item',
          ok: 'Delete',
          cancel: 'Cancel',
          color: 'error'
        }).then(() => {
          this.$axios.post('/api/cloud/delete', {item: item})
            .then(() => {
              this.$q.notify({
                color: 'positive',
                position: 'top',
                message: item.name + ' deleted!',
                icon: 'fa-check-circle',
              })
              this.$emit('refresh')
            })
            .catch((error) => {
              console.log(error)
              this.$q.notify({
                color: 'negative',
                position: 'top',
                message: 'Whoops, something went wrong!',
                icon: 'report_problem'
              })
            })
        }).catch(() => {
        })
      }
    }
  }
</script>

<style>
</style>
