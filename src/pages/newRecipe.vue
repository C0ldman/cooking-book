<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col :cols="10">
        <v-text-field v-model="element.name" :counter="100" placeholder="Recip name" label="Name"></v-text-field>
        <v-file-input small-chips v-model="newImage" accept="image/*" placeholder="Select your image" label="Image"></v-file-input>
        <v-textarea solo name="description" v-model="element.description" placeholder="Recip description" label="Description"></v-textarea>
        <ingredientsList :ingredients="element.ingredients" :editable=true @ingredientsUpdate="updateIngredients"></ingredientsList>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-btn @click.native="addRecip">Save</v-btn>
    <v-btn to="/">Back</v-btn>
    <preloader :show="preloader"></preloader>
  </v-container>
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
          this.preloader = false;this.$notify({
            group: 'user',
            title: 'Important message',
            text: 'Hello user! This is a notification!'
          });
          this.$router.push('/');
        } else {
          await this.addNewRecipe();
          this.preloader = false;
          this.$notify({
            group: 'user',
            title: 'Important message',
            text: 'Hello user! This is a notification!'
          });
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
          if (this.newImage.name) {
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
<style scoped></style>
