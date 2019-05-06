<template>
  <div class="layout">
    <div class="top-bar">
      <button class="back-button" @click="$router.push('/')">
        <span class="arrow"></span>
        Home
      </button>
    </div>
    <div class="content">
      <nuxt/>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "~@/assets/styles/variables";

  $top-bar-height: 60px;

  .top-bar {
    z-index: 3;
    position: sticky;
    top: 0;

    height: $top-bar-height;
    width: 100%;

    background: $primary;

    box-shadow: 0px -7px 20px 6px rgba(0, 0, 0, 0.75);

    .back-button {
      $transition-duration: 400ms;

      height: 100%;
      background: none;
      border: none;
      outline: none;

      font-size: 1.2rem;
      color: black;

      padding: 0 20px 24px;

      transition: $transition-duration ease;
      transition-property: background-color, color;
      &:hover {
        background-color: rgba(0,0,0,0.10);

        .arrow {
          transform: translateX(-5px);
        }
      }

      .arrow {
        position: relative;
        width: 25px;
        height: 100%;

        margin-right: 10px;

        display: inline-block;
        transform: translateX(0);
        transition: $transition-duration ease transform;

        &::before, &::after {
          display: inline-block;
          content: "";
          width: 25px;
          height: 3px;

          background-color: currentColor;

          position: absolute;
          left: 0;
        }

        &::before {
          transform: rotate(-45deg);
          top: 20px;
        }

        &::after {
          transform: rotate(45deg);
          top: 35px;
        }
      }
    }
  }

  .content {
    height: calc(100% - #{$top-bar-height});
  }
</style>
