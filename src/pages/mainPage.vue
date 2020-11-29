<template>
  <div id="mainWrapper" fluid>
      <v-row>
        <v-col cols="8"></v-col>
        <v-col cols="4"><v-text-field class="search" v-model="search" prepend-icon="mdi-card-search-outline" label="Search"></v-text-field></v-col>
      </v-row>

      <div class="pa-2"></div>

    <v-container>
      <v-btn-toggle rounded>
        <v-btn class="button" color="#CFD8DC" height="60" to="new">Add new</v-btn>
        <v-btn class="button" color="#CFD8DC" height="60" @click="toggleFavourites" :class="{'grey lighten-1':showFavourites}">Favourites</v-btn>
      </v-btn-toggle>
    </v-container>

    <v-divider class="divider" inset></v-divider>
    <v-row id="wrapper">
      <v-col class="element" v-for="(element, index) in list" :key="index" :lg="3" :md="3" :sm="4" xs-cols="6">
        <recipe class="recipe" :element="element" @favourite="updateFavourite"></recipe>
      </v-col>
      <div v-if="notFound">Items not found</div>
      <div v-if="noFavourites">No items in favourites</div>
    </v-row>

    <v-divider class="divider" inset></v-divider>
  </div>
</template>

<script>
  import recipe from "@/components/recipe";

  export default {
    name: 'mainPage',
    components: {
      recipe
    },
    data() {
      return {
        showFavourites: false,
        search: ''
      }
    },
    methods: {
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
      toggleFavourites() {
        this.showFavourites = !this.showFavourites;
      },
      updateFavourite(id) {
        this.$store.dispatch('updateFavourite', id)
      }
    },
    created() {
      this.$store.dispatch('bindBase')
    },
    computed: {
      list() {
        let list = this.showFavourites ? this.$store.getters.favourites : this.$store.getters.data;
        if (this.search != '') {
          let newList = list.filter((el) => {
            let result = el.name.toLowerCase().search(this.search.toLowerCase());
            return result >= 0 ? true : false
          })
          return newList
        } else {
          return list
        }
      },
      notFound() {
        return this.search.length && !this.list.length && !this.noFavourites ? true : false
      },
      noFavourites() {
        return this.showFavourites && !this.list.length && !this.search ? true : false
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


  .hidden {
    display: none;
  }

  .button {
    font-size: 1.75rem;
  }

  .search {
    font-size: 1.5rem;
  }

</style>
