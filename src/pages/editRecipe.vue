<template>
  <v-container v-if="element">
    <v-col :cols="10">
      <v-text-field v-model="element.name" :counter="100" placeholder="Recipe name" label="Name"></v-text-field>
      <v-img height="100px" contain :src="this.element.imageRef || 'https://news.harvard.edu/wp-content/uploads/2020/06/060520_Cooking_101_2500.jpg'"></v-img>
      <v-file-input show-size chips prepend-icon="mdi-camera" v-model="newImage" accept="image/*" placeholder="Select new image" label="New image"></v-file-input>
      <v-textarea solo name="description" v-model="element.description" placeholder="Recipe description" label="Description"></v-textarea>
      <ingredientsList :ingredients="element.ingredients" :editable=true @ingredientsUpdate="updateIngredients"></ingredientsList>
    </v-col>

    <v-btn @click="goBack">cancel</v-btn>
    <v-btn @click="save">save</v-btn>
  </v-container>

</template>

<script>
  import ingredientsList from "@/components/ingredientsList";
  import {db, storage} from "../main";

  export default {
    name: "editRecipe",
    components: {
      ingredientsList
    },
    data() {
      return {
        newImage: {},
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      async updateRecipe() {
        let elementId = this.element.id;
        await db.collection('reciepts').doc(elementId).update({
          name: this.element.name,
          description: this.element.description,
          ingredients: this.element.ingredients
        }).then(async () => {
          if (this.newImage && typeof this.newImage['name'] !== "undefined") {
            await this.updateImage(elementId, this.newImage);
          }
        });
      },
      async updateImage(elementId, image) {
        if (image) {
          await storage.child(`${elementId}/${image.name}`).put(image);
          let url = await storage.child(`${elementId}/${image.name}`).getDownloadURL();
          await db.collection('reciepts').doc(elementId).update({imageRef: url});
        }
      },
      updateIngredients(data) {
        this.element.ingredients = data;
      },
      async save() {
        this.$store.dispatch('onPreloader');
        await this.updateRecipe()
          .then(() => {
            this.$notify({
              group: 'user',
              type: 'success',
              title: 'Success!',
              text: 'Recipe updated!'
            })
            this.$store.dispatch('offPreloader');
            this.$router.push('/');
          })
          .catch((e) => {
              console.log('Fail on update: ', e)
              this.$store.dispatch('offPreloader');
              this.$notify({
                group: 'user',
                type: 'error',
                title: 'Something went wrong!',
                text: 'Can\'t save recipe. Please, try again later'
              });
              this.$router.push('/');
            }
          );

      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      element() {
        return this.$store.getters.element(this.id)
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
