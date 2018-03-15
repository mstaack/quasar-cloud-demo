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
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'CreateFolderDialog',
    props: ['show'],
    data () {
      return {
        folderName: ''
      }
    },
    computed: {
      ...mapGetters('cloud', [
        'path',
        'files',
        'folders'
      ]),
      showDialog: {
        get () {
          return this.show
        },
        set (value) {
          this.$emit('update:show', value)
        }
      },
      isInvalidFolderName () {
        if (this.folderName.length === 0) {
          return true
        }

        return this.folders.map((folder) => folder.name).includes(this.folderName)
      }
    },
    methods: {
      ...mapActions('cloud', [
        'refresh'
      ]),
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

        this.$axios.post('/api/cloud/create-directory', {target: this.path, name: this.folderName})
          .then(() => {
            this.refresh()
            this.showDialog = false
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: this.folderName + ' created.',
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
