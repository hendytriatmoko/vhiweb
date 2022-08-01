import Vuex from 'vuex'
import auth from '@/store/auth'
import alert from '@/store/alert'

const createStore = () => {
  return new Vuex.Store({
    state: {
      prevUrl: '',
    },
    mutations: {
      setPrevUrl: (state, value) => {
        state.prevUrl = value
      },
    },
    actions: {
      setPrevUrl: ({ commit }, value) => {
        commit('setPrevUrl', value)
      },
    },
    getters: {
      prevUrl: state => state.prevUrl,
    },
    modules: {
      auth,
      alert
    }
  })
}

export default createStore