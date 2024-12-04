<!-- PaginationComponent -->
<script>
import PageIndexComponent from "./components/PageIndexComponent.vue";
export default {
  name: "PaginationComponent",
  components: {
    PageIndexComponent,
  },
  props: ["currentPage", "itemsCount", "itemsPerPage"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    updateCurrentPage(newValue) {
      this.$emit("update:currentPage", newValue);
    },
    nextPage() {
      if (this.currentPage < Math.ceil(this.itemsCount / this.itemsPerPage)) {
        this.updateCurrentPage(this.currentPage + 1);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.updateCurrentPage(this.currentPage - 1);
      }
    },
  },
};
</script>
<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow pagination__link--disabled"
        aria-label="Предыдущая страница"
        @click="prevPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <PageIndexComponent
      v-for="index in Math.ceil(itemsCount / itemsPerPage)"
      :key="index"
      :index="index"
      :current-page="currentPage"
      @update:currentPage="updateCurrentPage"
    />
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        aria-label="Следующая страница"
        @click="nextPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>
