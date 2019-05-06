<template>
  <ul class="creations-list">
    <li
      v-for="creation in creations"
      :key="creation.code"
      @click="$router.push(`/c/${creation.code}`)"
    >
      <CategoryBadge :category="creation.category"/>
      <span class="title">{{ creation.title }} - {{ creation.code }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  @import "~@/assets/styles/variables";

  .creations-list {
    list-style: none;

    padding: 0;
    margin: 0;
    border-radius: 5px;
    overflow: hidden;

    width: 100%;

    li {
      padding: 10px;
      cursor: pointer;

      border-top: 1px solid $gray;

      &:last-child {
        border-bottom: 1px solid $gray;
      }

      .title {
        font-weight: bold;
        display: block;
      }

      transition: 200ms ease background-color;
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
</style>

<script>
  import CategoryBadge from "@/components/CategoryBadge";

  export default {
    name: "CreationTable",
    components: { CategoryBadge },
    props: {
      creations: {
        type: Array,
        required: true
      }
    }
  };
</script>
