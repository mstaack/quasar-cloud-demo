<template>
    <q-inner-loading :visible="loading">
        <q-spinner-ios size="75px" color="primary"></q-spinner-ios>
    </q-inner-loading>
</template>

<script>
  export default {
    props: ['loading'],
    data () {
      return {}
    }
  }
</script>

<style>
</style>
