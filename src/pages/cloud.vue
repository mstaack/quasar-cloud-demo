<template>
    <q-page class="q-ma-lg">

        <!--Item Path & Actions-->
        <div class="row justify-between q-mb-md">
                <q-breadcrumbs>
                    <q-breadcrumbs-el v-for="breadcrumb in breadcrumbs"
                                      :key="breadcrumb.path"
                                      :label="breadcrumb.label"
                                      :icon="breadcrumb.icon"
                                      @click.native="path=breadcrumb.path"
                                      v-bind:class="{ 'cursor-pointer': breadcrumb.path !== path }"
                    />
                </q-breadcrumbs>
        </div>

        <!--Item List-->
        <q-list link dense>

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

            <q-item-separator inset v-if="folders.length"/>

            <!--Files-->
            <q-list-header inset v-if="files.length">Files</q-list-header>
            <q-item v-for="file in files" :key="file.path">
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
                    <q-item-side icon="fa-pencil-alt" color="grey-6"/>
                    <q-item-main label="Rename"/>
                </q-item>
                <q-item v-close-overlay>
                    <q-item-side icon="fa-trash-alt" color="grey-6"/>
                    <q-item-main label="Delete"/>
                </q-item>
            </q-list>
        </q-context-menu>

        <!--Uploader-->
        <q-modal v-model="upload" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
            <q-modal-layout>
                <q-toolbar slot="header">
                    <q-toolbar-title>
                        Uploader
                    </q-toolbar-title>
                </q-toolbar>

                <q-toolbar slot="footer">
                    <q-toolbar-title>
                        Footer
                    </q-toolbar-title>
                </q-toolbar>

                <div class="layout-padding">
                    <q-uploader
                            url="api/cloud/upload"
                            name="file"
                            :headers="{Authorization:$store.state.session.token}"
                    ></q-uploader>
                </div>

            </q-modal-layout>
        </q-modal>

        <!--Fab Action Button-->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab icon="add" direction="up" color="primary">
                <q-fab-action color="blue" class="white" icon="folder" @click.native="createFolder"/>
                <q-fab-action color="blue" class="white" icon="cloud upload" @click.native="upload=true"/>
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
        upload: false,
        loading: false,
        items: []
      }
    },
    beforeCreate () {
      this.format = format
    },
    watch: {
      path: {
        handler: 'refresh',
        immediate: true
      }
    },
    computed: {
      folders () {
        return this.items.filter((item) => {
          return !item.is_file
        })
      },
      files () {
        return this.items.filter((item) => {
          return item.is_file
        })
      },
      breadcrumbs () {

        const breadcrumbs = []

        let parts = this.path.split('/').filter((x, i, a) => a.indexOf(x) === i)

        for (let i = 0; i < parts.length; i++) {
          const label = parts[i] || 'Home'
          const path = parts.slice(0, i + 1).join('/') || '/'
          const icon = i === 0 ? 'home' : null
          breadcrumbs.push({
            label,
            path,
            icon
          })
        }

        return breadcrumbs
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
          this.$axios.post('/api/cloud/create-directory', {path: this.path, name: data})
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
    }
  }
</script>
