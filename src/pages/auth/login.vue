<template>
  <q-page class="flex flex-center">
    <q-card inline style="width: 400px">
      <q-card-title>
        Please Login
      </q-card-title>
      <q-card-main>
        <q-field helper="Username">
          <q-input v-model="password"/>
        </q-field>
        <q-field helper="Password">
          <q-input v-model="username" type="password"/>
        </q-field>
      </q-card-main>
      <q-card-separator />
      <q-card-separator />
      <q-card-actions>
        <q-btn color="primary" label="Login" />
        <q-btn flat color="primary" label="Reset Password" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      // todo
    }
  }
}
</script>

<style>
</style>
