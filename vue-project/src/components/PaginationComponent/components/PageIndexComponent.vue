<!-- PageIndexComponent -->
<script>
export default {
  name: "PageIndexComponent",
  props: ["index", "currentPage"],
  computed: {
    isActive() {
      return this.index === this.currentPage;
    },
  },
  methods: {
    changePage() {
      this.$emit("update:currentPage", this.index);
    },
  },
};
</script>
<template>
  <li class="pagination__item">
    <a
      :class="['pagination__link', { 'pagination__link--current': isActive }]"
      @click="changePage"
    >
      {{ index }}
    </a>
  </li>
</template>
