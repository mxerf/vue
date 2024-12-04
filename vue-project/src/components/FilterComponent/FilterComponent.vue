<script>
import categories from "@/data/categories.js";
import COLORS from "@/data/colors.js";

export default {
  name: "FilterComponent",
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentFilters: {
        priceFrom: this.filters.priceFrom,
        priceTo: this.filters.priceTo,
        categoryId: this.filters.categoryId,
        colorId: this.filters.colorId,
      },
    };
  },
  computed: {
    categories() {
      return categories;
    },
    colors() {
      return Object.entries(COLORS).map(([name, code]) => ({
        name,
        code,
      }));
    },
  },
  methods: {
    submitForm() {
      this.$emit("update:filters", { ...this.currentFilters });
    },
    resetForm() {
      this.currentFilters = {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: "all",
      };
      this.$emit("update:filters", { ...this.currentFilters });
    },
  },
};
</script>

<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submitForm"
      @reset.prevent="resetForm"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="number"
            v-model.number="currentFilters.priceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="number"
            v-model.number="currentFilters.priceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            v-model.number="currentFilters.categoryId"
          >
            <option value="0">Все категории</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                v-model="currentFilters.colorId"
                value="all"
              />
              <span class="colors__value"> Все </span>
            </label>
          </li>
          <li class="colors__item" v-for="color in colors" :key="color.name">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                v-model="currentFilters.colorId"
                :value="color.name"
              />
              <span
                class="colors__value"
                :style="{ backgroundColor: color.code }"
              >
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button
        class="button button--primery"
        type="reset"
        style="background-color: white; color: black"
      >
        Сбросить
      </button>
      <button class="button button--primery" type="submit">Применить</button>
    </form>
  </aside>
</template>
