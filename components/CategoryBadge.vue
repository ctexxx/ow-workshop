<template>
  <span class="category-badge" :style="style" :title="meta.description">
    {{ meta.displayName }}
  </span>
</template>

<style scoped lang="scss">
  .category-badge {
    padding: 2px 8px;
    border-radius: 5px;
    margin-bottom: 4px;
    display: inline-block;
    text-align: center;
    font-size: 0.9rem;
  }
</style>

<script>
  import categoryMeta from "@/assets/categoryMeta";

  export default {
    name: "CategoryBadge",
    props: {
      category: {
        type: String,
        required: true,
        validator: v => Object.keys(categoryMeta).includes(v)
      }
    },
    computed: {
      style() {
        const { backgroundColor, color } = categoryMeta[this.category];
        return { backgroundColor, color: color || "black" };
      },
      meta() {
        return categoryMeta[this.category];
      }
    }
  };
</script>
