<template>
  <q-page class="flex flex-center">
    <q-card inline style="width: 400px;">
      <q-card-title class="bg-primary text-white">
        Please login
      </q-card-title>
      <q-card-main>
        <q-field
          helper="E-Mail" class="q-mt-lg"
          :error="$v.form.email.$error"
          error-label="We need a valid email"
        >
          <q-input v-model="form.email" type="email" :before="[{icon: 'email'}]"/>
        </q-field>
        <q-field
          helper="Password"
          class="q-mt-lg"
          :error="$v.form.password.$error"
          error-label="We need a valid password"
        >
          <q-input v-model="form.password" type="password" :before="[{icon: 'vpn key'}]"/>
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
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    login () {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        this.$q.notify({
          position: 'top',
          type: 'negative',
          detail: 'Please review fields again.'
        })
      }
    }
  }
}
</script>

<style>
</style>
