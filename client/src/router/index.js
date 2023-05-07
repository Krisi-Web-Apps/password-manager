import { createRouter, createWebHistory } from "vue-router";

import { routes } from "@src/router/routes.js";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem("token");

  if (requiresAuth && !token) {
    next({ name: "HomeView" });
  } else {
    next();
  }
});

export default router;
