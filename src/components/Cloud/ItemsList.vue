<template>
    <q-list link dense style="min-height: 500px" class="animate-fade">

        <!--Empty Notice-->
        <q-list-header align="center" v-if="noContent && !loading" class="q-mt-xl">
            Nothing in here...
        </q-list-header>

        <!--Folders-->
        <q-list-header inset v-if="folders.length">
            Folders
        </q-list-header>
        <item-list-row v-for="folder in folders"
                       :item="folder"
                       :key="folder.path"
        />

        <!--Separator-->
        <q-item-separator inset v-if="folders.length"/>

        <!--Files-->
        <q-list-header inset v-if="files.length">
            Files
        </q-list-header>
        <item-list-row v-for="file in files"
                       :item="file"
                       :key="file.path"
        />

        <delete-dialog/>
        <move-dialog/>
        <copy-dialog/>
        <rename-dialog/>
        <image-viewer/>
    </q-list>
</template>

<script>
  import ItemListRow from './ItemListRow'
  import DeleteDialog from './Dialogs/DeleteDialog'
  import MoveDialog from './Dialogs/MoveDialog'
  import CopyDialog from './Dialogs/CopyDialog'
  import RenameDialog from './Dialogs/RenameDialog'
  import ImageViewer from './ImageViewer'

  import {mapActions, mapGetters} from 'vuex'
  import {format} from 'quasar'

  export default {
    name: 'ItemsList',
    components: {
      ItemListRow,
      DeleteDialog,
      MoveDialog,
      CopyDialog,
      RenameDialog,
      ImageViewer
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
    methods: {
      ...mapActions('cloud', [
        'refresh'
      ]),
      humanStorageSize (size) {
        return format.humanStorageSize(size)
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
