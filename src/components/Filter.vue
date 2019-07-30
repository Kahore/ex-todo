<template>
  <section class="filter">
    <button
      class="filter-item"
      :class="{ active: filtedBy === 'all' }"
      @click="filterIt('all')">All</button>
    <button
      class="filter-item"
      :class="{ active: filtedBy === 'inProgress' }"
      @click="filterIt('inProgress')">In progress</button>
    <button
      class="filter-item"
      :class="{ active: filtedBy === 'completed' }"
      @click="filterIt('completed')">Completed</button>
  </section>
</template>

<script>
export default {
  name: 'TodoFilter',
  computed: {
    filtedBy() {
       return this.$store.getters.GET_TODO_FILTER;
    }
  },
  methods: {
    filterIt ( filterBy ) {
      this.$store.dispatch( 'LOAD_TODO', filterBy )
    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  &-item{
    margin:3px;
    padding: 3px;
    border: 1px solid transparent;
    &:hover  {
      border-color:  lighten($color: darkgray, $amount: 30%);
    }
    &.active {
      border-color:  lighten($color: darkgray, $amount: 10%);
    }
  }
}
</style>
