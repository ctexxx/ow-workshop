<template>
  <main class="box-container center">
    <section class="box small">
      <h1 class="box-title">{{ message }}</h1>
      <nuxt-link to="/">Return to the home page</nuxt-link>
    </section>
  </main>
</template>

<style scoped lang="scss">
  @import "~@/assets/styles/elements";
</style>

<script>
  export default {
    layout: "secondLevel",
    props: ["error"],
    computed: {
      message() {
        if(this.error.displayMessage) {
          return this.error.displayMessage;
        } else {
          if (this.error.statusCode === 404) {
            return "This page could not be found.";
          } else {
            return "An error occurred";
          }
        }
      }
    }
  };
</script>
