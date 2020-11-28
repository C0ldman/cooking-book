import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db} from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:[],
    preloader:false,
    showFavourites:false
  },
  mutations: {
    ...vuexfireMutations,
    onPreloader(){
      this.state.preloader = true;
    },
    offPreloader(){
      this.state.preloader = false;
    },
    updateFavourite(context,id){
      let element = this.state.data.filter(el=>el.id ==id);
      db.collection('reciepts').doc(id).update({
        isFavourite:!element[0].isFavourite
      })
    },
    toggleFavourites(){
      this.state.showFavourites=!this.state.showFavourites
    }
  },
  actions: {
    bindBase: firestoreAction(context => {
      return context.bindFirestoreRef('data', db.collection('reciepts'))
    }),
    onPreloader({commit}){
      commit('onPreloader')
    },
    offPreloader({commit}){
      commit('offPreloader')
    },
    updateFavourite({commit},id){
      commit('updateFavourite',id)
    },
    toggleFavourites({commit}){
      commit('toggleFavourites')
    }
  },
  getters:{
    favourites: state =>{
      return state.data.filter(recipe=>recipe.isFavourite)
    },
    data:state => state.data,
    element: state=>id=>{
      return state.data.find(el=>el.id == id)
    }
  },
  modules: {
  }
})
