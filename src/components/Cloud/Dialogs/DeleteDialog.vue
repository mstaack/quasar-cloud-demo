<template>
    <q-dialog v-model="showDialog">
        <span slot="title">Delete</span>

        <span slot="message">
            Are you sure to delete <span class="text-weight-bold">{{confirmMessage}}</span> ?
        </span>

        <template slot="buttons" slot-scope="props">
            <q-btn flat label="Cancel" @click="showDialog=false"/>
            <q-btn
                    color="negative"
                    label="Delete"
                    @click="deleteItem"
            />
        </template>
    </q-dialog>
</template>

<script>

  export default {
    name: 'DeleteDialog',
    data () {
      return {
        showDialog: false,
        items: []
      }
    },
    created () {
      this.$root.$on('openDeleteDialog', (items) => {
        this.items = items
        this.showDialog = true
      })
    },
    computed: {
      successMessage () {
        return this.items.length === 1 ?
          this.items[0].name + ' deleted' :
          this.items.length + ' Items deleted'
      },
      confirmMessage () {
        return this.items.length === 1 ?
          this.items[0].name :
          this.items.length + ' Items'
      }
    },
    methods: {
      deleteItem () {
        this.$store.dispatch('cloud/deleteItems', this.items).then(() => {
          this.showDialog = false
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: this.successMessage,
            icon: 'fa-check-circle',
          })
        }).catch((error) => {
          this.showDialog = false
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: error.response.data.message || 'Something went wrong',
            icon: 'report_problem'
          })
        })
      }
    }
  }
</script>


<style lang="stylus" scoped>
</style>
