<script>
export default {
  name: "NotFoundPage",
};
</script>

<template>
  <div class="not-found">
    <h1>404 - Страница не найдена</h1>
    <p>Кажется, вы заблудились.</p>
    <router-link class="button button--primery" to="/">
      Вернуться на главную
    </router-link>
  </div>
</template>
