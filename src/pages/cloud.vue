<template>
    <q-page class="q-ma-lg">
        <q-breadcrumbs>
            <q-breadcrumbs-el class="cursor-pointer" label="Home" icon="home" @click.native="path = '/'"/>
            <!--TODO EXPLODE PATH TO BREADCRUMB-->
        </q-breadcrumbs>
        <p class="q-mt-sm">
            Path: {{path}}
        </p>
        <q-list link dense>

            <!--Empty Message-->
            <q-list-header inset v-if="!folders.length && !folders.length">Nothing here...</q-list-header>

            <!--Folders-->
            <q-list-header inset v-if="folders.length">Folders</q-list-header>
            <q-item v-for="folder in folders" :key="folder.path" @click.native="path = folder.path">
                <q-item-side icon="folder" inverted color="primary"/>
                <q-item-main>
                    <q-item-tile label>{{folder.name}}</q-item-tile>
                    <q-item-tile sublabel>{{format.humanStorageSize(folder.size)}} | {{folder.time}}</q-item-tile>
                </q-item-main>
                <q-item-side right icon="info"/>
            </q-item>

            <q-item-separator inset/>

            <!--Files-->
            <q-list-header inset v-if="files.length">Files</q-list-header>
            <q-item v-for="file in files" :key="file.path" @click.native="path = file.path">
                <q-item-side icon="insert drive file" inverted color="grey-6"/>
                <q-item-main>
                    <q-item-tile label>{{file.name}}</q-item-tile>
                    <q-item-tile sublabel>{{format.humanStorageSize(file.size)}} | {{file.time}}</q-item-tile>
                </q-item-main>
                <q-item-side right icon="info"/>
            </q-item>
        </q-list>

        <!--Context Menu-->
        <q-context-menu>
            <q-list link separator style="min-width: 150px; max-height: 300px;">
                <q-item v-close-overlay>
                    <q-item-side icon="fa-arrow-alt-circle-down" color="grey-6"/>
                    <q-item-main label="Download"/>
                </q-item>
                <q-item v-close-overlay>
                    <q-item-side icon="fa-trash-alt" color="grey-6"/>
                    <q-item-main label="Delete"/>
                </q-item>
            </q-list>
        </q-context-menu>

        <!--Fab Action Button-->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab icon="add" direction="up" color="primary">
                <q-fab-action color="blue" class="white" icon="folder" @click.native="createFolder"/>
                <q-fab-action color="blue" class="white" icon="cloud upload"/>
            </q-fab>
        </q-page-sticky>

        <!--Loading Animation-->
        <inner-loading :loading="loading"/>
    </q-page>
</template>

<style>
</style>

<script>
  import InnerLoading from '../components/InnerLoading'
  import {format} from 'quasar'

  export default {
    name: 'Cloud',
    components: {
      InnerLoading
    },
    data () {
      return {
        path: '/',
        loading: false,
        items: []
      }
    },
    beforeCreate () {
      this.format = format
    },
    watch: {
      path () {
        this.refresh()
      }
    },
    computed: {
      folders: function () {
        return this.items.filter((item) => {
          return !item.is_file
        })
      },
      files: function () {
        return this.items.filter((item) => {
          return item.is_file
        })
      }
    },
    methods: {
      refresh () {
        this.loading = true
        this.$axios.get('/api/cloud/list', {params: {path: this.path}})
          .then((response) => {
            this.items = response.data.data
            this.loading = false
          })
          .catch(() => {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
            this.loading = false
          })
      },
      createFolder () {
        this.$q.dialog({
          title: 'Create Folder',
          ok: 'Create',
          cancel: 'Cancel',
          prompt: {
            model: '',
            type: 'text'
          },
          color: 'secondary'
        }).then(data => {
          this.$axios.post('/api/cloud/create-directory', {path: data})
            .then(() => {
              this.$q.notify({
                color: 'positive',
                position: 'top',
                message: `Folder "${data}" created.`,
                icon: 'fa-check-circle',
              })
              this.refresh()
            })
            .catch(() => {
              this.$q.notify({
                color: 'negative',
                position: 'top',
                message: 'Whoops, something went wrong!',
                icon: 'report_problem'
              })
            })
        })
      },
      deleteFolder () {
        this.$q.dialog({
          title: 'Delete Folder',
          ok: 'Delete',
          cancel: 'Cancel',
          color: 'error'
        }).then(data => {
          this.$axios.post('/api/cloud/create-directory', {path: data})
            .then(() => {
              this.$q.notify({
                color: 'positive',
                position: 'top',
                message: `Folder "${data}" created.`,
                icon: 'fa-check-circle',
              })
              this.refresh()
            })
            .catch(() => {
              this.$q.notify({
                color: 'negative',
                position: 'top',
                message: 'Whoops, something went wrong!',
                icon: 'report_problem'
              })
            })
        })

      }
    },
    mounted () {
      this.refresh()
    }
  }
</script>
