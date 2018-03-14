<template>
    <q-dialog v-model="showDialog">
        <span slot="title">Create Folder</span>

        <div slot="body">
            <q-input v-model="folderName"/>
        </div>

        <template slot="buttons" slot-scope="props">
            <q-btn flat label="Cancel" @click="closeDialog('create')"/>
            <q-btn
                    color="primary"
                    label="Create"
                    @click="createFolder"
                    :disable="folderName.length === 0"
            />
        </template>
    </q-dialog>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'CreateFolderDialog',
    data () {
      return {
        folderName: ''
      }
    },
    computed: {
      ...mapGetters('cloud', [
        'path',
      ]),
      showDialog () {
        return this.$store.getters['cloud/dialogs'].create
      },
    },
    methods: {
      ...mapActions('cloud', [
        'refresh',
        'closeDialog',
      ]),
      createFolder () {
        this.$axios.post('/api/cloud/create-directory', {target: this.path, name: this.folderName})
          .then(() => {
            this.refresh()
            this.closeDialog('create')
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: this.folderName + ' created.',
              icon: 'fa-check-circle',
            })
          })
          .catch((error) => {
            this.refresh()
            this.closeDialog('create')
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
