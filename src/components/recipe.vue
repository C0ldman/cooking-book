<template>
  <v-card class="itemsWrapper elevation-2">
    <v-img class="recipeImage" aspect-ratio="1" :src="element.imageRef || 'https://news.harvard.edu/wp-content/uploads/2020/06/060520_Cooking_101_2500.jpg'">

    </v-img>
    <v-card-text>
      {{element.name}}
    </v-card-text>

    <!--    <v-tooltip  bottom>-->
    <!--      <template v-slot:activator="{ on, attrs }" >-->
    <!--        <v-icon v-if="!element.isFavourite" v-bind="attrs" v-on="on" class="favicon" @click="toggleFavourite">mdi-star-outline</v-icon>-->
    <!--        <v-icon v-if="element.isFavourite" v-bind="attrs" v-on="on" class="favicon active" @click="toggleFavourite">mdi-star</v-icon>-->
    <!--      </template>-->
    <!--      <span>Favourites</span>-->
    <!--    </v-tooltip>-->

    <v-icon v-if="!element.isFavourite" class="favicon" @click="toggleFavourite">mdi-star-outline</v-icon>
    <v-icon v-if="element.isFavourite" class="favicon active" @click="toggleFavourite">mdi-star</v-icon>

    <!--    <v-tooltip bottom>-->
    <!--      <template v-slot:activator="{ on, attrs }">-->
    <!--      <v-icon v-bind="attrs" v-on="on">mdi-eye-outline</v-icon>-->
    <!--      </template>-->
    <!--      <span>View</span>-->
    <!--    </v-tooltip>-->
    <v-icon @click="viewRecipe">mdi-eye-outline</v-icon>

    <!--    <v-tooltip bottom>-->
    <!--      <template v-slot:activator="{ on, attrs }">-->
    <!--        <v-icon v-bind="attrs" v-on="on">mdi-pencil-outline</v-icon>-->
    <!--      </template>-->
    <!--      <span>Edit</span>-->
    <!--    </v-tooltip>-->
    <v-icon>mdi-pencil-outline</v-icon>

    <!--    <v-tooltip bottom>-->
    <!--      <template v-slot:activator="{ on, attrs }">-->
    <!--        <v-icon v-bind="attrs" v-on="on">mdi-minus</v-icon>-->
    <!--      </template>-->
    <!--      <span>Remove</span>-->
    <!--    </v-tooltip>-->
    <v-icon>mdi-minus</v-icon>

  </v-card>
</template>

<script>
  export default {
    name: "recipe",
    props: {
      element: Object
    },
    methods: {
      toggleFavourite() {
        this.$emit('favourite', this.element.id)
      },
      viewRecipe(){
        this.$router.push('/view/'+this.element.id);
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

  .favicon.active {
    color: #ff9400;
  }
</style>
