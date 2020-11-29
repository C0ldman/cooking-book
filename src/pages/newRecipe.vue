<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col :cols="10">
        <v-text-field v-model="element.name" :counter="100" placeholder="Recipe name" label="Name"></v-text-field>
        <v-file-input show-size chips prepend-icon="mdi-camera"  v-model="newImage" accept="image/*" placeholder="Select your image" label="Image"></v-file-input>
        <v-textarea solo name="description" v-model="element.description" placeholder="Recipe description" label="Description"></v-textarea>
        <ingredientsList :ingredients="element.ingredients" :editable=true @ingredientsUpdate="updateIngredients"></ingredientsList>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-btn @click.native="addRecip">Save</v-btn>
    <v-btn to="/">Back</v-btn>
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
          await this.addNewRecipe();
          this.$notify({
            group: 'user',
            type:'success',
            title: 'Succsess!',
            text: 'Your recip saved!'
          });
        this.$store.dispatch('offPreloader');
          this.$router.push('/');
      },
      updateIngredients(data) {
        this.element.ingredients = data;
      },
      async updateImage(elementId, image) {
        if(image){
        await storage.child(`${elementId}/${image.name}`).put(image);
        let url = await storage.child(`${elementId}/${image.name}`).getDownloadURL();
        await db.collection('reciepts').doc(elementId).update({imageRef: url});}
      },
      async updateRecipe() {
        db.collection('reciepts').doc(this.element.id).update({
          name: this.element.name,
          description: this.element.description,
          ingredients: this.element.ingredients,
          imageRef:''
        }).then(async () => {
          if (this.newImage.name) {
            await this.updateImage(this.element.id, this.newImage);
          }
        });
      },
      async addNewRecipe() {
        await db.collection('reciepts').add({name: this.element.name, description: this.element.description, ingredients: this.element.ingredients,imageRef:'',isFavourite:false})
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
