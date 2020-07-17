<template>
  <v-container id="recieptsList" class="flex-column align-content-space-between">
    <recipeDescriptionElement class="reciept-item " v-for="(element, idx) in database" :element="element" :key="idx"></recipeDescriptionElement>
    <v-btn class="add-button green darken-2" to="new">Add new</v-btn>
  </v-container>
</template>

<script>
  import {db} from '../main'
  import recipeDescriptionElement from "@/components/recipeDescriptionElement"

  export default {
    name: 'mainPage',
    components:{
      recipeDescriptionElement
    },
    data() {
      return {
        database: []
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
    width: 200px;
    height: 100%;
    margin:0;
  }



  .add-button {
    padding-top: 20px;
  }
</style>
