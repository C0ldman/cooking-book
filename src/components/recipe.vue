<template>
  <v-card class="itemsWrapper">
    <v-img class="recipeImage" contain aspect-ratio="1" :src="element.imageRef || 'https://news.harvard.edu/wp-content/uploads/2020/06/060520_Cooking_101_2500.jpg'">
    </v-img>
    <v-card-text>
      {{element.name}}
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "recipe",
    props: {
      element: Object
    }
  }
</script>

<style scoped>
  .itemsWrapper {
    width: 100%;
    height: 100%;
    padding: 5px;
  }

  .recipeImage {
    max-height: 75%;
  }
</style>
