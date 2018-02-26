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
      <q-card-actions>
        <q-btn flat color="secondary" label="Reset Password" />
        <q-btn color="primary" @click="login" label="Login" />
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
