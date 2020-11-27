<template>
  <v-app id="mainWrapper" fluid>

    <v-divider class="divider" inset></v-divider>
    <v-row>
      <v-col v-for="(element, index) in database" :key="index" :md="3">
        <recipe :element="element"  @click.native="viewFull(element)" :class="isActive(element)"></recipe>
      </v-col>
    </v-row>

    <v-btn to="new">Add new</v-btn>
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
      },
      isActive(element) {
        if (element && this.selected) {
          return {active: element.id == this.selected.id}
        }
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

        if (this.database.length==0) {this.$notify({
          group: 'user',
          title: 'Error',
          text: 'No connection to database! Please, try again later.'
        });}
      },5000)
    }
  }
</script>

<style scoped>

  .divider {
    margin: 20px 0;
  }
</style>
