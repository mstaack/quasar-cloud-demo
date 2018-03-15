<template>
    <div class="items-grid" style="min-height: 500px">
        <div class="row">
            <div v-for="item in items">
                <div
                        class="q-ma-sm q-pa-sm item text-center cursor-pointer"
                        @click="setPath(item.path)"
                >
                    <q-icon :name="item.icon" color="grey-5" size="50px" class="q-ma-lg"/>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {format} from 'quasar'

  export default {
    name: 'ItemsGrid',
    components: {},
    data () {
      return {}
    },
    computed: {
      ...mapGetters('cloud', [
        'items',
        'loading'
      ]),
      noContent () {
        return this.items.length === 0
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
