<script>
import navigate from "@/helpers/navigate";
import ColorPickerComponent from "../ColorPickerComponent/ColorPickerComponent.vue";
export default {
  components: {
    ColorPickerComponent,
  },
  props: ["product"],
  data() {
    return {
      selectedColor: this.product.colors[0],
    };
  },
  methods: {
    navigate,
  },
};
</script>

<template>
  <li class="catalog__item" @click="navigate('product', { id: product.id })">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title" />
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ product.price }} ₽ </span>

    <ColorPickerComponent
      :colors="product.colors"
      @update:selectedColor="$emit('update:selectedColor', $event)"
    />
  </li>
</template>
<style></style>
