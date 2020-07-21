<template>
  <v-container id="mainWrapper">
    <v-row justify="space-between">
      <v-col id="description" v-if="selected" :md="8" :cols="12">
        <v-row>
          <elementView :element="selected"></elementView>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="editSelected()">Edit</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="closeFull">Close</v-btn>
          </v-col>
          <v-col>
            <v-btn @click.native="removeRecipe(selected)">Remove</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
      <v-col :md="3" :cols="12" style="overfollow:hidden">
        <v-row id="itemsWrapper" class="d-flex flex-sm-row">
          <v-col v-for="(element, index) in database" :key="index" :cols="6" :sm="4" :md="12">
            <recipeDescriptionElement :element="element" @click.native="viewFull(element)"></recipeDescriptionElement>
          </v-col>
        </v-row>
        <v-btn to="new">Add new</v-btn>
      </v-col>
    </v-row>
    <preloader :show="preloader"></preloader>
  </v-container>
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
        this.$vuetify.goTo(0);
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
  #itemsWrapper {
    max-height: 620px;
    overflow-y: scroll;
  }
</style>
