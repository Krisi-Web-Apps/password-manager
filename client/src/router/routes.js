import HomeView from "@src/views/HomeView.vue";
import AboutView from "@src/views/AboutView.vue";
import PasswordView from "@src/views/PasswordView.vue";
import UsersView from "@src/views/UsersView.vue";

export const routes = [
  {
    name: "HomeView",
    path: "/",
    component: HomeView,
  },
  {
    name: "AboutView",
    path: "/about",
    component: AboutView,
  },
  {
    name: "PasswordView",
    path: "/passwords",
    component: PasswordView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "UsersView",
    path: "/users",
    component: UsersView,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
];
