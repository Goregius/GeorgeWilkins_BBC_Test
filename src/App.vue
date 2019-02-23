<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }">Articles Ranker</router-link>
      <button class="dev" v-if="devMode" @click="reset">Development reset</button>
    </div>
    <div class="main">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    devMode: () => process.env.NODE_ENV === "development"
  },
  methods: {
      reset() {
          this.$store.dispatch('reset');
          this.$router.go()
      }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat");
html,
body {
  font-family: "Montserrat", sans-serif;
}

body {
  margin: 0;
}
#app {
  color: #2c3e50;
}
#nav {
  text-align: left;
  padding: 20px;
  color: #fff;
  background-color: #bb1919;
  a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;
  }
}
.main {
  padding: 2rem;
}
.container {
  margin: 0 auto;
}
button {
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    padding: 0.5rem 0.7rem;
    font-size: 14px;
    border-radius: 4px;
}
button:hover {
  background-color: #ccc;
}
button:hover:active {
  background-color: #aaa;
}
.dev {
  float: right;
  opacity: 0.5;
}
@media only screen and (min-width: 1008px) {
  .container {
    width: 976px;
  }
}
</style>
