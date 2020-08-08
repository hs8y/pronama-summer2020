<template>
  <div class="app">
    <AppHeader />

    <div class="app__body">
      <b-container>
        <h1 class="app__title">
          <small class="app__title__prefix">#プロ生ちゃんプロコン</small>
          絵日記ジェネレータ
        </h1>
      </b-container>

      <div class="app__preview">
        <b-container>
          <Preview />
        </b-container>
      </div>

      <div class="app__editor">
        <b-container>
          <Editor />
        </b-container>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.commit('updateCharacter', this.characters[0]);
  },

  computed: {
    app() { return this.$store.state.app; },
    characters() { return this.$store.state.characters; },
  },
}
</script>
