<template>
    <q-page class="flex flex-center">
        <q-card inline class="login-card q-mt-lg">
            <q-card-title class="bg-primary text-white">
                Please login
            </q-card-title>
            <q-card-main>
                <q-field
                        helper="E-Mail" class="q-mt-lg"
                        :error="$v.form.email.$error"
                        error-label="We need a valid e-mail"
                >
                    <q-input
                            v-model="form.email"
                            type="email"
                            :before="[{icon: 'email'}]"
                            ref="email"
                            @blur="$v.form.email.$touch()"
                            @keyup.enter="$refs.password.focus()"
                    />
                </q-field>
                <q-field
                        helper="Password"
                        class="q-mt-lg"
                        :error="$v.form.password.$error"
                        error-label="We need a valid password"
                >
                    <q-input
                            v-model="form.password"
                            type="password"
                            :before="[{icon: 'vpn key'}]"
                            ref="email"
                            @blur="$v.form.password.$touch()"
                            @keyup.enter="login"
                    />
                </q-field>
            </q-card-main>
            <q-card-separator class="q-mt-lg"/>
            <q-card-actions align="between">
                <q-btn
                        label="Register"
                        flat color="secondary"
                        @click="$router.push({ name: 'register' })"
                />
                <q-btn
                        label="Login"
                        :disable="$v.form.$invalid"
                        color="primary"
                        @click="login"
                />
            </q-card-actions>
        </q-card>
    </q-page>
</template>

<script>
  import {required, email, minLength} from 'vuelidate/lib/validators'

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
        email: {required, email},
        password: {required, minLength: minLength(8)}
      }
    },
    methods: {
      login () {
        this.$axios.post('/api/login', this.form)
          .then(response => {
            this.$store.commit('session/login', {token: response.data.token})
            this.$router.push({name: 'index'})
          })
          .catch((error) => {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Your credentials are wrong!',
              icon: 'report_problem'
            })
          })
      }
    },
    mounted () {
      this.$refs.email.focus()
    }
  }
</script>

<style lang="stylus" scoped>
    .login-card
        width 320px
</style>
