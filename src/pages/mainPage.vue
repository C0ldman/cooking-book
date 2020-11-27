<template>
  <v-app id="mainWrapper" fluid>
    <v-container>
      <v-btn to="new">Add new</v-btn>
      <v-btn @click="toggleFavourites">Favourites</v-btn>
    </v-container>

    <v-divider class="divider" inset></v-divider>
    <v-row id="wrapper" :class="{'only-fav':showFavourites}">
      <v-col class="element" v-for="(element, index) in database" :key="index" :lg="2" :md="3" :sm="4" :xs="6" :class="{favourite:isFavourite(element)}">
        <recipe class="recipe" :element="element" @click.native="viewFull(element)" :class="{active:isActive(element)}"></recipe>
      </v-col>
    </v-row>


    <v-divider class="divider" inset></v-divider>
    <preloader :show="preloader"></preloader>
  </v-app>
</template>

<script>
  import {db, storage} from '../main'
  import recipe from "@/components/recipe"
  import elementView from "@/components/elementView"
  import router from "../plugins/router";
  import preloader from "@/components/preloader"

  export default {
    name: 'mainPage',
    components: {
      recipe,
      preloader
    },
    data() {
      return {
        database: [],
        selected: null,
        preloader: false,
        showFavourites:false
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
      },
      isActive(element) {
        if (element && this.selected) {
          return  element.id == this.selected.id
        }
      },
      isFavourite(element){
        return element.isFavourite
      },
      toggleFavourites(){
        this.showFavourites=!this.showFavourites;
      },
      scrollUp(){
        this.$vuetify.goTo(0);
      }
    },
    firestore() {
      return {
        database: db.collection('reciepts')
      }
    },
    mounted() {
      setTimeout(()=>{
        if (this.database.length===0) {this.$notify({
          group: 'user',
          title: 'Error',
          text: 'No connection to database! Please, try again later.'
        });}
      },5000);

    }
  }
</script>

<style scoped>
#wrapper {
  width: 90%;
  margin: 0 5%;
}
  .divider {
    margin: 20px 0;
  }
  .recipe {
    height: 100%;
  }

  .only-fav .element:not(.favourite) {
    display: none;
  }

  .hidden {
    display: none;
  }
</style>
