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
    computed: {
      state() {
        return this.overlay
      }
    },
    methods: {
      removeRecipe() {
        this.$store.dispatch('onPreloader');
        let idForRemove = this.id;
        db.collection('reciepts').doc(idForRemove).delete()
          .then(async () => {
            storage.child(idForRemove).listAll().then(async (entry) => {
              if (entry.items[0]) {
                await storage.child(idForRemove[entry.items[0].name]).delete();
              }
            });
          }).then(() => {
          this.$notify({
            group: 'user',
            type: 'warn',
            text: 'Recipe deleted!'
          });
          this.$store.dispatch('offPreloader');
          this.$emit('close');
        })
          .catch((e) => {
            console.log(`Fail on remove(id=${idForRemove}): `, e)
            this.$store.dispatch('offPreloader');
            this.$notify({
              group: 'user',
              type: 'error',
              title: 'Something went wrong!',
              text: 'Can\'t remove recipe. Please, try again later'
            });
            this.$router.push('/');
          })
      },
      close() {
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>
  #overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
