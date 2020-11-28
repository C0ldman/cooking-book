<template>
  <v-container v-if="element">
    <v-card>
      <v-img height="300px" aspect-ratio="1.7" :src="this.element.imageRef || 'https://news.harvard.edu/wp-content/uploads/2020/06/060520_Cooking_101_2500.jpg'">
        <v-card-title class="title">{{ element.name }}</v-card-title>
      </v-img>
      <v-card-text>
        <div>{{this.element.description}}</div>
      </v-card-text>
    </v-card>
    <ingredientsList :ingredients="this.element.ingredients"></ingredientsList>
    <v-btn @click="goBack">BACK</v-btn>
  </v-container>

</template>

<script>
  import ingredientsList from "@/components/ingredientsList";

  export default {
    name: "viewRecipe",
    components: {
      ingredientsList
    },
    data() {
      return {
      }
    },
    methods: {
      goBack() {
        this.$router.push('/')
      }
    },
    computed: {
      element() {
        return this.$store.getters.element(this.id);
      },
      id() {
        return this.$route.params.id
      },
      tracker(){
        console.log(this.element);
      }
    },
    created() {
      this.$store.dispatch('bindBase')
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
