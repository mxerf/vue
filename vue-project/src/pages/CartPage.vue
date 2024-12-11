<script>
import CartItem from "@/components/CartItem/CartItem.vue";
import { mapGetters } from "vuex";
import numberFormat from "../helpers/numberFormat";

export default {
  name: "CartPage",
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters({
      items: "cartDetailedProducts",
      totalPrice: "cartTotalPrice",
      totalAmount: "cartAmount",
    }),
  },
  filters: {
    numberFormat,
  },
};
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">
        {{
          totalAmount === null ? "Загрузка..." : `${totalAmount} товар(-ов)`
        }}</span
      >
    </div>
    <div
      v-if="totalAmount === null"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      "
    >
      <span class="loader"></span>
    </div>
    <section class="cart" v-else>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem
              v-for="item in items"
              :key="item.productId"
              :item="item"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>
