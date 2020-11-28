<template>
  <v-card class="itemsWrapper elevation-2">
    <v-img class="recipeImage" aspect-ratio="1" :src="element.imageRef || 'https://news.harvard.edu/wp-content/uploads/2020/06/060520_Cooking_101_2500.jpg'">
    </v-img>
    <v-card-text>
      {{element.name}}
    </v-card-text>
    <v-icon v-if="!element.isFavourite" @click="toggleFavourite">mdi-star-outline</v-icon>
    <v-icon v-if="element.isFavourite" class="fav" @click="toggleFavourite">mdi-star</v-icon>
    View
    <v-icon >mdi-eye-outline</v-icon>
    Edit
    <v-icon >mdi-pencil-outline</v-icon>
  </v-card>
</template>

<script>
  export default {
    name: "recipe",
    props: {
      element: Object
    },
    methods:{
      toggleFavourite(){
        this.$emit('updated',this.element)
  }
    }
  }
</script>

<style scoped>
  .itemsWrapper {
    padding: 5px;
  }

  .recipeImage {
    max-height: 75%;
  }

  .fav {
    color: #ff9400;
  }
</style>
