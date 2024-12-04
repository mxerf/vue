<script>
import ProductItem from "../ProductItem/ProductItem.vue";
export default {
  components: {
    ProductItem,
  },
  props: ["products"],
};
</script>
<template>
  <ul class="catalog__list">
    <ProductItem
      v-for="product in products"
      :product="product"
      :key="product.title"
    />
  </ul>
</template>
<style></style>
