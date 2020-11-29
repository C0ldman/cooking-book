<template>
  <v-row>
    <v-col cols="12">
      <v-row align="center" justify="center">
        <div class="caption">Share this recip</div>

        <Facebook class="media-icon" :url="shareUrl" :scale="scale"></Facebook>

        <Twitter class="media-icon" :url="shareUrl" :scale="scale"></Twitter>

        <Telegram class="media-icon" :url="shareUrl" :scale="scale"></Telegram>

        <WhatsApp class="media-icon" :url="shareUrl" :scale="scale"></WhatsApp>

        <Pinterest class="media-icon" :url="shareUrl" :scale="scale"></Pinterest>

        <Reddit class="media-icon" :url="shareUrl" :scale="scale"></Reddit>

        <Email class="media-icon" :url="shareUrl" :scale="scale"></Email>

      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  import {Facebook, Twitter, Telegram, WhatsApp, Email, Pinterest, Reddit} from 'vue-socialmedia-share';

  export default {
    name: "socialShare",
    props: {
      shareUrl: String
    },
    components: {
      Facebook,
      Twitter,
      Telegram,
      WhatsApp,
      Email,
      Pinterest,
      Reddit
    },
    data() {
      return {
        scale: '2',
        title: "Look at my awesome recipe!",
        body: 'Look at my awesome recipe!'
      }
    }
  }
</script>

<style scoped>
  .media-icon {
    margin-right: 10px;
  }

  .caption {
    margin-right: 10px;
    font-size: 1.25rem;
  }
</style>
