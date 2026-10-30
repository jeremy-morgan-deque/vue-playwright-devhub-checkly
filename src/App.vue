<template>
  <a id="home-link" :href="baseUrl + '?'"><img alt="Home" src="./assets/logo.png"></a>
  <HelloWorld msg="Hello World!"/>
  <Login heading="Login"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'

export default {
  mounted() {
    document.title = "Hello World!"; // Set the page title dynamically
  },
  name: 'App',
  components: {
    HelloWorld,
    Login
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      currentLanguage: 'en-us' // Default language
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  color: #ffffff !important;
  margin-top: 60px;
  /*background-color: #FFFFFF !important;*/
  background: #333333 !important;
}
h1 {
  color: #ffffff;
}
h2 {
  color: #ffffff;
}
h3 {
  color: #ffffff;
}
h4 {
  color: #ffffff;
}
</style>
