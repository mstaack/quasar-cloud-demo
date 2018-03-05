<template>
    <q-layout view="hHh Lpr lFf">
        <q-layout-header>
            <q-toolbar color="primary">
                <q-toolbar-title>
                    Quasar Advanced Starter
                    <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
                </q-toolbar-title>
                <q-btn flat round dense icon="more_vert">
                    <q-popover>
                        <q-list link>
                            <q-item dense v-close-overlay @click.native="$router.push({name:'profile'})">
                                <q-item-side icon="account circle"/>
                                <q-item-main label="Profile"/>
                            </q-item>
                            <q-item-separator/>
                            <q-item dense v-close-overlay @click.native="logout">
                                <q-item-side icon="power settings new"/>
                                <q-item-main label="Logout"/>
                            </q-item>
                        </q-list>
                    </q-popover>
                </q-btn>
            </q-toolbar>
            <q-tabs class="shadow-2">
                <q-route-tab :to="{name:'blog'}" slot="title" icon="receipt" label="Blog"/>
                <q-route-tab :to="{name:'mail'}" slot="title" icon="mail" label="Mail"/>
                <q-route-tab :to="{name:'cloud'}" slot="title" icon="cloud" label="Cloud"/>
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
      return {
        leftDrawerOpen: false
      }
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
