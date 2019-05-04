<template>
  <div>
    <div class="category-filter">
      <label v-for="category in Object.keys($options.categoryMeta)">
        <input
          type="checkbox"
          v-model="categories"
          :value="category"
        />
        {{ $options.categoryMeta[category].displayName }}
      </label>
    </div>
    <label>
      Search (title or code)
      <input type="text" v-model="search"/>
    </label>
    <CreationsTable :creations="creations"/>
    <button v-if="loading" disabled>
      Loading
    </button>
    <button v-else-if="allLoaded" disabled>
      No more creations
    </button>
    <button v-else @click="loadNext()">
      Load more
    </button>
  </div>
</template>

<script>
  import api from "@/assets/api";
  import InfiniteLoading from "vue-infinite-loading";
  import CreationsTable from "@/components/CreationsTable";
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

  export default {
    name: "index",
    components: { CreationsTable, InfiniteLoading },
    async asyncData () {
      return {
        creations: (await api.request(getCreationsQuery, { count: CREATIONS_FETCH_COUNT, skip: 0 })).allCreations
      };
    },
    data() {
      return {
        categories: Object.keys(categoryMeta),
        search: "",
        allLoaded: false,
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

        this.allLoaded = newCreations.length === 0 || newCreations.length < CREATIONS_FETCH_COUNT;

        this.loading = false;
      }
    },
    watch: {
      filter: debounce(function () {
        this.loadNext(true);
      }, 500, { maxWait: 1000 })
    },
    categoryMeta
  };
</script>

<style lang="scss">

</style>
