<script>
import COLORS from "../../data/colors.js";
export default {
  name: "ColorPickerComponent",
  props: {
    colors: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedColor: this.colors.length ? this.colors[0] : null,
    };
  },
  methods: {
    updateColor(color) {
      this.selectedColor = color.id;
      this.$emit("update:color", color.id);
    },
  },
  computed: {
    COLORS() {
      return COLORS;
    },
  },
};
</script>
<template>
  <ul class="colors colors--black">
    <li v-for="color in colors" :key="color.id" class="colors__item">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :value="color"
          :checked="color.id === selectedColor"
          @change="updateColor(color)"
        />
        <span
          class="colors__value"
          :style="{
            backgroundColor: color.code,
            border: color === 'white' ? '1px solid #eee' : '',
          }"
        >
        </span>
      </label>
    </li>
  </ul>
</template>
