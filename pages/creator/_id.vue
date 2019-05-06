<template>
  <div class="box-container">
    <section class="box">
      <h1 class="title">Information</h1>
      <span class="social-tag" v-if="creator.tag">BattleTag: <span class="name">{{ creator.tag }}</span></span>
      <span class="social-tag" v-if="creator.twitter">
        Twitter:
        <a
          rel="noopener"
          :href="`https://twitter.com/${creator.twitter}`"
          target="_blank"
          class="name"
        >{{ creator.twitter }}</a>
      </span>
    </section>
    <section class="box">
      <h1 class="title">Creations</h1>
      <CreationsList :creations="creator.creations"/>
    </section>
  </div>
</template>

<style scoped lang="scss">
  @import "~@/assets/styles/elements";

  .social-tag {
    display: block;
    font-weight: bold;

    .name {
      font-weight: normal;
    }
  }
</style>

<script>
  import api from "@/assets/api";
  import CreationsList from "@/components/CreationsList";

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
    layout: "secondLevel",
    components: { CreationsList },
    async asyncData(ctx) {
      return {
        creator: (await api.request(getCreatorQuery, { id: ctx.route.params.id })).Creator
      }
    }
  };
</script>
