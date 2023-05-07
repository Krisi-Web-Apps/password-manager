import HomeView from "@src/views/HomeView.vue";
import AboutView from "@src/views/AboutView.vue";
import PasswordView from "@src/views/PasswordView.vue";

export const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
  { path: "/passwords", component: PasswordView },
];
