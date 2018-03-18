<template>
    <q-dialog v-model="showDialog">
        <span slot="title">Create Folder</span>

        <div slot="body">
            <q-input v-model="folderName" @keyup.enter="createFolder"/>
        </div>

        <template slot="buttons" slot-scope="props">
            <q-btn flat label="Cancel" @click="showDialog=false"/>
            <q-btn
                    color="primary"
                    label="Create"
                    @click="createFolder"
                    :disable="isInvalidFolderName"
            />
        </template>
    </q-dialog>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'CreateFolderDialog',
    data () {
      return {
        showDialog: false,
        folderName: ''
      }
    },
    computed: {
      ...mapGetters('cloud', [
        'path',
        'files',
        'folders'
      ]),
      isInvalidFolderName () {
        if (this.folderName.length === 0) {
          return true
        }

        return this.folders.map((folder) => folder.name).includes(this.folderName)
      }
    },
    created () {
      this.$root.$on('openCreateFolderDialog', () => {
        this.showDialog = true
      })
    },
    methods: {
      createFolder () {

        if (this.isInvalidFolderName) {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'This is not a valid name',
            icon: 'report_problem'
          })
          return
        }

        this.$store.dispatch('cloud/createFolder', this.folderName)
          .then(() => {
            this.showDialog = false
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: this.folderName + ' created',
              icon: 'fa-check-circle',
            })
            this.folderName = ''
          })
          .catch((error) => {
            this.refresh()
            this.showDialog = false
            this.folderName = ''
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
