<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card class="itemsWrapper" d-flex :elevation="hover ? 12 : 2">
        <v-img class="recipeImage" aspect-ratio="1" @click="viewRecipe" :src="element.imageRef || 'https://news.harvard.edu/wp-content/uploads/2020/06/060520_Cooking_101_2500.jpg'">

        </v-img>
        <v-card-title class="title">
          {{element.name}}
        </v-card-title>
        <div class="invisible panel" :class="{visible:hover}">
          <v-tooltip bottom v-if="!element.isFavourite">
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="action-icon" @click="toggleFavourite" v-bind="attrs" v-on="on">mdi-star-outline</v-icon>
            </template>
            <span>Add to favourites</span>
          </v-tooltip>

          <v-tooltip bottom v-if="element.isFavourite">
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="active action-icon" @click="toggleFavourite" v-bind="attrs" v-on="on">mdi-star</v-icon>
            </template>
            <span>Remove from favourites</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="action-icon" v-bind="attrs" v-on="on" @click="editRecipe">mdi-pencil-outline</v-icon>
            </template>
            <span>Edit</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="action-icon" @click="removeRecipe" v-on="on" v-bind="attrs">mdi-minus</v-icon>
            </template>
            <span>Remove</span>
          </v-tooltip>
        </div>
      </v-card>
    </v-hover>
    <removeRecipe :id="this.element.id" :overlay="overlay" @close="promtClosed"></removeRecipe>
  </div>
</template>

<script>
  import removeRecipe from "@/components/removeRecipe";

  export default {
    name: "recipe",
    props: {
      element: Object
    },
    components: {
      removeRecipe
    },
    data() {
      return {
        overlay: false
      }
    },
    methods: {
      toggleFavourite() {
        this.$emit('favourite', this.element.id)
      },
      viewRecipe() {
        this.$router.push('/view/' + this.element.id);
      },
      editRecipe() {
        this.$router.push('/edit/' + this.element.id);
      },
      removeRecipe() {
        this.overlay = true;
      },
      promtClosed() {
        this.overlay = false;
      }
    }
  }
</script>

<style scoped>


  .itemsWrapper {
    padding: 5px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }

  .action-icon.active {
    color: #ff9400;
  }

  .invisible {
    opacity: 0;
  }

  .visible {
    opacity: 1;
    transition: opacity 250ms ease-in-out;
  }

  .title {
    font-size: 1.5rem !important;
    word-break: break-word;
  }

  .panel {
    margin-top: auto;
    background-color: #90A4AE;
  }

  .action-icon {
    font-size: 3rem;
    color: #fff;
  }
</style>
