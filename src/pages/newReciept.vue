<template>
  <div>
  <v-btn :disabled="dialog" :loading="dialog" class="white--text" color="purple darken-2" @click="dialog = true">
    Start loading
  </v-btn>
    <v-btn class="green darken-2" to="/">Back</v-btn>
  <v-dialog v-model="dialog" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        Please stand by
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "newReciept",
    data() {
      return {
        dialog: false
      }
    },
    watch: {
      dialog (val) {
        if (!val) return
        setTimeout(() => (this.dialog = false), 4000)
      },
    }
  }
</script>

<style scoped>

</style>
