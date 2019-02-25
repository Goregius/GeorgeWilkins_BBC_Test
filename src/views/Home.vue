<template>
  <div class="home">
    <Article />
    <span v-if="showButton">
      <button
        v-if="!$store.getters.noNewArticles"
        @click="nextArticle"
      >Next article</button>
      <button
        v-if="$store.getters.noNewArticles"
        @click="goToReview"
      >Go to review</button>
    </span>

  </div>
</template>

<script>
// @ is an alias to /src
import Article from "@/components/Article.vue";

export default {
  name: "home",
  data() {
    return {
      showButton: false
    };
  },
  components: {
    Article
  },
  methods: {
    nextArticle() {
      this.showButton = false;
      this.$store.dispatch("getNewArticle").then(() => this.showButton = true).catch(() => this.showButton = true)
    },
    goToReview() {
      this.$store
        .dispatch("articlesFinished")
        .then(() => this.$router.push({ name: "review" }));
    }
  },
  created() {
    this.$store
      .dispatch("getCurrentArticle")
      .then(() => this.showButton = true)
      .catch(err => {
        if (this.$store.state.allArticlesRead) {
          this.$router.push({ name: "review" });
        } else {
          console.error(err);
        }
      });
  }
};
</script>

<style lang="scss">
</style>


