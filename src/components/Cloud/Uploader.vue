<template>
    <q-modal v-model="show" content-css="width:450px;max-height:720px;padding:5px">
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
                        :url="uploadUrl"
                        name="file"
                        :hide-upload-button="true"
                        :headers="{Authorization:$store.state.session.user.token}"
                        :additional-fields="[{name:'path',value:path}]"
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
        show: false,
        uploadUrl: process.env.API_HOST + '/cloud/upload'
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
