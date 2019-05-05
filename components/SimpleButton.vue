<template>
  <button class="button" v-on="$listeners">
    <slot/>
  </button>
</template>

<style scoped lang="scss">
  @import "~@/assets/styles/variables";

  .button {
    display: block;

    border: 2px solid $primary;
    border-radius: 40px;
    outline: none;

    padding: 10px 20px;

    background: none;

    color: black;
    font-size: 1.2rem;
    height: 53px;

    transition: 500ms ease background-color, 200ms linear border;
    &:hover:not(:disabled) {
      background-color: $primary;
    }

    &:disabled {
      border: 2px solid $secondary;
    }

    & > .loading-circle {
      position: relative;
      top: 3px;
      right: 0;

      margin-left: 5px;
    }
  }
</style>

<script>
  export default {
    name: "SimpleButton"
  };
</script>
