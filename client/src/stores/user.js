import { defineStore } from "pinia";

import api from "@src/boot/axios";
import { useEnvStore } from "@src/stores/env";

export const useUserStore = defineStore("user", {
  state: () => ({
    loading: false,
    isLoggedIn: false,
    me: {
      first_name: "Кристиан",
      last_name: "Костадинов",
      role_as: "admin",
    },
    credentials: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    url: "/users",
    error: "",
    time_ms: 0,
  }),
  actions: {
    async login() {
      this.loading = true;
      api.post(`${this.url}/login`, this.credentials).then((res) => {
        this.afterLogin(res.data.encryptedToken);
        this.loading = false;
      }).catch(err => {
        if (err.response.data.message === "Invalid email!") this.error = "Невалиден имейл или парола.";
        if (err.response.data.message === "Invalid password!") this.error = "Невалиден имейл или парола.";
      })
      .finally(() => this.loading = false);
    },
    afterLogin(token) {
      const env = useEnvStore();
      env.dialogs.auth.login = false;
      env.dialogs.auth.register = false;
      this.isLoggedIn = true;
      this.loading = false;
      api.defaults.headers.authorization = token;
      localStorage.setItem("token", token);
    },
  },
});
