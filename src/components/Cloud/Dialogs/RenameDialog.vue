<template>
    <q-dialog v-model="showDialog">
        <span slot="title">Rename</span>

        <div slot="body">
            <q-input v-model.trim="newName"/>
        </div>

        <template slot="buttons" slot-scope="props">
            <q-btn flat label="Cancel" @click="showDialog=false"/>
            <q-btn
                    color="primary"
                    label="Rename"
                    @click="renameItem"
                    :disable="newName === item.name"
            />
        </template>
    </q-dialog>
</template>

<script>
  export default {
    name: 'RenameDialog',
    data () {
      return {
        newName: '',
        showDialog: false,
        item: {}
      }
    },
    created () {
      this.$root.$on('openRenameDialog', (item) => {
        this.item = item
        this.newName = item.name
        this.showDialog = true
      })
    },
    methods: {
      renameItem () {
        this.$store.dispatch('cloud/renameItem', {item: this.item, name: this.newName})
          .then(() => {
            this.showDialog = false
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: 'Rename done!',
              icon: 'fa-check-circle',
            })
          })
          .catch((error) => {
            this.showDialog = false
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: error.response.data.message || 'Something went wrong',
              icon: 'report_problem'
            })
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
