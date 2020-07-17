<template>
  <div id="recipEditor">
    <v-form ref="form">
      <v-text-field v-model="element.name" :counter="100" placeholder="Recip name" label="Name"></v-text-field>
      <v-file-input small-chips accept="image/*" placeholder="Select your image" label="Image"></v-file-input>
      <v-textarea solo name="description" v-model="element.description" placeholder="Recip description" label="Description"></v-textarea>
            <ingredientsList :ingredients="element.ingredients"></ingredientsList>
    </v-form>
    <v-btn class="green darken-2" @click="addRecip">Save</v-btn>
    <v-btn class="green darken-2" to="/">Back</v-btn>
  </div>
</template>

<script>
  import ingredientsList from "@/components/ingredientsList";

  export default {
    name: "newRecipe",
    components: {
      ingredientsList
    },
    data() {
      return {
        element:{},
      }
    },
    methods: {
      addRecip() {
        console.log('add');
      }
    },
    mounted() {
        this.element = this.$route.params
    },
    watch: {}
  }
</script>

<style scoped>
#recipEditor {
  padding: 20px;
}
</style>
