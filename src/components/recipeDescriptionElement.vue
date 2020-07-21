<template>
  <v-card class="itemsWrapper">
    <v-img contain aspect-ratio="1" :src="element.imageRef || 'https://news.harvard.edu/wp-content/uploads/2020/06/060520_Cooking_101_2500.jpg'">
    </v-img>
    <v-card-text>
      {{element.name}}
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "recipeDescriptionElement",
    props: {
      element: Object
    }
  }
</script>

<style scoped>
  .itemsWrapper {
    margin:0 0 20px 20px;
    padding: 5px;
  }
</style>
