<script>
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
  methods: {},
};
</script>

<template>
  <router-link
    tag="li"
    class="catalog__item"
    :to="{ name: 'product', params: { id: product.id } }"
  >
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
  </router-link>
</template>
<style></style>
