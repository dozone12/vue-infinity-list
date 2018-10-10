import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from 'jsonp'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    photos: [],
    nextUrl: ''
  },
  mutations: {
    set(state, {type, item}) {
      state[type] = item
    },
    setPhotos(state, data){
      state.photos = [ ...state.photos, ...data]
    }
  },
  actions: {
    getPhotos({commit}, nextUrl = null){

      return new Promise((resolve, reject) => {

        const access_token = '283433050.f81c7d5.de71e6e819f14218ac16e3d8b17b6484'
        const count = 3

        let url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${access_token}&count=${count}`
        if (nextUrl !== null)
          url = nextUrl

        jsonp(url, (error, response) => {
          if (error) {
            throw reject('error')
          }

          const data = response.data
          const nextUrl = response.pagination.next_url

          commit('setPhotos', data)
          commit('set', {type: 'nextUrl', item: nextUrl})
          resolve('result')
        })
      })
    }
  }
})
