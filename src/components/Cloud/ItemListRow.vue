<template>
    <q-item @mouseover.native="showOptions = true" @mouseout.native="showOptions = false">
        <q-item-side :icon="item.icon" inverted color="grey-6" v-if="!item.has_thumbnail"/>
        <q-item-side v-if="item.has_thumbnail">
            <img :src="item.thumbnail" alt="Thumbnail">
        </q-item-side>
        <q-item-main>
            <q-item-tile label>{{item.name}}</q-item-tile>
        </q-item-main>
        <q-item-main>
            <q-item-tile sublabel class="float-right">
                {{item.time}}
            </q-item-tile>
        </q-item-main>
        <q-item-side right>
            <q-icon name="more vert" size="24px" @click.native="showPopover=true" v-if="showOptions || showPopover">
                <q-popover v-model="showPopover">
                    <q-list link separator style="min-width: 130px; max-height: 300px;">
                        <q-item v-close-overlay @click.native="downloadItem">
                            <q-item-side icon="fa-arrow-alt-circle-down" color="grey-5"/>
                            <q-item-main label="Download"/>
                        </q-item>
                        <q-item v-close-overlay>
                            <q-item-side icon="fa-pencil-alt" color="grey-5"/>
                            <q-item-main label="Rename" @click.native="$parent.$emit('openRenameDialog',item)"/>
                        </q-item>
                        <q-item v-close-overlay v-if="allFolders.length >1">
                            <q-item-side icon="fa-copy" color="grey-5"/>
                            <q-item-main label="Copy" @click.native="$parent.$emit('openCopyDialog',item)"/>
                        </q-item>
                        <q-item v-close-overlay v-if="allFolders.length >1">
                            <q-item-side icon="fa-arrow-right" color="grey-5"/>
                            <q-item-main label="Move" @click.native="$parent.$emit('openMoveDialog',item)"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="$parent.$emit('openDeleteDialog',item)">
                            <q-item-side icon="fa-trash-alt" color="grey-5"/>
                            <q-item-main label="Delete"/>
                        </q-item>
                    </q-list>
                </q-popover>
            </q-icon>
        </q-item-side>
    </q-item>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {format} from 'quasar'

  export default {
    name: 'ItemListRow',
    props: ['item'],
    components: {},
    data () {
      return {
        showOptions: false,
        showPopover: false
      }
    },
    computed: {
      ...mapGetters('cloud', [
        'allFolders',
      ]),
    },
    methods: {
      downloadItem () {
        window.location = this.item.download
      },
      humanStorageSize (size) {
        return format.humanStorageSize(size)
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
