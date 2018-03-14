<template>
    <q-dialog v-model="showDialog">
        <span slot="title">Delete</span>

        <span slot="message">
            Are you sure to delete <span class="text-weight-bold">{{item.name}}</span> ?
        </span>

        <template slot="buttons" slot-scope="props">
            <q-btn flat label="Cancel" @click="closeDialog('delete')"/>
            <q-btn color="negative" label="Delete" autofocus @click="deleteItem"/>
        </template>
    </q-dialog>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'DeleteDialog',
    props: ['item'],
    data () {
      return {}
    },
    computed: {
      showDialog () {
        return this.$store.getters['cloud/dialogs'].delete
      },
    },
    methods: {
      ...mapActions('cloud', [
        'refresh',
        'closeDialog',
      ]),
      deleteItem () {
        this.$axios.post('/api/cloud/delete', {item: this.item})
          .then(() => {
            this.refresh()
            this.closeDialog('delete')
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: this.item.name + ' deleted!',
              icon: 'fa-check-circle',
            })
          })
          .catch((error) => {
            this.refresh()
            this.closeDialog('delete')
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: error.response.data.message || 'Whoops, something went wrong!',
              icon: 'report_problem'
            })
          })
      }
    }
  }
</script>


<style lang="stylus" scoped>
</style>
