<template>
    <q-page class="flex flex-center column q-mt-md animate-fade">
        <q-card
                inline
                style="width:800px;"
                class="q-ma-sm"
                :class="{ 'fit': $q.platform.is.mobile }"
                v-for="article in articles"
                :key="article.url" v-if="article.urlToImage"
        >
            <q-card-media>
                <q-parallax :src="article.urlToImage" :height="250" :speed="0.3">
                    <div slot="loading">Loading...</div>
                </q-parallax>
            </q-card-media>
            <q-card-title>
                {{article.title}}
                <span slot="subtitle">{{article.author}} | {{article.publishedAt}}</span>
            </q-card-title>
            <q-card-main>
                {{ article.description }}
            </q-card-main>
            <q-card-separator/>
            <q-card-actions align="end">
                <q-btn flat dense @click.native="openURL(article.url)">More</q-btn>
            </q-card-actions>
        </q-card>

        <!--Loading Animation-->
        <inner-loading :loading="loading"/>
    </q-page>
</template>

<script>
  import InnerLoading from '../components/InnerLoading'
  import {openURL} from 'quasar'

  export default {
    name: 'News',
    components: {
      InnerLoading
    },
    data () {
      return {
        loading: false,
        articles: []
      }
    },
    created () {
      this.fetchNews()
    },
    methods: {
      fetchNews () {
        this.loading = true
        this.$axios.get('news').then((response) => {
          this.loading = false
          this.articles = response.data.articles
        })
      },
      openURL
    }
  }

</script>

<style lang="stylus" scoped>
</style>
