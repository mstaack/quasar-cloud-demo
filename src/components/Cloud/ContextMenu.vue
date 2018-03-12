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
                <q-item-main label="Copy" @click.native="copyDialog = true"/>
            </q-item>
            <q-item v-close-overlay>
                <q-item-side icon="fa-arrow-right" color="grey-5"/>
                <q-item-main label="Move" @click.native="moveDialog = true"/>
            </q-item>
            <q-item v-close-overlay>
                <q-item-side icon="fa-trash-alt" color="grey-5"/>
                <q-item-main label="Delete" @click.native="deleteItem(item)"/>
            </q-item>
        </q-list>

        <q-dialog v-model="copyDialog">
            <span slot="title">Copy</span>

            <span slot="message">Please select a target folder:</span>

            <div slot="body">
                <q-select
                        filter
                        v-model="selectedFolder"
                        separator
                        :options="folders"
                />
            </div>

            <template slot="buttons" slot-scope="props">
                <q-btn flat label="Cancel" @click.native="copyDialog=false"/>
                <q-btn color="primary" label="Copy" @click.native="copyItem(item)"/>
            </template>
        </q-dialog>

        <q-dialog v-model="moveDialog">
            <span slot="title">Move</span>

            <span slot="message">Please select a target folder:</span>

            <div slot="body">
                <q-select
                        filter
                        v-model="selectedFolder"
                        separator
                        :options="folders"
                />
            </div>

            <template slot="buttons" slot-scope="props">
                <q-btn flat label="Cancel" @click.native="copyDialog=false"/>
                <q-btn color="primary" label="Move" @click.native="moveItem(item)"/>
            </template>
        </q-dialog>
    </q-context-menu>
</template>

<script>

  export default {
    props: ['item'],
    data () {
      return {
        copyDialog: false,
        moveDialog: false,
        selectedFolder: null
      }
    },
    computed: {
      folders () {
        return this.$store.getters['cloud/allFolders']
          .filter((folder) => this.item.path !== folder)
          .map((folder) => {
            return {
              value: folder,
              label: folder
            }
          })
      }
    },
    methods: {
      downloadItem (item) {
        this.$axios.post('api/cloud/download', {item: item})
          .then(response => {
            window.location = response.data.url
          })
      },
      moveItem (item) {
        this.$axios.post('api/cloud/move', {item: item, path: this.selectedFolder})
          .then(() => {
            this.$store.dispatch('cloud/refresh')
            this.moveDialog = false
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: 'Item moved',
              icon: 'fa-check-circle'
            })
          }).catch(() => {
          this.moveDialog = false
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Something went wrong',
            icon: 'fa-exclamation-triangle'
          })
        })
      },
      copyItem (item) {
        this.$axios.post('api/cloud/copy', {item: item, path: this.selectedFolder})
          .then(() => {
            this.$store.dispatch('cloud/refresh')
            this.copyDialog = false
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: 'Item copied',
              icon: 'fa-check-circle'
            })
          }).catch(() => {
          this.copyDialog = false
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Something went wrong',
            icon: 'fa-exclamation-triangle'
          })
        })
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
