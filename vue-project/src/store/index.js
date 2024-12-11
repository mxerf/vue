import Vue from "vue";
import Vuex from "vuex";
import {
  add_to_cart,
  delete_from_cart,
  get_cart_data,
  update_product_amount,
} from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    cartProductsData: null,
    userAccessKey: null,
  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      localStorage.setItem("userAccessKey", accessKey);
      state.userAccessKey = accessKey;
    },

    updateCartProducts(state, data) {
      state.cartProductsData = data;
    },

    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },

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
    deleteProductFromCart(state, { productId }) {
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
      const detailedProducts = state.cartProducts.map((product) => {
        const productData = state.cartProductsData.find(
          (item) => item.product.id === product.productId
        );
        return {
          ...product,
          product: {
            ...productData.product,
            price: productData.price,
            image: productData.product.image.file.url,
          },
        };
      });
      return detailedProducts;
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailedProducts.reduce((sum, product) => {
        return sum + product.product.price * product.amount;
      }, 0);
    },
    cartAmount(state, getters) {
      return state.cartProductsData ? state.cartProducts.length : null;
    },
  },
  actions: {
    getCart(context) {
      const userAccessKey =
        context.state.userAccessKey ?? localStorage.getItem("userAccessKey");
      return get_cart_data(userAccessKey).then((data) => {
        context.commit("updateUserAccessKey", data.user.accessKey);
        context.commit("updateCartProducts", data.items);
        context.commit("syncCartProducts");
      });
    },
    addProductToCart(context, { productId, amount }) {
      return add_to_cart({
        productId,
        amount,
        userAccessKey: context.state.userAccessKey,
      })
        .then((data) => {
          context.commit("updateCartProducts", data.items);
          context.commit("syncCartProducts");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteProductFromCart(context, { productId }) {
      return delete_from_cart({
        productId,
        userAccessKey: context.state.userAccessKey,
      }).then((data) => {
        context.commit("updateCartProducts", data.items);
        context.commit("syncCartProducts");
      });
    },
    updateProductAmount(context, { productId, amount }) {
      return update_product_amount({
        productId,
        amount,
        userAccessKey: context.state.userAccessKey,
      }).then((data) => {
        context.commit("updateCartProducts", data.items);
        context.commit("syncCartProducts");
      });
    },
  },
});
