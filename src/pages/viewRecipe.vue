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
    <socialShare :shareUrl="url"></socialShare>
    <v-btn @click="goBack">BACK</v-btn>
    {{ur}}
  </v-container>

</template>

<script>
  import ingredientsList from "@/components/ingredientsList";
  import socialShare from "@/components/socialShare";

  export default {
    name: "viewRecipe",
    components: {
      ingredientsList,
      socialShare
    },
    data() {
      return {
        url:''
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
        ur(){
          console.log(window);}

    },
    created() {
      this.$store.dispatch('bindBase');
    },
    mounted() {
      this.url = window.location.href;
    }
  }
</script>

<style scoped>

</style>
