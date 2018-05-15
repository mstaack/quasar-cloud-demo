<template>
    <q-page class="flex flex-center">
        <q-card inline class="login-card q-mt-lg relative-position" color="grey-3">
            <q-card-title class="bg-primary text-white">
                Login
            </q-card-title>
            <q-card-main>
                <q-field
                        helper="E-Mail" class="q-mt-lg"
                        :error="$v.form.email.$error"
                        error-label="We need a valid e-mail"
                >
                    <q-input
                            v-model.trim="form.email"
                            type="email"
                            ref="email"
                    />
                </q-field>
                <q-field
                        helper="Password"
                        class="q-mt-lg"
                        :error="$v.form.password.$error"
                        error-label="Passwords needs to be 8 chars at minimum"
                >
                    <q-input
                            v-model="form.password"
                            type="password"
                            ref="password"
                            @keyup.enter="login"
                    />
                </q-field>
            </q-card-main>
            <q-card-separator class="q-mt-lg"/>
            <q-card-actions align="end">
                <q-btn
                        label="Register"
                        flat color="secondary"
                        @click="$router.push({ name: 'register' })"
                />
                <q-btn
                        label="Login"
                        :disable="$v.form.$invalid"
                        color="primary"
                        icon="fa-arrow-right"
                        @click="login"
                />
            </q-card-actions>
            <inner-loading :loading="loading"/>
        </q-card>
    </q-page>
</template>

<script>
  import InnerLoading from '../../components/InnerLoading'
  import {email, minLength, required} from 'vuelidate/lib/validators'

  export default {
    name: 'Login',
    components: {
      InnerLoading
    },
    data () {
      return {
        loading: false,
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
        this.$v.form.$touch()
        this.loading = true

        this.$store.dispatch('session/login', this.form).then(() => {
          this.loading = false
          this.$router.push({name: 'news'})
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: 'Login Successful',
            icon: 'fa-check-circle'
          })
        }).catch(error => {
          this.loading = false
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: error.response.data.message || 'Your credentials are wrong',
            icon: 'fa-exclamation-triangle'
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
