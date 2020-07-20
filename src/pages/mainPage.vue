<template>
  <v-row justify="center">
    <v-container id="recieptsList" class="flex-column align-content-space-between">
      <recipeDescriptionElement v-for="(element, index) in database" :element="element" @click.native="viewFull(element)" :key="index"></recipeDescriptionElement>
      <v-btn class="add-button green darken-2" to="new">Add new</v-btn>
    </v-container>

    <div id="fullViewWrapper" class="d-flex flex-column justify-center" v-if="selected">
      <elementView v-if="selected" :element="selected"></elementView>
      <v-btn v-if="selected" class="add-button green darken-2" @click="editSelected">Edit</v-btn>
      <v-btn v-if="selected" class="add-button green darken-2" @click="closeFull">Close</v-btn>
    </div>
  </v-row>
</template>

<script>
  import {db} from '../main'
  import recipeDescriptionElement from "@/components/recipeDescriptionElement"
  import elementView from "@/components/elementView"
  import router from "../plugins/router";

  export default {
    name: 'mainPage',
    components: {
      recipeDescriptionElement,
      elementView
    },
    data() {
      return {
        database: [],
        selected: null
      }
    },
    methods: {
      viewFull: function (element) {
        this.selected = element;
      },
      closeFull: function () {
        this.selected = null
      },
      editSelected: function () {
        router.push({name: 'new',params: this.selected })
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
