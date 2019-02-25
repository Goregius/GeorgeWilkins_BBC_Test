<template>
  <div>
    <header>
      <h1>Articles review</h1>
    </header>
    <main>
      <section>
        <p><i>Rank the articles listed below from 1 (best) to {{ articles.length }} (worst).</i></p>
      </section>
      <form>
        <div
          v-for="(article, articleIndex) in articles"
          :key="articleIndex"
          class="articleInputGroup"
        >
          <div><b>{{ article.title }}</b></div>
          <select
            name="rank-select"
            id="rank-select"
            v-model="selects[articleIndex]"
          >
            <option
              disabled
              value=""
            >Please select a rank</option>
            <option
              v-for="(_, index) in articles"
              :key="index"
              :value="index"
            >
              {{ index + 1 }}
            </option>
          </select>
        </div>
        <p class="error" v-if="submitErrorMessage">{{ submitErrorMessage }}</p>
        <button
          type="submit"
          @click.prevent="onSubmit"
        >Submit Rankings</button>
      </form>

    </main>
  </div>

</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    const state = this.$store.state;
    return {
      // An array which includes '', length of state.articlesReviewed many times
      selects: [""].reduce(acc => {
        state.articlesReviewed.forEach(() => acc.push(""));
        return acc;
      }, []),
      submitErrorMessage: ""
    };
  },
  computed: mapState({
    articles: state => state.articlesReviewed
  }),
  methods: {
    onSubmit() {
      if (this.selects.some(selected => selected === "")) {
        this.submitErrorMessage = "You need to rank all the articles."
      } else if (new Set(this.selects).size !== this.selects.length) {
        this.submitErrorMessage = "Each rank needs to be unique."
      } else {
        this.submitErrorMessage = ""
        this.submitRankings();
      }
    },
    submitRankings() {
        const rankings = this.selects.map((rank, index) => ({ rank,  name: this.articles[index].name}));
        this.$store.dispatch('postRankings', rankings).then(() => {
            this.$router.push({ name: 'completed' })
        });
    }
  }
};
</script>

<style lang="scss">
.error {
    color: red;
}
</style>

<style lang="scss" scoped>
select {
    margin-top: 0.5rem;
}
.articleInputGroup {
    margin-bottom: 1rem;
}
button {
    font-size: medium;
}

</style>

