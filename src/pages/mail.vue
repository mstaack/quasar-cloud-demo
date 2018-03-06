<template>
    <q-layout class="animate-scale">
        <q-layout-drawer v-model="leftDrawerOpen" content-class="bg-grey-2">
            <q-list no-border link>
                <q-list-header>{{$store.state.session.user.email}}</q-list-header>
                <q-item @click.native="openURL('http://quasar-framework.org')">
                    <q-item-side icon="inbox"/>
                    <q-item-main label="Inbox"/>
                </q-item>
                <q-item @click.native="openURL('http://quasar-framework.org')">
                    <q-item-side icon="send"/>
                    <q-item-main label="Sent"/>
                </q-item>
                <q-item @click.native="openURL('http://quasar-framework.org')">
                    <q-item-side icon="drafts"/>
                    <q-item-main label="Drafts"/>
                </q-item>
                <q-item @click.native="openURL('http://quasar-framework.org')">
                    <q-item-side icon="fa-trash"/>
                    <q-item-main label="Trash"/>
                </q-item>
            </q-list>
        </q-layout-drawer>

        <q-page-container>
            <q-page>
                <!--message actions-->
                <q-btn class="q-ml-lg q-mb-lg" outline dense icon="delete" label="Delete" color="negative"/>

                <!--message-list-->
                <q-list highlight no-border class="message-list">
                    <q-item link dense class="message-row">
                        <q-item-side>
                            <q-checkbox color="grey-1" v-model="checked"/>
                        </q-item-side>
                        <q-item-main label="Brunch this weekend? Brunch this weekend? Brunch this weekend?"
                                     label-lines="1"/>
                        <q-item-side right stamp="1 min"/>
                    </q-item>
                    <q-item link dense class="message-row">
                        <q-item-side>
                            <q-checkbox color="grey-1" v-model="checked"/>
                        </q-item-side>
                        <q-item-main label="Brunch this weekend? Brunch this weekend? Brunch this weekend?"
                                     label-lines="1"/>
                        <q-item-side right stamp="1 min"/>
                    </q-item>
                    <q-item link dense class="message-row">
                        <q-item-side>
                            <q-checkbox color="grey-1" v-model="checked"/>
                        </q-item-side>
                        <q-item-main label="Brunch this weekend? Brunch this weekend? Brunch this weekend?"
                                     label-lines="1"/>
                        <q-item-side right stamp="1 min"/>
                    </q-item>
                    <q-item link dense class="message-row">
                        <q-item-side>
                            <q-checkbox color="grey-1" v-model="checked"/>
                        </q-item-side>
                        <q-item-main label="Brunch this weekend? Brunch this weekend? Brunch this weekend?"
                                     label-lines="1"/>
                        <q-item-side right stamp="1 min"/>
                    </q-item>
                    <q-item link dense class="message-row">
                        <q-item-side>
                            <q-checkbox color="grey-1" v-model="checked"/>
                        </q-item-side>
                        <q-item-main label="Brunch this weekend? Brunch this weekend? Brunch this weekend?"
                                     label-lines="1"/>
                        <q-item-side right stamp="1 min"/>
                    </q-item>
                    <q-item link dense class="message-row">
                        <q-item-side>
                            <q-checkbox color="grey-1" v-model="checked"/>
                        </q-item-side>
                        <q-item-main label="Brunch this weekend? Brunch this weekend? Brunch this weekend?"
                                     label-lines="1"/>
                        <q-item-side right stamp="1 min"/>
                    </q-item>
                </q-list>
                <q-page-sticky position="bottom-right" :offset="[18, 18]">
                    <q-btn
                            round
                            color="primary"
                            icon="create"
                    />
                </q-page-sticky>
            </q-page>
        </q-page-container>
    </q-layout>
</template>


<script>
  export default {
    name: 'Mail',
    data () {
      return {
        leftDrawerOpen: true,
        checked: false
      }
    },
  }
</script>

<style lang="stylus">
    .q-layout-drawer-left {
        width: 230px;
    }

    .message-row
        border-bottom: solid 1px #ececec;

    .folder-list
        width 200px;
</style>
