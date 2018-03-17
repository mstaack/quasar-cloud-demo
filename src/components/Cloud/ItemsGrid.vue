<template>
    <div class="items-grid animate-fade" style="min-height: 500px">

        <!--Empty Notice-->
        <q-list-header align="center" v-if="noContent && !loading" class="q-mt-xl">
            Nothing in here...
        </q-list-header>

        <div class="row wrap justify-around">
            <div v-for="(item, index) in items" :key="index">
                <div
                        class="item text-center cursor-pointer ellipsis"
                        @click="setPath(item.path)"
                >
                    <q-icon
                      v-if="item.icon"
                      :name="item.icon"
                      color="grey-5"
                      size="50px"
                      class="q-ma-lg"
                    />

                    <img
                      v-if="item.thumbnail"
                      :src="item.thumbnail"
                      height="46px"
                      class="q-ma-lg"
                    />
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
        width 140px
        min-height 135px
        // border: 1px solid #f2f2f2;
</style>
