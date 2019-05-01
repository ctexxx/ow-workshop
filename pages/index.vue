<template>
  <div class="infinite-wrapper">
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Code</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="creation in creations" :key="creation.code" @click="$router.push(`/c/${creation.code}`)">
        <th>{{ creation.title }}</th>
        <th>{{ creation.code }}</th>
      </tr>
      </tbody>
    </table>
    <InfiniteLoading
      @infinite="infiniteHandler"
      force-use-infinite-wrapper
      spinner="spiral"
    >
      <template v-slot:no-more>
        No more creations
      </template>
      <template v-slot:no-results>
        No creations found
      </template>
      <template v-slot:error="{trigger}">
        An error occured while loading. <a href="javascript:void(0)" @click="trigger()">Click here to retry.</a>
      </template>
    </InfiniteLoading>
  </div>
</template>

<script>
  import api from "@/assets/api";
  import InfiniteLoading from "vue-infinite-loading";

  const CREATIONS_FETCH_COUNT = 10;

  const getCreationsQuery = `
query getCreations($count:Int! $skip:Int) {
  allCreations(first: $count skip: $skip) {
    title
    code
  }
}
  `;

  export default {
    name: "index",
    components: { InfiniteLoading },
    async asyncData () {
      return {
        creations: (await api.request(getCreationsQuery, { count: CREATIONS_FETCH_COUNT, skip: 0 })).allCreations
      };
    },
    methods: {
      async getMoreCreations() {
        return (await api.request(getCreationsQuery, { count: CREATIONS_FETCH_COUNT, skip: this.creations.length })).allCreations
      },
      async infiniteHandler(state) {
        const newCreations = await this.getMoreCreations();

        if(newCreations.length === 0) {
          state.complete();
        } else {
          console.log(this.creations);
          this.creations.push(...newCreations);
          state.loaded();
        }
      }
    }
  };
</script>

<style lang="scss">
  .infinite-wrapper {
    height: 100%;
  }
</style>
