<template>
  <q-page class="flex flex-center">
    <q-field helper="Username">
      <q-input v-model="password"/>
    </q-field>
    <q-field helper="Password">
      <q-input v-model="username"/>
    </q-field>
  </q-page>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style>
</style>
