<template>
  <div class="box-container">
    <div class="left-column">
      <section class="box information-section">
        <CategoryBadge :category="creation.category"/>
        <h1 class="title">{{ creation.title }}</h1>
        <span class="creator">
      by
        <template v-if="creation.creator !== null">
        <nuxt-link :to="`/creator/${creation.creator.id}`">
          {{ creation.creator.tag || "@" + creation.creator.twitter }}
        </nuxt-link>
        </template>
        <template v-else>
          Anonymous
        </template>
      </span>
      </section>
      <section class="box video-section" v-if="creation.video !== null">
        <h1 class="title">Video</h1>
        <div class="video-container">
          <iframe
            class="video-iframe"
            width="640" height="360"
            :src="`http://www.youtube.com/embed/${creation.video}`"
          ></iframe>
        </div>
      </section>
    </div>
    <section class="box description-section">
      <h1 class="title">Description</h1>
      <RenderMarkdown
        class="description"
        :source="processedDescription"
        :anchorAttributes="{rel: 'noopener', target: '_blank'}"
      />
    </section>
  </div>
</template>

<style scoped lang="scss">
  @import "~@/assets/styles/elements";
  @import "~@/assets/styles/variables";

  .left-column {
    display: flex;
    flex-direction: column;

    flex-grow: 1;
    flex-basis: 0;

    min-width: 300px;
  }

  .information-section {
    .creator {
      display: block;

      & > a {
        font-weight: bold;
      }
    }
  }

  .video-section {
    padding: 1%;

    .title {
      border-radius: inherit;
      padding: 30px 30px 0;
    }

    .video-container {
      position: relative;
      padding-bottom: 56.25%; /* ratio 16x9 */
      overflow: hidden;
      width: 100%;
      height: auto;

      .video-iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-width: 100%;

        border: none;
      }
    }
  }

  .description-section {
    flex-grow: 1;

    .description {
      $h1-size: 1.3rem;
      $subtrahend: 0.1rem;

      @for $i from 1 through 6 {
        & /deep/ h#{$i} {
          font-size: $h1-size - ($subtrahend * ($i - 1));
        }
      }
    }
  }
</style>

<script>
  import api from "@/assets/api";
  import RenderMarkdown from "vue-markdown";
  import categoryMeta from "@/assets/categoryMeta";
  import CategoryBadge from "@/components/CategoryBadge";

  const getCreationQuery = `
query getCreation($code: String!) {
  Creation(code: $code) {
    title
    description
    code
    category
    video
    creator {
      tag
      twitter
      id
    }
  }
}
  `;

  export default {
    layout: "secondLevel",
    components: {
      CategoryBadge,
      RenderMarkdown
    },
    async asyncData (ctx) {
      return {
        creation: (await api.request(getCreationQuery, { code: ctx.route.params.code })).Creation
      };
    },
    computed: {
      processedDescription () {
        return this.creation.description.replace(/\\n/g, "\n");
      }
    },
    categoryMeta
  };
</script>
