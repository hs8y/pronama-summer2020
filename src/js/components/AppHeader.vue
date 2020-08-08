<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand>{{ app.name }}</b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    app() { return this.$store.state.app; },
  },
}
</script>
