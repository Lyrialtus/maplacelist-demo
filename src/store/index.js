import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/database';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    places: [],
    loading: false,
    center: [],
    // Default map center: Saint Petersburg
    defaultCenter: [59.93885604, 30.31496100],
  },

  getters: {
    allPlaces(state) {
      return state.places;
    },
    loading(state) {
      return state.loading;
    },
    center(state) {
      return state.center;
    },
    defaultCenter(state) {
      return state.defaultCenter;
    },
  },

  mutations: {
    setAllPlaces(state, places) {
      state.places = places;
    },
    createPlace(state, place) {
      state.places.push(place);
    },
    deletePlace(state, placeId) {
      state.places = state.places.filter(place => place.id !== placeId);
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    setVisited(state, { isVisited, placeId }) {
      const index = state.places.findIndex(place => place.id === placeId);
      state.places[index].visited = isVisited;
    },
    setCenter(state, place) {
      state.center = [place.coords[0], place.coords[1]];
    },
    setDefaultCenter(state) {
      state.center = state.defaultCenter;
    },
  },

  actions: {
    getPlaces({ commit }) {
      commit('setDefaultCenter');
      commit('setLoading', true);
      firebase.database().ref('places').once('value')
      .then((data) => {
        const places = [];
        data.forEach((item) => {
          places.push({ ...item.toJSON(), id: item.key });
        });
        commit('setAllPlaces', places);
        commit('setLoading', false);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
        commit('setLoading', false);
      });
    },
    createPlace({ commit }, place) {
      commit('setLoading', true);
      commit('setCenter', place);
      firebase.database().ref('places').push(place)
      .then((data) => {
        commit('createPlace', { ...place, id: data.key });
        commit('setLoading', false);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
        commit('setLoading', false);
      });
    },
    deletePlace({ commit }, placeId) {
      firebase.database().ref(`places/${placeId}`).remove()
      .then(() => commit('deletePlace', placeId))
      // eslint-disable-next-line
      .catch(error => console.log(error));
    },
    setVisited({ commit }, { isVisited, placeId }) {
      firebase.database().ref(`places/${placeId}`)
      .update({ visited: isVisited })
      .then(() => commit('setVisited', { isVisited, placeId }))
      // eslint-disable-next-line
      .catch(error => console.log(error));
    },
  },
});
