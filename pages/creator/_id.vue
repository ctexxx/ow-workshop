<template>
  <div>
    BattleTag: {{ creator.tag }}<br/>
    Twitter: @{{ creator.twitter }}
    <CreationsTable :creations="creator.creations"/>
  </div>

</template>

<script>
  import api from "@/assets/api";
  import CreationsTable from "@/components/CreationsTable";

  const getCreatorQuery = `
query getCreator($id:ID!) {
  Creator(id: $id) {
    tag
    twitter
    creations {
      title
      code
      category
    }
  }
}
  `;

  export default {
    name: "creator",
    components: { CreationsTable },
    async asyncData(ctx) {
      return {
        creator: (await api.request(getCreatorQuery, { id: ctx.route.params.id })).Creator
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
