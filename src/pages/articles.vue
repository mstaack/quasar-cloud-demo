<template>
    <q-page class="flex flex-center">

        <q-card class="article-card q-mt-lg" v-for="article in articles">
            <q-card-title class="bg-primary text-white">
                {{article.title}}
            </q-card-title>
            <q-card-main>
                {{article.text}}
            </q-card-main>
        </q-card>

    </q-page>
</template>

<style>
</style>

<script>
  export default {
    name: 'Articles',
    data () {
      return {
        loading: false,
        articles: []
      }
    },
    methods: {
      fetchArticles () {
        this.loading = true
        this.$axios.get('/api/articles')
          .then(response => {
            this.articles = response.data
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
      this.fetchArticles()
    }
  }

</script>

<style lang="stylus" scoped>
    .article-card
        width 700px
</style>
