<script>
import { get_categories_data, get_colors_data } from "../../api";
import objectEquals from "../../helpers/objectEquals";

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
      categoriesData: null,
      colorsData: null,
    };
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    COLORS() {
      return this.colorsData ? this.colorsData.items : [];
    },
  },
  methods: {
    submitForm() {
      if (!objectEquals(this.currentFilters, this.filters)) {
        this.$router.push({ query: { ...this.currentFilters } });
        this.$emit("update:filters", { ...this.currentFilters });
      }
    },
    resetForm() {
      this.currentFilters = {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: "all",
      };
      this.$router.push({ query: { ...this.currentFilters } });
      this.$emit("update:filters", { ...this.currentFilters });
    },
    getCategoriesData() {
      return get_categories_data()
        .then((data) => {
          this.categoriesData = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getColorsData() {
      return get_colors_data()
        .then((data) => {
          this.colorsData = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getCategoriesData();
    this.getColorsData();
  },
  watch: {
    $route() {
      this.currentFilters = {
        ...this.currentFilters,
        ...this.$route.query,
      };
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
              {{ category.title }}
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
          <li class="colors__item" v-for="color in COLORS" :key="color.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                v-model="currentFilters.colorId"
                :value="color.id"
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
