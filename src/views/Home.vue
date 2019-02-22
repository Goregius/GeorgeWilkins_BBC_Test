<template>
  <div class="home">
    <Article v-if="article" :article="article"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// @ is an alias to /src
import Article from '@/components/Article.vue'

export default {
  name: 'home',
  components: {
    Article
  },
  computed: mapState({
    article: state => state.currentArticle
  }),
  created() {
    this.$store.dispatch('updateCurrentArticle').catch(err => console.error(err));
  }
}
</script>
