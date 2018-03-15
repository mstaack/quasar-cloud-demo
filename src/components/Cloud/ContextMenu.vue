<template>
    <q-context-menu>
        <q-list link separator style="min-width: 130px; max-height: 300px;">
            <q-item v-close-overlay @click.native="downloadItem(item)">
                <q-item-side icon="fa-arrow-alt-circle-down" color="grey-5"/>
                <q-item-main label="Download"/>
            </q-item>
            <q-item v-close-overlay @click.native="showRenameDialog=true">
                <q-item-side icon="fa-pencil-alt" color="grey-5"/>
                <q-item-main label="Rename"/>
            </q-item>
            <q-item v-close-overlay @click.native="showCopyDialog=true">
                <q-item-side icon="fa-copy" color="grey-5"/>
                <q-item-main label="Copy"/>
            </q-item>
            <q-item v-close-overlay @click.native="showMoveDialog=true">
                <q-item-side icon="fa-arrow-right" color="grey-5"/>
                <q-item-main label="Move"/>
            </q-item>
            <q-item v-close-overlay @click.native="showDeleteDialog=true">
                <q-item-side icon="fa-trash-alt" color="grey-5"/>
                <q-item-main label="Delete"/>
            </q-item>
        </q-list>

        <!--Action Dialogs-->
        <delete-dialog :item="item" :show.sync="showDeleteDialog"/>
        <rename-dialog :item="item" :show.sync="showRenameDialog"/>
        <move-dialog :item="item" :show.sync="showMoveDialog"/>
        <copy-dialog :item="item" :show.sync="showCopyDialog"/>

    </q-context-menu>
</template>

<script>
  import DeleteDialog from '../../components/Cloud/Dialogs/DeleteDialog'
  import RenameDialog from '../../components/Cloud/Dialogs/RenameDialog'
  import MoveDialog from '../../components/Cloud/Dialogs/MoveDialog'
  import CopyDialog from '../../components/Cloud/Dialogs/CopyDialog'

  export default {
    props: ['item'],
    components: {
      DeleteDialog,
      RenameDialog,
      MoveDialog,
      CopyDialog
    },
    data () {
      return {
        showDeleteDialog: false,
        showRenameDialog: false,
        showMoveDialog: false,
        showCopyDialog: false,
      }
    },
    methods: {
      downloadItem () {
        window.location = this.item.download
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
