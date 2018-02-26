<template>
  <q-page class="flex flex-center">
    <q-card inline>
      <q-card-title class="bg-primary text-white">
        Please login
      </q-card-title>
      <q-card-main>
        <q-field helper="E-Mail" class="q-mt-lg">
          <q-input v-model="email" type="email" :before="[{icon: 'email', handler () {}}]"/>
        </q-field>
        <q-field helper="Password" class="q-mt-lg">
          <q-input v-model="password" type="password" :before="[{icon: 'vpn key', handler () {}}]"/>
        </q-field>
      </q-card-main>
      <q-card-separator class="q-mt-lg"/>
      <q-card-actions align="between">
        <q-btn flat color="secondary" @click="$router.push({ name: 'register' })" label="Register"/>
        <q-btn color="primary" @click="login" label="Login"/>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
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
  .q-card {
    width: 400px;
  }
</style>
