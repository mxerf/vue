<script>
import FooterComponent from "./components/Footer/FooterComponent.vue";
import HeaderComponent from "./components/Header/HeaderComponent.vue";
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
    HeaderComponent,
    FooterComponent,
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
    this.$store.dispatch("getCart");
  },
};
</script>

<template>
  <div>
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>
