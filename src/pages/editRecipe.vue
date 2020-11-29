<template>
  <v-container v-if="element">
    <v-col :cols="10">
      <v-text-field v-model="element.name" :counter="100" placeholder="Recipe name" label="Name"></v-text-field>
      <v-file-input show-size chips prepend-icon="mdi-camera" v-model="newImage" accept="image/*" placeholder="Select your image" label="Image"></v-file-input>
      <v-textarea solo name="description" v-model="element.description" placeholder="Recipe description" label="Description"></v-textarea>
      <ingredientsList :ingredients="element.ingredients" :editable=true @ingredientsUpdate="updateIngredients"></ingredientsList>
    </v-col>

    <v-btn @click="goBack">cancel</v-btn>
    <v-btn @click="save">save</v-btn>
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
        url:''
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      save(){
        this.$store.dispatch('onPreloader');
        this.$notify({
          group: 'user',
          type:'success',
          title: 'Success!',
          text: 'Recipe updated!'
        })
        this.$store.dispatch('offPreloader');
        this.$router.push('/');
      }
    },
    computed: {
      element() {
        return this.$store.getters.element(this.id);
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
    }
  }
</script>

<style scoped>
  #socialShare {
    width: 50%;
  }
</style>
