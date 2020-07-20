<template>
  <v-container class="viewWrapper">
    <v-card class="elementView">
      <v-img class="white--text align-end" height="300px" aspect-ratio="1.7"
        :src="element.imageRef">
        <v-card-title class="white">{{ element.name }}</v-card-title>
      </v-img>
      <v-card-text class="text--primary">
        <div>{{element.description}}</div>
      </v-card-text>
    </v-card>
    <ingredientsList :ingredients="element.ingredients"></ingredientsList>
  </v-container>
</template>

<script>
  import ingredientsList from "@/components/ingredientsList";
  import {storage} from "../main";
  export default {
    name: "elementView",
    components: {
      ingredientsList
    },
    props: {
      element: Object
    },
    data() {
      return {
        imageRef:''
      }
    },
    methods: {
      getRecipeImage() {
        let path = storage.child(this.element.id);
        path.listAll().then((data) => {
          path.child(data.items[0].name).getDownloadURL().then(data => this.imageRef = data);
        });
      }
    },
    mounted() {
      // let path = storage.child(this.element.id);
      // path.listAll().then((data) => {
      //   path.child(data.items[0].name).getDownloadURL().then(data => this.imageRef = data);
      // });
    }
  }
</script>

<style scoped>
  .title {
    color:#fff;
  }
</style>
