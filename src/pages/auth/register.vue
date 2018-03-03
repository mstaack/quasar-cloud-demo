<template>
  <q-page class="flex flex-center">
    <q-card inline class="register-card q-mt-lg">
      <q-card-title class="bg-primary text-white">
        Please register
      </q-card-title>
      <q-card-main>
        <q-field
          helper="First Name"
          class="q-mt-lg"
          :error="$v.form.firstName.$error"
          error-label="We need a first name"
        >
          <q-input
            v-model="form.firstname"
            @keyup.enter="register"
          />
        </q-field>
        <q-field
          helper="Last Name"
          class="q-mt-md"
          :error="$v.form.lastName.$error"
          error-label="We need a last name"
        >
          <q-input
            v-model="form.lastname"
            @keyup.enter="register"
          />
        </q-field>
        <q-field
          helper="E-Mail"
          class="q-mt-md"
          :error="$v.form.email.$error"
          error-label="We need a valid e-mail"
        >
          <q-input
            v-model="form.email"
            type="email"
            @keyup.enter="register"
          />
        </q-field>
        <q-field
          helper="Password"
          class="q-mt-md"
          :error="$v.form.password.$error"
          error-label="We need a password"
        >
          <q-input
            v-model="form.password"
            type="password"
            @keyup.enter="register"
          />
        </q-field>
      </q-card-main>
      <q-card-separator class="q-mt-md"/>
      <q-card-actions align="between">
        <q-btn
          label="Login"
          flat
          color="secondary"
          @click="$router.push({ name: 'login' })"
        />
        <q-btn
          label="Register"
          color="primary"
          :disable="$v.form.$invalid"
          @click="register"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordDuplicate: ''
      }
    }
  },
  validations: {
    form: {
      firstName: { required: true},
      lastName: { required: true },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      passwordDuplicate: { sameAs: sameAs('password') }
    }
  },
  methods: {
    register () {
      this.$v.form.$touch()

      if (!this.$v.form.$error) {
        // todo send request
        console.log('Registering...')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .register-card
    width 320px
</style>
