<template>
  <div
    class="article"
    v-if="article"
  >
    <header>
      <h1>{{ article.title }}</h1>
    </header>
    <main>
      <div
        v-for="(item, articleIndex) in article.body"
        :key="articleIndex"
      >
        <h2 v-if="item.type === 'heading'">{{ item.model.text }}</h2>
        <p v-if="item.type === 'paragraph'">{{ item.model.text }}</p>
        <img
          v-if="item.type === 'image'"
          :src="item.model.url"
          :alt="item.model.altText"
          :height="item.model.height"
          :width="item.model.width"
        >
        <ul v-if="item.type === 'list' && item.model.type === 'unordered'">
          <li
            v-for="(listItem, listIndex) in item.model.items"
            :key="listIndex"
          >{{ listItem }}</li>
        </ul>
        <ol v-if="item.type === 'list' && item.model.type === 'ordered'">
          <li
            v-for="(listItem, listIndex) in item.model.items"
            :key="listIndex"
          >{{ listItem }}</li>
        </ol>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    article: state => state.currentArticle
  })
};
</script>

<style lang="scss">
.article {
  text-align: left;
}
</style>

