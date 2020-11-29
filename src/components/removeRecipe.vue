<template>
  <v-overlay id="overlay" :absolute="true" :opacity="0.5" :value="state">
    Are you shure?
    <v-btn color="red" @click="removeRecipe"> Remove</v-btn>
    <v-btn color="green" @click="close"> Cancel</v-btn>
  </v-overlay>
</template>

<script>
  import {db, storage} from '../main';
  export default {
    name: "removeRecipe",
    props: {
      id: String,
      overlay: Boolean
    },
    computed:{
      state(){
        return this.overlay
      }
    },
    methods: {
      removeRecipe() {
        this.$store.dispatch('onPreloader');
        db.collection('reciepts').doc(this.id).name;
        db.collection('reciepts').doc(this.id).delete().then(async () => {
          storage.child(`${this.id}`).listAll().then(async (entry) => {
            if(entry.items[0]) {
              await storage.child(`${this.id}/${entry.items[0].name}`).delete();
            };
            this.$notify({
              group: 'user',
              type:'warn',
              text: 'Recipe deleted!'
            });
            this.$store.dispatch('offPreloader');
            this.$emit('close');
          });
        })
      },
      close(){
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>
</style>
