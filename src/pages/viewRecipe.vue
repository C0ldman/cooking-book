<template>
  <div>
    <v-btn @click="edit">Edit</v-btn>
    <v-btn @click="removeRecipe">remove</v-btn>
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
      <v-container>
        <v-row>
          <v-col>
            <socialShare id="socialShare" :shareUrl="url"></socialShare>
          </v-col>
        </v-row>
      </v-container>

    </v-container>
    <removeRecipe class="overlay" :id="this.id" :overlay="overlay" @close="promtClosed"></removeRecipe>
  </div>
</template>

<script>
  import ingredientsList from "@/components/ingredientsList";
  import socialShare from "@/components/socialShare";
  import removeRecipe from "@/components/removeRecipe";

  export default {
    name: "viewRecipe",
    components: {
      ingredientsList,
      socialShare,
      removeRecipe
    },
    data() {
      return {
        url: '',
        overlay: false
      }
    },
    methods: {
      edit() {
        this.$router.push('/edit/' + this.id)
      },
      removeRecipe() {
        this.overlay = true;
      },
      promtClosed() {
        this.overlay = false;
      }
    },
    computed: {
      element() {
        return this.$store.getters.element(this.id)
      },
      id() {
        return this.$route.params.id
      }
    },
    created() {
      this.$store.dispatch('bindBase');
    },
    mounted() {
      this.url = window.location.href;
      setTimeout(() => {
        if (!this.element) this.$router.push('/notFound');
      }, 500)
    }
  }
</script>

<style scoped>
  #socialShare {
    width: 50%;
  }

  .overlay {
    width: 100%;
    height: 100%;
  }
</style>
