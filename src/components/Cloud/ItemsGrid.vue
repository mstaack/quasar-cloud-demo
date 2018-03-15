<template>
    <div class="items-grid" style="min-height: 500px">
        <div class="row">
            <div v-for="folder in folders">
                <div
                        class="q-ma-md item text-center cursor-pointer"
                        @click="setPath(folder.path)"
                >
                    <q-icon
                            :name="folder.icon"
                            color="grey-5"
                            size="50px"
                            class="q-ma-lg"
                    />
                    <p>
                        {{folder.name}}
                    </p>
                    <!--Context Menu-->
                    <!--<context-menu :item="folder" @refresh="refresh"/>-->
                </div>
            </div>
        </div>
        <div class="row">
            <div v-for="file in files">
                <div class="q-ma-md item text-center cursor-pointer">
                    <q-icon
                            :name="file.icon"
                            color="grey-5"
                            size="50px"
                            class="q-ma-lg"
                    />
                    <p>
                        <span class="text-truncate">{{file.name}}</span>
                    </p>
                    <!--Context Menu-->
                    <!--<context-menu :item="file" @refresh="refresh"/>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ContextMenu from './ContextMenu'

  import {mapActions, mapGetters} from 'vuex'
  import {format} from 'quasar'

  export default {
    name: 'ItemsGrid',
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
    .items-grid
        border: 1px solid #e0e0e0;
        padding: 8px 0;

    .item
        border: 1px solid #f2f2f2;
</style>
