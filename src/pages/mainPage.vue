<template>
  <v-app id="mainWrapper" fluid>
    <v-container>
      <v-btn to="new">Add new</v-btn>
      <v-btn @click="toggleFavourites" :class="{green:showFavourites}">Favourites</v-btn>
    </v-container>

    <v-divider class="divider" inset></v-divider>
    <v-row id="wrapper">
      <v-col class="element" v-for="(element, index) in list" :key="index" :lg="2" :md="3" :sm="4" :xs="6">
        <recipe class="recipe" :element="element" @favourite="updateFavourite" ></recipe>
      </v-col>
    </v-row>

    <v-divider class="divider" inset></v-divider>
  </v-app>
</template>

<script>
  import recipe from "@/components/recipe"
  import router from "../plugins/router";


  export default {
    name: 'mainPage',
    components: {
      recipe
    },
    data() {
      return {
        showFavourites:false
      }
    },
    methods: {
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
      toggleFavourites(){
        this.showFavourites=!this.showFavourites;
      },
      updateFavourite(id){
            this.$store.dispatch('updateFavourite',id)
        }

    },
    created() {
      this.$store.dispatch('bindBase')
    },
    computed:{
      list(){
        return this.showFavourites ? this.$store.getters.favourites : this.$store.getters.data
      }
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
</style>
