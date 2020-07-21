<template>
  <div id="recipEditor">
    <v-form ref="form">
      <v-text-field v-model="element.name" :counter="100" placeholder="Recip name" label="Name"></v-text-field>
      <v-file-input small-chips v-model="newImage" accept="image/*" placeholder="Select your image" label="Image"></v-file-input>
      <v-textarea solo name="description" v-model="element.description" placeholder="Recip description" label="Description"></v-textarea>
      <ingredientsList :ingredients="element.ingredients" :editable=true @ingredientsUpdate="updateIngredients"></ingredientsList>
    </v-form>
    <v-btn class="green darken-2" @click.native="addRecip">Save</v-btn>
    <v-btn class="green darken-2" to="/">Back</v-btn>
    <preloader :show="preloader"></preloader>
  </div>
</template>

<script>
  import ingredientsList from "@/components/ingredientsList";
  import preloader from "@/components/preloader"
  import {db, storage} from '../main';

  export default {
    name: "newRecipe",
    components: {
      ingredientsList,
      preloader
    },
    data() {
      return {
        element: {
          id: null,
          ingredients: []
        },
        newImage: {},
        preloader: false
      }
    },
    methods: {
      async addRecip() {
        this.preloader = true;
        if (this.element.id) {
          await this.updateRecipe();
          this.preloader = false;
          this.$router.push('/');
        } else {
          await this.addNewRecipe();
          this.preloader = false;
          this.$router.push('/');
        }
      },
      updateIngredients(data) {
        this.element.ingredients = data;
      },
      async updateImage(elementId, image) {
        await storage.child(`${elementId}/${image.name}`).put(image);
        let url = await storage.child(`${elementId}/${image.name}`).getDownloadURL();
        await db.collection('reciepts').doc(elementId).update({imageRef: url});
      },
      async updateRecipe() {
        db.collection('reciepts').doc(this.element.id).update({
          name: this.element.name,
          description: this.element.description,
          ingredients: this.element.ingredients
        }).then(async () => {
          if (this.newImage) {
            await this.updateImage(this.element.id, this.newImage);
          }
        });
      },
      async addNewRecipe() {
        db.collection('reciepts').add({name: this.element.name, description: this.element.description, ingredients: this.element.ingredients})
          .then(async data => {
            await this.updateImage(data.id, this.newImage)
          })
      }
    },
    mounted() {
      if (this.$route.params.element)
        this.element = this.$route.params.element;
    },
    watch: {}
  }
</script>

<style scoped>
  #recipEditor {
    padding: 20px;
  }
</style>
