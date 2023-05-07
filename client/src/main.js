import { createApp } from "vue";
import { createPinia } from "pinia";
import ToastPlugin from "vue-toast-notification";

import "./style.css";
import 'vue-toast-notification/dist/theme-sugar.css';
import App from "@src/App.vue";

const pinia = createPinia();

export const app = createApp(App)
    .use(ToastPlugin, {
        position: 'bottom-right',
        pouseOnHover: true,
        onDismiss: true,
    })
    .use(pinia)
    .mount("#app");
