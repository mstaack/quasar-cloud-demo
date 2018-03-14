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
        <items-list/>

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
  import ItemsList from '../components/Cloud/ItemsList'
  import InnerLoading from '../components/InnerLoading'
  import BreadcrumbNavigation from '../components/Cloud/BreadcrumbNavigation'
  import CreateFolderDialog from '../components/Cloud/Dialogs/CreateFolderDialog'
  import UploadDialog from '../components/Cloud/Dialogs/UploadDialog'

  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'Cloud',
    components: {
      BreadcrumbNavigation,
      ItemsList,
      InnerLoading,
      CreateFolderDialog,
      UploadDialog
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters('cloud', [
        'loading'
      ])
    },
    methods: {
      ...mapActions('cloud', [
        'refresh',
        'setPath',
      ])
    }
  }
</script>
