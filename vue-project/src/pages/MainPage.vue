<script>
import FilterComponent from "@/components/FilterComponent/FilterComponent.vue";
import PaginationComponent from "@/components/PaginationComponent/PaginationComponent.vue";
import ProductList from "@/components/ProductList/ProductList.vue";
import Catalog from "@/modules/Catalog/Catalog.vue";
import { get_products_data } from "../api";

export default {
  components: {
    Catalog,
    FilterComponent,
    ProductList,
    PaginationComponent,
  },
  data() {
    return {
      pageParams: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: 0,
        page: 1,
      },
      limit: 3,
      productsData: null,
      isProductsLoading: false,
      isProductsLoadingError: false,
    };
  },
  computed: {
    productsCount() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    filteredProducts() {
      return this.productsData
        ? this.productsData.items.map((pd) => ({
            ...pd,
            image: pd.image.file.url,
          }))
        : [];
    },
  },
  methods: {
    updateParams(newParams) {
      this.pageParams = { ...this.pageParams, ...newParams };
      this.pageParams.page = 1;
    },

    getProductsData() {
      this.isProductsLoading = true;
      get_products_data({
        ...this.pageParams,
        limit: this.limit,
      })
        .then((data) => (this.productsData = data))
        .catch(() => (this.isProductsLoadingError = true))
        .finally(() => (this.isProductsLoading = false));
    },
  },
  created() {
    this.pageParams = {
      page: +this.$route.query.page || 1,
      priceFrom: +this.$route.query.priceFrom || 0,
      priceTo: +this.$route.query.priceTo || 0,
      categoryId: +this.$route.query.categoryId || 0,
      colorId: +this.$route.query.colorId || 0,
    };
  },
  watch: {
    pageParams: {
      handler() {
        this.$router.push({
          query: { ...this.pageParams },
        });
        this.getProductsData();
      },
      deep: true,
    },
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
        <FilterComponent :filters="pageParams" @update:filters="updateParams" />
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          "
          v-if="isProductsLoading"
        >
          <span class="loader" />
        </div>
        <div v-else-if="isProductsLoadingError">
          Произошла ошибка
          <button @click.prevent="getProductsData">Повторить попытку</button>
        </div>
        <section class="catalog" v-else>
          <ProductList :products="filteredProducts" />
          <PaginationComponent
            :items-count="productsCount"
            :items-per-page="limit"
            :current-page.sync="pageParams.page"
          />
        </section>
      </div>
    </main>
  </div>
</template>
