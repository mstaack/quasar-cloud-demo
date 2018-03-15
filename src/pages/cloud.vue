<template>
    <q-page class="q-ma-lg">

        <!--Item Path & Actions-->
        <div class="row justify-between q-mb-md">
            <div>
                <breadcrumb-navigation @changePath="setPath($event)"/>
            </div>
            <div>
                <q-btn
                        size="sm"
                        outline
                        icon="fa-bars"
                        :color="viewMode==='list' ? 'grey-6' :'grey-3'"
                        @click="viewMode='list'"
                />
                <q-btn
                        size="sm"
                        outline
                        icon="fa-th"
                        :color="viewMode==='grid' ? 'grey-6' :'grey-3'"
                        @click="viewMode='grid'"
                />
                <q-icon
                        class="cursor-pointer q-ml-sm"
                        name="refresh"
                        size="24px"
                        :class="{ 'animate-spin': loading }"
                        @click.native="refresh"
                        color="grey-7"
                />
            </div>
        </div>

        <!--Item List-->
        <items-list v-show="viewMode==='list'"/>
        <items-grid v-show="viewMode==='grid'"/>

        <!--Fab Action Button-->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab icon="add" direction="up" color="primary">
                <q-fab-action
                        color="blue"
                        class="white"
                        icon="folder"
                        @click.native="$root.$emit('openCreateFolderDialog')"
                />
                <q-fab-action
                        color="blue"
                        class="white"
                        icon="cloud upload"
                        @click.native="$root.$emit('openUploadDialog')"
                />
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
  import ItemsGrid from '../components/Cloud/ItemsGrid'
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
      ItemsGrid,
      InnerLoading,
      CreateFolderDialog,
      UploadDialog
    },
    data () {
      return {
        viewMode: 'list'
      }
    },
    mounted () {
      this.refresh()
    },
    computed: {
      ...mapGetters('cloud', [
        'loading'
      ])
    },
    methods: {
      ...mapActions('cloud', [
        'refresh',
        'setPath'
      ])
    }
  }
</script>
