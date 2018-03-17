<template>
    <q-modal v-model="show">
        <img :src="url" alt="Image" @click="show=false">
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
        return this.item.show + '&size=medium'
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>

</style>
