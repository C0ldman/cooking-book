<template>
  <v-row justify="center">
    <v-container id="recieptsList" class="flex-column align-content-space-between">
      <recipeDescriptionElement v-for="(element, index) in database" :element="element" @click.native="viewFull(element)" :key="index"></recipeDescriptionElement>
      <v-btn class="add-button green darken-2" to="new">Add new</v-btn>
    </v-container>

    <div id="fullViewWrapper" class="d-flex flex-column justify-center" v-if="selected">
      <elementView :element="selected"></elementView>
      <v-btn class="add-button green darken-2" @click="editSelected()">Edit</v-btn>
      <v-btn class="add-button green darken-2" @click="closeFull">Close</v-btn>
      <v-btn class="add-button red darken-2" @click.native="removeRecipe(selected)">Remove</v-btn>
    </div>
    <div v-if="!selected">
      Select recipe
    </div>
    <preloader :show="preloader"></preloader>
  </v-row>
</template>

<script>
  import {db, storage} from '../main'
  import recipeDescriptionElement from "@/components/recipeDescriptionElement"
  import elementView from "@/components/elementView"
  import router from "../plugins/router";
  import preloader from "@/components/preloader"

  export default {
    name: 'mainPage',
    components: {
      recipeDescriptionElement,
      elementView,
      preloader
    },
    data() {
      return {
        database: [],
        selected: null,
        preloader: false
      }
    },
    methods: {
      viewFull(element) {
        this.selected = element;
      },
      closeFull() {
        this.selected = null
      },
      editSelected() {
        router.push({name: 'new', params: {element: this.selected}})
      },
      removeRecipe(element) {
        db.collection('reciepts').doc(element.id).delete().then(async () => {
          this.preloader = true;
          storage.child(`${element.id}`).listAll().then(async (images) => {
            await storage.child(`${element.id}/${images.items[0].name}`).delete();
            this.preloader = false;
            this.selected = null;
          });
        });
      }
    },
    firestore() {
      return {
        database: db.collection('reciepts')
      }
    }
  }
</script>


<style scoped>
  #recieptsList {
    width: 250px;
    height: 100%;
    margin: 0;
  }

  .add-button {
    padding-top: 20px;
  }

  #fullViewWrapper {
    width: 60%;
  }


</style>
