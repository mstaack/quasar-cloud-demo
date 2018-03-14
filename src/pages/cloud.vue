<template>
    <q-page class="q-ma-lg">

        <!--Item Path & Actions-->
        <div class="row justify-between q-mb-md">
            <div>
                <breadcrumb-navigation @changePath="setPath($event)"/>
            </div>
            <div>
                <q-icon
                        class="cursor-pointer"
                        color="grey-7"
                        :class="{ 'animate-spin': loading }"
                        name="refresh"
                        size="24px"
                        @click.native="refresh"
                />
            </div>
        </div>

        <!--Item List-->
        <q-list link dense style="min-height: 500px">

            <!--Empty Notice-->
            <q-list-header
                    align="center"
                    v-if="noContent"
                    class="q-mt-xl"
            >
                Nothing in here...
            </q-list-header>

            <!--Folders-->
            <q-list-header inset v-if="folders.length">Folders</q-list-header>
            <q-item
                    v-for="folder in folders"
                    :key="folder.path"
                    @click.native="setPath(folder.path)"
            >
                <q-item-side icon="folder" inverted color="primary"/>
                <q-item-main>
                    <q-item-tile label>{{folder.name}}</q-item-tile>
                    <q-item-tile sublabel>{{humanStorageSize(folder.size)}} | {{folder.time}}</q-item-tile>
                </q-item-main>
                <q-item-side class="cursor-pointer" right icon="info" @click.native="showInfo(item)"/>

                <!--Context Menu-->
                <context-menu :item="folder" @refresh="refresh"/>
            </q-item>

            <q-item-separator inset v-if="folders.length"/>

            <!--Files-->
            <q-list-header inset v-if="files.length">Files</q-list-header>
            <q-item v-for="file in files" :key="file.path">

                <!--Icon & Name & Icon-->
                <q-item-side icon="insert drive file" inverted color="grey-6"/>
                <q-item-main>
                    <q-item-tile label>{{file.name}}</q-item-tile>
                    <q-item-tile sublabel>
                        {{humanStorageSize(file.size)}} | {{file.time}}
                    </q-item-tile>
                </q-item-main>
                <q-item-side right icon="info"/>

                <!--Context Menu-->
                <context-menu :item="file" @refresh="refresh"/>
            </q-item>
        </q-list>

        <!--Fab Action Button-->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab icon="add" direction="up" color="primary">
                <q-fab-action color="blue" class="white" icon="folder" @click.native="openDialog('create')"/>
                <q-fab-action color="blue" class="white" icon="cloud upload" @click.native="openDialog('upload')"/>
            </q-fab>
        </q-page-sticky>

        <!--Create Folder Dialog-->
        <create-folder-dialog/>

        <!--Upload Dialog-->
        <upload-dialog/>

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
  import CreateFolderDialog from '../components/Cloud/Dialogs/CreateFolderDialog'
  import UploadDialog from '../components/Cloud/Dialogs/UploadDialog'

  import {mapActions, mapGetters} from 'vuex'
  import {format} from 'quasar'

  export default {
    name: 'Cloud',
    components: {
      BreadcrumbNavigation,
      InnerLoading,
      ContextMenu,
      CreateFolderDialog,
      UploadDialog
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters('cloud', [
        'files',
        'folders',
        'loading'
      ]),
      noContent () {
        return (this.folders.length + this.files.length) === 0
      }
    },
    created () {
      this.$store.dispatch('cloud/refresh')
    },
    methods: {
      ...mapActions('cloud', [
        'refresh',
        'setPath',
        'openDialog',
        'closeDialog'
      ]),
      humanStorageSize (size) {
        return format.humanStorageSize(size)
      }
    }
  }
</script>
