<template>
    <q-dialog v-model="showDialog">
        <span slot="title">Rename</span>

        <div slot="body">
            <q-input v-model="newName"/>
        </div>

        <template slot="buttons" slot-scope="props">
            <q-btn flat label="Cancel" @click="closeDialog('rename')"/>
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
  import {mapActions} from 'vuex'

  export default {
    name: 'RenameDialog',
    props: ['item'],
    data () {
      return {
        newName: this.item.name
      }
    },
    computed: {
      showDialog () {
        return this.$store.getters['cloud/dialogs'].rename
      },
    },
    methods: {
      ...mapActions('cloud', [
        'refresh',
        'closeDialog',
      ]),
      renameItem () {
        this.$axios.post('/api/cloud/rename', {item: this.item, name: this.newName})
          .then(() => {
            this.refresh()
            this.closeDialog('delete')
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: 'Rename done!',
              icon: 'fa-check-circle',
            })
          })
          .catch((error) => {
            this.refresh()
            this.closeDialog('delete')
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
