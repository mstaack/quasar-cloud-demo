<template>
    <q-modal v-model="show">
        <div>
            <img :src="url" alt="Image">
        </div>
    </q-modal>
</template>

<script>
  export default {
    name: 'ImageViewer',
    components: {},
    data () {
      return {
        show: false,
        item: {},
      }
    },
    created () {
      this.$parent.$on('openImageViewer', (item) => {
        this.show = true
        this.item = item
      })
    },
    computed: {
      url () {
        return this.item.thumbnail + '&size=650'
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>

</style>
