<template>
  <main class="box-container center">
    <section class="box small">
      <h1 class="box-title">Notice of Non-Affiliation</h1>
      This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Blizzard or Overwatch.

      The names Overwatch and Blizzard as well as related names and images are registered trademarks of their respective owners.
    </section>
  </main>
</template>

<style scoped lang="scss">
  @import "~@/assets/styles/elements";

  .box {
    &:not(.box-title) {
      font-family: monospace;
      font-size: 1.2rem;
    }
  }
</style>

<script>
  export default {
    layout: "secondLevel"
  };
</script>
