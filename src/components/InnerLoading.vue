<template>
    <q-inner-loading :visible="loading">
        <q-spinner-gears size="80px" color="primary"></q-spinner-gears>
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
