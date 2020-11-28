import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db} from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:[]
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
    bindBase: firestoreAction(context => {
      context.bindFirestoreRef('data', db.collection('reciepts'))
    })
  },
  getters:{
    favourites: state =>{
      return state.data.filter(recipe=>recipe.isFavourite)
    },
    data:state => state.data
  },
  modules: {
  }
})
