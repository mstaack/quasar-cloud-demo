<template>
    <q-dialog v-model="showDialog">
        <span slot="title">Uploader</span>

        <span slot="message">Please select files:</span>

        <div slot="body">
            <q-uploader
                    ref="uploader"
                    auto-expand
                    multiple
                    :clearable="true"
                    url="api/cloud/upload"
                    name="file"
                    :headers="{Authorization:$store.state.session.user.token}"
                    :additional-fields="[{name:'path',value:path}]"
                    @finish="refresh"
            ></q-uploader>
        </div>

        <template slot="buttons" slot-scope="props">
            <q-btn flat label="Close" @click="closeUploader"/>
            <q-btn
                    color="primary"
                    label="Upload"
                    @click="$refs.uploader.upload()"
            />
        </template>
    </q-dialog>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'UploadDialog',
    data () {
      return {
        showDialog: false
      }
    },
    computed: {
      ...mapGetters('cloud', [
        'path',
      ]),
    },
    created () {
      this.$root.$on('openUploadDialog', () => {
        this.showDialog = true
      })
    },
    methods: {
      ...mapActions('cloud', [
        'refresh'
      ]),
      closeUploader () {
        this.refresh()
        this.showDialog = false
        this.$refs.uploader.reset()
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
