<template>
    <q-modal v-model="show"
             content-css="max-height: 720px;padding:5px"
             content-classes="['no-scroll']"
    >
        <img :src="url" alt="Image" @click="show=false" v-if="show">
        <div
                class="row justify-between q-mt-xs"
                v-if="images.length>1"
        >
            <q-btn
                    outline
                    flat
                    size="sm"
                    icon="keyboard arrow left"
                    @click.native="prev"
                    label="Prev"
                    :disabled="!hasPrev"
            />
            <q-btn
                    outline
                    flat
                    size="sm"
                    icon-right="keyboard arrow right"
                    @click.native="next"
                    label="Next"
                    :disabled="!hasNext"
            />
        </div>
    </q-modal>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'ImageViewer',
    components: {},
    data () {
      return {
        show: false,
        index: 0,
      }
    },
    created () {
      this.$parent.$on('openImageViewer', (item) => {
        this.show = true
        this.index = this.images.findIndex((image) => image.path === item.path)
      })
      //Capture Global Key Events
      window.addEventListener('keyup', this.arrowAction)
    },
    computed: {
      ...mapGetters('cloud', [
        'files'
      ]),
      images () {
        return this.files.filter((file) => file.has_preview)
      },
      url () {
        return this.images[this.index].show + '&size=medium'
      },
      hasNext () {
        return this.index < this.images.length - 1
      },
      hasPrev () {
        return this.index !== 0
      }
    },
    methods: {
      next () {
        if (this.hasNext) {
          this.index++
        }
      },
      prev () {
        if (this.hasPrev) {
          this.index--
        }
      },
      arrowAction (event) {
        const key = event.keyCode || event.which
        if (key === 37) { // left arrow key
          this.prev()
        }
        else if (key === 39) { // right arrow key
          this.next()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
