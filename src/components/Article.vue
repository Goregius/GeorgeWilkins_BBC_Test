<template>
  <div v-if="article">
    <header>
      <h1>{{ article.title }}</h1>
    </header>
    <main>
        
    </main>
  </div>
</template>

<script>
export default {
  props: {
    article: Object
  },
};
</script>

<style>
</style>
