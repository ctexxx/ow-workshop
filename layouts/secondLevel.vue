<template>
  <div>
    <div class="top-bar">
      <button class="back-button" @click="$router.push('/')">
        <span class="arrow"></span>
        Back
      </button>
    </div>
    <nuxt/>
  </div>
</template>

<style scoped lang="scss">
  @import "~@/assets/styles/variables";

  .top-bar {
    z-index: 3;
    position: sticky;
    top: 0;

    height: 60px;
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
        background-color: $secondary;
        color: white;

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
</style>
