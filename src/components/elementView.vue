<template>
  <v-container id="viewWrapper">
    <v-card id="elementView">
      <v-img class="white--text align-end" height="300px" aspect-ratio="1.7"
        :src="element.imageSrc || 'https://news.harvard.edu/wp-content/uploads/2020/06/060520_Cooking_101_2500.jpg'">
        <v-card-title>{{ element.name }}</v-card-title>
      </v-img>
      <v-card-text class="text--primary">
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
      return {}
    },
    methods: {}
  }
</script>

<style scoped>
</style>
