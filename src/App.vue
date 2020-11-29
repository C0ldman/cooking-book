<template>
  <v-app id="app">
    <router-view/>
    <notifications group="user"/>
    <preloader :show="preloader"></preloader>
  </v-app>

</template>

<script>
  import preloader from "@/components/preloader"

  export default {
    name: 'App',
    components: {
      preloader
    },
    computed: {
      preloader() {
        return this.$store.state.preloader
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #dbe8ff;
  }
</style>
