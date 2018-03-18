<template>
    <q-page class="q-ma-lg">
        <!--Item Path & Actions-->
        <div class="row justify-between q-mb-md animate-fade">
            <div>
                <breadcrumb-navigation @changePath="setPath($event)"/>
            </div>
            <div>
                <span v-if="showActionButtons">
                <q-btn
                        size="sm"
                        outline
                        icon="fa-trash"
                        label="Delete"
                        v-if="selectedItems.length"
                        color="red"
                        @click="$root.$emit('openDeleteDialog', selectedItems)"
                />
                 <q-btn
                         size="sm"
                         outline
                         icon="fa-copy"
                         label="Copy"
                         v-if="selectedItems.length && allFolders.length"
                         @click="$root.$emit('openCopyDialog', selectedItems)"
                         color="grey-8"
                 />
                <q-btn
                        size="sm"
                        outline
                        icon="fa-arrow-right"
                        label="Move"
                        v-if="selectedItems.length && allFolders.length"
                        @click="$root.$emit('openMoveDialog', selectedItems)"
                        color="grey-8"
                />
                </span>
                <span v-if="viewMode === 'list' && items.length>0" class="q-ml-md">
                    <q-btn-group outline class="q-mx-md">
                        <q-btn
                                size="sm"
                                outline
                                label="All"
                                :color="selectMode ? 'grey-8' :'grey-3'"
                                @click="selectAll"
                                v-if="selectMode"
                        />
                        <q-btn
                                size="sm"
                                outline
                                label="None"
                                :color="selectMode ? 'grey-8' :'grey-3'"
                                @click="selectNone"
                                v-if="selectMode"
                        />
                        <q-btn
                                size="sm"
                                outline
                                icon="fa-check-square"
                                :color="selectMode ? 'grey-8' :'grey-3'"
                                @click="toggleSelectMode"
                        />
                    </q-btn-group>
                </span>


                <q-btn-group outline class="q-mx-md">
                    <q-btn
                            size="sm"
                            outline
                            icon="fa-bars"
                            :color="viewMode==='list' ? 'grey-6' :'grey-3'"
                            @click="changeViewMode('list')"
                    />
                    <q-btn
                            size="sm"
                            outline
                            icon="fa-th"
                            :color="viewMode==='grid' ? 'grey-6' :'grey-3'"
                            @click="changeViewMode('grid')"
                    />
                </q-btn-group>
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
        <q-page-sticky position="bottom-right" :offset="[20, 20]">
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
                        @click.native="$root.$emit('openUploader')"
                />
            </q-fab>
        </q-page-sticky>

        <!--Create Folder Dialog-->
        <create-folder-dialog/>

        <!--Upload Modal-->
        <uploader/>

        <!--Loading Animation-->
        <inner-loading :loading="loading"/>
    </q-page>
</template>

<style>
</style>

<script>
  import BreadcrumbNavigation from '../components/Cloud/BreadcrumbNavigation'
  import ItemsList from '../components/Cloud/ItemsList'
  import ItemsGrid from '../components/Cloud/ItemsGrid'
  import CreateFolderDialog from '../components/Cloud/Dialogs/CreateFolderDialog'
  import Uploader from '../components/Cloud/Uploader'
  import InnerLoading from '../components/InnerLoading'

  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'Cloud',
    components: {
      BreadcrumbNavigation,
      ItemsList,
      ItemsGrid,
      CreateFolderDialog,
      Uploader,
      InnerLoading
    },
    data () {
      return {}
    },
    mounted () {
      this.refresh()
    },
    computed: {
      ...mapGetters('cloud', [
        'loading',
        'viewMode',
        'selectMode',
        'selectedItems',
        'allFolders',
        'items'
      ]),
      showActionButtons () {
        return this.viewMode === 'list' && this.selectedItems.length
      }
    },
    methods: {
      ...mapActions('cloud', [
        'refresh',
        'setPath',
        'toggleSelectMode',
        'changeViewMode',
        'selectAll',
        'selectNone'
      ]),
    }
  }
</script>
