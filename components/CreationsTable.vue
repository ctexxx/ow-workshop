<template>
  <table>
    <thead>
    <tr>
      <th></th>
      <th>Title</th>
      <th>Code</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="creation in creations" :key="creation.code" @click="$router.push(`/c/${creation.code}`)">
      <th>{{ $options.categoryMeta[creation.category].displayName }}</th>
      <th>{{ creation.title }}</th>
      <th>{{ creation.code }}</th>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import categoryMeta from "@/assets/categoryMeta";

  export default {
    name: "CreationTable",
    props: {
      creations: {
        type: Array,
        required: true
      }
    },
    categoryMeta
  };
</script>

<style scoped lang="scss">

</style>
