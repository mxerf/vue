<script>
import eventBus from "./eventBus";
import MainPage from "./pages/MainPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import ProductPage from "./pages/ProductPage.vue";

const routes = {
  main: MainPage,
  product: ProductPage,
  notFound: NotFoundPage,
};

export default {
  name: "App",
  components: {
    MainPage,
    NotFoundPage,
    ProductPage,
  },
  data() {
    return {
      currentPage: "main",
      currentPageParams: {},
    };
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || "NotFoundPage";
    },
  },
  created() {
    eventBus.$on("navigate", (page, params) => {
      this.currentPage = page;
      this.currentPageParams = params || {};
    });
  },
};
</script>

<template>
  <component :is="currentPageComponent" :params="currentPageParams" />
</template>
