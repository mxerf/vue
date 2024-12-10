import Vue from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";
import store from "./store";

new Vue({
  render: (h) => h(App),
  router: router,
  store,
}).$mount("#app");
