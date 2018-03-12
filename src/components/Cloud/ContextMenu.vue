<template>
    <q-context-menu>
        <q-list link separator style="min-width: 150px; max-height: 300px;">
            <q-item v-close-overlay>
                <q-item-side icon="fa-arrow-alt-circle-down" color="grey-5"/>
                <q-item-main label="Download" @click.native="downloadItem(item)"/>
            </q-item>
            <q-item v-close-overlay>
                <q-item-side icon="fa-pencil-alt" color="grey-5"/>
                <q-item-main label="Rename" @click.native="renameItem(item)"/>
            </q-item>
            <q-item v-close-overlay>
                <q-item-side icon="fa-trash-alt" color="grey-5"/>
                <q-item-main label="Delete" @click.native="deleteItem(item)"/>
            </q-item>
        </q-list>
    </q-context-menu>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {}
    },
    methods: {
      downloadItem (item) {
        window.location = '/api/cloud/download?path=' + item.path
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
