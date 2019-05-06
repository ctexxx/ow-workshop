<template>
  <main class="box-container">
    <section class="box filter-section">
      <h1 class="title">Filter</h1>
      <h2 class="subtitle">
        Search (title or code)
      </h2>
      <label class="input">
        <input type="text" v-model="search" class="full-width"/>
      </label>
      <h2 class="subtitle">
        Category
      </h2>
      <label class="input">
        <input type="checkbox" v-model="allCategoriesSelected"/>
        All
      </label>
      <hr class="separator"/>
      <label v-for="category in Object.keys($options.categoryMeta)" class="input">
        <input
          type="checkbox"
          v-model="categories"
          :value="category"
        />
        {{ $options.categoryMeta[category].displayName }}
      </label>
    </section>
    <section class="box content-section">
      <h1 class="title">Creations</h1>
      <CreationsList :creations="creations"/>
      <SimpleButton :disabled="loading || allLoaded" class="button" @click="loadNext()">
        {{ buttonText }}<LoadingCircle class="loading-circle" v-show="loading" color="#555555"/>
      </SimpleButton>
    </section>
    <section class="box submit-section">
      <h1 class="title">Submit yours</h1>
      <p>Use <a rel="noopener" href="https://forms.gle/i4EawBQoXeks3Jtt9">this form</a>.</p>
      <p>
        Or, if you have a GitHub account, please
        <a
          rel="noopener"
          href="https://github.com/ctexxx/ow-workshop/issues/new?labels=submission&title=Submission%20[TITLE]&template=submission.md"
        >create an issue</a>.
      </p>
    </section>
  </main>
</template>

<style lang="scss">
  @import "~@/assets/styles/elements";
  @import "~@/assets/styles/inputs";
  @import "~@/assets/styles/mixins";

  .content-section {
    @include minWidthIfAvailable(360px);
    flex-grow: 3;

    .button {
      margin: 10px auto;
    }

    .title {
      .loading-circle {
        --size: 1.5rem;
        margin-left: 15px;

        transition: 200ms linear opacity;
      }
    }
  }

  .filter-section {
    @include minWidthIfAvailable(360px);
    flex-grow: 1;

    .separator {
      margin: 10px 0 20px;
    }
  }

  .submit-section {
    @include minWidthIfAvailable(200px);
    flex-grow: 1;
  }
</style>

<script>
  import api from "@/assets/api";
  import CreationsList from "@/components/CreationsList";
  import categoryMeta from "@/assets/categoryMeta";
  import { debounce } from "lodash";
  import SimpleButton from "@/components/SimpleButton";
  import LoadingCircle from "@/components/LoadingCircle";

  const CREATIONS_FETCH_COUNT = 10;

  const getCreationsQuery = `
query getCreations($count:Int $skip:Int $filter:CreationFilter) {
  allCreations(first: $count skip: $skip filter: $filter) {
    title
    code
    category
  }
}
  `;

  const areAllLoaded = (length) => length === 0 || length < CREATIONS_FETCH_COUNT;

  export default {
    components: { LoadingCircle, SimpleButton, CreationsList },
    async asyncData () {
      const creations = (await api.request(getCreationsQuery, { count: CREATIONS_FETCH_COUNT, skip: 0 })).allCreations;

      return {
        allLoaded: areAllLoaded(creations.length),
        creations
      };
    },
    data() {
      return {
        categories: Object.keys(categoryMeta),
        search: "",
        loading: false,
        latestRequest: null
      }
    },
    computed: {
      filter() {
        const filter = {
          AND: [{ "category_in": this.categories }]
        };

        if(this.search !== "") {
          filter.AND.push({
            OR: [
              { "title_contains": this.search },
              { "code_contains": this.search }
            ]
          });
        }

        return filter;
      },
      buttonText() {
        if(this.loading) {
          return "Loading...";
        } else if(this.allLoaded) {
          return "That’s all."
        } else {
          return "Load more"
        }
      },
      allCategoriesSelected: {
        set(v) {
          if(v) {
            this.categories = Object.keys(categoryMeta);
          } else {
            this.categories = [];
          }
        },
        get() {
          return this.categories.length === Object.keys(categoryMeta).length;
        }
      }
    },
    methods: {
      async getMoreCreations(dontSkip = false) {
        if(this.categories.length !== 0) {
          return (
            await api.request(getCreationsQuery, {
              count: CREATIONS_FETCH_COUNT,
              skip: dontSkip ? 0 : this.creations.length,
              filter: this.filter
            })
          ).allCreations;
        } else {
          return [];
        }
      },
      async loadNext(clear = false) {
        const timestamp = Date.now();
        this.latestRequest = timestamp;

        this.loading = true;
        const newCreations = await this.getMoreCreations(clear);

        if(this.latestRequest === timestamp) {
          if(clear) this.creations = [];

          this.creations.push(...newCreations);

          this.allLoaded = areAllLoaded(newCreations.length);

          this.loading = false;
        }
      }
    },
    watch: {
      filter: debounce(function () {
        this.loadNext(true);
      }, 500, { leading: true })
    },
    categoryMeta
  };
</script>
