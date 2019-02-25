import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articleNamesLeft: ['article-1', 'article-2', 'article-3', 'article-4', 'article-5'],
    articlesReviewed: [],
    currentArticleName: null,
    currentArticle: null,
    allArticlesRead: false,
    completed: false,
    initialised: false
  },
  getters: {
    noNewArticles: state => state.articleNamesLeft.length === 0
  },
  mutations: {
    initialiseStore(state) {
      return new Promise(resolve => {
        if (state.initialised) resolve();
        // Check if the ID exists
        if (localStorage.getItem('store')) {
          this.replaceState(
            Object.assign(state, JSON.parse(localStorage.getItem('store')))
          );
        }
        if (!state.currentArticleName) {
          // Selects a random article.
          state.currentArticleName = state.articleNamesLeft[Math.floor(Math.random() * state.articleNamesLeft.length)];
        }
        // Makes sure that state.articlseNames doesn't include the current article name
        state.articleNamesLeft = state.articleNamesLeft.filter(name => name !== state.currentArticleName);
        state.initialised = true;
        resolve();
      })


    },
    newArticleName(state) {
      // Selects a random article.
      state.currentArticleName = state.articleNamesLeft[Math.floor(Math.random() * state.articleNamesLeft.length)];
      // Removes the new article name from article names
      state.articleNamesLeft = state.articleNamesLeft.filter(name => name !== state.currentArticleName);
    },
    retrieveArticle(state, article) {
      state.currentArticle = article;
      
    },
    allArticlesRead(state) {
      state.allArticlesRead = true;
    },
    completed(state) {
      state.completed = true;
    }
  },
  actions: {
    initialiseStore({ commit }) {
      commit('initialiseStore');
    },
    async getNewArticle({ commit, getters, dispatch, state }) {
      if (getters.noNewArticles) {
        throw 'No more articles';
      }
      if (!state.articlesReviewed.some(articleData => articleData.title === state.currentArticle.title)) {
        state.articlesReviewed.push({ title: state.currentArticle.title, name: state.currentArticleName });
      }
      commit('newArticleName');
      await dispatch('getCurrentArticle');

    },
    getCurrentArticle({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        if (state.allArticlesRead) {
          reject("All articles read.")
        }
        try {
          const article = (await axios.get(`https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/${state.currentArticleName}.json`)).data;
          commit('retrieveArticle', article);
          resolve('Article received');
        } catch (error) {
          state.currentArticleName = null;
          state.currentArticle = null;
          reject(error);
        }
      })
    },
    articlesFinished({ commit, state }) {
      // Simulating api
      return new Promise((resolve) => {
        if (!state.articlesReviewed.some(articleData => articleData.title === state.currentArticle.title)) {
          state.articlesReviewed.push({ title: state.currentArticle.title, name: state.currentArticleName });
        }
        commit('allArticlesRead');
        resolve();
      });
    },
    async postRankings({ commit }, rankings) {
      function dummyPost() {
        return () => new Promise(resolve => setTimeout(resolve(rankings), 20));
      }

      const response = await dummyPost(`api/rankings`, rankings);
      commit('completed');
      return response;
    },
  }
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
  const store = {
    articleNamesLeft: state.articleNamesLeft,
    currentArticleName: state.currentArticleName,
    allArticlesRead: state.allArticlesRead,
    articlesReviewed: state.articlesReviewed,
    completed: state.completed
  }
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(store));
});

export default store;