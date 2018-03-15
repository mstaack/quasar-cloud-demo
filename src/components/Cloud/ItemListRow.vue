<template>
    <q-item>
        <q-item-side :icon="item.icon" inverted color="grey-6" v-if="!item.has_thumbnail"/>
        <q-item-side v-if="item.has_thumbnail">
            <img :src="item.thumbnail" alt="Thumbnail">
        </q-item-side>
        <q-item-main>
            <q-item-tile label>{{item.name}}</q-item-tile>
            <q-item-tile sublabel>
                <small>{{humanStorageSize(item.size)}} | {{item.time}}</small>
            </q-item-tile>
        </q-item-main>
        <q-item-side right>
            <q-icon name="more vert" size="24px">
                <q-popover>
                    <q-list link separator style="min-width: 130px; max-height: 300px;">
                        <q-item v-close-overlay @click.native="downloadItem(item)">
                            <q-item-side icon="fa-arrow-alt-circle-down" color="grey-5"/>
                            <q-item-main label="Download"/>
                        </q-item>
                        <q-item v-close-overlay>
                            <q-item-side icon="fa-pencil-alt" color="grey-5"/>
                            <q-item-main label="Rename" @click.native="$root.$emit('openRenameDialog',item)"/>
                        </q-item>
                        <q-item v-close-overlay>
                            <q-item-side icon="fa-copy" color="grey-5"/>
                            <q-item-main label="Copy" @click.native="$root.$emit('openCopyDialog',item)"/>
                        </q-item>
                        <q-item v-close-overlay>
                            <q-item-side icon="fa-arrow-right" color="grey-5"/>
                            <q-item-main label="Move" @click.native="$root.$emit('openMoveDialog',item)"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="$root.$emit('openDeleteDialog',item)">
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
  import {format} from 'quasar'

  export default {
    name: 'ItemListRow',
    props: ['item'],
    components: {},
    data () {
      return {}
    },
    methods: {
      humanStorageSize (size) {
        return format.humanStorageSize(size)
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
