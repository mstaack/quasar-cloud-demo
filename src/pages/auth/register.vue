<template>
  <q-page class="flex flex-center">
    <q-card inline style="width: 400px">
      <q-card-title>
        Please Login
      </q-card-title>
      <q-card-main>
        <q-field helper="Username" class="q-mt-lg">
          <q-input v-model="username" :before="[{icon: 'account box', handler () {}}]"/>
        </q-field>
        <q-field helper="Password" class="q-mt-lg">
          <q-input v-model="password" type="password" :before="[{icon: 'vpn key', handler () {}}]"/>
        </q-field>
      </q-card-main>
      <q-card-separator class="q-mt-lg" />
      <q-card-actions>
        <q-btn class="float-right" color="primary" @click="register" label="Register" />
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
    login () {
      // todo
    }
  }
}
</script>

<style>
</style>
