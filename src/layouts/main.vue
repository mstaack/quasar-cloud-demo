<template>
    <q-layout view="lHh Lpr lFf">
        <q-layout-header>
            <q-toolbar color="primary">
                <q-btn
                        flat
                        dense
                        round
                        @click="leftDrawerOpen = !leftDrawerOpen"
                >
                    <q-icon name="menu"/>
                </q-btn>

                <q-toolbar-title>
                    Quasar App
                    <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
                </q-toolbar-title>
                <q-btn flat round dense icon="more_vert">
                    <q-popover>
                        <q-list separator link>
                            <q-item v-close-overlay @click.native="doSomething">
                                Profile
                            </q-item>
                            <q-item v-close-overlay @click.native="doSomething">
                                Settings
                            </q-item>
                            <q-item v-close-overlay @click.native="doSomething">
                                Logout
                            </q-item>
                        </q-list>
                    </q-popover>
                </q-btn>
            </q-toolbar>
        </q-layout-header>

        <q-layout-drawer v-model="leftDrawerOpen" content-class="bg-grey-2">
            <q-list no-border link inset-delimiter>
                <q-list-header>Navigation</q-list-header>
                <q-item>
                    <q-item-side icon="school"/>
                    <q-item-main label="Docs" sublabel="quasar-framework.org"/>
                </q-item>
            </q-list>
        </q-layout-drawer>

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
        this.$store.commit('session/logout')
        this.$router.push({name: 'login'})
      }
    }
  }
</script>

<style>
</style>
