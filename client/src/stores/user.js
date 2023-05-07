import { defineStore } from "pinia";

import api from "@src/boot/axios";
import { useEnvStore } from "@src/stores/env";
import { app } from "@src/main";

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
      terms: "",
    },
    url: "/users",
    error: "",
    time_ms: 0,
    form_ref: "",
  }),
  actions: {
    login() {
      this.loading = true;
      api
        .post(`${this.url}/login`, this.credentials)
        .then((res) => {
          this.setToken(res.data.encryptedToken);
          this.getUser();
        })
        .catch((err) => {
          if (
            err.message === "Invalid email!" ||
            err.message === "Invalid password!" ||
            err.message === "Invalid email address!"
          ) {
            app.$toast.error("Невалиден имейл или парола!");
          }
        })
        .finally(() => (this.loading = false));
    },
    register() {
      if (!this.credentials.terms) {
        app.$toast.error("Трябва да се съгласите със Общите условия на сайта!");
        return;
      }
      this.loading = true;
      api
        .post(`${this.url}/register`, this.credentials)
        .then((res) => {
          app.$toast.success("Успешна регистрация!");
          this.login();
        })
        .catch((err) => {
          // if (err.message === "")
          if (err.message === "Dublicate email address!")
            app.$toast.error("Този имейл вече съществува!");
          if (err.message === "Password's dpn't match!")
            app.$toast.error("Паролите не съвпадат!");
          if (err.message === "First and last name are required!")
            app.$toast.error("Малко име и фамилия са задължителни!");
          if (err.message === "Invalid email address!")
            app.$toast.error("Въведете валиден имейл адрес!");
          if (err.message === "Invalid password!")
            app.$toast.error("Слаба парола!");
        })
        .finally(() => (this.loading = false));
    },
    afterLogin() {
      app.$toast.success("Влязохте в системата!");
      const env = useEnvStore();
      env.dialogs.auth.login = false;
      env.dialogs.auth.register = false;
      this.isLoggedIn = true;
      this.loading = false;
    },
    setToken(token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      localStorage.setItem("token", token);
    },
    logout() {
      localStorage.removeItem("token");
      api.defaults.headers.authorization = null;
      this.isLoggedIn = false;
      app.$toast.success("Излязохте от системата!");
      const env = useEnvStore();
      env.dialogs.auth.login = true;
    },
    getUser() {
      this.loading = true;
      api
        .get(this.url)
        .then((res) => {
          this.me = res.data;
          this.afterLogin();
        })
        .catch((err) => {
          this.logout();
        })
        .finally(() => (this.loading = false));
    },
  },
});
