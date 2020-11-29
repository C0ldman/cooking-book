<template>
  <v-container>
    <v-card>
      <v-img height="300px" aspect-ratio="1.7" :src="element.imageRef || 'https://news.harvard.edu/wp-content/uploads/2020/06/060520_Cooking_101_2500.jpg'">
        <v-card-title class="title" >{{ element.name }}</v-card-title>
      </v-img>
      <v-card-text>
        <div>{{element.description}}</div>
      </v-card-text>
    </v-card>
    <ingredientsList :ingredients="element.ingredients"></ingredientsList>
  </v-container>
</template>

<script>
  import ingredientsList from "@/components/ingredientsList";
  export default {
    name: "elementView",
    components: {
      ingredientsList
    },
    props: {
      element: Object
    },
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
  .title {
    background-color: rgba(250,250,250,0.5);
  }
</style>
