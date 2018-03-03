<template>
    <q-page class="flex flex-center">
        <q-table
                title="Posts Overview"
                :data="posts"
                :columns="columns"
                row-key="_id"
                class="bg-white posts-table"
        />
    </q-page>
</template>

<style>
</style>

<script>
  export default {
    name: 'Posts',
    data () {
      return {
        loading: false,
        posts: [],
        columns: [
          {
            label: 'Title',
            field: 'title'
          },
          {
            label: 'Text',
            field: 'text'
          }
        ]
      }
    },
    methods: {
      fetchPosts () {
        this.loading = true
        this.$axios.get('/api/posts')
          .then(response => {
            this.posts = response.data.data
            this.loading = false
          })
          .catch(error => {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
            this.loading = false
          })
      }
    },
    mounted () {
      this.fetchPosts()
    }
  }

</script>

<style lang="stylus" scoped>
    .posts-table
        width 1000px
</style>
