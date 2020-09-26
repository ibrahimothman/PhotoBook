<template>
  <div id="app">
    <div id="nav">
      <navbar></navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  async created() {
    await this.initAuthStatus();
  },
  methods: {
    ...mapActions('auth', ['initAuthStatus']),
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
