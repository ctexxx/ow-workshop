<template>
  <span class="loading-circle" :style="style"></span>
</template>

<style scoped lang="scss">
  .loading-circle {
    border: 2px solid var(--color);
    border-top-color: transparent;
    border-radius: 50%;

    width: var(--size);
    height: var(--size);
    display: inline-block;

    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
</style>

<script>
  export default {
    name: "LoadingCircle",
    props: {
      size: {
        type: Number,
        default: 20
      },
      color: {
        type: String,
        default: "currentColor"
      }
    },
    computed: {
      style() {
        return {
          "--size": this.size + "px",
          "--color": this.color
        }
      }
    }
  };
</script>
