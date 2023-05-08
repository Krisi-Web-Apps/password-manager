import { createRouter, createWebHistory } from "vue-router";

import { routes } from "@src/router/routes.js";
import { useUserStore } from "@src/stores/user";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const token = localStorage.getItem("token");

  if (requiresAuth && requiresAdmin) {
    const user = useUserStore();

    if (user.me.role_as !== "admin") {
      next({ name: "HomeView" });
    } else {
      next();
    }
    
    return;
  }

  if (requiresAuth && !token) {
    next({ name: "HomeView" });
  } else {
    next();
  }
});

export default router;
