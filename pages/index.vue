<template>
  <main class="container">
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
      <h1 class="title">Creations<span class="spinner" :style="`opacity: ${loading ? 1 : 0}`"></span></h1>
      <CreationsList :creations="creations"/>
      <button :disabled="loading || allLoaded" class="button" @click="loadNext()">
        {{ buttonText }}
      </button>
    </section>
  </main>
</template>

<style lang="scss">
  @import "~@/assets/styles/elements";
  @import "~@/assets/styles/inputs";

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row-reverse;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;

    padding: 0;

    @media screen and (min-width: 480px) {
      padding: 20px;
    }
  }

  .content-section, .filter-section {
    flex-basis: 0;
    margin: 20px;
  }

  .content-section {
    order: 2;
    flex-grow: 3;

    .button {
      margin: 10px auto;
    }

    .title {
      .spinner {
        --size: 1.5rem;
        margin-left: 15px;

        transition: 200ms linear opacity;
      }
    }
  }

  .filter-section {
    min-width: fit-content;
    order: 1;
    flex-grow: 1;
  }
</style>

<script>
  import api from "@/assets/api";
  import InfiniteLoading from "vue-infinite-loading";
  import CreationsList from "@/components/CreationsList";
  import categoryMeta from "@/assets/categoryMeta";
  import { debounce } from "lodash";

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
    name: "index",
    components: { CreationsList, InfiniteLoading },
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
        loading: false
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
      }
    },
    methods: {
      async getMoreCreations(dontSkip = false) {
        return (
          await api.request(getCreationsQuery, {
            count: CREATIONS_FETCH_COUNT,
            skip: dontSkip ? 0 : this.creations.length,
            filter: this.filter
          })
        ).allCreations;
      },
      async loadNext(clear = false) {
        this.loading = true;
        const newCreations = await this.getMoreCreations(clear);

        if(clear) this.creations = [];

        this.creations.push(...newCreations);

        this.allLoaded = areAllLoaded(newCreations.length);

        this.loading = false;
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
