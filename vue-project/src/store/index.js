import products from "@/data/products";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const cartProduct = state.cartProducts.find(
        (product) => product.productId === productId
      );
      if (cartProduct) {
        cartProduct.amount += amount;
      } else {
        state.cartProducts.push({ productId, amount });
      }
    },
    deleteProductFromCart(state, productId) {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.productId !== productId
      );
    },
    updateProductAmount(state, { productId, amount }) {
      const cartProduct = state.cartProducts.find(
        (product) => product.productId === productId
      );
      if (!cartProduct) {
        return;
      }
      cartProduct.amount = amount;
    },
  },
  getters: {
    cartDetailedProducts(state) {
      return state.cartProducts.map((cartProduct) => {
        const product = products.find((p) => p.id === cartProduct.productId);
        return {
          productId: cartProduct.productId,
          product: product,
          amount: cartProduct.amount,
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailedProducts.reduce((sum, product) => {
        return sum + product.product.price * product.amount;
      }, 0);
    },
    cartAmount(state, getters) {
      return state.cartProducts.length;
    },
  },
});
