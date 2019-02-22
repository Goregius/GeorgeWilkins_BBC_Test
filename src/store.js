import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    articleNames: ['article-1', 'article-2', 'article-3', 'article-4', 'article-5'],
    currentArticleName: null,
    currentArticle: null,
  },
  mutations: {
    initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
      }
      if (!state.currentArticleName) {
        // Selects a random article.
        state.currentArticleName = state.articleNames[Math.floor(Math.random()*state.articleNames.length)];
      }
      // Makes sure that state.articlseNames doesn't include the current article name
      state.articleNames = state.articleNames.filter(name => name !== state.currentArticleName);
    },
    newArticleName(state) {
      if (state.articleNames.length === 0) return false; 
      // Selects a random article.
      state.currentArticleName = state.articleNames[Math.floor(Math.random()*state.articleNames.length)];
      // Removes the new article name from article names
      state.articleNames = state.articleNames.filter(name => name !== state.currentArticleName);

      return true;
    },
    retrieveArticle(state) {
      try {
        state.currentArticle = require(`./assets/data/${state.currentArticleName}.json`);
      } catch (error) {
        state.currentArticleName = null;
        state.currentArticle = null;
        throw error;
      }
      
    }
  },
  actions: {
    initialiseStore({ commit }) {
      commit('initialiseStore');
    },
    getNewArticle({ commit }) {
      // Simulating api
      return new Promise((resolve, reject) => {
        if (commit('newArticleName')) {
          commit('retrieveArticle')
          resolve(true);
        }
        else {
          resolve(false);
        }
        reject("Error retrieving a new article.");
      })
    },
    updateCurrentArticle({ commit }) {
      // Simulating api
      return new Promise((resolve, reject) => {
        try {
          commit('retrieveArticle');
          resolve();
        } catch (error) {
          reject("The article could not be loaded");
        }
      })
    }
  }
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
  const store = {
    articleNames: state.articleNames,
    currentArticleName: state.currentArticleName
  }
	// Store the state object as a JSON string
	localStorage.setItem('store', JSON.stringify(store));
});

export default store;