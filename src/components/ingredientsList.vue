<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Quantity</th>
          <th class="text-left" v-if="editable"></th>
          <th class="text-left" v-if="editable"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in ingredients" :key="item.ingredientName">
          <td>{{ item.ingredientName }}</td>
          <td>{{ item.ingredientQuantity }}</td>
          <td v-if="editable">
            <v-icon @click.native="editIngredient(item)">mdi-pencil</v-icon>
          </td>
          <td v-if="editable">
            <v-icon @click.native="removeIngredient(item)">mdi-minus-circle</v-icon>
          </td>
        </tr>
        <tr v-if="editor" @keyup.enter="saveNewIngredient" @keyup.esc="clearNewIngredient">
          <td>
            <v-text-field v-model="newName" :counter="100" placeholder="Ingredient name"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="newQuantity" :counter="10" placeholder="Ingredient quantity"></v-text-field>
          </td>
          <td><v-btn @click="saveNewIngredient">Save</v-btn></td>
          <td>
            <v-btn @click="clearNewIngredient">Cancel</v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-icon v-if="!this.editor && editable" @click.native="addIngredient" key="edit-button">mdi-plus-circle</v-icon>


  </v-container>
</template>

<script>
  export default {
    name: "ingredientsList",
    props: {
      ingredients: {type: Array, default: () => []},
      editable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        editor: false,
        newName:'',
        newQuantity:'',
        editIndex:-1
      }
    },
    methods: {
      addIngredient() {
        this.editor = true;
      },
      saveNewIngredient() {
        if(this.editIndex!=-1){
          this.ingredients[this.editIndex].ingredientQuantity=this.newQuantity;
          this.ingredients[this.editIndex].ingredientName=this.newName;
        }else{
          let newIngredient={
            "ingredientName":this.newName,
            "ingredientQuantity":this.newQuantity
          };
          this.ingredients.push(newIngredient);
        };
        this.$emit('ingredientsUpdate',this.ingredients)
        this.editor = false;
        this.newName='';
        this.newQuantity='';
        this.editIndex = -1;
      },
      removeIngredient(element){
        let ind = this.ingredients.findIndex((item)=>item.ingredientName==element.ingredientName);
        this.ingredients.splice(ind,1);
        this.$emit('ingredientsUpdate',this.ingredients)
      },
      clearNewIngredient() {
        this.editor = false;
        this.newName='';
        this.newQuantity='';
        this.editIndex = -1;
      },
      editIngredient(element){
        this.editIndex = this.ingredients.findIndex((item)=>item.ingredientName==element.ingredientName);
        this.editor = true;
        this.newName=element.ingredientName;
        this.newQuantity=element.ingredientQuantity;
      }
    }
  }
</script>

<style scoped>

</style>
