<template>
    <q-modal v-model="show">
        <div class="flex column q-ma-md" style="width:400px">
            <div>
                <big>Uploader</big>
            </div>
            <div class="q-mt-lg">
                <q-uploader
                        ref="uploader"
                        auto-expand
                        multiple
                        :clearable="true"
                        :url="process.env.API_HOST + '/cloud/upload'"
                        name="file"
                        :headers="{Authorization:$store.state.session.user.token}"
                        :additional-fields="[{name:'path',value:path}]"
                        @finish="refresh"
                />
            </div>
            <div class="flex justify-end q-mt-lg">
                <q-btn flat label="Close" @click="closeUploader"/>
                <q-btn
                        color="primary"
                        label="Upload"
                        @click="$refs.uploader.upload()"
                />
            </div>
        </div>

    </q-modal>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'Uploader',
    data () {
      return {
        show: false
      }
    },
    computed: {
      ...mapGetters('cloud', [
        'path',
      ]),
    },
    created () {
      this.$root.$on('openUploader', () => {
        this.show = true
      })
    },
    methods: {
      ...mapActions('cloud', [
        'refresh'
      ]),
      closeUploader () {
        this.refresh()
        this.show = false
        this.$refs.uploader.reset()
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
