<template>
    <div>
        <gallery :images="imageUrls" :index="index" @close="index = null"></gallery>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import VueGallery from 'vue-gallery'

  export default {
    name: 'ImageViewer',
    components: {
      'gallery': VueGallery
    },
    data () {
      return {
        index: null
      }
    },
    created () {
      this.$parent.$on('openImageViewer', (item) => {
        this.index = this.images.findIndex((image) => image.path === item.path)
      })
    },
    computed: {
      ...mapGetters('cloud', [
        'files'
      ]),
      imageUrls () {
        return this.images.map((image) => image.show + '&size=medium')
      },
      images () {
        return this.files
          .filter((file) => file.has_preview)
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
