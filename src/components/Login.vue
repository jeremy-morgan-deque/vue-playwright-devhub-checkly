<template>
  <div id="login" class="login-container">
    <h2>{{heading}}</h2>
    <form v-on:submit.prevent="handleSubmit">
      <input class="username" type="text" placeholder="Username" required>
      <input class="password" type="password" placeholder="Password" required>
      <button class="login-button" @click="toggleVisibility">Login</button>
      <div class="login-error" v-if="isVisible"> <p>Invalid username and/or password.</p></div>
      <div class="bad-login">test</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    heading: String
  },
  data() { return { isVisible: false }; }, 
  methods: {
    toggleVisibility() {
      this.isVisible = true;
      return false;
    },
    handleSubmit() {
      // Handle form submission
    },
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.login-error {
  color: #ff9999;
}
</style>
