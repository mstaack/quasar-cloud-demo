<template>
    <q-page class="flex flex-center">
        <q-card inline class="register-card q-mt-lg" color="grey-3">
            <q-card-title class="bg-primary text-white">
                Register
            </q-card-title>
            <q-card-main>
                <q-field
                        helper="Your Name"
                        class="q-mt-lg"
                        :error="$v.form.name.$error"
                        error-label="We need a name"
                >
                    <q-input v-model="form.name" :autofocus="true"/>
                </q-field>
                <q-field
                        helper="E-Mail"
                        class="q-mt-md"
                        :error="$v.form.email.$error"
                        error-label="We need a valid e-mail"
                >
                    <q-input v-model="form.email" type="email"/>
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
  import {required, email, minLength} from 'vuelidate/lib/validators'

  export default {
    name: 'Register',
    data () {
      return {
        form: {
          name: '',
          email: '',
          password: ''
        }
      }
    },
    validations: {
      form: {
        name: {required: true},
        email: {required, email},
        password: {required, minLength: minLength(8)}
      }
    },
    methods: {
      register () {
        this.$v.form.$touch()
        this.loading = true

        this.$store.dispatch('session/register', this.form).then(() => {
          this.loading = false
          this.$router.push({name: 'index'})
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: 'Registration Successful',
            icon: 'report_problem'
          })
        }).catch(error => {
          this.loading = false
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: error.response.data.message || 'Something went wrong',
            icon: 'report_problem'
          })
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .register-card
        width 320px
</style>
