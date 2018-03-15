<template>
    <q-breadcrumbs>
        <q-breadcrumbs-el v-for="breadcrumb in breadcrumbs"
                          class="cursor-pointer"
                          :key="breadcrumb.path"
                          :label="breadcrumb.label"
                          :icon="breadcrumb.icon"
                          @click.native="changePath(breadcrumb.path)"
        />
    </q-breadcrumbs>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters('cloud', [
        'path',
      ]),
      breadcrumbs () {

        const breadcrumbs = []

        // Split path & cleanup
        let parts = this.path.split('/').filter((x, i, a) => a.indexOf(x) === i)

        for (let i = 0; i < parts.length; i++) {
          const label = parts[i] || 'Home'
          const path = parts.slice(0, i + 1).join('/') || '/'
          const icon = i === 0 ? 'home' : null
          breadcrumbs.push({
            label,
            path,
            icon
          })
        }

        return breadcrumbs
      }
    },
    methods: {
      changePath (path) {
        this.$store.dispatch('cloud/setPath', path)
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
