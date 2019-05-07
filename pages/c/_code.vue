<template>
  <div class="box-container">
    <div class="left-column">
      <section class="box information-section">
        <CategoryBadge :category="creation.category"/>
        <h1 class="box-title">{{ creation.title }}</h1>
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
        <span class="code">Code: {{ creation.code }}</span>
        <SimpleButton class="copy-code full-width" @click="copyCode" :disabled="this.copiedTimeout !== null">
          {{ this.copiedTimeout === null ? "Copy" : "Copied!" }}
        </SimpleButton>
      </section>
      <section class="box video-section" v-if="creation.video !== null">
        <h1 class="box-title">Video</h1>
        <div class="video-container">
          <iframe
            class="video-iframe"
            :class="{loaded: videoLoaded}"
            width="640" height="360"
            :src="`https://www.youtube.com/embed/${creation.video}`"
            @load="videoLoaded = true"
          ></iframe>
          <LoadingCircle class="video-loading"/>
        </div>
      </section>
    </div>
    <section class="box description-section">
      <h1 class="box-title">Description</h1>
      <RenderMarkdown
        v-if="creation.description !== null"
        class="description"
        :source="processedDescription"
        :anchorAttributes="{rel: 'noopener', target: '_blank'}"
      />
      <template v-else>
        <i>No description</i>
      </template>
    </section>
  </div>
</template>

<style scoped lang="scss">
  @import "~@/assets/styles/elements";
  @import "~@/assets/styles/variables";
  @import "~@/assets/styles/mixins";

  .left-column {
    @include minWidthIfAvailable(300px);
    display: flex;
    flex-direction: column;

    flex-grow: 1;
    flex-basis: 0;
  }

  .information-section {
    .code {
      display: block;
      font-family: monospace;
      font-size: 1.5rem;

      margin-top: 20px;
    }

    .copy-code {
      margin-top: 20px;
      height: 40px;
      font-size: 1rem;
    }

    .creator {
      display: block;

      & > a {
        font-weight: bold;
      }
    }
  }

  .video-section {
    padding: 1%;

    .box-title {
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
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-width: 100%;

        border: none;

        transition: opacity 200ms ease-in 200ms;
        opacity: 0;
        &.loaded {
          opacity: 1;
        }
      }

      .video-loading {
        $size: 40px;

        --size: #{$size} !important;
        position: absolute;
        top: calc(40% - #{$size} / 2);
        left: calc(50% - #{$size} / 2);
      }
    }
  }

  .description-section {
    flex-grow: 2;

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
  import LoadingCircle from "@/components/LoadingCircle";
  import SimpleButton from "@/components/SimpleButton";

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
    components: { SimpleButton, LoadingCircle, CategoryBadge, RenderMarkdown },
    beforeDestroy() {
      if(this.copiedTimeout !== null) {
        clearTimeout(this.copiedTimeout);
      }
    },
    async asyncData (ctx) {
      if(ctx.route.params.code) {
        const creation = (await api.request(getCreationQuery, { code: ctx.route.params.code })).Creation;

        if(creation) {
          return {
            creation
          };
        } else {
          ctx.error({
            statusCode: 404,
            displayMessage: "This creation could not be found."
          });
        }
      } else {
        ctx.error({
          statusCode: 404
        });
      }
    },
    data: () => ({
      videoLoaded: false,
      copiedTimeout: null
    }),
    computed: {
      processedDescription () {
        if(this.creation.description !== null) {
          return this.creation.description.replace(/\\n/g, "\n");
        }
      }
    },
    methods: {
      copyCode() {
        this.$copyText(this.creation.code).then(() => {
          if(this.copiedTimeout !== null) {
            clearTimeout(this.copiedTimeout);
          }

          this.copiedTimeout = setTimeout(() => {
            this.copiedTimeout = null;
          }, 2000)
        });
      }
    },
    categoryMeta
  };
</script>
