<script>
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent.vue";
import ProductList from "../../components/ProductList/ProductList.vue";

export default {
  name: "Catalog",
  components: {
    ProductList,
    PaginationComponent,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    currentPageProducts() {
      const offset = (this.currentPage - 1) * this.productsPerPage;
      return this.products.slice(offset, offset + this.productsPerPage);
    },
    productsCount() {
      return this.products.length;
    },
  },
  watch: {
    products() {
      this.currentPage = 1;
    },
  },
};
</script>
<template>
  <section class="catalog">
    <ProductList :products="currentPageProducts" />
    <PaginationComponent
      :items-count="productsCount"
      :items-per-page="productsPerPage"
      :current-page.sync="currentPage"
    />
  </section>
</template>
