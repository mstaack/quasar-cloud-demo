<template>
  <q-page class="flex flex-center">
    <q-card inline style="width: 400px;">
      <q-card-title class="bg-primary text-white">
        Please register
      </q-card-title>
      <q-card-main>
        <q-field helper="Firstname" class="q-mt-lg">
          <q-input v-model="firstname"/>
        </q-field>
        <q-field helper="Lastname" class="q-mt-md">
          <q-input v-model="lastname"/>
        </q-field>
        <q-field helper="E-Mail" class="q-mt-md">
          <q-input v-model="email" type="email"/>
        </q-field>
        <q-field helper="Password" class="q-mt-md">
          <q-input v-model="password" type="password"/>
        </q-field>
      </q-card-main>
      <q-card-separator class="q-mt-md"/>
      <q-card-actions align="between">
        <q-btn flat color="secondary" @click="$router.push({ name: 'login' })" label="Login"/>
        <q-btn color="primary" @click="register" label="Register"/>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      // todo
    }
  }
}
</script>

<style>
</style>
