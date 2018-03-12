<template>
    <q-page class="q-ma-lg">

        <!--Item Path & Actions-->
        <div class="row justify-between q-mb-md">
            <div>
                <breadcrumb-navigation :path="path" @changePath="setPath($event)"/>
            </div>
            <div>
                <q-icon
                        class="cursor-pointer"
                        :class="{ 'animate-spin': this.loading }"
                        name="refresh"
                        size="24px"
                        @click.native="refresh"
                />
            </div>
        </div>

        <!--Item List-->
        <q-list link dense>

            <!--Folders-->
            <q-list-header inset v-if="folders.length">Folders</q-list-header>
            <q-item v-for="folder in folders" :key="folder.path" @click.native="setPath(folder.path)">
                <q-item-side icon="folder" inverted color="primary"/>
                <q-item-main>
                    <q-item-tile label>{{folder.name}}</q-item-tile>
                    <q-item-tile sublabel>{{humanStorageSize(folder.size)}} | {{folder.time}}</q-item-tile>
                </q-item-main>
                <q-item-side class="cursor-pointer" right icon="info" @click.native="showInfo(item)"/>

                <!--Context Menu-->
                <context-menu :item="folder" :path="path" @refresh="refresh"/>
            </q-item>

            <q-item-separator inset v-if="folders.length"/>

            <!--Files-->
            <q-list-header inset v-if="files.length">Files</q-list-header>
            <q-item v-for="file in files" :key="file.path">

                <!--Icon & Name & Icon-->
                <q-item-side icon="insert drive file" inverted color="grey-6"/>
                <q-item-main>
                    <q-item-tile label>{{file.name}}</q-item-tile>
                    <q-item-tile sublabel>{{humanStorageSize(file.size)}} | {{file.time}}</q-item-tile>
                </q-item-main>
                <q-item-side right icon="info"/>

                <!--Context Menu-->
                <context-menu :item="file" :path="path" @refresh="refresh"/>
            </q-item>
        </q-list>


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
  import BreadcrumbNavigation from '../components/Cloud/BreadcrumbNavigation'
  import ContextMenu from '../components/Cloud/ContextMenu'
  import {mapActions, mapGetters} from 'vuex'
  import {format} from 'quasar'

  export default {
    name: 'Cloud',
    components: {
      BreadcrumbNavigation,
      InnerLoading,
      ContextMenu
    },
    data () {
      return {
        upload: false,
      }
    },
    computed: {
      ...mapGetters('cloud', [
        'files',
        'path',
        'folders',
        'loading'
      ])
    },
    methods: {
      ...mapActions('cloud', [
        'refresh',
        'setPath',
      ]),
      showInfo (item) {
      },
      humanStorageSize (size) {
        return format.humanStorageSize(size)
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
    }
  }
</script>
