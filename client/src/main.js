import { createApp } from "vue";
import { createPinia } from "pinia";
import ToastPlugin from "vue-toast-notification";
import router from "@src/router";

import "vue-toast-notification/dist/theme-sugar.css";

import "./style.css";
import App from "@src/App.vue";

const pinia = createPinia();

export const app = createApp(App)
  .use(router)
  .use(ToastPlugin, {
    position: "bottom-right",
    pouseOnHover: true,
  })
  .use(pinia)
  .mount("#app");
