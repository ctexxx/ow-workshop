<template>
  <div>
    <h1>{{ creation.title }}</h1>
    <p>{{ $options.categoryMeta[creation.category].displayName }}</p>
    by
    <template v-if="creation.creator !== null">
      <nuxt-link :to="`/creator/${creation.creator.id}`">{{ creation.creator.tag || "@" + creation.creator.twitter }}</nuxt-link>
    </template>
    <template v-else>
      Anonymous
    </template>
    <br/>
    <RenderMarkdown
      :source="processedDescription"
      :anchorAttributes="{rel: 'noopener', target: '_blank'}"
    />
  </div>
</template>

<script>
  import api from "@/assets/api";
  import RenderMarkdown from "vue-markdown";
  import categoryMeta from "@/assets/categoryMeta";

  const getCreationQuery = `
query getCreation($code: String!) {
  Creation(code: $code) {
    title
    description
    code
    category
    creator {
      tag
      twitter
      id
    }
  }
}
  `;

  export default {
    components: {
      RenderMarkdown
    },
    async asyncData(ctx) {
      return {
        creation: (await api.request(getCreationQuery, { code: ctx.route.params.code })).Creation
      }
    },
    computed: {
      processedDescription() {
        return this.creation.description.replace(/\\n/g, '\n');
      }
    },
    categoryMeta
  };
</script>

<style scoped lang="scss">

</style>
