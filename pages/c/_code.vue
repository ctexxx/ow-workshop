<template>
  <div>
    <h1>{{ creation.title }}</h1>
    by {{ creation.author.tag }}<br/>
    <RenderMarkdown
      :source="processedDescription"
      :anchorAttributes="{rel: 'noopener', target: '_blank'}"
    />
  </div>
</template>

<script>
  import api from "@/assets/api";
  import RenderMarkdown from "vue-markdown";

  const getCreationQuery = `
query getCreation($code: String!) {
  Creation(code: $code) {
    title
    description
    code
    author {
      tag
      twitter
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
    }
  };
</script>

<style scoped lang="scss">

</style>
