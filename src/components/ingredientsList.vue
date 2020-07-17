<template>
  <v-container>
  <v-list>
    <v-list-item v-for="(ingredient,index) in ingredients" :key="index">
      <v-list-item-content>
        <v-list-item-title>{{ingredient.ingredientName}}</v-list-item-title>
        <v-list-item-title>{{ingredient.ingredientQuantity}}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon>mdiCircleEditOutline</v-icon>
      </v-list-item-action>
      <v-list-item-action>
        <v-icon>mdiDeleteForeverOutline</v-icon>
      </v-list-item-action>
      <v-divider inset></v-divider>
    </v-list-item>
  </v-list>
    <v-icon>mdiPlusCircleOutline</v-icon>
  </v-container>
</template>

<script>
  export default {
    name: "ingredientsList",
    props: {
      ingredients: {type: Array, default: ()=>[]},
    }
  }
</script>

<style scoped>

</style>
