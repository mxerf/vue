<script>
export default {
  name: "NotFoundPage",
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="not-found">
    <h1>404 - Страница не найдена</h1>
    <p>Кажется, вы заблудились.</p>
  </div>
</template>
