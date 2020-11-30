<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col :cols="10">
        <v-text-field v-model="element.name" :counter="100" placeholder="Recipe name" label="Name"></v-text-field>
        <v-file-input show-size chips prepend-icon="mdi-camera" v-model="newImage" accept="image/*" placeholder="Select your image" label="Image"></v-file-input>
        <v-textarea solo name="description" v-model="element.description" placeholder="Recipe description" label="Description"></v-textarea>
        <ingredientsList :ingredients="element.ingredients" :editable=true @ingredientsUpdate="updateIngredients"></ingredientsList>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-btn-toggle rounded>
      <v-btn class="button" color="#CFD8DC" height="60" @click.native="addRecip">Save</v-btn>
      <v-btn class="button" color="#CFD8DC" height="60" to="/">Back</v-btn>
    </v-btn-toggle>
  </v-container>
</template>

<script>
  import ingredientsList from "@/components/ingredientsList";
  import {db, storage} from '../main';

  export default {
    name: "newRecipe",
    components: {
      ingredientsList
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
        this.$store.dispatch('onPreloader');
        await this.addNewRecipe()
          .then(() => {
            this.$notify({
              group: 'user',
              type: 'success',
              title: 'Succsess!',
              text: 'Your recip saved!'
            });
            this.$store.dispatch('offPreloader');
            this.$router.push('/');
          }).catch((e) => {
            console.log('Fail on add: ', e)
            this.$store.dispatch('offPreloader');
            this.$notify({
              group: 'user',
              type: 'error',
              title: 'Something went wrong!',
              text: 'Can\'t add recipe. Please, try again later'
            });
            this.$router.push('/');
          });

      },
      updateIngredients(data) {
        this.element.ingredients = data;
      },
      async updateImage(elementId, image) {
        if (image) {
          await storage.child(`${elementId}/${image.name}`).put(image);
          let url = await storage.child(`${elementId}/${image.name}`).getDownloadURL();
          await db.collection('reciepts').doc(elementId).update({imageRef: url});
        }
      },

      async addNewRecipe() {
        await db.collection('reciepts').add({name: this.element.name, description: this.element.description, ingredients: this.element.ingredients, imageRef: '', isFavourite: false})
          .then(async data => {
            if (this.newImage && typeof this.newImage['name'] !== "undefined") {
              await this.updateImage(data.id, this.newImage);
            }
          })

      }
    }
  }
</script>
<style scoped>
  .button {
    font-size: 1.75rem;
  }
</style>
