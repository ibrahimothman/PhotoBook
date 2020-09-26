<template>
  <div>
    <alert-error v-if="error" :message="error.message"></alert-error>
    <form v-if="!confirmPassword" class="flex flex-col items-center" @submit.prevent="onSignUp">
      <div class="flex flex-col user">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="userName">User Name</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          v-model="username"
          id="userName"
        />
      </div>
      <div class="flex flex-col mt-2">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          id="password"
          v-model="password"
        />
      </div>
      <div class="flex flex-col mt-2">
        <label class="block text-gray-700 text-sm font-bold" for="email">Email</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          id="email"
          v-model="email"
        />
      </div>
      <!-- eslint-disable -->
      <button class="btn-blue">Sign Up</button>
    </form>
    <div v-if="confirmPassword" class="w-4/12 m-auto">
      <h3>Enter your code. Please check your email</h3>
      <div class="flex flex-col mt-2">
        <label class="block text-gray-700 text-sm font-bold" for="password">Code</label>
        <input
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          v-model="code"
        />
        <button class="btn-blue" @click="onConfirmSignUp">Confirm Code</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data: () => ({
        username: '',
        password: '',
        email: '',
        confirmPassword: false,
        code: '',
        error: '',
    }),
    methods: {
        ...mapActions('auth', ['signUp', 'confirmSignUp', 'signIn']),
        async onSignUp() {
            if (!this.username || !this.password || !this.email) {
                return;
            }
            try {
                await this.signUp({
                    username: this.username,
                    email: this.email,
                    password: this.password,
                })
                this.confirmPassword = true;
            } catch (error) {
                console.error(error);
                this.error = error;
            }
        },
        async onConfirmSignUp() {
            if (!this.code) {
                return;
            }
            try {
                await this.confirmSignUp({
                    username: this.username,
                    code: this.code,
                })
                await this.signIn({
                    username: this.username,
                    password: this.password,
                })
                this.$router.push('/albums');
            } catch (error) {
                console.error(error);
                this.error = error;
            }
        }

    }

}
</script>