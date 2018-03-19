<template>
    <q-item class="item-row"
            @mouseover.native="showOptions = true"
            @mouseout.native="showOptions = false"
            @click.native="clickItem(item)"
    >

        <!--Left Part Icon & Thumbnail-->
        <q-item-side v-if="showPreviewOrIcon" class="text-center">
            <q-icon
                    v-if="!item.has_preview"
                    :name="item.icon"
                    size="28px"
            />
            <img
                    v-else
                    :src="item.thumbnail"
                    alt="Thumbnail"
                    class="vertical-middle"
            />
        </q-item-side>

        <!--Left Part Checkbox-->
        <q-item-side v-if="showCheckbox" class="text-center">
            <q-checkbox color="grey-6" v-model="selected"/>
        </q-item-side>

        <!--Main Part-->
        <q-item-main>
            <q-item-tile label>{{item.name}}</q-item-tile>
        </q-item-main>
        <q-item-main>
            <q-item-tile sublabel class="float-right">
                {{item.time}}
            </q-item-tile>
        </q-item-main>

        <!--Right Part-->
        <q-item-side right>
            <q-icon name="more vert"
                    size="24px"
                    @click.native="showPopover=true"
                    v-if="(showOptions || showPopover) &&!showCheckbox"
            >
                <q-popover v-model="showPopover">
                    <q-list link separator style="min-width: 130px; max-height: 300px;">
                        <q-item v-close-overlay @click.native="downloadItem">
                            <q-item-side icon="fa-arrow-alt-circle-down" color="grey-5"/>
                            <q-item-main label="Download"/>
                        </q-item>
                        <q-item v-close-overlay>
                            <q-item-side icon="fa-pencil-alt" color="grey-5"/>
                            <q-item-main label="Rename" @click.native="$root.$emit('openRenameDialog',item)"/>
                        </q-item>
                        <q-item v-close-overlay v-if="allFolders.length >1">
                            <q-item-side icon="fa-copy" color="grey-5"/>
                            <q-item-main label="Copy" @click.native="$root.$emit('openCopyDialog',[item])"/>
                        </q-item>
                        <q-item v-close-overlay v-if="allFolders.length >1">
                            <q-item-side icon="fa-arrow-right" color="grey-5"/>
                            <q-item-main label="Move" @click.native="$root.$emit('openMoveDialog',[item])"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="$root.$emit('openDeleteDialog',[item])">
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
  import {mapActions, mapGetters} from 'vuex'
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
        'selectMode',
        'selectedItems'
      ]),
      selected: {
        set () {
          this.toggleItemSelection(this.item)
        },
        get () {
          return this.selectedItems.findIndex((selectedItem) => selectedItem.path === this.item.path) !== -1
        }
      },
      showCheckbox () {
        return (this.showOptions || this.selected) && this.selectMode
      },
      showPreviewOrIcon () {
        return !this.showCheckbox
      }
    },
    methods: {
      ...mapActions('cloud', [
        'setPath',
        'toggleItemSelection'
      ]),
      clickItem () {
        //prevent open on popover
        if (this.showPopover) {
          return
        }
        //allow row toggle during selectMode
        if (this.selectMode) {
          this.selected = !this.selected
          return
        }
        //open folders
        if (this.item.is_dir) {
          this.setPath(this.item.path)
          return
        }
        //open preview
        if (this.item.has_preview) {
          this.$parent.$emit('openImageViewer', this.item)
        }
      },
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
    .item-row
        height: 45px
</style>
