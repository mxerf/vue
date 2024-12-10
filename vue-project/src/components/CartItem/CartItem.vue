<script>
import numberFormat from "@/helpers/numberFormat";
import { mapMutations } from "vuex";
export default {
  name: "CartItem",
  props: ["item"],
  filters: {
    numberFormat,
  },
  methods: {
    ...mapMutations({
      updateAmount: "updateProductAmount",
      deleteProduct: "deleteProductFromCart",
    }),
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateAmount({ productId: this.item.product.id, amount: value });
      },
    },
  },
};
</script>

<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.image"
        width="120"
        height="120"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">{{ item.product.title }}</h3>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <div class="product__counter form__counter">
      <button
        type="button"
        aria-label="Убрать один товар"
        @click="
          updateAmount({ productId: item.product.id, amount: item.amount - 1 })
        "
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="number" v-model.number="amount" name="count" min="1" />

      <button
        type="button"
        aria-label="Добавить один товар"
        @click="
          updateAmount({ productId: item.product.id, amount: item.amount + 1 })
        "
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.product.price * item.amount) | numberFormat }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click="deleteProduct({ productId: item.product.id })"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>
