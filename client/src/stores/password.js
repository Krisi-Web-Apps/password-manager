import { defineStore } from "pinia";

import api from "@src/boot/axios";
import { app } from "@src/main";
import { useEnvStore } from "./env";

export const usePasswordStore = defineStore("password", {
  state: () => ({
    loading: false,
    url: "/passwords",
    item: {
      title: "",
      desc: "",
      password: "",
    },
    items: [],
  }),
  actions: {
    saveItem() {
      this.loading = true;
      api
        .post(`${this.url}`, this.item)
        .then((res) => {
          this.item = res.data;
          app.$toast.success("Паролата е запазена!");
          const env = useEnvStore();
          env.dialogs.passwords.savePassword = false;
        })
        .catch((err) => {
          if (err.message === "Title is required!") {
            app.$toast.error("Полето заглавие е задължително!");
          }
          if (err.message === "Title must be only letters.") {
            app.$toast.error(
              "Полето заглавие трябва да съдържа само главни, малки букви и интервали.",
              { duration: 10000 }
            );
          }
          if (err.message === "Title must be longer than 3 letters.") {
            app.$toast.error(
              "Полето заглавие трябва да съдържа повече от 3 букви.",
              { duration: 7000 }
            );
          }
          if (err.message === "Password is required!") {
            app.$toast.error("Полето парола е задължително!", {
              duration: 4000,
            });
          }
        })
        .finally(() => (this.loading = false));
    },
    getItems() {
      this.loading = true;
      api
        .get(`${this.url}/my`)
        .then((res) => {
          this.items = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.loading = false));
    },
  },
});
