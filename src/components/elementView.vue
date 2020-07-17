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
  </v-container>
</template>

<script>
  export default {
    name: "elementView",
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
  #viewWrapper {
    height: 70%;
  }
</style>
