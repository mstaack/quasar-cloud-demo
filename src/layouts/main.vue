<template>
    <q-layout view="hHh Lpr lFf">
        <q-layout-header>
            <q-toolbar color="primary">
                <q-toolbar-title>
                    Quasar Demo Application
                    <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
                </q-toolbar-title>
                <q-btn
                        flat
                        round
                        dense
                        icon="more_vert">
                    <q-popover>
                        <q-list link>
                            <q-item dense v-close-overlay @click.native="$router.push({name:'profile'})">
                                <q-item-side icon="fa-user-circle"/>
                                <q-item-main label="Profile"/>
                            </q-item>
                            <q-item-separator/>
                            <q-item dense v-close-overlay @click.native="logout">
                                <q-item-side icon="fa-sign-out-alt"/>
                                <q-item-main label="Logout"/>
                            </q-item>
                        </q-list>
                    </q-popover>
                </q-btn>
            </q-toolbar>
            <q-tabs class="shadow-2">
                <q-route-tab :to="{name:'news'}" slot="title" icon="fa-newspaper" label="News"/>
                <q-route-tab :to="{name:'cloud'}" slot="title" icon="fa-cloud" label="Cloud"/>
            </q-tabs>
        </q-layout-header>

        <q-page-container>
            <router-view/>
        </q-page-container>

    </q-layout>
</template>

<script>
  export default {
    name: 'MainLayout',
    data () {
      return {}
    },
    methods: {
      logout () {
        this.$store.dispatch('session/logout')
        this.$router.push({name: 'login'})
      }
    }
  }
</script>

<style>
</style>
