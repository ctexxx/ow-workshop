<template>
  <ul class="creations-list">
    <li
      v-for="creation in creations"
      :key="creation.code"
      @click="$router.push(`/c/${creation.code}`)"
    >
      <CategoryBadge :category="creation.category"/>
      <span class="title">{{ creation.title }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .creations-list {
    list-style: none;

    padding: 0;
    margin: 0;
    border-radius: 5px;
    overflow: hidden;

    li {
      padding: 10px;
      cursor: pointer;

      &:not(:last-child) {
        border-bottom: 1px solid #d4d4e1;
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
