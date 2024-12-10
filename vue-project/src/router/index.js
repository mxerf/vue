import Vue from "vue";
import VueRouter from "vue-router";
import CartPage from "../pages/CartPage.vue";
import MainPage from "../pages/MainPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import ProductPage from "../pages/ProductPage.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartPage,
    },
    {
      path: "/product/:id",
      name: "product",
      component: ProductPage,
    },
    {
      path: "*",
      name: "notFound",
      component: NotFoundPage,
    },
  ],
});

export default router;
