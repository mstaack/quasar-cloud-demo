<template>
    <q-context-menu>
        <q-list link separator style="min-width: 130px; max-height: 300px;">
            <q-item v-close-overlay @click.native="downloadItem(item)" disabled="true">
                <q-item-side icon="fa-arrow-alt-circle-down" color="grey-5"/>
                <q-item-main label="Download"/>
            </q-item>
            <q-item v-close-overlay @click.native="openDialog('rename')">
                <q-item-side icon="fa-pencil-alt" color="grey-5"/>
                <q-item-main label="Rename"/>
            </q-item>
            <q-item v-close-overlay @click.native="openDialog('copy')">
                <q-item-side icon="fa-copy" color="grey-5"/>
                <q-item-main label="Copy"/>
            </q-item>
            <q-item v-close-overlay @click.native="openDialog('move')">
                <q-item-side icon="fa-arrow-right" color="grey-5"/>
                <q-item-main label="Move"/>
            </q-item>
            <q-item v-close-overlay @click.native="openDialog('delete')">
                <q-item-side icon="fa-trash-alt" color="grey-5"/>
                <q-item-main label="Delete"/>
            </q-item>
        </q-list>

        <!--Action Dialogs-->
        <delete-dialog :item="item"/>
        <rename-dialog :item="item"/>
        <move-dialog :item="item"/>
        <copy-dialog :item="item"/>

    </q-context-menu>
</template>

<script>
  import DeleteDialog from '../../components/Cloud/Dialogs/DeleteDialog'
  import RenameDialog from '../../components/Cloud/Dialogs/RenameDialog'
  import MoveDialog from '../../components/Cloud/Dialogs/MoveDialog'
  import CopyDialog from '../../components/Cloud/Dialogs/CopyDialog'
  import {mapActions} from 'vuex'

  export default {
    props: ['item'],
    components: {
      DeleteDialog,
      RenameDialog,
      MoveDialog,
      CopyDialog
    },
    data () {
      return {}
    },
    methods: {
      ...mapActions('cloud', [
        'openDialog',
        'closeDialog',
      ]),
      downloadItem () {
        // TODO
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
