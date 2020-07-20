<template>
  <v-card id="wrapper">
    <v-img class="white--text align-end" height="200px" aspect-ratio="1.7" :src="element.imageSrc || 'https://news.harvard.edu/wp-content/uploads/2020/06/060520_Cooking_101_2500.jpg'">
      <v-card-title>{{ element.name }}</v-card-title>
    </v-img>
    <v-card-text class="text--primary">
      <div>{{element.description}}</div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "recipeDescriptionElement",
    props: {
      element: Object
    },
    data(){
      return {

      }
    },
    methods:{
    }
  }
</script>

<style scoped>
  #wrapper {
    margin:0 0 20px 20px;
    padding: 5px;
  }
</style>
