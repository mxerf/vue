<script>
import FilterComponent from "@/components/FilterComponent/FilterComponent.vue";
import products from "@/data/products.js";
import Catalog from "@/modules/Catalog/Catalog.vue";

export default {
  components: {
    Catalog,
    FilterComponent,
  },
  data() {
    return {
      filters: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: "all",
      },
      filteredProducts: [],
    };
  },
  computed: {
    productsCount() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      this.applyFilters();
    },
    applyFilters() {
      this.filteredProducts = products.filter((product) => {
        const priceMatch =
          product.price >= +this.filters.priceFrom &&
          (+this.filters.priceTo === 0 ||
            product.price <= +this.filters.priceTo);
        const categoryMatch =
          +this.filters.categoryId === 0 ||
          product.categoryId === +this.filters.categoryId;
        const colorMatch =
          this.filters.colorId === "all" ||
          product.colors.includes(this.filters.colorId);

        return priceMatch && categoryMatch && colorMatch;
      });
    },
  },
  created() {
    this.filters = { ...this.filters, ...this.$route.query };
    this.applyFilters();
  },
};
</script>

<template>
  <div id="app">
    <main class="content container">
      <div class="content__top content__top--catalog">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> {{ productsCount }} товаров </span>
      </div>
      <div class="content__catalog">
        <FilterComponent :filters="filters" @update:filters="updateFilters" />
        <Catalog :products="filteredProducts" />
      </div>
    </main>
  </div>
</template>
