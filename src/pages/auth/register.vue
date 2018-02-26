<template>
  <q-page class="flex flex-center">
    <q-card inline style="width: 400px;">
      <q-card-title class="bg-primary text-white">
        Please register
      </q-card-title>
      <q-card-main>
        <q-field
          helper="Firstname"
          class="q-mt-lg"
          :error="$v.form.firstName.$error"
          error-label="We need a first name"
        >
          <q-input v-model="form.firstname"/>
        </q-field>
        <q-field
          helper="Lastname"
          class="q-mt-md"
          :error="$v.form.lastName.$error"
          error-label="We need a last name"
        >
          <q-input v-model="form.lastname"/>
        </q-field>
        <q-field
          helper="E-Mail"
          class="q-mt-md"
          :error="$v.form.email.$error"
          error-label="We need a valid email"
        >
          <q-input v-model="form.email" type="email"/>
        </q-field>
        <q-field
          helper="Password"
          class="q-mt-md"
          :error="$v.form.password.$error"
          error-label="We need a password"
        >
          <q-input v-model="form.password" type="password"/>
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
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) }
    }
  },
  methods: {
    register () {
      this.$v.form.$touch()

      if (!this.$v.form.$error) {
        // todo send request
      }
    }
  }
}
</script>

<style>
</style>
