import { createApp } from "vue";
import { createPinia } from "pinia";
import ToastPlugin from "vue-toast-notification";
import { createRouter, createWebHistory } from "vue-router";

import { routes } from "@src/routes";

import "vue-toast-notification/dist/theme-sugar.css";

import "./style.css";
import App from "@src/App.vue";

const pinia = createPinia();

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export const app = createApp(App)
  .use(router)
  .use(ToastPlugin, {
    position: "bottom-right",
    pouseOnHover: true,
  })
  .use(pinia)
  .mount("#app");
