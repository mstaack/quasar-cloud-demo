<template>
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
                <q-item-tile sublabel>{{folder.time}}</q-item-tile>
            </q-item-main>

            <!--Context Menu-->
            <context-menu :item="folder" @refresh="refresh"/>
        </q-item>

        <q-item-separator inset v-if="folders.length"/>

        <!--Files-->
        <q-list-header inset v-if="files.length">Files</q-list-header>
        <q-item v-for="file in files" :key="file.path">

            <!--Icon & Thumbnail & Name-->
            <q-item-side :icon="file.icon" inverted color="grey-6" v-if="!file.has_thumbnail"/>
            <q-item-side v-if="file.has_thumbnail">
                <img :src="file.thumbnail" alt="">
            </q-item-side>
            <q-item-main>
                <q-item-tile label>{{file.name}}</q-item-tile>
                <q-item-tile sublabel>
                    {{humanStorageSize(file.size)}} | {{file.time}}
                </q-item-tile>
            </q-item-main>

            <!--Context Menu-->
            <context-menu :item="file" @refresh="refresh"/>
        </q-item>
    </q-list>
</template>

<script>
  import ContextMenu from './ContextMenu'

  import {mapActions, mapGetters} from 'vuex'
  import {format} from 'quasar'

  export default {
    name: 'ItemsList',
    components: {
      ContextMenu
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
      this.refresh()
    },
    methods: {
      ...mapActions('cloud', [
        'refresh',
        'setPath'
      ]),
      humanStorageSize (size) {
        return format.humanStorageSize(size)
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
